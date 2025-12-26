# 🛡️ ApniSec – SDE Intern Assignment

A full-stack, production-ready **Next.js application** built for the **ApniSec SDE Intern Assignment**, focusing on **security**, **OOP-based backend architecture**, **custom authentication**, **rate limiting**, **email integration**, and **SEO optimization**.

---

## 🚀 Live Demo

- **Frontend (Vercel):** https://your-frontend-url.vercel.app  
- **Backend (Render):** https://your-backend-url.onrender.com  

---

## 📂 GitHub Repository

https://github.com/surjeetkumar800/Apni-Sec

---

## 🧱 Tech Stack

### Frontend
- Next.js 15+ (App Router)
- React 19
- TypeScript
- Tailwind CSS
- SEO Optimized (80%+ Lighthouse score)

### Backend
- Next.js API Routes / Route Handlers
- **Strict Object-Oriented Programming (OOP)**
- JWT-based Custom Authentication
- Custom Rate Limiting
- Resend Email Service

### Database
- MongoDB (Mongoose ORM)

---

## 🏗️ Backend Architecture (OOP – Mandatory)

All backend logic follows **class-based architecture** with proper separation of concerns.


backend/
├── server/
│ ├── controllers/ // Request handlers (classes)
│ ├── services/ // Business logic (classes)
│ ├── repositories/ // Data access layer (classes)
│ ├── validators/ // Input validation (classes)
│ ├── middlewares/ // Auth & rate limiting
│ ├── models/ // Database schemas
│ ├── errors/ // Custom error classes
│ ├── utils/ // Helper utilities
│ └── index.ts // App entry point


✔ No functional business logic  
✔ Dependency Injection  
✔ Reusable and scalable design  

---

## 🔐 Authentication System

- Custom JWT-based authentication
- Password hashing using bcrypt
- Protected routes with middleware
- Secure session handling

### Auth APIs


POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me


---

## 📌 Core APIs

### 👤 User Profile


GET /api/users/profile
PUT /api/users/profile


### 🐞 Issue Management (Required)


GET /api/issues
POST /api/issues
GET /api/issues/[id]
PUT /api/issues/[id]
DELETE /api/issues/[id]


**Issue Types**
- Cloud Security
- Red Team Assessment
- VAPT

Features:
- Create, update, delete issues
- Filter by issue type
- Protected APIs

---

## 🚦 Rate Limiting

- Custom **RateLimiter class**
- Limit: **100 requests / 15 minutes / IP**
- Applied across all APIs
- Returns proper HTTP headers
- Responds with **429 Too Many Requests** on limit breach

---

## ✉️ Email Integration (Resend)

Emails sent using **Resend API**:
- Welcome email on registration
- Issue creation notification
- Profile update notification
- Password reset email (if enabled)

HTML-based email templates used.

---

## 🖥️ Frontend Pages

- `/` – ApniSec themed landing page
- `/login` – Login page
- `/register` – Register page
- `/dashboard` – Protected dashboard
- `/profile` – User profile management

✔ Responsive UI  
✔ Form validation  
✔ Loading & error states  

---

## 🔍 SEO Optimization

- SEO friendly meta tags
- Semantic HTML
- Lighthouse SEO score **80%+**
- Performance optimized

---

## ⚙️ Environment Variables

Create `.env.example`:

```env
PORT=5000
MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=7d
RESEND_API_KEY=

🛠️ Local Setup
# Clone repository
git clone https://github.com/surjeetkumar800/Apni-Sec.git

# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev

📦 Deployment

Frontend deployed on Vercel

Backend deployed on Render

Database hosted on MongoDB Atlas

Environment variables configured via hosting platforms.

🧠 Challenges & Learnings

Implementing a fully OOP-based backend in Next.js

Designing reusable rate limiting logic

Managing TypeScript with Mongoose

Production-ready deployment setup
