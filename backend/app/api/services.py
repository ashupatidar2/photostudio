from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import Optional
from uuid import UUID
from ..core.database import get_db
from ..core.security import require_admin
from ..models.service import Service
from ..models.package import Package
from ..schemas.service import (
    ServiceCreate,
    ServiceUpdate,
    ServiceResponse,
    ServiceDetail,
    PackageCreate,
    PackageResponse
)
from ..schemas.response import PaginatedResponse
from ..utils.pagination import paginate

router = APIRouter(prefix="/api/services", tags=["Services"])


@router.get("", response_model=PaginatedResponse[ServiceResponse])
async def list_services(
    page: int = Query(1, ge=1),
    per_page: int = Query(12, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Get list of services (public endpoint).
    """
    query = db.query(Service).order_by(Service.created_at.desc())
    result = paginate(query, page, per_page)
    
    return result


@router.get("/{slug}", response_model=ServiceDetail)
async def get_service_by_slug(
    slug: str,
    db: Session = Depends(get_db)
):
    """
    Get service details by slug (public endpoint).
    """
    service = db.query(Service).filter(Service.slug == slug).first()
    if not service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service not found"
        )
    
    return service


@router.post("", response_model=ServiceResponse, status_code=status.HTTP_201_CREATED)
async def create_service(
    service_data: ServiceCreate,
    db: Session = Depends(get_db),
    current_user = Depends(require_admin)
):
    """
    Create a new service (admin only).
    """
    # Check if slug already exists
    existing = db.query(Service).filter(Service.slug == service_data.slug).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Service with this slug already exists"
        )
    
    # Create service
    service = Service(**service_data.dict())
    db.add(service)
    db.commit()
    db.refresh(service)
    
    return service


@router.put("/{service_id}", response_model=ServiceResponse)
async def update_service(
    service_id: UUID,
    service_data: ServiceUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(require_admin)
):
    """
    Update a service (admin only).
    """
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service not found"
        )
    
    # Update fields
    update_data = service_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(service, field, value)
    
    db.commit()
    db.refresh(service)
    
    return service


@router.delete("/{service_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_service(
    service_id: UUID,
    db: Session = Depends(get_db),
    current_user = Depends(require_admin)
):
    """
    Delete a service (admin only).
    """
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service not found"
        )
    
    db.delete(service)
    db.commit()
    
    return None


# Package endpoints
@router.post("/{service_id}/packages", response_model=PackageResponse, status_code=status.HTTP_201_CREATED)
async def create_package(
    service_id: UUID,
    package_data: PackageCreate,
    db: Session = Depends(get_db),
    current_user = Depends(require_admin)
):
    """
    Create a package for a service (admin only).
    """
    # Verify service exists
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service not found"
        )
    
    # Create package
    package = Package(**package_data.dict())
    db.add(package)
    db.commit()
    db.refresh(package)
    
    return package


@router.delete("/packages/{package_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_package(
    package_id: UUID,
    db: Session = Depends(get_db),
    current_user = Depends(require_admin)
):
    """
    Delete a package (admin only).
    """
    package = db.query(Package).filter(Package.id == package_id).first()
    if not package:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Package not found"
        )
    
    db.delete(package)
    db.commit()
    
    return None
