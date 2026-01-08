from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from uuid import UUID
from ..models.contact import ContactStatus


# Contact Schemas
class ContactBase(BaseModel):
    name: str
    email: EmailStr
    message: str


class ContactCreate(ContactBase):
    pass


class ContactResponse(ContactBase):
    id: UUID
    user_id: UUID
    status: ContactStatus
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class ContactStatusUpdate(BaseModel):
    status: ContactStatus
