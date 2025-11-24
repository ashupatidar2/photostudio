from fastapi import APIRouter, Depends, Query, Response
from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from typing import Optional
from uuid import UUID
from datetime import datetime, timedelta
import csv
import io
from ..core.database import get_db
from ..core.security import require_admin
from ..models.user import User
from ..models.booking import Booking, BookingStatus
from ..models.service import Service
from ..schemas.user import UserResponse
from ..schemas.response import PaginatedResponse
from ..utils.pagination import paginate

router = APIRouter(prefix="/api/admin", tags=["Admin"])


@router.get("/stats")
async def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Get dashboard statistics (admin only).
    """
    # Total counts
    total_users = db.query(User).filter(User.role == "client").count()
    total_bookings = db.query(Booking).count()
    total_services = db.query(Service).count()
    
    # Pending bookings
    pending_bookings = db.query(Booking).filter(Booking.status == BookingStatus.PENDING).count()
    
    # Revenue (confirmed + completed bookings)
    revenue_result = db.query(func.sum(Booking.price_cents)).filter(
        Booking.status.in_([BookingStatus.CONFIRMED, BookingStatus.COMPLETED])
    ).scalar()
    total_revenue = (revenue_result or 0) / 100  # Convert cents to dollars
    
    # Bookings by month (last 6 months)
    six_months_ago = datetime.utcnow() - timedelta(days=180)
    bookings_by_month = db.query(
        extract('year', Booking.created_at).label('year'),
        extract('month', Booking.created_at).label('month'),
        func.count(Booking.id).label('count')
    ).filter(
        Booking.created_at >= six_months_ago
    ).group_by('year', 'month').all()
    
    # Bookings by status
    bookings_by_status = db.query(
        Booking.status,
        func.count(Booking.id).label('count')
    ).group_by(Booking.status).all()
    
    return {
        "total_users": total_users,
        "total_bookings": total_bookings,
        "total_services": total_services,
        "pending_bookings": pending_bookings,
        "total_revenue": total_revenue,
        "bookings_by_month": [
            {"year": int(year), "month": int(month), "count": count}
            for year, month, count in bookings_by_month
        ],
        "bookings_by_status": [
            {"status": status.value, "count": count}
            for status, count in bookings_by_status
        ]
    }


@router.get("/users", response_model=PaginatedResponse[UserResponse])
async def list_users(
    page: int = Query(1, ge=1),
    per_page: int = Query(12, ge=1, le=100),
    role: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    List all users (admin only).
    """
    query = db.query(User)
    
    if role:
        query = query.filter(User.role == role)
    
    query = query.order_by(User.created_at.desc())
    result = paginate(query, page, per_page)
    
    return result


@router.put("/users/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: UUID,
    role: Optional[str] = None,
    is_active: Optional[bool] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Update user (admin only).
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        from fastapi import HTTPException, status
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    if role is not None:
        user.role = role
    if is_active is not None:
        user.is_active = is_active
    
    db.commit()
    db.refresh(user)
    
    return user


@router.get("/bookings/export")
async def export_bookings(
    status: Optional[BookingStatus] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Export bookings as CSV (admin only).
    """
    query = db.query(Booking).join(User).join(Service)
    
    if status:
        query = query.filter(Booking.status == status)
    
    bookings = query.all()
    
    # Create CSV
    output = io.StringIO()
    writer = csv.writer(output)
    
    # Write header
    writer.writerow([
        'Booking ID', 'User Email', 'User Name', 'Service', 
        'Status', 'Scheduled At', 'Price', 'Created At'
    ])
    
    # Write data
    for booking in bookings:
        writer.writerow([
            str(booking.id),
            booking.user.email,
            booking.user.full_name,
            booking.service.title,
            booking.status.value,
            booking.scheduled_at.strftime('%Y-%m-%d %H:%M'),
            f"${booking.price_cents / 100:.2f}",
            booking.created_at.strftime('%Y-%m-%d %H:%M')
        ])
    
    # Return CSV
    output.seek(0)
    return Response(
        content=output.getvalue(),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=bookings.csv"}
    )
