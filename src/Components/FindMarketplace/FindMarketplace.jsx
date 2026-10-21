import { useState } from "react";
import "./FindMarketplace.css";
import Sidebar from "../Sidebar/Sidebar";
import TopbarSearch from "../TopbarSearch";
import { readList, writeList, createId } from "../../utils/storage";

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
  const [cart, setCart] = useState(() => readList("mypatienthub-cart", []));
  const [tableLimit, setTableLimit] = useState("7");
  const [tableQuery, setTableQuery] = useState("");
  const [showCart, setShowCart] = useState(false);

  const visibleProducts = products.filter((item) =>
    item.join(" ").toLowerCase().includes(query.trim().toLowerCase())
  );
  const visibleRows = tableRows.filter((row) => row.join(" ").toLowerCase().includes(tableQuery.trim().toLowerCase())).slice(0, Number(tableLimit));
  function addToCart(item) {
    const [category, name, price, description] = item;
    const existing = cart.find((entry) => entry.name === name && entry.source === "marketplace");
    const next = existing ? cart.map((entry) => entry.id === existing.id ? { ...entry, quantity: entry.quantity + 1 } : entry) : [...cart, { id: createId(), category, name, price, description, source: "marketplace", quantity: 1 }];
    setCart(next); writeList("mypatienthub-cart", next); setMessage(`${name} was added to your cart.`);
  }
  function removeCartItem(id) { const next = cart.filter((item) => item.id !== id); setCart(next); writeList("mypatienthub-cart", next); }
  function updateCartQuantity(id, delta) {
    const next = cart.map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0);
    setCart(next); writeList("mypatienthub-cart", next);
  }

  return (
    <div>
      <Sidebar goTo={goTo} activePage="marketplace" open={sidebarOpen} />

      <div>{sidebarOpen && <div className="menu-overlay" onClick={() => setSidebarOpen(false)}></div>}</div>
      <main className={`page-main market-page ${sidebarOpen ? "" : "sidebar-is-closed"}`}>
        <header className="topbar">
          <div className="top-title"><div className="crumb">⌂ &nbsp;/&nbsp; Marketplace</div><button className="hamburger-button" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button></div>
          <div className="top-actions">
            <TopbarSearch goTo={goTo} />
            <button onClick={() => goTo("login")} className="logout">◉ Log out</button>
            <button className="functional-button" onClick={() => setShowCart(true)}>Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</button><button className="market-account-link" onClick={() => goTo("my-account")}>⚙</button>
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
                  <button onClick={() => addToCart([category, name, price, description, color])}>ADD TO CART</button>
                </div>
              </article>
            ))}
          </div>

          {message && <div className="buy-message" role="status">{message}</div>}
          {visibleProducts.length === 0 && <div className="functional-empty-state">No marketplace results found for “{query}”. Try another search.</div>}
        </section>

        <section className="market-table-section">
          <h2 className="other-title">Other results for healthy diet search</h2>
          <div className="table-controls">
            <select value={tableLimit} onChange={(e) => setTableLimit(e.target.value)}>
              <option value="7">7</option><option value="10">10</option><option value="25">25</option>
            </select>
            <input value={tableQuery} onChange={(e) => setTableQuery(e.target.value)} placeholder="Search table..." aria-label="Search marketplace table" />
            <span>entries per page</span>
          </div>

          <div className="market-table">
            <div className="market-table-row header">
              <span>NAME</span><span>CATEGORY</span><span>SERVICE BY</span>
              <span>DISCOUNT</span><span>PRICE</span><span>ID</span>
            </div>

            {visibleRows.map((row, i) => (
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

          {visibleRows.length === 0 ? <div className="functional-empty-state">No matching marketplace items found.</div> : <div className="table-bottom">Showing 1 to {visibleRows.length} of {tableRows.filter((row) => row.join(" ").toLowerCase().includes(tableQuery.trim().toLowerCase())).length} entries</div>}
        </section>

        <footer className="market-footer">
          <span>© 2026, made with ♥ by MyPiHUB for a better web.</span>
          <span>MyPatientHUB &nbsp;&nbsp; About Us &nbsp;&nbsp; Blog</span>
        </footer>
      </main>
      {showCart && <div className="functional-modal-backdrop" role="presentation" onClick={() => setShowCart(false)}><section className="functional-modal" role="dialog" aria-modal="true" aria-labelledby="cart-title" onClick={(event) => event.stopPropagation()}><h2 id="cart-title">Your Cart</h2>{cart.length === 0 ? <div className="functional-empty-state">Your cart is empty. Add a product to get started.</div> : <>{cart.map((item) => <div key={item.id} className="cart-item-row"><div><strong>{item.name}</strong><p>{item.price} · Quantity: {item.quantity}</p><div className="cart-quantity-controls"><button aria-label={`Decrease ${item.name} quantity`} onClick={() => updateCartQuantity(item.id, -1)}>−</button><span>{item.quantity}</span><button aria-label={`Increase ${item.name} quantity`} onClick={() => updateCartQuantity(item.id, 1)}>+</button></div></div><button className="functional-button" onClick={() => removeCartItem(item.id)}>Remove</button></div>)}<p>Items in cart: <strong>{cart.reduce((sum, item) => sum + item.quantity, 0)}</strong></p><p className="functional-notice">Demo checkout: no real payment will be taken.</p><button className="functional-button" onClick={() => { setMessage("Your demo order has been placed."); setCart([]); writeList("mypatienthub-cart", []); setShowCart(false); }}>Place demo order</button></>}<div className="functional-modal-actions"><button className="secondary" onClick={() => setShowCart(false)}>Continue shopping</button></div></section></div>}
    </div>
  );
}

export default FindMarketplace;
