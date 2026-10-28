# Create.IT - IMY 320 final website

**Group Design E (2026)** - a complete, interactive front-end prototype for a multimedia course platform at the University of Pretoria. The final design incorporates the Group Design D usability findings and brings login, course discovery, checkout, learning progress, and customer support into one responsive workspace.

## Run the project

Use **Node.js 22.12+** (Node 20.19+ is also supported).

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite, usually **http://localhost:5173**. The app opens on the landing/About page, with **Sign In** and **Explore Courses** visible in the header. Choose **Sign In** to review login and create an account, or **Explore Courses** to open the Jane Smith demo workspace with two in-progress courses and clearly labelled sample activity. Existing browser accounts and learning progress remain saved.

```sh
npm run lint       # Static checks
npm test           # Progress and completion regression tests
npm run build      # Production output in dist/
npm run preview    # Serve that build locally
```

The build uses relative asset paths so it can also be served from a repository subdirectory such as `/imy/`. Serve `dist/` with an HTTP static server; opening `index.html` directly as a file is not supported.

## Review the final experience

1. **Find a course:** from the landing page, choose **Explore Courses**, then **Find your next course**, search for `motion`, and open **Kinetic Typography & Brand Identity**. Expand the clearly marked curriculum rows. Search also matches tools, categories, descriptions, and instructors. Advanced level/price filters sit behind **Filters**.
2. **Save or purchase:** use the heart to save the course to **Wishlist**, or **Add to cart**. Open the header cart, choose **Review demo checkout**, read the no-payment explanation, and **Confirm demo order**. The enrolment celebration leads to **My Learning** or the order receipt.
3. **Continue learning:** open a course in **My Learning**. The lesson workspace contains a practice brief, module navigation, saved personal notes, and an actual downloadable text guide. It is an intentionally labelled teaching-system shell, as allowed by the assignment.
4. **Finish a course:** choose **Mark complete & continue** for each of the four modules. Progress reaches 25%, 50%, 75%, then 100%, with milestone feedback. The certificate ceremony opens **immediately on the final module**. Download the PNG or reopen it later from **Certificates**. Reviewing completed material never resets progress.
5. **Manage the experience:** use **Purchase history**, **Help & support**, or **My account** for receipts, searchable FAQs, locally saved support questions, editable reviews, and profile details. Sample records are labelled.
6. **Check navigation:** scroll the catalogue; the header and side navigation remain fixed. Use the header chevron to collapse or expand the desktop sidebar; the preference survives a refresh. The catalogue and wishlist use list rows, My Learning keeps its progress list, and the shared footer links to the restored About page. At phone/tablet widths the sidebar becomes a menu drawer with a backdrop and closes after navigation.

See [the final design rationale and feedback response](docs/FINAL-DESIGN.md) for the decisions behind this iteration.

## What changed after usability testing

- Corrected completion feedback by calculating the next progress record before updating React state, removing the stale-state source of the reported `0%` message.
- Triggered the full certificate/confetti ceremony at 100%, with a persistent certificate link in My Learning and a dedicated Certificates section.
- Established one obvious catalogue entry point with a clear primary action, prominent search, a row-based course list, and optional advanced filters.
- Explained demo checkout before confirmation, including that no payment details or money are collected.
- Used native, keyboard-accessible curriculum disclosures with chevrons.
- Added a lesson continuation shell, saved notes, and downloadable module guides.
- Unified the visual design, added wishlist functionality, fixed anchored navigation, and supplied focus handling, modal keyboard controls, reduced-motion support, and mobile layouts.
- Bundled course images locally and fixed relative asset paths for static hosting.

## Scope and storage

This is a **standalone student front-end prototype**, not an official University of Pretoria service. There is no backend, email delivery, payment processing, or accredited qualification. Course/instructor data and ratings are illustrative.

Accounts and per-account activity live in this browser's `localStorage`. Demo registration/sign-in checks a locally stored salted password digest; use a sample password. This is not production authentication. Clearing browser data removes local accounts and activity. Another device does not share this data. Updating the profile's contact email does not change the original sign-in email. Existing percentage-only progress records remain readable.

## Group members

- Michael Allen (u24658619)
- Michelle Njoroge (u21448842)
- Rudolph Lamprecht (u20598425)
- Zaynab Samir (u22506099)

## Research and attribution

The `docs/` directory includes the project overview, Group Design D usability testing document, earlier Group Design C supporting document, and the ClickUp, Coursera, and Udemy research reports.

The application uses **React 19**, **Vite**, **Lucide React**, **html2canvas**, and **Google Fonts** (Plus Jakarta Sans and Outfit). The restored About page uses Framer Motion. The confetti canvas and final orbital hero illustration are project code. Third-party libraries are also credited in the interface footer.

Course photographs are bundled from the Unsplash CDN; [image source credits](docs/IMAGE-CREDITS.md) list the original URLs. Remote fonts have local system-font fallbacks. No external service is required for the prototype's core interactions once dependencies are installed.
