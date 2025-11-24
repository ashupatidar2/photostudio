import os
from abc import ABC, abstractmethod
from typing import BinaryIO, Optional
import boto3
from botocore.exceptions import ClientError
from ..core.config import settings


class StorageBackend(ABC):
    """Abstract base class for storage backends."""
    
    @abstractmethod
    async def upload(self, file_path: str, file_data: BinaryIO, content_type: str) -> str:
        """Upload a file and return its URL."""
        pass
    
    @abstractmethod
    async def delete(self, file_path: str) -> bool:
        """Delete a file."""
        pass
    
    @abstractmethod
    def get_url(self, file_path: str) -> str:
        """Get the URL for a file."""
        pass


class LocalStorage(StorageBackend):
    """Local filesystem storage backend."""
    
    def __init__(self, base_dir: str = None):
        self.base_dir = base_dir or settings.UPLOAD_DIR
        os.makedirs(self.base_dir, exist_ok=True)
    
    async def upload(self, file_path: str, file_data: BinaryIO, content_type: str) -> str:
        """Save file to local filesystem."""
        full_path = os.path.join(self.base_dir, file_path)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        
        with open(full_path, 'wb') as f:
            f.write(file_data.read() if hasattr(file_data, 'read') else file_data)
        
        return file_path
    
    async def delete(self, file_path: str) -> bool:
        """Delete file from local filesystem."""
        full_path = os.path.join(self.base_dir, file_path)
        try:
            if os.path.exists(full_path):
                os.remove(full_path)
                return True
            return False
        except Exception:
            return False
    
    def get_url(self, file_path: str) -> str:
        """Get URL for local file (relative path)."""
        return f"/uploads/{file_path}"


class S3Storage(StorageBackend):
    """AWS S3 or S3-compatible storage backend."""
    
    def __init__(self):
        self.bucket = settings.S3_BUCKET
        self.client = boto3.client(
            's3',
            region_name=settings.S3_REGION,
            aws_access_key_id=settings.S3_ACCESS_KEY,
            aws_secret_access_key=settings.S3_SECRET_KEY,
            endpoint_url=settings.S3_ENDPOINT_URL
        )
    
    async def upload(self, file_path: str, file_data: BinaryIO, content_type: str) -> str:
        """Upload file to S3."""
        try:
            self.client.upload_fileobj(
                file_data,
                self.bucket,
                file_path,
                ExtraArgs={'ContentType': content_type, 'ACL': 'public-read'}
            )
            return file_path
        except ClientError as e:
            raise Exception(f"S3 upload failed: {str(e)}")
    
    async def delete(self, file_path: str) -> bool:
        """Delete file from S3."""
        try:
            self.client.delete_object(Bucket=self.bucket, Key=file_path)
            return True
        except ClientError:
            return False
    
    def get_url(self, file_path: str) -> str:
        """Get public URL for S3 file."""
        if settings.S3_ENDPOINT_URL:
            return f"{settings.S3_ENDPOINT_URL}/{self.bucket}/{file_path}"
        return f"https://{self.bucket}.s3.{settings.S3_REGION}.amazonaws.com/{file_path}"


def get_storage() -> StorageBackend:
    """Get the configured storage backend."""
    if settings.STORAGE_TYPE == "s3":
        return S3Storage()
    return LocalStorage()
