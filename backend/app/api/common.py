from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import Optional
from uuid import UUID
from ..core.database import get_db
from ..core.security import get_current_user, require_admin
from ..models.user import User
from ..models.testimonial import Testimonial
from ..models.team import Team
from ..schemas.common import TestimonialCreate, TestimonialResponse, TeamCreate, TeamUpdate, TeamResponse
from ..schemas.response import PaginatedResponse
from ..utils.pagination import paginate

router = APIRouter(tags=["Testimonials & Teams"])


# Testimonials
@router.get("/api/testimonials", response_model=PaginatedResponse[TestimonialResponse])
async def list_testimonials(
    page: int = Query(1, ge=1),
    per_page: int = Query(12, ge=1, le=100),
    approved: bool = Query(True),
    db: Session = Depends(get_db)
):
    """
    Get list of testimonials (public endpoint shows only approved).
    """
    query = db.query(Testimonial)
    
    if approved:
        query = query.filter(Testimonial.approved == True)
    
    query = query.order_by(Testimonial.created_at.desc())
    result = paginate(query, page, per_page)
    
    return result


@router.post("/api/testimonials", response_model=TestimonialResponse, status_code=status.HTTP_201_CREATED)
async def create_testimonial(
    testimonial_data: TestimonialCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Submit a testimonial (authenticated users).
    Requires admin approval before being visible.
    """
    testimonial = Testimonial(
        user_id=current_user.id,
        rating=testimonial_data.rating,
        message=testimonial_data.message,
        approved=False
    )
    
    db.add(testimonial)
    db.commit()
    db.refresh(testimonial)
    
    return testimonial


@router.put("/api/testimonials/{testimonial_id}/approve", response_model=TestimonialResponse)
async def approve_testimonial(
    testimonial_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Approve a testimonial (admin only).
    """
    testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not testimonial:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Testimonial not found"
        )
    
    testimonial.approved = True
    db.commit()
    db.refresh(testimonial)
    
    return testimonial


@router.delete("/api/testimonials/{testimonial_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_testimonial(
    testimonial_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Delete a testimonial (admin only).
    """
    testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not testimonial:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Testimonial not found"
        )
    
    db.delete(testimonial)
    db.commit()
    
    return None


# Teams
@router.get("/api/teams", response_model=list[TeamResponse])
async def list_team_members(
    db: Session = Depends(get_db)
):
    """
    Get list of team members (public endpoint).
    """
    teams = db.query(Team).order_by(Team.created_at).all()
    return teams


@router.post("/api/teams", response_model=TeamResponse, status_code=status.HTTP_201_CREATED)
async def create_team_member(
    team_data: TeamCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Create a team member (admin only).
    """
    team = Team(**team_data.dict())
    db.add(team)
    db.commit()
    db.refresh(team)
    
    return team


@router.put("/api/teams/{team_id}", response_model=TeamResponse)
async def update_team_member(
    team_id: UUID,
    team_data: TeamUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Update a team member (admin only).
    """
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team member not found"
        )
    
    update_data = team_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(team, field, value)
    
    db.commit()
    db.refresh(team)
    
    return team


@router.delete("/api/teams/{team_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_team_member(
    team_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Delete a team member (admin only).
    """
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team member not found"
        )
    
    db.delete(team)
    db.commit()
    
    return None
