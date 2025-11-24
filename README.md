# PhotoStudio - Full-Stack Photography Studio Management Application

A comprehensive web application for managing a photography studio with booking system, gallery management, admin dashboard, and client portal.

## 🚀 Features

### Public Features
- **Home Page**: Hero section, services preview, features showcase
- **Services**: Browse photography services with packages and pricing
- **Portfolio**: Gallery with category filters (wedding, pre-wedding, birthday, events)
- **About**: Team members and studio information
- **Contact**: Contact form and studio details
- **Authentication**: User registration and login

### Client Features
- **Dashboard**: View bookings and profile
- **Booking System**: Multi-step booking flow with service selection, date/time picker, and reference image upload
- **Booking Management**: View booking status, details, and history
- **Testimonials**: Submit reviews (requires admin approval)

### Admin Features
- **Dashboard**: Statistics, revenue, bookings overview
- **Service Management**: CRUD operations for services and packages
- **Booking Management**: View, approve, reject, and manage all bookings
- **Gallery Management**: Upload images with bulk upload, automatic thumbnail generation
- **User Management**: Manage users and roles
- **Export**: Export bookings to CSV

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Migrations**: Alembic
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Image Processing**: Pillow
- **Email**: SMTP (aiosmtplib)
- **Storage**: Local filesystem / S3-compatible
- **Testing**: pytest

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

### DevOps
- **Containerization**: Docker & Docker Compose
- **Web Server**: Uvicorn (backend), Nginx (frontend production)

## 📋 Prerequisites

- Docker & Docker Compose (recommended)
- OR:
  - Python 3.11+
  - Node.js 18+
  - PostgreSQL 15+

## 🚀 Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd photostudio
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Build and start services**
   ```bash
   make build
   make up
   ```

4. **Run database migrations**
   ```bash
   make migrate
   ```

5. **Seed database with sample data**
   ```bash
   make seed
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## 🔧 Local Development (Without Docker)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up PostgreSQL database**
   ```bash
   createdb photostudio
   ```

5. **Create .env file**
   ```bash
   cp ../.env.example .env
   # Edit .env with your database credentials
   ```

6. **Run migrations**
   ```bash
   alembic upgrade head
   ```

7. **Seed database**
   ```bash
   python seed.py
   ```

8. **Start development server**
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 📝 Environment Variables

### Backend (.env)

```env
# Database
DATABASE_URL=postgresql://photostudio:photostudio@localhost:5432/photostudio

# JWT
SECRET_KEY=your-secret-key-here
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7

# CORS
CORS_ORIGINS=["http://localhost:3000","http://localhost:5173"]

# Storage
STORAGE_TYPE=local  # or 's3'
UPLOAD_DIR=uploads

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8000
```

## 👥 Default Users

After running the seed script, you can login with:

- **Admin**: admin@photostudio.com / admin123
- **Photographer**: photographer@photostudio.com / photo123
- **Client**: client@example.com / client123

## 📚 API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🗂️ Project Structure

```
photostudio/
├── backend/
│   ├── alembic/              # Database migrations
│   ├── app/
│   │   ├── api/              # API routes
│   │   ├── core/             # Config, security, database
│   │   ├── models/           # SQLAlchemy models
│   │   ├── schemas/          # Pydantic schemas
│   │   ├── services/         # Business logic
│   │   ├── utils/            # Utilities
│   │   └── main.py           # FastAPI app
│   ├── tests/                # Backend tests
│   ├── uploads/              # File uploads (local)
│   ├── Dockerfile
│   ├── requirements.txt
│   └── seed.py               # Database seeder
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── contexts/         # React contexts
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── Makefile
└── README.md
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest tests/ -v --cov=app
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## 📦 Building for Production

### Using Docker
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Build

**Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve the dist/ directory with nginx or any static server
```

## 🔒 Security Features

- JWT-based authentication with access and refresh tokens
- Password hashing with bcrypt
- Role-based access control (client, photographer, admin)
- CORS configuration
- SQL injection prevention (parameterized queries)
- File upload validation
- Rate limiting on API endpoints

## 📸 Image Processing

- Automatic thumbnail generation (300px, 800px, 1200px)
- EXIF data stripping for privacy
- Support for JPEG, PNG, WebP formats
- Optional WebP conversion
- Maximum file size: 10MB

## 📧 Email Notifications

- Booking confirmation emails
- Booking status update emails
- Welcome emails for new users
- HTML email templates

## 🎨 Design Features

- Responsive design (mobile, tablet, desktop)
- Glassmorphism effects
- Smooth animations with Framer Motion
- Premium gradient color schemes
- Custom Tailwind CSS components
- Dark mode support (planned)

## 🚀 Deployment

### Recommended Platforms
- **Backend**: Railway, Render, Fly.io, AWS EC2
- **Database**: Railway PostgreSQL, AWS RDS, DigitalOcean Managed Database
- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Storage**: AWS S3, DigitalOcean Spaces, Cloudflare R2

### Environment Setup
1. Set up PostgreSQL database
2. Configure environment variables
3. Run migrations
4. Seed database (optional)
5. Deploy backend and frontend
6. Configure DNS and SSL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 💬 Support

For support, email support@photostudio.com or open an issue in the repository.

## 🙏 Acknowledgments

- FastAPI for the amazing Python web framework
- React team for the powerful UI library
- Tailwind CSS for the utility-first CSS framework
- All open-source contributors

---

**Built with ❤️ for photographers and their clients**
