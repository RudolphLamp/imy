# Create.IT — IMY 320 Multimedia Trends & Design Academy

A modern, high-performance Web application shell featuring an interactive Landing Page, Split-Screen Authentication Portal, Complete Multimedia Products/Courses Catalog, Full Course Description & Syllabus View, Shopping Cart & Checkout System, and Student Learning Progression Dashboard.

Built for **University of Pretoria IMY 320 (Multimedia Trends)** using React, Vite, Framer Motion, Lucide Icons, and modern CSS3 design tokens.

---

## ✨ Features & Architecture

### 1. 🎓 Products & Course Catalog (`Group Design B`)
- **Top Navigation Bar**:
  - Live global search with instant filtering across course titles, categories, tools, and instructors.
  - Interactive notification center with unread counters and dismiss actions.
  - Quick-access Saved Wishlist indicator badge.
  - Dynamic Shopping Cart trigger with live item count and pricing total.
  - User Profile dropdown menu with student status pill, direct navigation links, and Sign Out action.
  
- **Side Navigation Menu**:
  - Collapsible sidebar with quick navigation (Catalog, My Learning, Cart, Wishlist, Certificates).
  - Department filtering shortcuts (Motion Graphics, 3D & CGI, UX/UI, Game Development, Spatial Audio).
  - Mini student progression widget displaying XP points and tier progress bar.
  - IMY 320 UX Information & Deliverable details trigger.

- **Course Catalog Experience**:
  - Semester 2 promotional hero banner with coupon claim CTA (`IMY320` for 25% discount).
  - Multi-criteria filtering: Categories, Difficulty Level (Beginner / Intermediate / Advanced), Price Range, and Sort options (Most Popular, Highest Rated, Price Low-High, Price High-Low).
  - Grid View vs. List View toggle.
  - Glassmorphic product cards with course thumbnails, instructor avatars, tool tags, star ratings, wishlist toggles, and instant "Add to Cart" operations.

### 2. 📖 Comprehensive Product / Course Description Page
- Breadcrumb trail with quick back-to-catalog navigation.
- **Interactive 4K Video Player Simulation** with play/pause, timecode scrubbing, mute/unmute, and playback speed controls.
- **"What You'll Learn"** structured competency checklist.
- **Industry Tools & Software** badge cluster (Cinema 4D, Blender, Figma, Unreal Engine 5, Ableton Live, etc.).
- **Course Curriculum & Syllabus Accordion** with module expand/collapse, lecture durations, and previewable video lessons.
- **Lead Instructor Biography** with studio credentials and stats.
- **Student Ratings Breakdown & Verified Reviews** with star rating distributions and helpfulness upvotes.
- **Right Sticky Purchase Card** with countdown timer, "Add to Cart", "Instant Enroll / Buy Now", "Add to Wishlist", 30-day guarantee badge, and course inclusions list.
- **Related & Recommended Programs** suggestions.

### 3. 🛒 Shopping Cart & Secure Student Checkout
- Slide-over drawer with item removals, cost breakdowns, and live subtotal calculations.
- Promo code engine supporting discount codes (e.g., `IMY320` for 25% off, `STUDENT50` for 50% off).
- 4-step simulated checkout flow: Order Summary -> Payment Method (Credit Card / Google Pay / 1-Click Demo) -> Processing Loader -> Order Confirmation with Receipt Number and immediate enrollment.

### 4. 📈 Student Learning & Course Progression Tracker
- Active learning dashboard tracking enrolled courses, progress bars, and next up lectures.
- **Interactive Course Player Modal**: lets markers click through lessons, speed through playback, and click "Mark Current Lesson Complete" to see progress bars update in real time.
- **Accredited Certificate Generator**: generates official University of Pretoria IMY 320 accredited diplomas with verification IDs, signatures, official gold seals, and print/PDF export options.

### 5. 🔐 Login & Registration Integration
- Submitting the login form, signing in with Google SSO, or clicking the **1-Click Demo Access** button immediately transitions the user into the full Products Page.
- Account registration automatically provisions a verified student profile and opens the catalog.
- `localStorage` persistence maintains cart items, wishlist, enrolled courses, and lesson completion across refreshes.

---

## 🛠️ Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Styling**: Vanilla CSS3 (Design Tokens, Glassmorphism, CSS Grid, Custom Scrollbars)

---

## 🚀 How to Run the Project

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (version 18+ recommended) and `npm` installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 📄 Academic Attribution

Developed for **University of Pretoria — IMY 320: Multimedia Trends (2026)**.
Includes all front-end operations, user experience guidelines, and interactive mock functionality specified for Group Design Deliverable B.
