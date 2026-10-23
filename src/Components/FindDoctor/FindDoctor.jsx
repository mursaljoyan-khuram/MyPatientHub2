

import { useState } from "react";
import "./FindDoctor.css";
import Sidebar from "../Sidebar/Sidebar";

const services = [
  ["🩺", "Primary Care and Internal MD", "our Doctors Partner with you to help you to reach your wellness"],
  ["🩻", "Imaging Services", "From Xray to MR scan we offer..."],
  ["♡", "Emergency Care", "we provide emergency care for adults and children"],
  ["✚", "Urgent Care", "we offer urgent care for none..."]
];

const specialties = [
  "Anesthesiology", "Dermatology", "Emergency medicine",
  "Neurology", "Consultation", "Ophthalmology"
];
//This a Comment
function FindDoctor({ goTo }) {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 850);
  const [search, setSearch] = useState("");
  const [zip, setZip] = useState("");
  const [selected, setSelected] = useState("");

  return (
    <div>
      <Sidebar goTo={goTo} activePage="find-doctor" open={sidebarOpen} />

      <div>{sidebarOpen && <div className="menu-overlay" onClick={() => setSidebarOpen(false)}></div>}</div>
      <main className={`page-main doctor-page ${sidebarOpen ? "" : "sidebar-is-closed"}`}>
        <header className="topbar">
          <div className="top-title"><div className="crumb">⌂ &nbsp;/&nbsp; Searchdoctor</div><button className="hamburger-button" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button></div>
          <div className="top-actions">
            <div className="top-search">⌕ <input placeholder="Type here..." /></div>
            <button onClick={() => goTo("login")} className="logout">◉ Log out</button>
            <span>⚙</span><span>♟</span>
          </div>
        </header>

        <section className="doctor-banner">
          <div className="banner-breadcrumb">⌂ &nbsp;/&nbsp; Searchdoctor</div>
          <div className="banner-center">
            <h1>Find a Doctor</h1>
            <p>Find Doctors and Schedule an appointment</p>
            <div className="doctor-search-row">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search a doctor by name, specialty"
              />
              <input
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="Zip code or Neighborhood"
              />
              <button>CURRENT</button>
              <button>SEARCH</button>
            </div>
          </div>
        </section>

        <section className="doctor-section">
          <h2>Special Services</h2>
          <div className="service-grid">
            {services.map(([icon, name, text]) => (
              <button className="service-card" key={name} onClick={() => setSelected(name)}>
                <span className="service-icon">{icon}</span>
                <div>
                  <h3>{name}</h3>
                  <p>{text}</p>
                </div>
                <span className="arrow">⌄</span>
              </button>
            ))}
          </div>

          <div className="specialty-box">
            <h2>Find Doctors By Specialty</h2>
            <p>Select a Specialty to view all Doctors and schedule an Appointment</p>

            <div className="specialty-grid">
              {specialties.map((item) => (
                <button key={item} onClick={() => setSelected(item)}>
                  {item}<span>⌄</span>
                </button>
              ))}
            </div>

            {selected && <div className="selected-message">Selected: {selected}</div>}
          </div>
        </section>

        <DoctorFooter />
      </main>
    </div>
  );
}

function DoctorFooter() {
  return (
    <footer className="doctor-footer">
      <span>© 2026, made with ♥ by MyPiHUB for a better web.</span>
      <span>MyPatientHUB &nbsp;&nbsp; About Us &nbsp;&nbsp; Blog</span>
    </footer>
  );
}

export default FindDoctor;
