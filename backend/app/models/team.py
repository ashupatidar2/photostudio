import uuid
from sqlalchemy import Column, String, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from datetime import datetime
from ..core.database import Base


class Team(Base):
    __tablename__ = "teams"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(200), nullable=False)
    role = Column(String(100), nullable=False)  # e.g., "Lead Photographer", "Editor"
    bio = Column(Text, nullable=True)
    photo_path = Column(String, nullable=True)
    contact_info = Column(JSONB, nullable=True)  # Email, phone, social media
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    def __repr__(self):
        return f"<Team {self.name}>"
