import os
import uuid
from typing import Tuple, Optional
from PIL import Image
from io import BytesIO
from fastapi import UploadFile, HTTPException
from ..core.config import settings


class ImageProcessor:
    """Service for processing images: validation, resizing, thumbnail generation."""
    
    ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp'}
    ALLOWED_MIME_TYPES = {'image/jpeg', 'image/png', 'image/webp'}
    
    @staticmethod
    def validate_image(file: UploadFile) -> None:
        """Validate image file type and size."""
        # Check MIME type
        if file.content_type not in ImageProcessor.ALLOWED_MIME_TYPES:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid file type. Allowed types: {', '.join(ImageProcessor.ALLOWED_MIME_TYPES)}"
            )
        
        # Check file extension
        ext = os.path.splitext(file.filename)[1].lower()
        if ext not in ImageProcessor.ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid file extension. Allowed extensions: {', '.join(ImageProcessor.ALLOWED_EXTENSIONS)}"
            )
    
    @staticmethod
    def generate_unique_filename(original_filename: str) -> str:
        """Generate a unique filename preserving the extension."""
        ext = os.path.splitext(original_filename)[1].lower()
        unique_name = f"{uuid.uuid4()}{ext}"
        return unique_name
    
    @staticmethod
    def resize_image(
        image: Image.Image,
        size: Tuple[int, int],
        maintain_aspect: bool = True
    ) -> Image.Image:
        """
        Resize an image.
        
        Args:
            image: PIL Image object
            size: Target size (width, height)
            maintain_aspect: Whether to maintain aspect ratio
        
        Returns:
            Resized PIL Image
        """
        if maintain_aspect:
            image.thumbnail(size, Image.Resampling.LANCZOS)
        else:
            image = image.resize(size, Image.Resampling.LANCZOS)
        
        return image
    
    @staticmethod
    def strip_exif(image: Image.Image) -> Image.Image:
        """Remove EXIF data from image for privacy."""
        data = list(image.getdata())
        image_without_exif = Image.new(image.mode, image.size)
        image_without_exif.putdata(data)
        return image_without_exif
    
    @staticmethod
    def process_upload(
        image_data: bytes,
        filename: str
    ) -> dict:
        """
        Process uploaded image: create multiple sizes.
        
        Args:
            image_data: Image bytes
            filename: Original filename
        
        Returns:
            Dictionary with processed image data and sizes
        """
        try:
            # Open image
            image = Image.open(BytesIO(image_data))
            
            # Convert RGBA to RGB if necessary
            if image.mode in ('RGBA', 'LA', 'P'):
                background = Image.new('RGB', image.size, (255, 255, 255))
                if image.mode == 'P':
                    image = image.convert('RGBA')
                background.paste(image, mask=image.split()[-1] if image.mode in ('RGBA', 'LA') else None)
                image = background
            
            # Strip EXIF data
            image = ImageProcessor.strip_exif(image)
            
            # Get original dimensions
            original_width, original_height = image.size
            
            # Generate unique filename
            unique_filename = ImageProcessor.generate_unique_filename(filename)
            base_name = os.path.splitext(unique_filename)[0]
            ext = os.path.splitext(unique_filename)[1]
            
            # Create different sizes
            sizes = {
                'original': image.copy(),
                'large': ImageProcessor.resize_image(image.copy(), settings.LARGE_SIZE),
                'medium': ImageProcessor.resize_image(image.copy(), settings.MEDIUM_SIZE),
                'thumb': ImageProcessor.resize_image(image.copy(), settings.THUMBNAIL_SIZE),
            }
            
            # Prepare result
            result = {
                'base_name': base_name,
                'extension': ext,
                'original_width': original_width,
                'original_height': original_height,
                'sizes': sizes
            }
            
            return result
            
        except Exception as e:
            raise HTTPException(
                status_code=400,
                detail=f"Error processing image: {str(e)}"
            )
    
    @staticmethod
    def save_image(image: Image.Image, filepath: str, quality: int = 85) -> None:
        """
        Save image to file.
        
        Args:
            image: PIL Image object
            filepath: Path to save image
            quality: JPEG quality (1-100)
        """
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        
        # Determine format
        ext = os.path.splitext(filepath)[1].lower()
        if ext in ['.jpg', '.jpeg']:
            image.save(filepath, 'JPEG', quality=quality, optimize=True)
        elif ext == '.png':
            image.save(filepath, 'PNG', optimize=True)
        elif ext == '.webp':
            image.save(filepath, 'WEBP', quality=quality)
        else:
            image.save(filepath)
    
    @staticmethod
    async def process_and_save(
        file: UploadFile,
        upload_dir: str
    ) -> dict:
        """
        Validate, process, and save an uploaded image.
        
        Args:
            file: Uploaded file
            upload_dir: Directory to save images
        
        Returns:
            Dictionary with file paths and metadata
        """
        # Validate
        ImageProcessor.validate_image(file)
        
        # Read file data
        image_data = await file.read()
        
        # Process image
        processed = ImageProcessor.process_upload(image_data, file.filename)
        
        # Save all sizes
        base_name = processed['base_name']
        ext = processed['extension']
        
        filepaths = {}
        for size_name, image in processed['sizes'].items():
            if size_name == 'original':
                filename = f"{base_name}{ext}"
            else:
                filename = f"{base_name}_{size_name}{ext}"
            
            filepath = os.path.join(upload_dir, filename)
            ImageProcessor.save_image(image, filepath)
            filepaths[f'filepath_{size_name}'] = filepath
        
        return {
            **filepaths,
            'width': processed['original_width'],
            'height': processed['original_height']
        }
