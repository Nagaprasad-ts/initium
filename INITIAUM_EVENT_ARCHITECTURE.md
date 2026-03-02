# Initium Event Management System
## Architecture & Implementation Guide

---

# 1. Tech Stack

- Backend: Laravel 12
- Frontend: React + Inertia.js
- Admin Panel: Filament
- Payment Gateway: Razorpay (Webhook verification)
- Database: MySQL

---

# 2. Project Overview

Initium is a multi-event management platform.

Under Initium:
- Multiple events
- Each event has:
  - Different venue
  - Different date
  - Different time
  - Different pricing
- Event types:
  - Individual Registration
  - Group Registration
  - Both

Frontend is mostly static.
Only registration and payment interact with backend.

System must be reusable for future years.

---

# 3. High-Level Architecture

System has three major parts:

1. Public Website
2. Registration & Payment System
3. Admin Dashboard

---

# 4. Database Design

## 4.1 events Table

Purpose: Store event information.

Columns:

- id
- name
- slug
- description
- type (individual | group | both)
- venue
- event_date
- start_time
- end_time
- price
- max_participants (nullable)
- banner_image
- year (example: 2026)
- is_active (boolean)
- created_at
- updated_at

Notes:
- Use slug for SEO-friendly URLs.
- Use year column to reuse same system next year.

---

## 4.2 registrations Table

Purpose: Store one record per payment attempt.

Columns:

- id
- event_id (foreign key)
- registration_type (individual | group)
- team_name (nullable)
- college_name
- contact_email
- contact_phone
- total_amount
- payment_id (nullable)
- payment_status (pending | paid | failed)
- created_at
- updated_at

Important:
- Create registration BEFORE payment.
- Default payment_status = pending.

---

## 4.3 participants Table

Purpose: Store participants under a registration.

Columns:

- id
- registration_id (foreign key)
- name
- email
- phone
- student_id / usn (nullable)
- created_at
- updated_at

Why separate table?

- Individual = 1 participant
- Group = multiple participants
- Clean and scalable structure

---

# 5. Model Relationships

Event:
- hasMany Registrations

Registration:
- belongsTo Event
- hasMany Participants

Participant:
- belongsTo Registration

---

# 6. Frontend Structure (React + Inertia)

## 6.1 Pages

### Home Page
- Hero section
- About Initium
- Countdown
- CTA → View Events

### Events Listing Page
Route: `/events`

Show:
- Event cards
- Date
- Venue
- Price
- Register button

### Event Detail Page
Route: `/events/{slug}`

Show:
- Description
- Rules
- Venue
- Date & time
- Fee
- Registration option

---

# 7. Event Type Logic

In events table:

type:
- individual
- group
- both

Frontend logic:

If type = individual:
- Show individual form

If type = group:
- Show group form

If type = both:
- Show selection option

---

# 8. Registration Flow

1. User selects event
2. User fills form
3. Backend creates registration (status = pending)
4. Backend creates Razorpay order
5. User completes payment
6. Razorpay webhook verifies payment
7. Update registration status to paid

Important:
Never trust frontend payment success response.

---

# 9. Razorpay Integration

## 9.1 Order Creation

- Create order from backend
- Send order_id to frontend
- Open Razorpay checkout

## 9.2 Webhook

Create endpoint:

POST `/razorpay/webhook`

Webhook must:

- Verify signature
- Confirm payment
- Update:
  - payment_status = paid
  - payment_id = razorpay_payment_id

If verification fails:
- Do not mark as paid

---

# 10. Group Registration Logic

Fields:
- Team name
- Number of participants
- Dynamic participant form inputs

Backend:
- Loop participants array
- Create participant records

---

# 11. Capacity Control (Recommended)

Before creating order:

If max_participants is set:
- Count paid participants
- If limit reached:
  - Block new registration

---

# 12. Filament Admin Panel

Create Resources:

## EventResource
- Create / Edit events
- Upload banner
- Set pricing
- Activate / Deactivate

## RegistrationResource
- View registrations
- Filter by event
- Filter by payment status
- Export CSV

## ParticipantResource (optional)
- View participant data

Add relation manager:
- Registration → Participants

---

# 13. Future Improvements

## Early Bird Pricing
Add columns:
- early_bird_price
- early_bird_deadline

## Multi-Day Events
Create event_schedules table:
- event_id
- date
- start_time
- end_time
- venue

## Coupon System
- coupons table
- Apply before payment

## QR Code Ticket
- Generate after successful payment
- Send via email

---

# 14. Folder Structure

app/
 ├── Models/
 │    ├── Event.php
 │    ├── Registration.php
 │    ├── Participant.php
 │
 ├── Http/
 │    ├── Controllers/
 │    │    ├── EventController.php
 │    │    ├── RegistrationController.php
 │    │    ├── PaymentController.php

resources/
 ├── js/
 │    ├── Pages/
 │    │    ├── Home.jsx
 │    │    ├── Events/
 │    │    │    ├── Index.jsx
 │    │    │    ├── Show.jsx
 │    │    ├── Registration/
 │    │    │    ├── Individual.jsx
 │    │    │    ├── Group.jsx

---

# 15. Development Order

1. Create migrations
2. Setup models & relationships
3. Setup Filament admin
4. Build event listing page
5. Build event detail page
6. Build individual registration
7. Build group registration
8. Integrate Razorpay
9. Implement webhook verification
10. Test full flow
11. Deploy

---

# 16. Security Checklist

- Validate all inputs
- Use server-side validation
- Verify Razorpay signature
- Protect webhook route
- Enable CSRF protection
- Add rate limiting to registration endpoints

---

# 17. System Flow Summary

Initium  
 ├── Events  
 │     ├── Individual  
 │     ├── Group  
 │  
 ├── Registrations  
 │     ├── Participants  
 │  
 ├── Razorpay Payment  
 │  
 └── Filament Admin  

---

End of Document