import { useEffect, useRef, useState } from "react";
import "./FindClinic.css";
import Sidebar from "../Sidebar/Sidebar";

const clinicLocations = [
  { name: "Klinik Lee Healthcare", lat: 2.8168692, lng: 101.8141016 },
  { name: "Klinik Bandar Baru Nilai", lat: 2.814165, lng: 101.797309 },
  { name: "Klinik Mediviron Giant Nilai", lat: 2.83223, lng: 101.79589 },
  { name: "Klinik Nilai Impian", lat: 2.842072, lng: 101.797513 },
  { name: "Klinik Mediviron @ Nilai", lat: 2.8165065, lng: 101.8136897 }
];

function FindClinic({ goTo }) {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 850);
  const [view, setView] = useState("map");
  const [specialty, setSpecialty] = useState("Specialty");
  const [gender, setGender] = useState("Gender");
  const [condition, setCondition] = useState("Condition");
  const [languages, setLanguages] = useState("languages");
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (view !== "map" || !mapRef.current || !window.L) return;

    const map = window.L.map(mapRef.current, { zoomControl: true });
    mapInstanceRef.current = map;

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19
    }).addTo(map);

    const bounds = [];
    clinicLocations.forEach((clinic) => {
      bounds.push([clinic.lat, clinic.lng]);
      const icon = window.L.divIcon({
        className: "clinic-map-marker",
        html: "<span>+</span>",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -30]
      });

      window.L.marker([clinic.lat, clinic.lng], { icon })
        .addTo(map)
        .bindPopup(`<b>${clinic.name}</b><br />Clinic location`);
    });

    map.fitBounds(bounds, { padding: [35, 35] });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [view]);

  return (
    <div>
      <Sidebar goTo={goTo} activePage="find-clinic" open={sidebarOpen} />

      <div>{sidebarOpen && <div className="menu-overlay" onClick={() => setSidebarOpen(false)}></div>}</div>
      <main className={`page-main clinic-page ${sidebarOpen ? "" : "sidebar-is-closed"}`}>
        <header className="topbar">
          <div className="top-title"><div className="crumb">⌂ &nbsp;/&nbsp; Findhospital</div><button className="hamburger-button" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button></div>
          <div className="top-actions">
            <div className="top-search">⌕ <input placeholder="Type here..." /></div>
            <button onClick={() => goTo("login")} className="logout">◉ Log out</button>
            <span>⚙</span><span>♟</span>
          </div>
        </header>

        <section className="clinic-banner">
          <div className="banner-breadcrumb">⌂ &nbsp;/&nbsp; Findhospital</div>
          <div className="banner-center">
            <h1>Find a Clinic</h1>
            <p>Search Clinics and schedule an appointment with doctors through Clinic</p>
            <div className="doctor-search-row">
              <input placeholder="Search" />
              <input placeholder="Zip code or Neighborhood" />
              <button>CURRENT</button>
              <button>SEARCH</button>
            </div>
          </div>
        </section>

        <section className="clinic-work">
          <div className="clinic-toolbar">
            <button className={view === "map" ? "active" : ""} onClick={() => setView("map")}>◉ Map</button>
            <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}>▤ List</button>
          </div>

          <div className="clinic-layout">
            <aside className="clinic-filters">
              <h3>Filter By</h3>

              <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
                <option>Specialty</option><option>Primary Care</option><option>Cardiology</option>
              </select>

              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option>Gender</option><option>Male</option><option>Female</option>
              </select>

              <select value={condition} onChange={(e) => setCondition(e.target.value)}>
                <option>Condition</option><option>Diabetes</option><option>Heart</option>
              </select>

              <select value={languages} onChange={(e) => setLanguages(e.target.value)}>
                <option>languages</option><option>English</option><option>Malay</option>
              </select>

              <h3>Providers Who Treat</h3>
              <label><input type="checkbox" /> All Ages</label>
              <label><input type="checkbox" /> Children</label>
              <label><input type="checkbox" /> Adults</label>

              <h3>View Only</h3>
              <label><input type="checkbox" /> Online Scheduling</label>
              <label><input type="checkbox" /> Primary Care</label>
            </aside>

            {view === "map" ? (
              <div ref={mapRef} className="real-map" />
            ) : (
              <div className="clinic-list">
                {["Klinik Lee Healthcare", "Klinik Mediviron", "KLINIK NILAI IMPAN", "Primary Care Clinic"].map((name) => (
                  <div className="clinic-list-item" key={name}>
                    <div className="clinic-avatar">+</div>
                    <div>
                      <b>{name}</b>
                      <p>Primary Care · Online scheduling</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <footer className="clinic-footer">
          <span>© 2026, made with ♥ by MyPiHUB for a better web.</span>
          <span>MyPatientHUB &nbsp;&nbsp; About Us &nbsp;&nbsp; Blog</span>
        </footer>
      </main>
    </div>
  );
}

export default FindClinic;
