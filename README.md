# Create.IT — IMY 320 website prototype

A standalone, front-end prototype for a multimedia course platform. It covers the login, catalog, cart, learning progress, and Group Design C customer experience flows.

## Run locally

```bash
npm ci
npm run dev
```

Open the URL shown by Vite. For a production check, run `npm run build` and `npm run lint`.

## Group Design C: Customer Experience

Use **Customer Experience** in the left navigation. The account hub includes:

- An overview linking to My Learning and the latest order.
- Purchase history with an itemized, printable receipt after checkout.
- Searchable FAQs and a support request form with a visible request history.
- Course ratings and written feedback for enrolled courses.
- Editable profile details and a clear explanation of local browser storage.

The cart's **Review Checkout** button opens an order summary. **Confirm demo order** creates a local receipt, enrolls the courses, and opens the customer hub. It is a simulation: no card information is collected, no charge is made, and no support email is sent. Data is kept in `localStorage`, so it remains after refresh in the same browser and disappears if browser storage is cleared. There is no database or backend.

For a full walkthrough of the flow, UX choices, sample data, and storage model, see [Group Design C — Customer Experience](docs/customer-experience.md).

## Research and submission notes

The assignment requires three short research sessions on an existing site using the shortened UEQ. These must be run with real participants; results have not been invented. [The Group C research worksheet](docs/group-c-research.md) provides tasks, an eight item questionnaire, a scoring table, and a place to record resulting design guidelines.

## Technology and attribution

Built with React 19, Vite, Lucide React icons, CSS, and browser `localStorage`. Framer Motion is installed in the project. Course information comes from `public/courses.csv`; the course image is a local visual asset. This is a university course prototype, not an official University of Pretoria learning or payment service.
