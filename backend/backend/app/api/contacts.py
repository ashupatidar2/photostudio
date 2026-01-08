from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from ..core.database import get_db
from ..core.security import get_current_user
from ..models.user import User
from ..models.contact import Contact
from ..schemas.contact import ContactCreate, ContactResponse

router = APIRouter(prefix="/api/contacts", tags=["Contacts"])


@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def create_contact(
    contact_data: ContactCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Submit a contact form (requires authentication)."""
    new_contact = Contact(
        user_id=current_user.id,
        name=contact_data.name,
        email=contact_data.email,
        message=contact_data.message
    )
    
    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)
    
    return new_contact


@router.get("", response_model=List[ContactResponse])
async def list_contacts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List all contacts for the current user."""
    contacts = db.query(Contact).filter(Contact.user_id == current_user.id).order_by(Contact.created_at.desc()).all()
    return contacts


@router.get("/{contact_id}", response_model=ContactResponse)
async def get_contact(
    contact_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific contact."""
    contact = db.query(Contact).filter(
        Contact.id == contact_id,
        Contact.user_id == current_user.id
    ).first()
    
    if not contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact not found"
        )
    
    return contact
