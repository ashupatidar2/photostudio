import uuid
from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey, ARRAY
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
from ..core.database import Base


class Image(Base):
    __tablename__ = "images"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    gallery_id = Column(UUID(as_uuid=True), ForeignKey("galleries.id", ondelete="CASCADE"), nullable=False)
    uploaded_by = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    filepath_original = Column(String, nullable=False)
    filepath_thumb = Column(String, nullable=True)
    filepath_medium = Column(String, nullable=True)
    filepath_large = Column(String, nullable=True)
    width = Column(Integer, nullable=True)
    height = Column(Integer, nullable=True)
    tags = Column(ARRAY(String), nullable=True)
    is_featured = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Relationships
    gallery = relationship("Gallery", back_populates="images")
    uploader = relationship("User", back_populates="uploaded_images", foreign_keys=[uploaded_by])
    
    def __repr__(self):
        return f"<Image {self.id}>"
