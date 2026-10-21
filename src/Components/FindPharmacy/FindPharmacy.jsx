import { useState } from "react";
import "./FindPharmacy.css";
import Sidebar from "../Sidebar/Sidebar";
import TopbarSearch from "../TopbarSearch";
import { readList, writeList, createId } from "../../utils/storage";

const medicines = [
  ["Esomeprazole", "Carry Medical", "10 RM", "Carry Medical Provide Fresh and Excellent Quality Drugs"],
  ["Esomeprazole", "Pool Medical", "9 RM", "High Quality is Our strength we provide good"],
  ["Esomeprazole", "OK Pharmacy", "8 RM", "Different people have different taste, and various types of tablet."],
  ["Esomeprazole", "Hamza Pharma", "11 RM", "Different people have different taste, and various types of music."]
];

const tableRows = [
  ["Esso", "Tablet", "Caring Pharmacy", "1", "5 RM", "8234"],
  ["Esso", "Tablet", "OK Pharmacy", "3", "9 RM", "872"],
  ["Esso", "Tablet", "Hilton Medical", "5", "7 RM", "0734"],
  ["Esso", "Tablet", "Hinucon Pharma", "5", "9 RM", "113"],
  ["Esso", "Tablet", "Hamza Medical Pharmacy", "7", "20 RM", "629"],
  ["Esso", "Tablet", "Food Panda", "0", "20 RM", "634729"]
];

function MedicineBox() {
  return <div className="medicine-box"><img src="https://mypihub.web.app/static/media/medicine1.e1c0a2080a47f1c84a48.jfif" alt="" /></div>;
}

function FindPharmacy({ goTo }) {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 850);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState(() => readList("mypatienthub-cart", []));
  const [tableLimit, setTableLimit] = useState("7");

  const visibleMedicines = medicines.filter((item) =>
    item.join(" ").toLowerCase().includes(query.trim().toLowerCase())
  );
  const visibleRows = tableRows.filter((row) => row.join(" ").toLowerCase().includes(query.trim().toLowerCase())).slice(0, Number(tableLimit));
  function addMedicineToCart(item) {
    const [medicine, pharmacy, price, description] = item;
    const existing = cart.find((entry) => entry.name === medicine && entry.pharmacy === pharmacy);
    const next = existing ? cart.map((entry) => entry.id === existing.id ? { ...entry, quantity: entry.quantity + 1 } : entry) : [...cart, { id: createId(), name: medicine, pharmacy, price, description, source: "pharmacy", quantity: 1 }];
    setCart(next); writeList("mypatienthub-cart", next); setMessage(`${medicine} from ${pharmacy} was added to your cart.`);
  }

  return (
    <div>
      <Sidebar goTo={goTo} activePage="find-pharmacy" open={sidebarOpen} />
      {sidebarOpen && <div className="menu-overlay" onClick={() => setSidebarOpen(false)} />}

      <main className={`page-main pharmacy-page ${sidebarOpen ? "" : "sidebar-is-closed"}`}>
        <header className="topbar">
          <div className="top-title">
            <div className="crumb">⌂ &nbsp;/&nbsp; Pharmacy</div>
            <button className="hamburger-button" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          </div>
          <div className="top-actions">
            <TopbarSearch goTo={goTo} />
            <button onClick={() => goTo("login")} className="logout">◉ Log out</button>
            <button className="functional-button" onClick={() => goTo("marketplace")}>Marketplace Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</button><button className="market-account-link" onClick={() => goTo("settings")}>⚙</button>
          </div>
        </header>


        <section className="pharmacy-results">
          <h2>Search Pharmacies for Medicines</h2>
          <div className="pharmacy-search">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
          </div>

          <div className="medicine-grid">
            {visibleMedicines.map(([medicine, pharmacy, price, description]) => (
              <article className="medicine-card" key={pharmacy}>
                <MedicineBox />
                <div className="medicine-info">
                  <span>{medicine}</span>
                  <h3><i>●</i> {pharmacy}</h3>
                  <p>{description}</p>
                  <strong>{price}</strong>
                  <button onClick={() => addMedicineToCart([medicine, pharmacy, price, description])}>ADD TO CART</button>
                </div>
              </article>
            ))}
          </div>
          {message && <div className="pharmacy-message" role="status">{message}</div>}
          {visibleMedicines.length === 0 && <div className="functional-empty-state">No medicines found for “{query}”. Try another search.</div>}
        </section>

        <section className="pharmacy-table-section">
          <h2 className="pharmacy-other">{visibleRows.length} medicine results{query ? ` for “${query}”` : ""}</h2>
          <div className="pharmacy-table-top">
            <select value={tableLimit} onChange={(e) => setTableLimit(e.target.value)}><option value="7">7</option><option value="10">10</option><option value="25">25</option></select>
            <span>entries per page</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
          </div>
          <div className="pharmacy-table">
            <div className="pharmacy-table-row header">
              <span>NAME</span><span>CATEGORY</span><span>SERVICE BY</span><span>DISCOUNT</span><span>PRICE</span><span>ID</span>
            </div>
            {visibleRows.map((row, i) => (
              <div className="pharmacy-table-row" key={i}>
                <span><MedicineBox />{row[0]}</span><span>{row[1]}</span><span>{row[2]}</span><span>{row[3]}</span><span>{row[4]}</span><span>{row[5]}</span>
              </div>
            ))}
          </div>
          {visibleRows.length === 0 ? <div className="functional-empty-state">No matching medicines found.</div> : <div className="pharmacy-table-bottom">Showing 1 to {visibleRows.length} of {tableRows.filter((row) => row.join(" ").toLowerCase().includes(query.trim().toLowerCase())).length} entries</div>}
        </section>

        <footer className="pharmacy-footer">
          <span>© 2026, made with ♥ by MyPiHUB for a better web.</span>
          <span>MyPatientHUB &nbsp;&nbsp; About Us &nbsp;&nbsp; Blog</span>
        </footer>
      </main>
    </div>
  );
}

export default FindPharmacy;
