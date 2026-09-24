import "./Sidebar.css";

function Sidebar({ goTo, activePage }) {
  const menu = [
    ["▦", "Dashboard", "dashboard"],
    ["▣", "Appointments", "none"],
    ["⚕", "Find Doctor", "find-doctor"],
    ["▤", "Find Clinic", "find-clinic"],
    ["◫", "Chat", "none"],
    ["▰", "Find MarketPlace", "none"],
    ["●", "Find Pharmacy", "none"],
    ["♙", "My Dependents", "none"],
    ["♙", "My Account", "none"],
    ["⚙", "Settings", "none"],
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-mark">M</span>

        <span className="logo-text">
          MyPatient<b>HUB</b>
        </span>
      </div>

      <nav className="sidebar-nav">
        {menu.map(([icon, label, link]) => (
          <button
            key={label}
            className={`nav-item ${
              activePage === link ? "active" : ""
            }`}
            onClick={() => {
              if (link !== "none") {
                goTo(link);
              }
            }}
          >
            <span className="nav-icon">{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <button className="help-btn">?</button>
    </aside>
  );
}

export default Sidebar;