# DocDirectory — Doctor Directory & Admin Management System

A full-stack healthcare platform to **discover and manage verified medical professionals** — built with a powerful admin panel for user lifecycle and verification management.

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

**DocDirectory** is a production-ready web application designed to bridge patients, healthcare professionals, and pharmaceutical companies. The platform supports full doctor profile discovery with rich filtering, a role-based authentication system, and a dedicated admin panel for user management, doctor verification workflows, and analytics.

---

## Features

### Guest Access — Doctor Discovery
- Doctor Directory is fully accessible to **anyone without registration or login**
- Guests can search and filter doctors by name, specialty, city, state, and country
- No role or account needed to browse verified medical professionals

### Authentication & Authorization
- Secure **JWT-based authentication**
- Role-based access control with three distinct roles:
  - `DOCTOR` — Healthcare professionals with profile pages
  - `PHARMA` — Pharmaceutical company representatives
  - `ADMIN` — Full platform management access

### Doctor Profile & Verification
- **NMC Auto-Verification** — Triggered automatically on every doctor profile update (by doctor or admin); uses registration number, name, state medical council, and registration year to uniquely identify the doctor
- **Two-Step Verification Workflow:**
  - Step 1: NMC API sets an `nmc_verified` flag on every profile update
  - Step 2: Admin can only approve or reject a doctor after NMC verification passes — doctors with a pending NMC status are blocked from admin approval
  - Final `VERIFIED` status is only granted after both the NMC check passes and admin explicitly approves
- **Profile Completion Bar** — Visual indicator of how complete a doctor's profile is.

### Platform Globalization
- **Country / State / City fields** on all user profiles, powered by the `country-state-city` npm package
- Location fields integrated across registration, profile edit, and admin user create/edit forms
- Seeded location data stored in the database for consistent, validated options

### Admin Panel
- **User Management** — Create, view, update, and delete users across all roles
- **Dynamic Role Forms** — Context-aware forms that adapt based on selected user role
- **Doctor Verification Workflow** — Structured status transitions: `PENDING → VERIFIED` or `PENDING → REJECTED`
- **Manual NMC Verify Button** — Admins can manually re-trigger NMC verification for a doctor directly from the doctor list, handling cases where auto-verification failed due to NMC site downtime
- **NMC Status Sort/Filter** — Admin doctor list can be sorted and filtered by NMC verification status to surface unverified doctors at a glance
- **Bulk Doctor Upload** — Import doctors via Excel file with per-row field and value validation, geography resolution (country name → ID), and specialty list validation
- **NMC Doctor Import** — Fetch and import doctor records directly from the NMC site by registration year, with a one-request-per-day rate limit and DB-tracked offsets to skip already-imported records on subsequent runs
- **Filtering & Search** — Filter doctors by verification status, specialty, location, and more
- **Profile Preview** — View full doctor profiles directly in a modal without leaving the panel

### Analytics (Admin)
- **Profile Views Dashboard** — Most viewed doctors, viewer activity log, and view trends over time
- **Search Analytics Dashboard** — Tracks and visualizes what users are searching for across the platform

