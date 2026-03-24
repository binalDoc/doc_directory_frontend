# DocDirectory — Doctor Directory & Admin Management System

> A full-stack healthcare platform to **discover and manage verified medical professionals** — built with a powerful admin panel for user lifecycle and verification management.

**Live Demo:** [https://doctordirectory.netlify.app/](https://doctordirectory.netlify.app/)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Database Design](#database-design)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Roles & Permissions](#roles--permissions)
- [API Highlights](#api-highlights)
- [AI Usage](#-ai-usage)

---

## Overview

**DocDirectory** is a production-ready web application designed to bridge patients, healthcare professionals, and pharmaceutical companies. The platform supports full doctor profile discovery with rich filtering, a role-based authentication system, and a dedicated admin panel for user management and doctor verification workflows.

---

## Features

### Public — Doctor Discovery
- Search doctors by **name**, **specialty**, **city**, or **state**
- View rich, detailed **doctor profile pages**
- Fully responsive UI optimized for mobile and desktop

### Authentication & Authorization
- Secure **JWT-based authentication**
- Role-based access control with three distinct roles:
  - `DOCTOR` — Healthcare professionals with profile pages
  - `PHARMA` — Pharmaceutical company representatives
  - `ADMIN` — Full platform management access

### Admin Panel
- **User Management** — Create, view, update, and delete users across all roles
- **Dynamic Role Forms** — Context-aware forms that adapt based on selected user role
- **Doctor Verification Workflow** — Structured status transitions: `PENDING → VERIFIED` or `PENDING → REJECTED`
- **Filtering & Search** — Filter doctors by verification status, specialty, and more
- **Profile Preview** — View full doctor profiles directly in a modal without leaving the panel

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React (Vite), Tailwind CSS, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL (hosted on [Neon](https://neon.tech)) |
| **Image Storage** | [Cloudinary](https://cloudinary.com) |
| **Frontend Hosting** | [Netlify](https://netlify.com) |
| **Backend Hosting** | [Render](https://render.com) |

---

## Architecture

```
┌─────────────────────────┐        ┌──────────────────────────┐
│      React Frontend     │◄──────►│     Express.js API       │
│   (Netlify / Vite)      │  HTTP  │       (Render)           │
└─────────────────────────┘        └────────────┬─────────────┘
                                                │
                              ┌─────────────────┼──────────────┐
                              │                 │              │
                    ┌─────────▼──────┐  ┌───────▼──────┐  ┌───▼────────┐
                    │  PostgreSQL DB  │  │  Cloudinary  │  │  JWT Auth  │
                    │  (Neon Cloud)  │  │  (Images)    │  │  Middleware│
                    └───────────────┘  └──────────────┘  └────────────┘
```

---

## Database Design

### Tables

| Table | Purpose |
|---|---|
| `users` | Core user data shared across all roles (email, password, role, etc.) |
| `doctor_profiles` | Doctor-specific fields — specialty, experience, license, verification status |
| `pharma_profiles` | Pharmaceutical company details and representative info |
| `profile_views` | Tracks which users viewed which doctor profiles (analytics) |

### Indexes

Optimized for fast lookups and filtered queries:

- `users.email` — unique index for auth lookups
- `doctor_profiles` — composite index on `state`, `city`, `specialty`, `experience`, `status`
- `profile_views` — indexed for aggregation and analytics queries

### Key Design Patterns

- **Role-based joins** — `users` table joins with the appropriate profile table based on role
- **Status-based verification** — Doctors go through a controlled `PENDING → VERIFIED / REJECTED` workflow
- **Pagination-ready** — All list endpoints are designed to support limit/offset pagination

---

## Getting Started

### Prerequisites

- Node.js `v18+`
- PostgreSQL database (or a [Neon](https://neon.tech) connection string)
- Cloudinary account for image storage

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/binalDoc/doc_directory_frontend
git clone https://github.com/binalDoc/doc_directory_backend
cd docDirectory

# 2. Install dependencies
npm install

# 3. Configure environment variables (see below)
Add .env to both folders

# 4. Start the development servers
# Terminal 1 — Backend
cd doc_directory_backend && npm run dev

# Terminal 2 — Frontend
cd doc_directory_frontend && npm run dev
```

---

## Environment Variables

### Backend — `/backend/.env`

```env
PORT=5000
DATABASE_URL=postgresql://user:password@host/dbname
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend — `/frontend/.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Project Structure

```
doc_directory_backend/
    ├── controllers/       # Route handler logic
    ├── middleware/        # Auth, role guards
    ├── models/            # DB queries & schema helpers
    ├── routes/            # Express route definitions
    ├── utils/             # Helpers (JWT, Cloudinary, etc.)
    ├── validators/        # Pyalod validation
    └── server.js


doc_directory_frontend/
    ├── src/
    │   ├── components/    # Reusable UI components
    │   ├── pages/         # Route-level page components
    │   ├── services/      # Axios API service layer
    │   └── context/       # Auth context & state
    └── vite.config.js
```

---

## Roles & Permissions

| Feature | DOCTOR | PHARMA | ADMIN |
|---|:---:|:---:|:---:|
| View doctor profiles | ✅ | ✅ | ✅ |
| Edit own profile | ✅ | ✅ | ✅ |
| Search & filter doctors | ✅ | ✅ | ✅ |
| Manage all users | ❌ | ❌ | ✅ |
| Verify / reject doctors | ❌ | ❌ | ✅ |
| View profile analytics | ❌ | ❌ | ✅ |

---

## API Highlights

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login & receive JWT |
| `GET` | `/api/doctors` | List / search doctors |
| `GET` | `/api/doctors/:id` | Get single doctor profile |
| `GET` | `/api/admin/users` | List all users |
| `POST` | `/api/admin/users` | Create a user |
| `PUT` | `/api/admin/users/:id` | Update user |
| `DELETE` | `/api/admin/users/:id` | Delete user |
| `PATCH` | `/api/admin/doctors/:id/status` | Update doctor verification status |
| `POST` | `/api/admin/doctors/bulk-upload` | Bulk import doctors via Excel file |
| `GET` | `/api/admin/profile-view-dashboard` | Full analytics dashboard summary |
| `GET` | `/api/admin/top-doctors` | Most viewed doctors (ranked) |
| `GET` | `/api/admin/recent-views` | Latest profile view activity log |
| `GET` | `/api/admin/views-by-date` | View counts grouped by date (trend) |
| `GET` | `/api/admin/doctor/:doctorId/views` | View count for a specific doctor |

## AI Usage

This project was built with assistance from **ChatGPT** and **Claude**. Here's how AI was used:

| Area | What AI Helped With |
|---|---|
| **UI/UX Design** | Component layout ideas, Tailwind class suggestions, responsive design patterns |
| **Syntax & Debugging** | JavaScript/React syntax guidance, fixing bugs, SQL query structure |
| **Cloudinary Integration** | Image upload setup, signed upload config, handling upload responses |
| **Bulk Upload Feature** | Excel file parsing logic, per-row error handling, API response structure |
| **Drag & Drop UI** | Drag-and-drop file zone implementation, file input reset bug fix |

> All AI-generated suggestions were reviewed, understood, and integrated manually. The architecture decisions, database design, and overall product direction were made independently.