from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from uuid import UUID


class GalleryBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    category: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None


class GalleryCreate(GalleryBase):
    pass


class GalleryUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    category: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None


class GalleryResponse(GalleryBase):
    id: UUID
    created_at: datetime
    
    class Config:
        from_attributes = True


class ImageBase(BaseModel):
    filepath_original: str
    filepath_thumb: Optional[str] = None
    filepath_medium: Optional[str] = None
    filepath_large: Optional[str] = None
    width: Optional[int] = None
    height: Optional[int] = None
    tags: Optional[List[str]] = None
    is_featured: bool = False


class ImageResponse(ImageBase):
    id: UUID
    gallery_id: UUID
    uploaded_by: Optional[UUID] = None
    created_at: datetime
    
    class Config:
        from_attributes = True


class GalleryDetail(GalleryResponse):
    images: List[ImageResponse] = []
    
    class Config:
        from_attributes = True


class ImageUploadResponse(BaseModel):
    id: UUID
    filepath_original: str
    filepath_thumb: Optional[str] = None
    filepath_medium: Optional[str] = None
    filepath_large: Optional[str] = None
    message: str
