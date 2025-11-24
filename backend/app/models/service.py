import uuid
from sqlalchemy import Column, String, Integer, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from datetime import datetime
from ..core.database import Base


class Service(Base):
    __tablename__ = "services"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    price_cents = Column(Integer, nullable=False)  # Store price in cents
    duration_minutes = Column(Integer, nullable=False)
    features = Column(JSONB, nullable=True)  # JSON array of features
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Relationships
    packages = relationship("Package", back_populates="service", cascade="all, delete-orphan")
    bookings = relationship("Booking", back_populates="service")
    
    def __repr__(self):
        return f"<Service {self.title}>"
