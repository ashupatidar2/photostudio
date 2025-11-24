from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import Optional
from uuid import UUID
from datetime import datetime
from ..core.database import get_db
from ..core.security import get_current_user, require_admin
from ..models.user import User
from ..models.booking import Booking, BookingStatus
from ..models.service import Service
from ..models.package import Package
from ..schemas.booking import (
    BookingCreate,
    BookingUpdate,
    BookingResponse,
    BookingStatusUpdate
)
from ..schemas.response import PaginatedResponse
from ..utils.pagination import paginate
from ..services.email import EmailService

router = APIRouter(prefix="/api/bookings", tags=["Bookings"])


@router.post("", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
async def create_booking(
    booking_data: BookingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new booking (authenticated users).
    """
    # Verify service exists
    service = db.query(Service).filter(Service.id == booking_data.service_id).first()
    if not service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service not found"
        )
    
    # Verify package if provided
    package = None
    if booking_data.package_id:
        package = db.query(Package).filter(Package.id == booking_data.package_id).first()
        if not package or package.service_id != service.id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid package for this service"
            )
    
    # Determine price and duration
    price_cents = package.price_cents if package else service.price_cents
    duration_minutes = service.duration_minutes
    
    # Create booking
    booking = Booking(
        user_id=current_user.id,
        service_id=service.id,
        package_id=package.id if package else None,
        scheduled_at=booking_data.scheduled_at,
        duration_minutes=duration_minutes,
        price_cents=price_cents,
        notes=booking_data.notes,
        status=BookingStatus.PENDING
    )
    
    db.add(booking)
    db.commit()
    db.refresh(booking)
    
    # Send confirmation email
    try:
        await EmailService.send_booking_confirmation(
            to_email=current_user.email,
            user_name=current_user.full_name,
            booking_id=str(booking.id),
            service_name=service.title,
            scheduled_at=booking.scheduled_at.strftime("%Y-%m-%d %H:%M"),
            price=f"${price_cents / 100:.2f}"
        )
    except Exception as e:
        print(f"Failed to send booking confirmation email: {e}")
    
    return booking


@router.get("", response_model=PaginatedResponse[BookingResponse])
async def list_bookings(
    page: int = Query(1, ge=1),
    per_page: int = Query(12, ge=1, le=100),
    status: Optional[BookingStatus] = None,
    user_id: Optional[UUID] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    List bookings.
    - Regular users see only their bookings
    - Admins can see all bookings and filter by user
    """
    query = db.query(Booking)
    
    # Filter by user role
    if current_user.role != "admin":
        query = query.filter(Booking.user_id == current_user.id)
    elif user_id:
        query = query.filter(Booking.user_id == user_id)
    
    # Filter by status
    if status:
        query = query.filter(Booking.status == status)
    
    query = query.order_by(Booking.created_at.desc())
    result = paginate(query, page, per_page)
    
    return result


@router.get("/{booking_id}", response_model=BookingResponse)
async def get_booking(
    booking_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get booking details.
    """
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    
    # Check permissions
    if current_user.role != "admin" and booking.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view this booking"
        )
    
    return booking


@router.put("/{booking_id}", response_model=BookingResponse)
async def update_booking(
    booking_id: UUID,
    booking_data: BookingUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Update booking (owner or admin).
    """
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    
    # Check permissions
    if current_user.role != "admin" and booking.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this booking"
        )
    
    # Update fields
    update_data = booking_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(booking, field, value)
    
    db.commit()
    db.refresh(booking)
    
    return booking


@router.put("/{booking_id}/status", response_model=BookingResponse)
async def update_booking_status(
    booking_id: UUID,
    status_data: BookingStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Update booking status (admin only).
    """
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    
    old_status = booking.status
    booking.status = status_data.status
    
    db.commit()
    db.refresh(booking)
    
    # Send status update email
    if old_status != status_data.status:
        user = db.query(User).filter(User.id == booking.user_id).first()
        if user:
            try:
                await EmailService.send_booking_status_update(
                    to_email=user.email,
                    user_name=user.full_name,
                    booking_id=str(booking.id),
                    status=status_data.status.value
                )
            except Exception as e:
                print(f"Failed to send status update email: {e}")
    
    return booking


@router.delete("/{booking_id}", status_code=status.HTTP_204_NO_CONTENT)
async def cancel_booking(
    booking_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Cancel a booking (owner or admin).
    """
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    
    # Check permissions
    if current_user.role != "admin" and booking.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to cancel this booking"
        )
    
    # Update status to cancelled instead of deleting
    booking.status = BookingStatus.CANCELLED
    db.commit()
    
    return None
