from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from uuid import UUID


class TestimonialBase(BaseModel):
    rating: int = Field(..., ge=1, le=5)
    message: str = Field(..., min_length=1)


class TestimonialCreate(TestimonialBase):
    pass


class TestimonialResponse(TestimonialBase):
    id: UUID
    user_id: UUID
    approved: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class TeamBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    role: str = Field(..., min_length=1, max_length=100)
    bio: Optional[str] = None
    photo_path: Optional[str] = None
    contact_info: Optional[dict] = None


class TeamCreate(TeamBase):
    pass


class TeamUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=200)
    role: Optional[str] = Field(None, min_length=1, max_length=100)
    bio: Optional[str] = None
    photo_path: Optional[str] = None
    contact_info: Optional[dict] = None


class TeamResponse(TeamBase):
    id: UUID
    created_at: datetime
    
    class Config:
        from_attributes = True
