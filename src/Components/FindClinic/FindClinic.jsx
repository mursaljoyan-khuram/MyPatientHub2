import { useEffect, useRef, useState } from "react";
import "./FindClinic.css";
import Sidebar from "../Sidebar/Sidebar";
import TopbarSearch from "../TopbarSearch";

const clinicLocations = [
  { name: "Klinik Lee Healthcare", lat: 2.8168692, lng: 101.8141016, specialty: "Primary Care", languages: "English Malay", condition: "Diabetes Heart", gender: "Male Female", ages: "Children Adults", online: true },
  { name: "Klinik Bandar Baru Nilai", lat: 2.814165, lng: 101.797309, specialty: "Primary Care", languages: "English Malay", condition: "Diabetes", gender: "Male Female", ages: "Children Adults", online: true },
  { name: "Klinik Mediviron Giant Nilai", lat: 2.83223, lng: 101.79589, specialty: "Cardiology", languages: "English", condition: "Heart", gender: "Male Female", ages: "Children Adults", online: true },
  { name: "Klinik Nilai Impian", lat: 2.842072, lng: 101.797513, specialty: "Primary Care", languages: "English Malay", condition: "Diabetes Heart", gender: "Male Female", ages: "Children Adults", online: true },
  { name: "Klinik Mediviron @ Nilai", lat: 2.8165065, lng: 101.8136897, specialty: "Cardiology", languages: "English", condition: "Heart", gender: "Male Female", ages: "Children Adults", online: true }
];

function FindClinic({ goTo }) {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 850);
  const [view, setView] = useState("map");
  const [specialty, setSpecialty] = useState("Specialty");
  const [gender, setGender] = useState("Gender");
  const [condition, setCondition] = useState("Condition");
  const [languages, setLanguages] = useState("languages");
  const [search, setSearch] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [allAges, setAllAges] = useState(false);
  const [childrenOnly, setChildrenOnly] = useState(false);
  const [adultsOnly, setAdultsOnly] = useState(false);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [primaryOnly, setPrimaryOnly] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");
  const visibleClinics = clinicLocations.filter((clinic) => {
    const textMatch = `${clinic.name} ${clinic.specialty} ${clinic.condition} ${clinic.languages}`.toLowerCase().includes(search.trim().toLowerCase());
    const locationMatch = !locationQuery.trim() || /nilai|all|nearby/i.test(locationQuery.trim());
    const specialtyMatch = specialty === "Specialty" || clinic.specialty === specialty;
    const genderMatch = gender === "Gender" || clinic.gender.toLowerCase().includes(gender.toLowerCase());
    const conditionMatch = condition === "Condition" || clinic.condition.toLowerCase().includes(condition.toLowerCase());
    const languageMatch = languages === "languages" || clinic.languages.toLowerCase().includes(languages.toLowerCase());
    const ageMatch = allAges || (!childrenOnly && !adultsOnly) || (childrenOnly && clinic.ages.includes("Children")) || (adultsOnly && clinic.ages.includes("Adults"));
    const onlineMatch = !onlineOnly || clinic.online;
    return textMatch && locationMatch && specialtyMatch && genderMatch && conditionMatch && languageMatch && ageMatch && onlineMatch && (!primaryOnly || clinic.specialty === "Primary Care");
  });
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
    visibleClinics.forEach((clinic) => {
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

    if (bounds.length) map.fitBounds(bounds, { padding: [35, 35] });
    else map.setView([2.82, 101.81], 12);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [view, search, locationQuery, specialty, gender, condition, languages, primaryOnly]);

  return (
    <div>
      <Sidebar goTo={goTo} activePage="find-clinic" open={sidebarOpen} />

      <div>{sidebarOpen && <div className="menu-overlay" onClick={() => setSidebarOpen(false)}></div>}</div>
      <main className={`page-main clinic-page ${sidebarOpen ? "" : "sidebar-is-closed"}`}>
        <header className="topbar">
          <div className="top-title"><div className="crumb">⌂ &nbsp;/&nbsp; Findhospital</div><button className="hamburger-button" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button></div>
          <div className="top-actions">
            <TopbarSearch goTo={goTo} />
            <button onClick={() => goTo("login")} className="logout">◉ Log out</button>
            <button type="button" className="topbar-action" aria-label="Settings" onClick={() => goTo("settings")}>⚙</button><button type="button" className="topbar-action" aria-label="My account" onClick={() => goTo("my-account")}>♟</button>
          </div>
        </header>

        <section className="clinic-banner">
          <div className="banner-breadcrumb">⌂ &nbsp;/&nbsp; Findhospital</div>
          <div className="banner-center">
            <h1>Find a Clinic</h1>
            <p>Search Clinics and schedule an appointment with doctors through Clinic</p>
            <div className="doctor-search-row">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search clinic or specialty" />
              <input value={locationQuery} onChange={(e) => setLocationQuery(e.target.value)} placeholder="Zip code or Neighborhood" />
              <button onClick={() => { setLocationQuery("Nilai"); setSearchMessage("Showing clinics around Nilai, Malaysia."); }}>CURRENT</button>
              <button onClick={() => setSearchMessage(visibleClinics.length ? `${visibleClinics.length} clinic(s) found.` : "No clinics found. Try another name, specialty, or location.")}>SEARCH</button>
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
              <label><input type="checkbox" checked={allAges} onChange={(e) => { setAllAges(e.target.checked); if (e.target.checked) { setChildrenOnly(false); setAdultsOnly(false); } }} /> All Ages</label>
              <label><input type="checkbox" checked={childrenOnly} onChange={(e) => { setChildrenOnly(e.target.checked); if (e.target.checked) setAllAges(false); }} /> Children</label>
              <label><input type="checkbox" checked={adultsOnly} onChange={(e) => { setAdultsOnly(e.target.checked); if (e.target.checked) setAllAges(false); }} /> Adults</label>

              <h3>View Only</h3>
              <label><input type="checkbox" checked={onlineOnly} onChange={(e) => setOnlineOnly(e.target.checked)} /> Online Scheduling</label>
              <label><input type="checkbox" checked={primaryOnly} onChange={(e) => setPrimaryOnly(e.target.checked)} /> Primary Care</label>
            </aside>

            {searchMessage && <p className="functional-notice">{searchMessage}</p>}
            {view === "map" ? (
              <><div ref={mapRef} className="real-map" />{visibleClinics.length === 0 && <div className="functional-empty-state">No clinics match your search and filters.</div>}</>
            ) : (
              <div className="clinic-list">
                {visibleClinics.map((clinic) => (
                  <div className="clinic-list-item" key={name}>
                    <div className="clinic-avatar">+</div>
                    <div>
                      <b>{clinic.name}</b>
                      <p>{clinic.specialty} · Online scheduling</p>
                    </div>
                  </div>
                ))}
                {visibleClinics.length === 0 && <div className="functional-empty-state">No clinics found. Adjust your search or filters.</div>}
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
