# Group Design C — Customer Experience

## Purpose

Create.IT is a front-end prototype for an online multimedia course service. Group Design C adds the experience around the course itself: returning to learning, seeing a purchase, asking for help, leaving feedback, and managing basic account details. The same app still contains the login, catalog, cart, demo checkout, and learning dashboard from earlier work.

The owner quote and a separate list of Group C functions were not provided. This implementation uses the supplied project overview and existing site as its scope. It does not claim that the required three user research sessions have already taken place.

## Where to find it

Open the site and choose **Customer Experience** in the left navigation. For a direct local view, open `/?view=customer` on the Vite server. The account page has five sections:

| Section | What a visitor can do | Feedback and empty state |
| --- | --- | --- |
| Overview | See a personalized greeting, course counts, average progress, the next course to continue, latest order, help shortcut, and recent activity | First-time users can browse courses or load labelled sample activity |
| Purchase history | Search by order number or course title, expand an itemized receipt, and print or save it through the browser | Explains when there are no orders or no search matches |
| Help & support | Search and expand FAQs; save a question with a topic; review past questions | Validates question length and states clearly that no message is sent |
| My feedback | Choose an enrolled course, select 1–5 stars, write a review, and edit an existing review | Requires a course and at least 20 characters; shows a browse action when no course is enrolled |
| Profile | Edit the displayed name and email | Checks both fields before saving and explains the browser-only data model |

The left navigation changes with the context. Catalog filters and category links appear while browsing courses. A compact account card appears while viewing Customer Experience, so shopping controls do not crowd the account page.

## Main customer journey

1. A visitor browses the catalog and adds a course to the cart. Already enrolled courses cannot be added again.
2. **Review Checkout** opens an order summary that lists the courses and total in rand. It says explicitly that this is a demo and collects no card information.
3. **Confirm demo order** creates an order number, records the item prices and date, adds the courses to My Learning at 0% progress, empties the cart, and opens Customer Experience.
4. A success banner offers **View receipt**. Purchase history contains the order and a printable itemized receipt. The overview updates its order count, latest order, and activity list.
5. The visitor can continue a course from the overview, use the FAQ, save a support question, or share course feedback. These changes remain after refresh in the same browser.

No actual payment, email, or external support action occurs. A receipt represents a simulated checkout, not a tax invoice or proof of payment.

## Sample activity for review

On a fresh browser profile, the customer page includes **two labelled sample orders**, **one sample support question**, and **one sample course review**. The existing two sample enrolled courses provide visible progress on the overview. The example orders, question, and review are defined in [`src/data/customerMockData.js`](../src/data/customerMockData.js). Sample receipts say that no purchase took place.

If a browser already has saved empty activity lists from an earlier run, the page offers **Load sample experience**. This loads the same labelled examples so markers can inspect every section without completing checkout first. Real demo actions appear alongside the examples. A review edited by the visitor becomes their own updated review.

## UX choices

- **Clear next step:** The overview presents one course with its title, category, progress value, progress bar, and continue action instead of a generic dashboard link.
- **Visible system feedback:** Checkout, profile, support, and feedback actions show confirmation toasts or banners. Invalid form submissions give a specific reason.
- **Recognition:** Course titles, order totals, dates, and activity types are visible without remembering previous screens.
- **Honest prototype language:** Sample data is marked “Sample”, and support and payment copy explain what is stored locally and what is not transmitted.
- **Easy recovery:** Cart items can be removed before checkout; checkout review can be closed; FAQ answers can be collapsed; search can be changed; reviews can be edited.
- **Responsive layout:** The account cards stack at narrow widths, the top navigation wraps, and account section links scroll horizontally when needed.
- **Keyboard and screen reader cues:** Interactive controls are buttons or labelled form fields, active account navigation uses `aria-current`, the progress bar reports its value, ratings have accessible labels, and focus states are visible.

These are design decisions made for this prototype. They still need to be checked against real participant feedback before being presented as research-based guidelines.

## Front-end data model

The app uses React state and browser `localStorage`. There is **no database or backend**. Customer activity is saved under an account-specific browser key derived from the simulated login identity, so switching prototype accounts does not show the previous account's cart, orders, questions, reviews, or learning progress. Editing the profile email keeps the same account ID. The original unscoped Jane demo data is read once for compatibility with earlier versions.

Key records are:

| Key | Stored content |
| --- | --- |
| `createit_user` | Display name and email from the simulated login/profile |
| `createit_<account>_cart` | Courses currently selected |
| `createit_<account>_enrolled` | Course IDs and progress percentages |
| `createit_<account>_orders` | Order ID, date, item snapshots, total, and sample flag where applicable |
| `createit_<account>_tickets` | Locally saved support question, topic, status, and date |
| `createit_<account>_reviews` | Course ID, rating, text, author, and date |

The catalog is read from `public/courses.csv`. The customer page component is [`src/components/products/CustomerExperience.jsx`](../src/components/products/CustomerExperience.jsx); [`src/components/products/ProductsView.jsx`](../src/components/products/ProductsView.jsx) coordinates cart, checkout, learning, and account state. Styling is in `src/index.css` under the Group Design C rules.

Because storage belongs to the browser profile, activity does not sync between devices and can be removed by clearing site data. The prototype's simulated login is not an authentication service, so do not enter real private account details.

## How to run and review

```bash
npm ci
npm run dev
```

Open the URL Vite prints, then choose **Customer Experience**. To review the complete flow, inspect the sample data, search for `DEMO`, expand a receipt, filter the FAQs, edit the sample review, save a support question, update the profile, and complete a new demo checkout from the catalog. Refresh and check that the new activity remains.

Run `npm run build` and `npm run lint` before submission. The project uses React, Vite, Lucide React, CSS, and localStorage. These libraries are disclosed in the site footer and README.

## Research still required

The project overview calls for three short sessions on an existing course website using a shortened UEQ. The group must recruit and observe three real participants, record the high and low scores, and convert those observations into supported design guidelines. Use [`docs/group-c-research.md`](group-c-research.md) as a worksheet. No participant responses have been invented in this repository.
