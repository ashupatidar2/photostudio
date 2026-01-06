# PhotoStudio - Quick Start Guide 📸 ✨

Welcome to the **Ashu Patidar Photography** project (PhotoStudio). This guide will help you get the application running locally in minutes.

## 🚀 Get Started in 3 Steps

### Step 1: Clone & Setup Environment
```bash
git clone <repository-url>
cd photostudio

# Windows PowerShell
cp .env.example .env
```

### Step 2: Start Backend & Services
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```
*Note: Ensure your PostgreSQL database is running and matching the credentials in `.env`.*

### Step 3: Start Frontend
```bash
cd ../frontend
npm install
npm run dev
```

## 🔑 Login Credentials
*Once you run the seed script or use the default database:*
- **Admin**: `admin@photostudio.com` / `admin123`
- **Photographer**: `photographer@photostudio.com` / `photo123`
- **Client**: `client@example.com` / `client123`

## 🎨 Luxury Features Overview
- **Cinematic Experience**: Implemented Smooth Scroll (Lenis) and parallax effects.
- **Editorial Design**: Custom typography (Cormorant Garamond) and masonry gallery layouts.
- **Functional Booking**: Redesigned Step-by-Step booking form with GSAP animations.

## 🛠️ Essential Commands
| Command | Action |
| :--- | :--- |
| `npm run dev` | Start Frontend Dev Server |
| `uvicorn app.main:app --reload` | Start Backend API |
| `python seed.py` | Populate Database with Sample Luxury Data |

---
**Enjoy the cinematic excellence! 🎞️✨**
