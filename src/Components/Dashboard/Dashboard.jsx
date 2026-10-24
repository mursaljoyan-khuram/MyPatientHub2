import { useState } from "react";
import "./Dashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import TopbarSearch from "../TopbarSearch";

const clinicData = [
  ["Klinik Lee Healthcare", 19, "pink"],
  ["Klinik Bandar Baru Nilai", 4, "blue"],
  ["Klinik Mediviron Giant Nilai", 10, "green"],
  ["KLINIK NILAI IMPAN", 21, "green"],
  ["Klinik Mediviron", 2, "blue"]
];

const pharmacyData = [
  ["ALPRO PHARMACY NILAI", 15, "pink"],
  ["ALPRO PHARMACY PEKAN NILAI", 13, "blue"],
  ["OK PHARMACY", 5, "green"],
  ["PHARMART PHARMACY NILAI", 9, "green"],
  ["Health Lane Family Pharmacy", 14, "blue"]
];

const appData = [
  ["Food Panda", 25],
  ["Grab Food", 3],
  ["Zomato", 12],
  ["Lazada", 7],
  ["Uber Eats", 10]
];
// Renders a donut chart placeholder; the "type" prop (clinic, pharmacy or market) picks the matching CSS style.
function Donut({ type = "clinic" }) {
  return <div className={`donut donut-${type}`} />;
}
// Renders a dashboard card with a title, a donut chart, a details button, and a list of names with their percentages.

function ChartCard({ title, data, type, goTo }) {
  return (
    <section className="dash-card">
      <h3>{title}</h3>
      <div className="chart-body">
        <div>
          <Donut type={type} />
          <button className="details-btn" onClick={() => goTo(type === "pharmacy" ? "find-pharmacy" : "find-clinic")}>MORE DETAILS</button>
        </div>
        <div className="chart-list">
          {data.map(([name, percent, color]) => (
            <div className="chart-row" key={name}>
              <span className={`mini-icon ${color || ""}`}>◆</span>
              <b>{name}</b>
              <span>{percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Dashboard({ goTo }) {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 850);
  return (
    <div>
      <Sidebar goTo={goTo} activePage="dashboard" open={sidebarOpen} />

      <div>{sidebarOpen && <div className="menu-overlay" onClick={() => setSidebarOpen(false)}></div>}</div>
      <main className={`page-main dashboard-page ${sidebarOpen ? "" : "sidebar-is-closed"}`}>
        <header className="topbar">
          <div className="top-title"><div className="crumb">⌂ &nbsp;/&nbsp; Dashboard</div><button className="hamburger-button" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button></div>
          <div className="top-actions">
            <TopbarSearch goTo={goTo} />
            <button onClick={() => goTo("login")} className="logout">◉ Log out</button>
            <button type="button" className="topbar-action" aria-label="Settings" onClick={() => goTo("settings")}>⚙</button><button type="button" className="topbar-action" aria-label="My account" onClick={() => goTo("my-account")}>♟</button>
          </div>
        </header>

        <div className="dashboard-content">
          <h1>Welcome To MyPatientHUB!</h1>

          <div className="dashboard-grid">
            <ChartCard title="Promotion by Clinics" data={clinicData} type="clinic" goTo={goTo} />
            <ChartCard title="Promotion by Pharmacies" data={pharmacyData} type="pharmacy" goTo={goTo} />

            <section className="dash-card market-card">
              <h3>Smart Market Usage by app</h3>
              <div className="chart-body">
                <div>
                  <Donut type="market" />
                  <button className="details-btn" onClick={() => goTo("marketplace")}>SEE ALL REFERRALS</button>
                </div>
                <div className="chart-list">
                  {appData.map(([name, percent]) => (
                    <div className="chart-row" key={name}>
                      <span className="mini-icon green">◆</span>
                      <b>{name}</b>
                      <span>{percent}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="small-card">
              <span>Health Index</span>
              <strong>70% <i>+3%</i></strong>
              <div className="wave"></div>
            </div>

          </div>
        </div>

        <footer className="site-footer">
          <span>© 2026, made with ♥ by MyPiHUB for a better web.</span>
          <span>MyPatientHUB &nbsp;&nbsp; About Us &nbsp;&nbsp; Blog</span>
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;
