import { useState } from "react";
import "./FindMarketplace.css";
import Sidebar from "../Sidebar/Sidebar";

const foodImage =
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80";

const products = [
  ["Healthy Diet", "Food Panda", "5 RM", "As Uber works through a huge amount of internal management turmoil.", "pink"],
  ["Healthy Diet", "Grab Food", "10 RM", "Music is something that every person has his or her own taste.", "red"],
  ["Healthy Diet", "Deliveroo", "15 RM", "Different people have different taste, and various types of music.", "green"],
  ["Healthy Diet", "Minimalist", "20 RM", "Different people have different taste, and various types of music.", "red"]
];

const tableRows = [
  ["Healthy Diet", "Food", "Food panda", "0", "10 RM", "24358284234"],
  ["Healthy Diet", "Food", "Grab Food", "5", "9 RM", "877712"],
  ["Healthy Diet", "Food", "Deliveroo", "9", "25 RM", "0134729"],
  ["Healthy Diet", "Food", "Food panda", "5", "15 RM", "113213"],
  ["Healthy Diet", "Food", "Food panda", "7", "25 RM", "634729"],
  ["Healthy Diet", "Food", "Food panda", "0", "20 RM", "634729"]
];

function FindMarketplace({ goTo }) {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 850);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  const visibleProducts = products.filter((item) =>
    item.join(" ").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <Sidebar goTo={goTo} activePage="marketplace" open={sidebarOpen} />

      <div>{sidebarOpen && <div className="menu-overlay" onClick={() => setSidebarOpen(false)}></div>}</div>
      <main className={`page-main market-page ${sidebarOpen ? "" : "sidebar-is-closed"}`}>
        <header className="topbar">
          <div className="top-title"><div className="crumb">⌂ &nbsp;/&nbsp; Marketplace</div><button className="hamburger-button" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button></div>
          <div className="top-actions">
            <div className="top-search">⌕ <input placeholder="Type here..." /></div>
            <button onClick={() => goTo("login")} className="logout">◉ Log out</button>
            <span>⚙</span><span>♟</span>
          </div>
        </header>

        

        <section className="market-results">
          <h2>Search Marketplaces and order what you need</h2>

          <div className="market-search">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
            />
          </div>

          <div className="product-row">
            {visibleProducts.map(([category, name, price, description, color]) => (
              <article className="market-product" key={name}>
                <img src={foodImage} alt="Healthy Diet" />
                <div className="product-text">
                  <span>{category}</span>
                  <h3>
                    <i className={`brand-dot ${color}`}>●</i> {name}
                  </h3>
                  <p>{description}</p>
                  <div className="product-price">{price}</div>
                  <button onClick={() => setMessage(`You selected BUY NOW for ${name}.`)}>BUY NOW</button>
                </div>
              </article>
            ))}
          </div>

          {message && <div className="buy-message">{message}</div>}
        </section>

        <section className="market-table-section">
          <h2 className="other-title">Other results for healthy diet search</h2>
          <div className="table-controls">
            <select defaultValue="7">
              <option>7</option><option>10</option><option>25</option>
            </select>
            <span>entries per page</span>
          </div>

          <div className="market-table">
            <div className="market-table-row header">
              <span>NAME</span><span>CATEGORY</span><span>SERVICE BY</span>
              <span>DISCOUNT</span><span>PRICE</span><span>ID</span>
            </div>

            {tableRows.map((row, i) => (
              <div className="market-table-row" key={i}>
                <span><img src={foodImage} alt="" />{row[0]}</span>
                <span>{row[1]}</span>
                <span><b className="brand-dot red">●</b> {row[2]}</span>
                <span>{row[3]}</span>
                <span>{row[4]}</span>
                <span>{row[5]}</span>
              </div>
            ))}
          </div>

          <div className="table-bottom">
            Showing 1 to 6 of 6 entries
          </div>
        </section>

        <footer className="market-footer">
          <span>© 2026, made with ♥ by MyPiHUB for a better web.</span>
          <span>MyPatientHUB &nbsp;&nbsp; About Us &nbsp;&nbsp; Blog</span>
        </footer>
      </main>
    </div>
  );
}

export default FindMarketplace;
