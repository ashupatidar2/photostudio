from pydantic import BaseModel, Field
from typing import Optional, List, Any
from datetime import datetime
from uuid import UUID
from ..models.booking import BookingStatus


class ReferenceImage(BaseModel):
    original: str
    thumb: Optional[str] = None


class BookingBase(BaseModel):
    service_id: UUID
    package_id: Optional[UUID] = None
    scheduled_at: datetime
    notes: Optional[str] = None


class BookingCreate(BookingBase):
    pass


class BookingUpdate(BaseModel):
    scheduled_at: Optional[datetime] = None
    notes: Optional[str] = None
    status: Optional[BookingStatus] = None


class BookingResponse(BookingBase):
    id: UUID
    user_id: UUID
    status: BookingStatus
    duration_minutes: int
    price_cents: int
    reference_images: Optional[List[dict]] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class BookingFilter(BaseModel):
    user_id: Optional[UUID] = None
    status: Optional[BookingStatus] = None
    page: int = Field(1, ge=1)
    per_page: int = Field(12, ge=1, le=100)


class BookingStatusUpdate(BaseModel):
    status: BookingStatus
