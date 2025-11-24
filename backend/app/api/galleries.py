from fastapi import APIRouter, Depends, HTTPException, status, Query, UploadFile, File, Form, BackgroundTasks
from sqlalchemy.orm import Session
from typing import Optional, List
from uuid import UUID
import os
from ..core.database import get_db
from ..core.security import get_current_user, require_photographer
from ..core.config import settings
from ..models.user import User
from ..models.gallery import Gallery
from ..models.image import Image
from ..schemas.gallery import (
    GalleryCreate,
    GalleryUpdate,
    GalleryResponse,
    GalleryDetail,
    ImageResponse,
    ImageUploadResponse
)
from ..schemas.response import PaginatedResponse
from ..utils.pagination import paginate
from ..services.image_processor import ImageProcessor

router = APIRouter(prefix="/api/galleries", tags=["Galleries"])


@router.get("", response_model=PaginatedResponse[GalleryResponse])
async def list_galleries(
    page: int = Query(1, ge=1),
    per_page: int = Query(12, ge=1, le=100),
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Get list of galleries (public endpoint).
    """
    query = db.query(Gallery)
    
    if category:
        query = query.filter(Gallery.category == category)
    
    query = query.order_by(Gallery.created_at.desc())
    result = paginate(query, page, per_page)
    
    return result


@router.get("/{gallery_id}", response_model=GalleryDetail)
async def get_gallery(
    gallery_id: UUID,
    db: Session = Depends(get_db)
):
    """
    Get gallery with images (public endpoint).
    """
    gallery = db.query(Gallery).filter(Gallery.id == gallery_id).first()
    if not gallery:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Gallery not found"
        )
    
    return gallery


@router.post("", response_model=GalleryResponse, status_code=status.HTTP_201_CREATED)
async def create_gallery(
    gallery_data: GalleryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_photographer)
):
    """
    Create a new gallery (photographer/admin only).
    """
    gallery = Gallery(**gallery_data.dict())
    db.add(gallery)
    db.commit()
    db.refresh(gallery)
    
    return gallery


@router.put("/{gallery_id}", response_model=GalleryResponse)
async def update_gallery(
    gallery_id: UUID,
    gallery_data: GalleryUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_photographer)
):
    """
    Update a gallery (photographer/admin only).
    """
    gallery = db.query(Gallery).filter(Gallery.id == gallery_id).first()
    if not gallery:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Gallery not found"
        )
    
    update_data = gallery_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(gallery, field, value)
    
    db.commit()
    db.refresh(gallery)
    
    return gallery


@router.delete("/{gallery_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_gallery(
    gallery_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_photographer)
):
    """
    Delete a gallery (photographer/admin only).
    """
    gallery = db.query(Gallery).filter(Gallery.id == gallery_id).first()
    if not gallery:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Gallery not found"
        )
    
    db.delete(gallery)
    db.commit()
    
    return None


# Image upload endpoints
@router.post("/images/upload", response_model=List[ImageUploadResponse], status_code=status.HTTP_201_CREATED)
async def upload_images(
    gallery_id: UUID = Form(...),
    tags: Optional[str] = Form(None),
    is_featured: bool = Form(False),
    files: List[UploadFile] = File(...),
    background_tasks: BackgroundTasks = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_photographer)
):
    """
    Upload images to a gallery (photographer/admin only).
    Supports multiple file upload.
    """
    # Verify gallery exists
    gallery = db.query(Gallery).filter(Gallery.id == gallery_id).first()
    if not gallery:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Gallery not found"
        )
    
    # Parse tags
    tag_list = [tag.strip() for tag in tags.split(",")] if tags else []
    
    # Process each file
    uploaded_images = []
    upload_dir = os.path.join(settings.UPLOAD_DIR, "galleries", str(gallery_id))
    os.makedirs(upload_dir, exist_ok=True)
    
    for file in files:
        try:
            # Process and save image
            result = await ImageProcessor.process_and_save(file, upload_dir)
            
            # Create image record
            image = Image(
                gallery_id=gallery_id,
                uploaded_by=current_user.id,
                filepath_original=result['filepath_original'],
                filepath_thumb=result.get('filepath_thumb'),
                filepath_medium=result.get('filepath_medium'),
                filepath_large=result.get('filepath_large'),
                width=result['width'],
                height=result['height'],
                tags=tag_list,
                is_featured=is_featured
            )
            
            db.add(image)
            db.commit()
            db.refresh(image)
            
            uploaded_images.append(ImageUploadResponse(
                id=image.id,
                filepath_original=image.filepath_original,
                filepath_thumb=image.filepath_thumb,
                filepath_medium=image.filepath_medium,
                filepath_large=image.filepath_large,
                message="Image uploaded successfully"
            ))
            
        except Exception as e:
            print(f"Error uploading image {file.filename}: {e}")
            continue
    
    if not uploaded_images:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No images were uploaded successfully"
        )
    
    return uploaded_images


@router.delete("/images/{image_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_image(
    image_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_photographer)
):
    """
    Delete an image (photographer/admin only).
    """
    image = db.query(Image).filter(Image.id == image_id).first()
    if not image:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Image not found"
        )
    
    # Delete files from storage
    for filepath in [image.filepath_original, image.filepath_thumb, image.filepath_medium, image.filepath_large]:
        if filepath and os.path.exists(filepath):
            try:
                os.remove(filepath)
            except Exception as e:
                print(f"Error deleting file {filepath}: {e}")
    
    # Delete database record
    db.delete(image)
    db.commit()
    
    return None


@router.get("/images/{image_id}", response_model=ImageResponse)
async def get_image(
    image_id: UUID,
    db: Session = Depends(get_db)
):
    """
    Get image details (public endpoint).
    """
    image = db.query(Image).filter(Image.id == image_id).first()
    if not image:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Image not found"
        )
    
    return image
