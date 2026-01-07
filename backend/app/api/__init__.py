from .auth import router as auth_router
from .contacts import router as contacts_router
from .inquiries import router as inquiries_router

__all__ = ["auth_router", "contacts_router", "inquiries_router"]
