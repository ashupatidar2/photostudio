.PHONY: help build up down logs migrate seed test clean

help:
	@echo "PhotoStudio - Available commands:"
	@echo "  make build    - Build Docker containers"
	@echo "  make up       - Start all services"
	@echo "  make down     - Stop all services"
	@echo "  make logs     - View logs"
	@echo "  make migrate  - Run database migrations"
	@echo "  make seed     - Seed database with sample data"
	@echo "  make test     - Run tests"
	@echo "  make clean    - Clean up containers and volumes"

build:
	docker-compose build

up:
	docker-compose up -d
	@echo "Services started!"
	@echo "Backend API: http://localhost:8000"
	@echo "API Docs: http://localhost:8000/docs"
	@echo "Frontend: http://localhost:5173"

down:
	docker-compose down

logs:
	docker-compose logs -f

migrate:
	docker-compose exec backend alembic upgrade head

seed:
	docker-compose exec backend python seed.py

test:
	docker-compose exec backend pytest tests/ -v

clean:
	docker-compose down -v
	@echo "Cleaned up containers and volumes"

# Local development commands (without Docker)
install-backend:
	cd backend && pip install -r requirements.txt

install-frontend:
	cd frontend && npm install

run-backend:
	cd backend && uvicorn app.main:app --reload

run-frontend:
	cd frontend && npm run dev
