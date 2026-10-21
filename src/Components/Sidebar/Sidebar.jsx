import { useState } from "react";
import "./Sidebar.css";

function Sidebar({ goTo, activePage, open = true }) {
  const [downloadMessage, setDownloadMessage] = useState("");
  const items = [
    ["▦", "Dashboard", "dashboard"],
    ["▣", "Appointments", "appointments"],
    ["♟", "Find Doctor", "find-doctor"],
    ["▤", "Find Clinic", "find-clinic"],
    ["▤", "Chat", "chat"],
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
        <button className="help-circle" aria-label="Open help chat" onClick={() => goTo("chat")}>?</button>
        <b>Download</b><span>MyPiHUB Mobile App</span>
        <div className="store-buttons"><button title="App Store" onClick={() => setDownloadMessage("The iOS mobile app link is not configured in this demo.")}>●</button><button title="Google Play" onClick={() => setDownloadMessage("The Android mobile app link is not configured in this demo.")}>▶</button></div>{downloadMessage && <small className="download-message" role="status">{downloadMessage}</small>}
      </div>
    </aside>
  );
}
export default Sidebar;
