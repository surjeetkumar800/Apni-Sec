🛡️ ApniSec – SDE Intern Assignment

A production-ready full-stack web application built as part of the ApniSec SDE Intern Assignment, with a strong focus on security, scalable backend architecture, and clean frontend implementation.

🚀 Live URLs

Frontend: https://apni-sec-2.onrender.com

Backend: https://apni-sec-backend.onrender.com

📂 GitHub Repository

https://github.com/surjeetkumar800/Apni-Sec

🧱 Tech Stack
Frontend

Next.js (App Router)

React 19

TypeScript

Tailwind CSS

SEO optimized pages

Backend

Node.js + Express

Strict OOP-based architecture

JWT Authentication

Rate Limiting

Email integration (Resend)

Database

MongoDB (Mongoose)
✔ Clean architecture
✔ Dependency Injection
✔ Scalable and maintainable codebase

🔐 Authentication & Security

JWT-based authentication

Password hashing with bcrypt

Protected routes via middleware

Custom rate limiting
100 requests / 15 minutes / IP

📌 Core APIs
Authentication

POST /api/auth/register

POST /api/auth/login

GET /api/auth/me

Issue Management

GET /api/issues

POST /api/issues

GET /api/issues/:id

PUT /api/issues/:id

DELETE /api/issues/:id

Supported Issue Types:

Cloud Security

Red Team Assessment

VAPT

✉️ Email Integration

Emails are sent using Resend API:

Welcome email

Issue creation notification

Profile update notification

🖥️ Frontend Pages

/ – Landing page

/login – Authentication

/register – User registration

/dashboard – Protected dashboard

/profile – Profile management

✔ Responsive UI
✔ Form validation
✔ Loading and error states

🔍 SEO & Performance

SEO-friendly meta tags

Semantic HTML

Optimized rendering

Lighthouse SEO score above average

📸 Screenshots
Dashboard
<img width="1808" height="929" alt="image" src="https://github.com/user-attachments/assets/4493ea86-4f45-4d44-b63b-3a04ed78f257" />

<img width="1919" height="954" alt="image" src="https://github.com/user-attachments/assets/96248a7f-4bbb-42e4-938d-334ea03e44f9" />


Landing page

Login / Register page

Dashboard

Issue creation page

Example:

screenshots/
 ├── landing.png
 ├── login.png
 ├── dashboard.png


Then embed:

![Dashboard](screenshots/dashboard.png)

⚙️ Environment Variables
PORT=5000
MONGO_URI=
JWT_SECRET=
RESEND_API_KEY=

🛠️ Local Setup
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

Frontend: Render / Vercel

Backend: Render

Database: MongoDB Atlas

🧠 Key Learnings

Designing scalable OOP-based backend systems

Implementing secure authentication & rate limiting

Handling full production deployment

Building SEO-friendly Next.js applications
