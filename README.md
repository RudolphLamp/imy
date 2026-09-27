# Create.IT - IMY 320 website prototype

A standalone, front-end prototype for a multimedia course platform, built for IMY 320: Multimedia Trends at the University of Pretoria.

This repository represents the final Group Design C submission (Customer Experience) and includes the earlier Group Design A (login) and Group Design B (products) work.

## Group members

- Michael Allen (u24658619)
- Michelle Njoroge (u21448842)
- Rudolph Lamprecht (u20598425)
- Zaynab Samir (u22506099)

---

## How to run this project

You need Node.js 18 or newer installed.

### 1. Open a terminal in the project folder

If you extracted the zip, open the extracted folder in a terminal (right-click, then "Open in Terminal" on Windows; or use `cd path/to/folder` in any shell).

### 2. Install dependencies

    npm install

This only needs to be done once. It downloads React, Vite, and the small number of libraries the project uses (Lucide Icons, Framer Motion, html2canvas).

### 3. Start the development server

    npm run dev

Vite will print a local URL, usually:

    http://localhost:5173/

### 4. Open that URL in your browser

The site loads immediately. You will land on the Products page.

### 5. (Optional) Build for production

    npm run build

This produces a `dist/` folder with the production build. Not required to review the prototype.

---

## What to look for (Group Design C: Peak-End Rule)

The assignment's topic is the Peak-End Rule. The client brief was:

> "I see there are a lot of website out there that does the same thing as ours, but theirs are just so... bland. I need ours to pop! Whether it's them checking out a course, pushing a button, or finishing a course, something needs to stand out!"

Three designed peaks satisfy this brief.

### Peak 1: Enrolment celebration

**What to do:**

1. From the Catalog, click "Add to Cart" on any course.
2. Click the green Cart button in the top-right.
3. In the Cart view, click "Review Checkout".
4. In the modal, click "Confirm demo order".

**What happens:** A full-screen celebration overlay appears with a canvas confetti burst, an animated SVG checkmark, and the enrolled courses staggering in one by one. Two buttons let you continue to the dashboard or view your receipt.

### Peak 2: Lesson completion with milestones

**What to do:**

1. From the left sidebar, click "My Learning".
2. On any enrolled course card, click "Complete Next Lesson (+25%)".

**What happens:** A floating +25% badge rises from the progress bar, the card flashes green, milestone markers at 25%, 50%, and 75% fill in with checkmarks, and a milestone-specific toast appears ("First milestone! 25% complete", "Halfway there! 50% complete", "Almost there! 75% complete").

### End: Certificate ceremony

**What to do:**

1. On a course in My Learning, click "Complete Next Lesson" until progress reaches 100%.
2. A "You finished it" modal appears. Click "Claim Certificate".
3. Alternatively, the enrolled card now shows a "View Certificate" button. Click that.

**What happens:** The certificate opens with a confetti burst, a congratulations header with the user's name in gold, a shimmer sweep across the certificate frame, and a Download button that saves the certificate as a PNG image (2x resolution, via html2canvas).

---

## Other features

- **Catalog:** browse courses, filter by category, level, and price; search across titles, tools, and instructors.
- **Course detail page:** full syllabus, "What You'll Learn", instructor bio, verified reviews.
- **Cart and Checkout:** slide-over cart, promo code support, order confirmation.
- **My Learning dashboard:** enrolled courses with progress tracking, milestone markers, next-lesson indicator.
- **Customer Experience hub:** purchase history with printable receipts, searchable FAQs, support requests, course reviews, editable profile, and a clear explanation of local browser storage.
- **Collapsible sidebar:** toggle from the top navigation to widen the workspace.

---

## Research

Three UX evaluations were conducted on existing online learning platforms using a shortened UEQ questionnaire with four participants each:

1. Clickup UX Report
2. Coursera UX Report
3. Udemy UX Report

These three reports and the Design Support Document are included in the submission package on ClickUP. The design guidelines derived from the reports are documented in the supporting document.
The 4 above mentioned documents can also be found in docs/.

---

## Technology and attribution

Built with:

- React 19 (UI)
- Vite (build tooling)
- Lucide React (icons)
- Framer Motion (animations)
- html2canvas (certificate PNG download)
- Plus Jakarta Sans and Outfit (Google Fonts)

Confetti is a hand-rolled canvas animation written for this project (`src/utils/confetti.js`). No external confetti library is used.

All libraries are credited in the site footer.

Course data comes from `public/courses.csv` with images from the Unsplash CDN and a local fallback image if any fail to load.

---

## Data storage

All user data (cart, enrolled courses, orders, support requests, reviews, profile) is stored in the browser's `localStorage` under a per-account key prefix. Activity persists across refreshes on the same device but does not sync across devices. Clearing browser storage removes all activity.

There is no database or backend. This is a university course prototype, not an official University of Pretoria learning or payment service. No real payments are processed and no emails are sent.