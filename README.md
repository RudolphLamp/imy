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

If you extracted the zip, open the extracted folder in a terminal (right-click → "Open in Terminal" on Windows, or `cd path/to/folder` in any shell).

### 2. Install dependencies

```bash
npm install
```
This only needs to be done once. It downloads React, Vite, and the small number of libraries the project uses (Lucide Icons, Framer Motion, html2canvas).

### 3. Start the development server
#### Run locally

```bash
npm ci
npm run dev
```
Open the URL shown by Vite. For a production check, run `npm run build` and `npm run lint`.

# What to look for (Group Design C: Peak-End Rule)

### Peak 1 - Enrolment celebration
## What to do:

From the Catalog, click "Add to Cart" on any course.

Click the green Cart button in the top-right.

In the Cart view, click "Review Checkout".

In the modal, click "Confirm demo order".

What happens: A full-screen celebration overlay appears with a canvas confetti burst, an animated SVG checkmark, and the enrolled courses staggering in one by one. Two buttons let you continue to the dashboard or view your receipt.

### Peak 2 - Lesson completion with milestones
## What to do:

From the left sidebar, click "My Learning".

On any enrolled course card, click "Complete Next Lesson (+25%)".

What happens: A floating +25% badge rises from the progress bar, the card flashes green, milestone markers at 25%, 50%, and 75% fill in with checkmarks, and a milestone-specific toast appears ("First milestone! 25% complete", "Halfway there! 50% complete", "Almost there! 75% complete").

### End - Certificate ceremony
## What to do:

On a course in My Learning, click "Complete Next Lesson" until progress reaches 100%.

A "You finished it" modal appears. Click "Claim Certificate".

Alternatively, the enrolled card now shows a "View Certificate" button - click that.

What happens: The certificate opens with a confetti burst, a congratulations header with the user's name in gold, a shimmer sweep across the certificate frame, and a Download button that saves the certificate as a PNG image (2× resolution, via html2canvas).

### Other features
- Catalog: browse courses, filter by category / level / price, search across titles, tools, and instructors.

- Course detail page: full syllabus, "What You'll Learn", instructor bio, verified reviews.

- Cart and Checkout: slide-over cart, promo code support, order confirmation.

- My Learning dashboard: enrolled courses with progress tracking, milestone markers, next-lesson indicator.

- Customer Experience hub: purchase history with printable receipts, searchable FAQs, support requests, course reviews, editable profile, and a clear explanation of local browser storage.

- Collapsible sidebar: toggle from the top navigation to widen the workspace.

## Research
Three UX evaluations were conducted on existing online learning platforms using a shortened UEQ questionnaire with four participants each:

1. Clickup UX Report

2. Coursera UX Report

3. Udemy UX Report

These reports, alongside the Design Support Document, are included our Clickup submission. The design guidelines derived from them are documented in the supporting document.

The three reports alongside the Design Support doc are also stored in the repository at:

docs/


## Technology and attribution
- Built with:

- React 19 (UI)

- Vite (build tooling)

- Lucide React (icons)

- Framer Motion (animations)

- html2canvas (certificate PNG download)

- Plus Jakarta Sans and Outfit (Google Fonts)

- Confetti is a hand-rolled canvas animation written for this project (src/utils/confetti.js). No external confetti library is used.

- All libraries are credited in the site footer.

- Course data comes from public/courses.csv with images from the Unsplash CDN and a local fallback image if any fail to load.

























