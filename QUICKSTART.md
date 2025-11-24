# PhotoStudio - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Start the Application

```bash
cd /home/vinayak/photostudio

# Using Docker (Recommended)
make build
make up

# Wait for services to start (about 30 seconds)
```

### Step 2: Initialize Database

```bash
# Run migrations
make migrate

# Seed with sample data
make seed
```

### Step 3: Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 🔑 Login Credentials

- **Admin**: admin@photostudio.com / admin123
- **Photographer**: photographer@photostudio.com / photo123
- **Client**: client@example.com / client123

## 📱 What You Can Do

### As a Client
1. Browse services and portfolio
2. Create bookings
3. View booking status
4. Submit testimonials

### As Admin
1. Manage services and packages
2. Approve/reject bookings
3. Upload gallery images
4. View statistics
5. Export bookings to CSV

## 🛠️ Development Commands

```bash
# View logs
make logs

# Stop services
make down

# Run tests
make test

# Clean up everything
make clean
```

## 📚 Documentation

- Full README: `/home/vinayak/photostudio/README.md`
- API Documentation: http://localhost:8000/docs
- Walkthrough: See artifacts

## 🎨 Features Implemented

### Backend (100% Complete)
✅ Authentication (JWT)
✅ User management
✅ Services CRUD
✅ Booking system
✅ Gallery & image upload
✅ Email notifications
✅ Admin dashboard
✅ CSV export
✅ Image processing
✅ Storage abstraction (local/S3)

### Frontend (Core Complete)
✅ React + Vite + Tailwind CSS
✅ Authentication flow
✅ Protected routes
✅ Responsive design
✅ Premium UI with animations
✅ Home page (fully designed)
✅ Login page (fully designed)
📝 Other pages (placeholders ready for implementation)

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Stop existing services
make down

# Or change ports in docker-compose.yml
```

### Database Connection Error
```bash
# Wait for PostgreSQL to be ready
docker-compose logs postgres

# Restart services
make down
make up
```

### Frontend Not Loading
```bash
# Check if backend is running
curl http://localhost:8000/api/health

# Rebuild frontend
cd frontend
npm install
npm run dev
```

## 📞 Support

For issues or questions, check:
1. README.md for detailed documentation
2. API docs at /docs for endpoint details
3. Walkthrough artifact for architecture overview

---

**Enjoy building with PhotoStudio! 📸**