### Performance
- **Redis Cache** — Doctor list endpoint is cached via Redis to reduce DB load on repeated queries

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React (Vite), Tailwind CSS, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL (hosted on [Neon](https://neon.tech)) |
| **Cache** | Redis |
| **Image Storage** | [Cloudinary](https://cloudinary.com) |
| **Location Data** | [`country-state-city`](https://www.npmjs.com/package/country-state-city) npm package |
| **NMC Verification** | National Medical Commission (NMC) API |
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
                ┌───────────────────────────────┼───────────────────────┐
                │                               │                       │
      ┌─────────▼──────┐             ┌──────────▼──────┐     ┌─────────▼──────┐
      │  PostgreSQL DB  │             │   NMC API        │     │   Cloudinary   │
      │  (Neon Cloud)  │             │ (Verification +  │     │   (Images)     │
      └────────┬───────┘             │  Doctor Import)  │     └────────────────┘
               │                     └─────────────────┘
      ┌────────▼───────┐
      │  Redis Cache   │
      │ (Doctor List)  │
      └────────────────┘
```

---

## Database Design

### Tables

| Table | Purpose |
|---|---|
| `users` | Core user data shared across all roles (email, password, role, country, state, city, etc.) |
| `doctor_profiles` | Doctor-specific fields — specialty, experience, license, NMC verification status |
| `pharma_profiles` | Pharmaceutical company details and representative info |
| `profile_views` | Tracks which users viewed which doctor profiles (analytics) |
| `search_analytics` | Logs search queries and filters used across the platform |
| `countries` | Seeded country data (name, code, dial code) |
| `states` | Seeded state data, linked to countries |
| `cities` | Seeded city data, linked to states |
| `nmc_import_log` | Tracks NMC import requests per year — stores last offset and request date to enforce rate limiting and avoid duplicate imports |

### Indexes

Optimized for fast lookups and filtered queries:

- `users.email` — unique index for auth lookups
- `doctor_profiles` — composite index on `state`, `city`, `specialty`, `experience`, `status`; partial indexes on `status = 'PENDING'` and `status = 'VERIFIED'`
- `profile_views` — indexed for aggregation and analytics queries
- `search_analytics` — indexed on `specialty`, `searched_at DESC`, `user_id`, and composite indexes for trend queries
- `countries`, `states`, `cities` — indexed on foreign keys for fast cascading lookups

### Key Design Patterns

- **Role-based joins** — `users` table joins with the appropriate profile table based on role
- **Two-step verification** — `nmc_verified` flag gates admin approval; final `VERIFIED` status requires both NMC pass and admin action
- **Validated dropdowns** — Specialty values and location fields are constrained to predefined, validated options
- **Pagination-ready** — All list endpoints support limit/offset pagination
- **Redis-backed caching** — Doctor list responses are cached to reduce repeated DB hits
- **Rate-limited NMC import** — One import request per day per year, with offset tracking for incremental fetches

---

## Getting Started

### Prerequisites

- Node.js `v18+`
- PostgreSQL database (or a [Neon](https://neon.tech) connection string)
- Cloudinary account for image storage
- Redis instance (local or hosted)

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
NMC_DOCTOR_VERIFICATION_API=
REDIS_PASSWORD=
REDIS_HOST=
REDIS_PORT=
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
    ├── utils/             # Helpers (JWT, Cloudinary, NMC verification, Redis, etc.)
    ├── validators/        # Payload validation
    ├── configs/           # Env variables, Cloudinary, Express, Multer, Redis configs
    └── index.js            

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

| Feature | GUEST | DOCTOR | PHARMA | ADMIN |
|---|:---:|:---:|:---:|:---:|
| Search & filter doctors | ✅ | ✅ | ✅ | ✅ |
| View doctor profiles | ✅ | ✅ | ✅ | ✅ |
| Edit own profile | ❌ | ✅ | ✅ | ❌ |
| Export doctors list | ❌ | ❌ | ✅ | ✅ |
| Manage all users | ❌ | ❌ | ❌ | ✅ |
| Verify / reject doctors | ❌ | ❌ | ❌ | ✅ |
| Trigger NMC verification | ❌ | ❌ | ❌ | ✅ |
| Import doctors from NMC | ❌ | ❌ | ❌ | ✅ |
| Bulk upload doctors | ❌ | ❌ | ❌ | ✅ |
| View profile analytics | ❌ | ❌ | ❌ | ✅ |
| View search analytics | ❌ | ❌ | ❌ | ✅ |

---

## API Highlights

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login & receive JWT |
| `GET` | `/api/doctors/list` | List / search doctors (public, cached via Redis) |
| `GET` | `/api/doctors/:id` | Get single doctor profile |
| `GET` | `/api/admin/users` | List all users |
| `POST` | `/api/admin/users` | Create a user |
| `PUT` | `/api/admin/users/:id` | Update user |
| `DELETE` | `/api/admin/users/:id` | Delete user |
| `PATCH` | `/api/admin/doctors/:id/status` | Update doctor verification status |
| `POST` | `/api/admin/doctors/:id/nmc-verify` | Manually trigger NMC verification for a doctor |
| `POST` | `/api/admin/doctors/bulk-upload` | Bulk import doctors via Excel file |
| `POST` | `/api/admin/doctors/nmc-import` | Import doctors from NMC site by registration year |
| `GET` | `/api/admin/profile-view-dashboard` | Full profile analytics dashboard summary |
| `GET` | `/api/admin/top-doctors` | Most viewed doctors (ranked) |
| `GET` | `/api/admin/recent-views` | Latest profile view activity log |
| `GET` | `/api/admin/views-by-date` | View counts grouped by date (trend) |
| `GET` | `/api/admin/doctor/:doctorId/views` | View count for a specific doctor |
| `POST` | `/api/analytics/search` | Log a search query event |
| `GET` | `/api/admin/search-analytics` | Search analytics dashboard summary |
| `GET` | `/api/admin/search-analytics/trends` | Search query trends over time |
| `GET` | `/api/location/countries` | List all countries |
| `GET` | `/api/location/states/:countryCode` | List states for a country |
| `GET` | `/api/location/cities/:stateCode` | List cities for a state |

---

## AI Usage

This project was built with assistance from **ChatGPT** and **Claude**. Here's how AI was used:

| Area | What AI Helped With |
|---|---|
| **UI/UX Design** | Component layout ideas, Tailwind class suggestions, responsive design patterns |
| **Syntax & Debugging** | JavaScript/React syntax guidance, fixing bugs, SQL query structure |
| **Cloudinary Integration** | Image upload setup, signed upload config, handling upload responses |
| **Bulk Upload Feature** | Excel parsing, per-row error handling, geography resolution, specialty validation |
| **Drag & Drop UI** | Drag-and-drop file zone implementation, file input reset bug fix |
| **NMC Doctor Import** | Rate limiting strategy, offset tracking for incremental imports |
| **Search Analytics** | Aggregation queries, dashboard data shaping, time-series indexing |

> All AI-generated suggestions were reviewed, understood, and integrated manually. The architecture decisions, database design, and overall product direction were made independently.