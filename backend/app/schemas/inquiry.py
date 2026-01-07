from pydantic import BaseModel, EmailStr
from datetime import datetime, date
from typing import Optional
from uuid import UUID
from ..models.inquiry import InquiryStatus


# Inquiry Schemas
class InquiryBase(BaseModel):
    service_type: str  # wedding, prewedding, maternity, baby
    package_type: str  # basic, premium, luxury
    name: str
    email: EmailStr
    phone: str
    location: Optional[str] = None
    preferred_date: date
    preferred_time: str
    message: Optional[str] = None


class InquiryCreate(InquiryBase):
    pass


class InquiryResponse(InquiryBase):
    id: UUID
    user_id: UUID
    status: InquiryStatus
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class InquiryStatusUpdate(BaseModel):
    status: InquiryStatus
