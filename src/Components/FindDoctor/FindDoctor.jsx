import { useState } from "react";
import "./FindDoctor.css";
import Sidebar from "../Sidebar/Sidebar";
import TopbarSearch from "../TopbarSearch";

const services = [
  ["🩺", "Primary Care and Internal MD", "our Doctors Partner with you to help you to reach your wellness"],
  ["🩻", "Imaging Services", "From Xray to MR scan we offer..."],
  ["♡", "Emergency Care", "we provide emergency care for adults and children"],
  ["✚", "Urgent Care", "we offer urgent care for none..."]
];

const doctorDirectory = [
  { name: "Dr. Madina Rahimi", specialty: "Primary Care and Internal MD", location: "Nilai", availability: "Today · 10:30 AM" },
  { name: "Dr. Shamsir Ahmad", specialty: "Emergency medicine", location: "Nilai", availability: "Tomorrow · 9:00 AM" },
  { name: "Dr. Ali Khan", specialty: "Neurology", location: "Kuala Lumpur", availability: "Friday · 11:00 AM" },
  { name: "Dr. Bilal Noor", specialty: "Dermatology", location: "Nilai", availability: "Thursday · 2:00 PM" },
];

const specialties = [
  "Anesthesiology", "Dermatology", "Emergency medicine",
  "Neurology", "Consultation", "Ophthalmology"
];

function FindDoctor({ goTo }) {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 850);
  const [search, setSearch] = useState("");
  const [zip, setZip] = useState("");
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");
  const matchingDoctors = doctorDirectory.filter((doctor) => (!search.trim() || `${doctor.name} ${doctor.specialty} ${doctor.location}`.toLowerCase().includes(search.trim().toLowerCase())) && (!zip.trim() || doctor.location.toLowerCase().includes(zip.trim().toLowerCase())));
  const displayedDoctors = submitted ? matchingDoctors : [];

  return (
    <div>
      <Sidebar goTo={goTo} activePage="find-doctor" open={sidebarOpen} />

      <div>{sidebarOpen && <div className="menu-overlay" onClick={() => setSidebarOpen(false)}></div>}</div>
      <main className={`page-main doctor-page ${sidebarOpen ? "" : "sidebar-is-closed"}`}>
        <header className="topbar">
          <div className="top-title"><div className="crumb">⌂ &nbsp;/&nbsp; Searchdoctor</div><button className="hamburger-button" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button></div>
          <div className="top-actions">
            <TopbarSearch goTo={goTo} />
            <button onClick={() => goTo("login")} className="logout">◉ Log out</button>
            <button type="button" className="topbar-action" aria-label="Settings" onClick={() => goTo("settings")}>⚙</button><button type="button" className="topbar-action" aria-label="My account" onClick={() => goTo("my-account")}>♟</button>
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
              <button onClick={() => { setZip("Nilai"); setSearchMessage("Showing sample doctors around Nilai."); setSubmitted(true); }}>CURRENT</button>
              <button onClick={() => { setSubmitted(true); setSearchMessage(matchingDoctors.length ? `${matchingDoctors.length} matching doctor(s) found.` : "No doctors found. Try another name, specialty, or location."); }}>SEARCH</button>
            </div>
          </div>
        </section>

        {searchMessage && <section className="doctor-search-results"><h2>Search Results</h2><p>{searchMessage}</p>{displayedDoctors.length ? displayedDoctors.map((doctor) => <article className="doctor-result-card" key={doctor.name}><div><strong>{doctor.name}</strong><p>{doctor.specialty} · {doctor.location}</p><small>Availability: {doctor.availability}</small></div><button onClick={() => goTo("appointments")}>Book appointment</button></article>) : <div className="functional-empty-state">No matching doctors. Try “Dr. Madina”, “Neurology”, or “Nilai”.</div>}</section>}

        <section className="doctor-section">
          <h2>Special Services</h2>
          <div className="service-grid">
            {services.map(([icon, name, text]) => (
              <button className="service-card" key={name} onClick={() => { setSelected(name); setSearch(name); setSubmitted(true); setSearchMessage(`Showing doctors related to ${name}.`); }}>
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
              {specialties.filter((item) => !search.trim() || item.toLowerCase().includes(search.toLowerCase())).map((item) => (
                <button key={item} onClick={() => { setSelected(item); setSearch(item); setSubmitted(true); setSearchMessage(`Showing doctors for ${item}.`); }}>
                  {item}<span>⌄</span>
                </button>
              ))}
            </div>
            {specialties.filter((item) => !search.trim() || item.toLowerCase().includes(search.toLowerCase())).length === 0 && <div className="functional-empty-state">No specialties match “{search}”.</div>}
            {selected && <div className="selected-message">Selected: {selected}. <button onClick={() => { setSearch(selected); setSubmitted(true); setSearchMessage(`Showing doctors for ${selected}.`); }}>Find doctors</button></div>}
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
