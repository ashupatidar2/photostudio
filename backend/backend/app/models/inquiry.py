import uuid
import enum
from sqlalchemy import Column, String, Text, DateTime, Date, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
from ..core.database import Base


class InquiryStatus(str, enum.Enum):
    NEW = "new"
    CONTACTED = "contacted"
    QUOTED = "quoted"
    BOOKED = "booked"
    REJECTED = "rejected"


class Inquiry(Base):
    __tablename__ = "inquiries"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    
    # Service details
    service_type = Column(String, nullable=False)  # wedding, prewedding, maternity, baby
    package_type = Column(String, nullable=False)  # basic, premium, luxury
    
    # Personal details
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    location = Column(String, nullable=True)
    
    # Booking details
    preferred_date = Column(Date, nullable=False)
    preferred_time = Column(String, nullable=False)
    message = Column(Text, nullable=True)
    
    # Status
    status = Column(Enum(InquiryStatus), default=InquiryStatus.NEW, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    # Relationships
    user = relationship("User", back_populates="inquiries")
    
    def __repr__(self):
        return f"<Inquiry {self.id} - {self.service_type}>"
