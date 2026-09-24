import "./Dashboard.css";

import Sidebar from "../Sidebar/Sidebar";

import chartImg from "../../assets/chartImg.jpg";
import healthImg from "../../assets/img.jpg";

const clinicLegend = [
  ["Klinik Lee Healthcare", "19%"],

  
  ["Klinik Bandar Baru Nilai", "4%"],
  ["Klinik Mediviron Giant Nilai", "10%"],
  ["KLINIK NILAI IMPIAN", "21%"],
  ["Klinik Mediviron", "2%"],
];

const pharmacyLegend = [
  ["ALPRO PHARMACY NILAI", "15%"],
  ["ALPRO PHARMACY PEKAN NILAI", "12%"],
  ["OK PHARMACY", "5%"],
  ["PHARMART PHARMACY NILAI", "9%"],
  ["Health Lane Family Pharmacy", "14%"],
];

const marketLegend = [
  ["Food Panda", "25%"],
  ["Grab Food", "3%"],
  ["Zomato", "12%"],
];

function Legend({ items }) {
  return (
    <ul className="legend-list">
      {items.map(([name, percent]) => (
        <li key={name}>
          <span className="legend-icon">◆</span>

          <span className="legend-name">
            {name}
          </span>

          <span className="legend-pct">
            {percent}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Dashboard({ goTo }) {
  return (
    <div className="dashboard-page">
      <Sidebar
        goTo={goTo}
        activePage="dashboard"
      />

      <div className="main-wrapper">
        <header className="topbar">
          <div className="topbar-left">
            <button className="hamburger">
              ☰
            </button>

            <div>
              <div className="breadcrumb">
                ⌂ <span>/</span> Dashboard
              </div>

              <h1 className="page-title">
                Dashboard
              </h1>
            </div>
          </div>

          <div className="topbar-right">
            <div className="search-box">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Type here..."
              />
            </div>

            <div className="topbar-actions">
              <button
                className="logout-btn"
                onClick={() => goTo("login")}
              >
                ↪ Log out
              </button>

              <button className="icon-btn">
                ⚙
              </button>

              <button className="icon-btn">
                ♧
              </button>
            </div>
          </div>
        </header>

        <main className="content">
          <h2 className="welcome-heading">
            Welcome To MyPatientHUB!
          </h2>

          <div className="dashboard-grid">

            <section className="card">
              <div className="card-header">
                <h3>Promotion by Clinics</h3>
                <span className="info-dot">!</span>
              </div>

              <div className="card-body split">
                <div className="chart-wrap">
                  <img
                    src={chartImg}
                    alt="Promotion by Clinics"
                  />
                </div>

                <Legend items={clinicLegend} />
              </div>

              <button className="more-details-btn">
                MORE DETAILS
              </button>
            </section>

            <section className="card">
              <div className="card-header">
                <h3>Promotion by Pharmacies</h3>
                <span className="info-dot">!</span>
              </div>

              <div className="card-body split">
                <div className="chart-wrap">
                  <img
                    src={chartImg}
                    alt="Promotion by Pharmacies"
                  />
                </div>

                <Legend items={pharmacyLegend} />
              </div>

              <button className="more-details-btn">
                MORE DETAILS
              </button>
            </section>

            <section className="card">
              <div className="card-header">
                <h3>Smart Market Usage by app</h3>
                <span className="info-dot">!</span>
              </div>

              <div className="card-body split">
                <div className="chart-wrap small-chart">
                  <img
                    src={chartImg}
                    alt="Smart Market Usage"
                  />
                </div>

                <Legend items={marketLegend} />
              </div>

              <button className="more-details-btn">
                MORE DETAILS
              </button>
            </section>

            <section className="card health-card">
              <div className="card-header">
                <h3>Health Index</h3>
              </div>

              <div className="health-stat">
                <span className="health-percent">
                  70%
                </span>

                <span className="health-delta">
                  +3%
                </span>
              </div>

              <div className="health-chart-wrap">
                <img
                  src={healthImg}
                  alt="Health Index"
                />
              </div>
            </section>

          </div>
        </main>

        <footer className="footer">
          <p>
            © 2026, made with
            <span> ♥ </span>
            by <b>MyPiHUB</b> for a better web.
          </p>

          <nav>
            <a href="#patient">
              MyPatientHUB
            </a>

            <a href="#about">
              About Us
            </a>

            <a href="#blog">
              Blog
            </a>
          </nav>
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;