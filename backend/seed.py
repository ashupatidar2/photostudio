"""
Seed script to populate the database with sample data.
Run with: python seed.py
"""
import asyncio
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine
from app.core.security import get_password_hash
from app.models import (
    User, UserRole, Service, Package, Gallery, Image,
    Team, Testimonial
)
import uuid


def seed_database():
    """Seed the database with sample data."""
    db = SessionLocal()
    
    try:
        print("🌱 Seeding database...")
        
        # Create admin user
        admin = User(
            email="admin@photostudio.com",
            password_hash=get_password_hash("admin123"),
            full_name="Admin User",
            phone="+1234567890",
            role=UserRole.ADMIN,
            is_active=True
        )
        db.add(admin)
        
        # Create photographer user
        photographer = User(
            email="photographer@photostudio.com",
            password_hash=get_password_hash("photo123"),
            full_name="John Photographer",
            phone="+1234567891",
            role=UserRole.PHOTOGRAPHER,
            is_active=True
        )
        db.add(photographer)
        
        # Create sample client
        client = User(
            email="client@example.com",
            password_hash=get_password_hash("client123"),
            full_name="Jane Client",
            phone="+1234567892",
            role=UserRole.CLIENT,
            is_active=True
        )
        db.add(client)
        
        db.commit()
        print("✅ Created users (admin, photographer, client)")
        
        # Create services
        services_data = [
            {
                "title": "Wedding Photography",
                "slug": "wedding-photography",
                "description": "Capture your special day with our professional wedding photography services. We'll be there from the ceremony to the reception, documenting every precious moment.",
                "price_cents": 150000,  # $1,500
                "duration_minutes": 480,  # 8 hours
                "features": ["Full day coverage", "2 photographers", "500+ edited photos", "Online gallery", "Print rights"]
            },
            {
                "title": "Pre-Wedding Shoot",
                "slug": "pre-wedding-shoot",
                "description": "Celebrate your love story with a romantic pre-wedding photoshoot. Choose your favorite locations and let us capture your chemistry.",
                "price_cents": 50000,  # $500
                "duration_minutes": 180,  # 3 hours
                "features": ["Location of choice", "100+ edited photos", "Outfit changes", "Online gallery"]
            },
            {
                "title": "Birthday Party",
                "slug": "birthday-party",
                "description": "Make birthday memories last forever with our fun and creative birthday photography packages.",
                "price_cents": 30000,  # $300
                "duration_minutes": 120,  # 2 hours
                "features": ["2 hour coverage", "50+ edited photos", "Candid moments", "Digital delivery"]
            },
            {
                "title": "Corporate Events",
                "slug": "corporate-events",
                "description": "Professional photography for your corporate events, conferences, and business gatherings.",
                "price_cents": 80000,  # $800
                "duration_minutes": 240,  # 4 hours
                "features": ["Event coverage", "Professional editing", "Same-day preview", "High-resolution files"]
            }
        ]
        
        services = []
        for service_data in services_data:
            service = Service(**service_data)
            db.add(service)
            services.append(service)
        
        db.commit()
        print("✅ Created services")
        
        # Create packages for wedding service
        wedding_service = services[0]
        packages_data = [
            {
                "service_id": wedding_service.id,
                "title": "Basic Package",
                "price_cents": 150000,
                "details": "8 hours coverage, 1 photographer, 300 edited photos"
            },
            {
                "service_id": wedding_service.id,
                "title": "Premium Package",
                "price_cents": 250000,
                "details": "Full day coverage, 2 photographers, 500 edited photos, album included"
            },
            {
                "service_id": wedding_service.id,
                "title": "Luxury Package",
                "price_cents": 400000,
                "details": "2 day coverage, 3 photographers, unlimited photos, album + prints"
            }
        ]
        
        for package_data in packages_data:
            package = Package(**package_data)
            db.add(package)
        
        db.commit()
        print("✅ Created packages")
        
        # Create team members
        team_data = [
            {
                "name": "John Smith",
                "role": "Lead Photographer",
                "bio": "With over 10 years of experience, John specializes in wedding and portrait photography.",
                "contact_info": {"email": "john@photostudio.com", "phone": "+1234567890"}
            },
            {
                "name": "Sarah Johnson",
                "role": "Event Photographer",
                "bio": "Sarah brings creativity and energy to every event she shoots.",
                "contact_info": {"email": "sarah@photostudio.com", "phone": "+1234567891"}
            },
            {
                "name": "Mike Chen",
                "role": "Photo Editor",
                "bio": "Mike ensures every photo looks perfect with his expert editing skills.",
                "contact_info": {"email": "mike@photostudio.com"}
            }
        ]
        
        for team_member_data in team_data:
            team = Team(**team_member_data)
            db.add(team)
        
        db.commit()
        print("✅ Created team members")
        
        # Create galleries
        galleries_data = [
            {"title": "Wedding Gallery 2024", "category": "wedding", "description": "Beautiful wedding moments from 2024"},
            {"title": "Pre-Wedding Collection", "category": "pre-wedding", "description": "Romantic pre-wedding shoots"},
            {"title": "Birthday Celebrations", "category": "birthday", "description": "Fun birthday party moments"},
            {"title": "Corporate Events", "category": "events", "description": "Professional corporate photography"}
        ]
        
        for gallery_data in galleries_data:
            gallery = Gallery(**gallery_data)
            db.add(gallery)
        
        db.commit()
        print("✅ Created galleries")
        
        # Create sample testimonial
        testimonial = Testimonial(
            user_id=client.id,
            rating=5,
            message="Amazing service! The photographers were professional and the photos turned out beautiful. Highly recommended!",
            approved=True
        )
        db.add(testimonial)
        
        db.commit()
        print("✅ Created testimonial")
        
        print("\n🎉 Database seeded successfully!")
        print("\n📝 Login credentials:")
        print("Admin: admin@photostudio.com / admin123")
        print("Photographer: photographer@photostudio.com / photo123")
        print("Client: client@example.com / client123")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
