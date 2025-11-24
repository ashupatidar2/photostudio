import uuid
from sqlalchemy import Column, String, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
from ..core.database import Base


class Gallery(Base):
    __tablename__ = "galleries"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(200), nullable=False)
    category = Column(String(100), index=True, nullable=False)  # wedding, pre-wedding, birthday, events
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Relationships
    images = relationship("Image", back_populates="gallery", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Gallery {self.title}>"
