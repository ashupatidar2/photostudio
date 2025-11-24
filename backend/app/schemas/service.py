from pydantic import BaseModel, Field
from typing import Optional, List, Any
from datetime import datetime
from uuid import UUID


class ServiceBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    slug: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    price_cents: int = Field(..., ge=0)
    duration_minutes: int = Field(..., gt=0)
    features: Optional[List[str]] = None


class ServiceCreate(ServiceBase):
    pass


class ServiceUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    slug: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = None
    price_cents: Optional[int] = Field(None, ge=0)
    duration_minutes: Optional[int] = Field(None, gt=0)
    features: Optional[List[str]] = None


class ServiceResponse(ServiceBase):
    id: UUID
    created_at: datetime
    
    class Config:
        from_attributes = True


class PackageBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    price_cents: int = Field(..., ge=0)
    details: Optional[str] = None


class PackageCreate(PackageBase):
    service_id: UUID


class PackageResponse(PackageBase):
    id: UUID
    service_id: UUID
    created_at: datetime
    
    class Config:
        from_attributes = True


class ServiceDetail(ServiceResponse):
    packages: List[PackageResponse] = []
    
    class Config:
        from_attributes = True
