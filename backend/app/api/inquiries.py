from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from ..core.database import get_db
from ..core.security import get_current_user
from ..models.user import User
from ..models.inquiry import Inquiry
from ..schemas.inquiry import InquiryCreate, InquiryResponse

router = APIRouter(prefix="/api/inquiries", tags=["Inquiries"])


@router.post("", response_model=InquiryResponse, status_code=status.HTTP_201_CREATED)
async def create_inquiry(
    inquiry_data: InquiryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Submit a booking inquiry (requires authentication)."""
    new_inquiry = Inquiry(
        user_id=current_user.id,
        service_type=inquiry_data.service_type,
        package_type=inquiry_data.package_type,
        name=inquiry_data.name,
        email=inquiry_data.email,
        phone=inquiry_data.phone,
        location=inquiry_data.location,
        preferred_date=inquiry_data.preferred_date,
        preferred_time=inquiry_data.preferred_time,
        message=inquiry_data.message
    )
    
    db.add(new_inquiry)
    db.commit()
    db.refresh(new_inquiry)
    
    return new_inquiry


@router.get("", response_model=List[InquiryResponse])
async def list_inquiries(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List all inquiries for the current user."""
    inquiries = db.query(Inquiry).filter(Inquiry.user_id == current_user.id).order_by(Inquiry.created_at.desc()).all()
    return inquiries


@router.get("/{inquiry_id}", response_model=InquiryResponse)
async def get_inquiry(
    inquiry_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific inquiry."""
    inquiry = db.query(Inquiry).filter(
        Inquiry.id == inquiry_id,
        Inquiry.user_id == current_user.id
    ).first()
    
    if not inquiry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inquiry not found"
        )
    
    return inquiry
