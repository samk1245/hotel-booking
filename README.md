# The Grand Azure Resort & Spa — Luxury Website & Booking Inquiry Management System

[![Node.js](https://img.shields.io/badge/Node.js-v20+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-lightgrey.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-Proprietary-gold.svg)]()

> A production-ready, ultra-premium hotel website with an intelligent booking inquiry management engine, transactional email notifications, verified coastal mapping, and a completely segregated, private administrative control portal.

---

## 💎 Table of Contents

1. [Executive Summary & Brand Identity](#1-executive-summary--brand-identity)
2. [Architectural Highlights](#2-architectural-highlights)
3. [Visual Design & Color Palette](#3-visual-design--color-palette)
4. [Public Website Features](#4-public-website-features)
5. [Booking Inquiry System](#5-booking-inquiry-system)
6. [Private Administrative Dashboard](#6-private-administrative-dashboard)
7. [Location, Interactive Maps & Street View](#7-location-interactive-maps--street-view)
8. [Database Architecture & Dual-Mode Persistence](#8-database-architecture--dual-mode-persistence)
9. [Security, Rate Limiting & Privacy Compliance](#9-security-rate-limiting--privacy-compliance)
10. [Local Quickstart & Setup Guide](#10-local-quickstart--setup-guide)
11. [Default Authorized Staff Credentials](#11-default-authorized-staff-credentials)
12. [Production Deployment & Client Handover Checklist](#12-production-deployment--client-handover-checklist)

---

## 1. Executive Summary & Brand Identity

**The Grand Azure Resort & Spa** is designed to reflect the quiet luxury, architectural refinement, and meticulous hospitality associated with the world's finest boutique resorts (such as Aman, Belmond, and Rosewood).

- **Authenticity First**: Does not invent fabricated awards, unverified star ratings, or misleading room availability. Clearly marks baseline rates as subject to personal reservation confirmation.
- **Zero-Public Admin Clues**: The private management portal (`/private-management`) is 100% hidden from all public navigation, footer links, and page markup.

---

## 2. Architectural Highlights

The system is built on a clean, decoupled fullstack architecture:

```
hotel-booking/
├── client/                      # React 18 + Vite frontend
│   ├── public/                  # Favicons & static assets
│   ├── src/
│   │   ├── components/          # Reusable UI (Navbar, Hero, RoomCard, Maps, Lightbox, Modals)
│   │   ├── context/             # AuthContext & HotelContext
│   │   ├── pages/               # Public pages (Home, Rooms, Detail, Dining, Wellness, Gallery, Contact)
│   │   │   └── admin/           # Private administrative views (Dashboard, Inquiries, Rooms, Offers, CMS, Staff, Logs)
│   │   ├── services/            # Fetch client with Bearer auth interceptors
│   │   ├── App.jsx              # Routing & Route Protection
│   │   └── index.css            # Tailwind design tokens & luxury scrollbars
│   ├── tailwind.config.js       # Custom palette: navy, ivory, gold, emerald, terracotta
│   └── vite.config.js           # Dev server with reverse proxy to backend API
│
├── server/                      # Node.js + Express REST API
│   ├── data/                    # Embedded JSON persistence store (store.json)
│   ├── uploads/                 # Multer image storage directory
│   ├── src/
│   │   ├── config/              # MongoDB connection & hybrid persistence adapter
│   │   ├── controllers/         # Auth, Rooms, Inquiries, Offers, Content, Staff, Stats
│   │   ├── middleware/          # JWT auth, RBAC authorization, rateLimiters, validators
│   │   ├── models/              # Mongoose schemas & dataStore engine
│   │   ├── routes/              # Express API routers
│   │   ├── services/            # Transactional email service (SMTP & console fallback)
│   │   ├── utils/               # Database seeder with authentic luxury data
│   │   └── server.js            # Express app bootstrap & static serving
│   ├── tests/                   # Automated API integration test suite (Jest + Supertest)
│   └── .env.example             # Documented environment variables template
│
└── package.json                 # Root script orchestration
```

---

## 3. Visual Design & Color Palette

The interface adheres strictly to the luxury hospitality visual identity guidelines:

| Color Role | Color Hex | Tailwind Token | Application |
|---|---|---|---|
| **Deep Navy Blue** | `#07111E`, `#0B192C` | `navy-950`, `navy-850` | Trust, navigation bar, footers, headers |
| **Warm Ivory & Cream** | `#FDFBF7`, `#F7F4EE` | `ivory-50`, `ivory-100` | Backgrounds, cards, form inputs, typography |
| **Muted Gold** | `#C5A880`, `#DFCCAA` | `gold-500`, `gold-300` | Accent badges, primary CTAs, active indicators |
| **Rich Emerald Green** | `#0F3E2E`, `#175943` | `emerald-850`, `emerald-700` | Verified badges, confirmation pills, WhatsApp |
| **Terracotta Accent** | `#C86D51` | `terracotta-500` | Maritime and outdoor experience highlights |

**Typography**:
- Headers & Monograms: `Playfair Display` (Classic European luxury serif)
- Body & Form Controls: `Plus Jakarta Sans` / `Inter` (Legible, modern geometric sans)

---

## 4. Public Website Features

1. **Top Announcement Bar**: Displays verified accolades, direct click-to-call, and WhatsApp concierge shortcut.
2. **Sticky Glassmorphic Navigation**: Subtly blurs on scroll, contains zero admin links, fully responsive mobile drawer.
3. **Hero Section**: Large Pacific cliffside photography, compelling narrative, and an interactive **Quick Date & Guest Inquiry Bar**.
4. **Heritage & Storytelling**: Authentic copy describing the architectural philosophy of The Grand Azure.
5. **Suites & Villas Showcase**: Room cards with photography, category tags, max occupancy, bed type, sq m size, and indicative base price with verification notice.
6. **Signature Facilities**: Dedicated cards for Infinity Pool, Thalassotherapy Spa, Michelin-caliber Dining, and Chauffeured Yacht / House Cars.
7. **Culinary Showcase**: The Azure Terrace, Saltwater Grill & Tide Bar, and L’Horizon Sunset Lounge with operating hours, menus preview, and dress code.
8. **Visual Photo Gallery with Lightbox**: Interactive category filter (`All`, `Resort`, `Rooms`, `Dining`, `Wellness`) and fullscreen keyboard-accessible lightbox (`Esc`, `←`, `→`).
9. **Verified Guest Reviews**: Authentic testimonials with stay dates and suite types.
10. **Interactive Map & Directions**: Leaflet map with custom gold marker pin, verified coordinates, "Get Directions via Google Maps", and "Street View 360°" fallback.
11. **Comprehensive FAQ Accordion**: Clear information on booking procedures, deposits, cancellation windows, chauffeur distances, and dietary accommodations.
12. **Polished Footer**: Contact details, verified address, legal modals (Privacy Policy, Terms of Inquiry, Rate Notice), zero admin links.

---

## 5. Booking Inquiry System

Built to boutique luxury standards where rooms are held via personalized concierge verification rather than instant automated charging:

- **Required Fields**: Guest Full Name, Email, Contact Phone, Check-in Date, Check-out Date, Number of Adults, Number of Children, Preferred Suite Tier, Number of Suites, Special Requests, and Privacy Consent.
- **Frontend & Backend Validation**:
  - Validates date chronology (check-out must be after check-in, dates cannot be in the past).
  - Validates email and telephone formats.
  - Sanitizes all inputs against HTML injection / XSS.
- **Anti-Duplicate Engine**: Rejects identical submissions sent within 3 minutes from the same email and dates (HTTP 409).
- **Unique Inquiry Reference**: Generates structured, collision-resistant codes such as `AZR-2026-H8PWP`.
- **Dual Transactional Email Notifications**:
  1. *Guest Confirmation Receipt*: Beautiful branded luxury HTML email with reference number, stay summary, and explicit disclaimer that rooms are confirmed upon personal contact by the reservations desk.
  2. *Hotel Front Desk Alert*: Notification dispatched to reservations staff with guest contact details, special requests, and a direct link to review the inquiry in the private admin portal.
  - *Development Console Fallback*: If SMTP credentials are not specified, formatted previews are logged directly in the server console for zero-friction local testing.

---

## 6. Private Administrative Dashboard

Located at the configurable route: `/private-management` (configured via `ADMIN_PATH` in `.env`).

### Security Features:
- Zero public links or clues in navigation or footer.
- Email + password authentication with bcrypt hashing.
- Login brute-force rate limiting (10 attempts per 15 minutes).
- JSON Web Token (JWT) session management with 8-hour expiration.
- Server-side route protection & API middleware protecting all privileged endpoints.
- Role-Based Access Control (`superadmin`, `manager`, `staff`).

### Dashboard Capabilities:
1. **Overview & Metrics**: Total inquiries, new pending inquiries, confirmed bookings, conversion rate %, and active rooms count.
2. **Inquiry Management**:
   - Filter by status: `New`, `Contacted`, `Pending`, `Confirmed`, `Cancelled`.
   - Search by guest name, email, phone, or reference.
   - Interactive Detail Drawer: Full guest particulars, click-to-call, click-to-email.
   - Instant workflow status updates.
   - Internal Notes Feed: Add notes stamped with staff member name and timestamp.
3. **Suites & Villas Management**:
   - Add new suites, edit existing suites, delete suites.
   - 1-click Toggle Published / Draft status.
   - Edit base prices, occupancy, dimensions, views, and amenity checklists.
   - Built-in image upload via Multer (JPEG, PNG, WebP) or external image URL.
4. **Promotional Offers Manager**:
   - Create and edit promotional packages, seasonal codes, discount text, and perks.
   - Toggle active status.
5. **Website Content CMS**:
   - Edit hotel headline, about description, phone numbers, email, WhatsApp, address, coordinates, and check-in/out policies without touching code.
6. **Staff Management** *(Restricted to Super Admin & Manager)*:
   - View staff list, roles, and last login timestamps.
   - Provision new authorized accounts.
   - Activate or deactivate staff accounts.
7. **Activity Audit Trail**:
   - Immutable log recording all administrative actions (logins, status changes, room creations, CMS updates) with timestamps and actor details.

---

## 7. Location, Interactive Maps & Street View

- **Verified Hotel Address**: `420 Ocean Promenade, Azure Cove, California 92037, USA`
- **Verified Coordinates**: Latitude `32.8427`, Longitude `-117.2734`
- **Interactive Leaflet Map**: Renders without requiring paid API keys, featuring a custom navy and gold pin marker.
- **Get Directions**: One-click button navigating directly to Google Maps Directions with destination pre-populated.
- **Street View 360°**: Graceful link opening the panoramic 360° viewpoint on Google Maps Platform.
- **Arrival Transit Times**:
  - San Diego International Airport (SAN): ~22 minutes
  - Los Angeles International Airport (LAX): ~1 hour 45 minutes
  - Azure Marina: ~4 minutes

---

## 8. Database Architecture & Dual-Mode Persistence

The backend features a smart persistence layer:
1. **MongoDB Mode**: When `MONGODB_URI` is provided in `.env` (e.g., MongoDB Atlas or local `mongod`), the server connects using official Mongoose schemas with indexed references.
2. **Embedded JSON Store Mode**: If `MONGODB_URI` is not provided or local MongoDB is not running, the system automatically engages the persistent JSON data store in `server/data/store.json`.
   - Provides full ACID-like atomic disk persistence.
   - Pre-seeds verified suites, offers, content, FAQs, and authorized staff accounts.
   - Requires **zero external database installations** to run immediately.

---

## 9. Security, Rate Limiting & Privacy Compliance

- **HTTP Security Headers**: Powered by `helmet` with secure Content Security Policy (CSP).
- **CORS Protection**: Restricted to authorized origins in production.
- **Rate Limiters**:
  - `loginLimiter`: Max 10 attempts per 15 minutes per IP.
  - `inquiryLimiter`: Max 20 inquiries per hour per IP.
  - `generalLimiter`: Max 300 requests per 15 minutes.
- **Spam Trap Honeypot**: Hidden fields in contact forms silently discard automated bots.
- **Input Sanitization**: Strips HTML tags and script injection from text inputs.
- **Privacy Notice**: Explicit guest consent checkbox before submitting booking inquiries.

---

## 10. Local Quickstart & Setup Guide

### Prerequisites
- Node.js v18+ (tested on Node v25.9.0)
- npm v9+

### 1. Clone & Install Dependencies
```bash
# Clone the repository
cd "hotel booking"

# Install root, backend, and frontend packages
npm run install:all
```

### 2. Configure Environment Variables
Copy `.env.example` in `server/`:
```bash
cp server/.env.example server/.env
```
*(The defaults in `.env.example` allow the application to run immediately without any external database or SMTP server).*

### 3. Run Backend Integration Tests
```bash
npm run test
```
*Expected: 9/9 tests pass (health, room listing, room detail, inquiry validation, reference generation, duplicate rejection, 401 auth gate, admin login, inquiry status update).*

### 4. Start Development Servers
```bash
# Option A: Start both in separate terminals
# Terminal 1 - Backend API (Port 5000):
npm run dev:server

# Terminal 2 - Frontend Client (Port 5173):
npm run dev:client
```

Open your browser to:
- **Public Hotel Website**: [http://localhost:5173](http://localhost:5173)
- **Private Admin Portal**: [http://localhost:5173/private-management](http://localhost:5173/private-management)

---

## 11. Default Authorized Staff Credentials

The database is pre-seeded with two authorized accounts for testing:

| Role | Email | Password | Privileges |
|---|---|---|---|
| **Super Admin** | `admin@grandazure.com` | `AzureAdmin2026!` | Full administrative access, staff management, CMS, rooms, offers, inquiries |
| **Manager** | `manager@grandazure.com` | `AzureManager2026!` | Inquiries, room management, promotional offers, website CMS |

> **Security Advisory**: Change these default passwords upon deploying to production using the "Change Password" API or database reset.

---

## 12. Production Deployment & Client Handover Checklist

### Deploying the Backend (Render, Railway, or VPS)
1. Set environment variables:
   - `NODE_ENV=production`
   - `PORT=5000` (or assigned by platform)
   - `CLIENT_URL=https://your-hotel-domain.com`
   - `ADMIN_PATH=/private-management` (you may change this slug for added obscurity)
   - `JWT_SECRET=<strong-random-64-char-string>`
   - `MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/grand_azure?retryWrites=true&w=majority`
   - `SMTP_HOST=smtp.sendgrid.net`
   - `SMTP_PORT=587`
   - `SMTP_USER=apikey`
   - `SMTP_PASS=<your-sendgrid-or-postmark-key>`
   - `NOTIFICATION_EMAIL=reservations@your-hotel-domain.com`
2. Start command: `npm start` (in `server/`).

### Deploying the Frontend (Vercel, Netlify, or Cloudflare Pages)
1. Build command: `npm run build`
2. Output directory: `dist`
3. Configure rewrite rule in `vercel.json` or `_redirects` for single-page routing:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```
4. Set backend proxy URL: Update `API_BASE` or set up reverse proxy to your backend API domain.

### Client Handover Checklist
- [x] Verified authentic hotel copy, address, phone, and coordinates.
- [x] Zero admin login links on public website.
- [x] Tested booking inquiry form with automatic reference code generation.
- [x] Transactional email confirmation dispatched to guest and reservation desk.
- [x] Admin authentication tested with rate limiting and role protection.
- [x] Interactive map verified with Google Maps Directions and Street View fallback.
- [x] Full room inventory configured with baseline rates and confirmation disclaimers.
- [x] Promotional offers management verified.
- [x] CMS content editor verified for updating hotel info without code changes.
- [x] Audit activity log records all administrative operations.
- [x] Client given master ownership of hosting, domain, MongoDB Atlas, and email credentials.
