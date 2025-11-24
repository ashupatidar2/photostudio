"""Simple database initialization script"""
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent))

from app.core.database import Base, engine
from app.models import *  # Import all models

# Create all tables
Base.metadata.create_all(bind=engine)
print("✅ Database tables created successfully!")
