# MyPatientHUB

A React + Vite healthcare dashboard prototype.

## Run locally

1. Install Node.js (Node 20.19+ recommended).
2. Open this folder in your terminal.
3. Run `npm install`.
4. Run `npm run dev` and open the local URL shown by Vite.

## Pages and routes

- `/login`
- `/dashboard`
- `/appointments`
- `/find-doctor`
- `/find-clinic`
- `/marketplace`
- `/find-pharmacy`
- `/dependents`
- `/my-account`
- `/settings`
- `/chat`

Navigation uses **React Router** with client-side route changes, browser back/forward support, and direct URLs. For production static hosting, keep the included SPA fallback rules so direct links to routes return `index.html`.

## Functional demo features

- Header search can find pages; unknown terms show a no-results message.
- Doctor and clinic searches and filters update the displayed results.
- Appointments can be created and removed, and new appointments appear in the calendar.
- Marketplace and pharmacy products can be added to the shared demo cart.
- Dependent records, billing records, payment-card labels, cart contents, account profile settings, and chat messages persist in this browser using `localStorage`.
- Invoice search and print-to-PDF are available.
- Login and sign-up are demo flows only.

## Important limitations

This is a frontend prototype. It does not have a server, real authentication, a healthcare database, live provider availability, real appointment booking, payment processing, or email delivery. Do not enter real patient, password, or payment information. Demo data stays in the current browser unless its local storage is cleared. Clinic map tiles and map assets require an internet connection.
