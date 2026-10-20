import "./Sidebar.css";

function Sidebar({ goTo, activePage, open = true }) {
  const items = [
    ["▦", "Dashboard", "dashboard"],
    ["▣", "Appointments", "appointments"],
    ["♟", "Find Doctor", "find-doctor"],
    ["▤", "Find Clinic", "find-clinic"],
    ["▤", "Chat", "none"],
    ["▣", "Find MarketPlace", "marketplace"],
    ["♨", "Find Pharmacy", "find-pharmacy"],
    ["▣", "My Dependents", "dependents"],
    ["⚒", "My Account", "my-account"],
    ["⚙", "Settings", "settings"]
  ];

  return (
    <aside className={`sidebar ${open ? "sidebar-open" : "sidebar-closed"}`}>
      <div className="side-logo">
        <div className="side-logo-mark">M</div>
        <div className="side-logo-text">MyPatient<span>HUB</span></div>
      </div>
      <nav className="side-menu">
        {items.map(([icon, label, page]) => (
          <button key={label} className={`side-item ${activePage === page ? "selected" : ""}`} onClick={() => page !== "none" && goTo(page)}>
            <span className="side-icon">{icon}</span><span className="side-label">{label}</span>
          </button>
        ))}
      </nav>
      <div className="download-box">
        <div className="help-circle">?</div>
        <b>Download</b><span>MyPiHUB Mobile App</span>
        <div className="store-buttons"><button>●</button><button>▶</button></div>
      </div>
    </aside>
  );
}
export default Sidebar;
