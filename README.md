<<<<<<< HEAD
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
=======
# MyPatientHUB – Healthcare Management Web Application

MyPatientHUB is a responsive healthcare management web application built with **React.js** and **Vite**. It brings common patient tasks into one place: finding doctors and clinics, booking appointments, browsing a healthcare marketplace, and chatting, all through a clean dashboard-style interface.

🔗 **Live Demo:** [https://musical-semolina-69f932.netlify.app](https://musical-semolina-69f932.netlify.app)
📅 **Appointments Page:** [https://musical-semolina-69f932.netlify.app/appointments](https://musical-semolina-69f932.netlify.app/appointments)

---

- **Sign In** – User access to the application
- **Sidebar Navigation** – Quick navigation between all the pages below
- **Dashboard** – Overview of the patient's healthcare activity
- **Appointments** – Book and manage appointments
- **Find Doctor** – Search and browse doctors
- **Find Clinic** – Search and browse clinics
- **Chat** – Communicate within the platform
- **Find MarketPlace** – Browse healthcare products and services
- **Find Pharmacy** – Search and browse pharmacies
- **My Dependents** – Add and manage family members (dependents)
- **My Account** – View and manage the user's account
- **Settings** – Manage application settings


---

## Tech Stack

- [React.js](https://react.dev/)
- [Vite](https://vite.dev/) (build tool and dev server)
- JavaScript (ES6+), HTML5, CSS3
- Deployed on [Netlify](https://www.netlify.com/)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/<username>/<repository-name>.git

# Go to the project folder
cd <repository-name>

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will run at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

---

## Screenshots


| Dashboard | MyAccount | Appointments |
|-----------|-------------|--------------|
| ![Dashboard](./screenshots/Dashboard%20Screenshot.png) | ![MyAccount](./screenshots/myaccount%20screenshot.png) | ![Appointments](./screenshots/Appointment%20screenshot.png) |

---

## Authors

| Name | GitHub |
|------|--------|
| Bushra Moneeb | [@Bushra-web](https://github.com/Bushra-web) |
| Mursal Joyan Khuram | [@mursaljoyan-khuram](https://github.com/mursaljoyan-khuram) |

---

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to open an issue or submit a pull request.
>>>>>>> 653fd5d90be6c31e1d7744b6e73765e9b91350be
