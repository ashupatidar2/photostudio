from typing import List, TypeVar, Generic
from sqlalchemy.orm import Query
from ..schemas.response import PaginatedResponse
import math

T = TypeVar('T')


def paginate(
    query: Query,
    page: int = 1,
    per_page: int = 12,
    max_per_page: int = 100
) -> dict:
    """
    Paginate a SQLAlchemy query.
    
    Args:
        query: SQLAlchemy query object
        page: Page number (1-indexed)
        per_page: Items per page
        max_per_page: Maximum items per page
    
    Returns:
        Dictionary with pagination metadata and items
    """
    # Validate and limit per_page
    per_page = min(per_page, max_per_page)
    
    # Get total count
    total = query.count()
    
    # Calculate pagination metadata
    total_pages = math.ceil(total / per_page) if total > 0 else 1
    has_next = page < total_pages
    has_prev = page > 1
    
    # Get items for current page
    offset = (page - 1) * per_page
    items = query.offset(offset).limit(per_page).all()
    
    return {
        "items": items,
        "total": total,
        "page": page,
        "per_page": per_page,
        "total_pages": total_pages,
        "has_next": has_next,
        "has_prev": has_prev
    }


def create_paginated_response(
    items: List[T],
    total: int,
    page: int,
    per_page: int
) -> dict:
    """
    Create a paginated response dictionary.
    
    Args:
        items: List of items for current page
        total: Total number of items
        page: Current page number
        per_page: Items per page
    
    Returns:
        Dictionary with pagination metadata
    """
    total_pages = math.ceil(total / per_page) if total > 0 else 1
    
    return {
        "items": items,
        "total": total,
        "page": page,
        "per_page": per_page,
        "total_pages": total_pages,
        "has_next": page < total_pages,
        "has_prev": page > 1
    }
