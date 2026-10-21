import { useState } from "react";
import "./MyAccount.css";
import Sidebar from "../Sidebar/Sidebar";
import TopbarSearch from "../TopbarSearch";
import { readList, writeList, createId } from "../../utils/storage";

function MyAccount({ goTo }) {
  const [sidebarOpen, setSidebarOpen] = useState(
    () => window.innerWidth > 850
  );

  const [invoices] = useState([
    ["March, 01, 2020", "#MS-154564", "$180"], ["February, 10, 2021", "#RV-172649", "$250"],
    ["April, 05, 2020", "#QW-103578", "$120"], ["June, 25, 2019", "#MS-154564", "$180"],
    ["March, 01, 2019", "#AR-803481", "$300"],
  ]);
  const [invoiceQuery, setInvoiceQuery] = useState("");
  const [billing, setBilling] = useState(() => readList("mypatienthub-billing", [
    { id: "bill-1", name: "Oliver Liam", company: "Viking Burrito", email: "oliver@burrito.com", vat: "FRB1235476" },
    { id: "bill-2", name: "Lucas Harper", company: "Stone Tech Zone", email: "lucas@stone-tech.com", vat: "FRB1235476" },
    { id: "bill-3", name: "Ethan James", company: "Fiber Notion", email: "ethan@fiber.com", vat: "FRB1235476" },
  ]));
  const [cards, setCards] = useState(() => readList("mypatienthub-payment-cards", [
    { id: "card-1", brand: "Mastercard", last4: "7852" }, { id: "card-2", brand: "Visa", last4: "5248" },
  ]));
  const [cardDialog, setCardDialog] = useState(null);
  const [cardError, setCardError] = useState("");
  const [cardForm, setCardForm] = useState({ brand: "Visa", number: "", expiry: "" });
  const [billingDialog, setBillingDialog] = useState(null);
  const [billingForm, setBillingForm] = useState({ name: "", company: "", email: "", vat: "" });
  const [accountNotice, setAccountNotice] = useState("");
  const visibleInvoices = invoices.filter((invoice) => invoice.join(" ").toLowerCase().includes(invoiceQuery.trim().toLowerCase()));

  return (
    <div className="account-layout">
      <Sidebar
        goTo={goTo}
        activePage="my-account"
        open={sidebarOpen}
      />

      {sidebarOpen && (
        <div
          className="menu-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main
        className={`page-main account-page ${
          sidebarOpen ? "" : "sidebar-is-closed"
        }`}
      >
        <header className="topbar account-topbar">
          <div className="top-title">
            <div className="crumb">
              ⌂ &nbsp;/&nbsp; MyAccount
            </div>

            <button
              className="hamburger-button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
              aria-expanded={sidebarOpen}
            >
              ☰
            </button>
          </div>

          <div className="top-actions">
            <TopbarSearch goTo={goTo} />

            <button
              onClick={() => goTo("login")}
              className="logout"
            >
              ◉ Log out
            </button>

            <span>⚙</span>
            <span>♟</span>
          </div>
        </header>

        <div className="account-content">
          {accountNotice && <div className="functional-notice" role="status">{accountNotice}</div>}
          <div className="account-title-row">
            <h1>MyAccount</h1>
          </div>

          <div className="account-top-grid">
            <section className="bank-card">
              <div className="bank-card-contactless">⌁</div>

              <div className="bank-card-number">
                4562&nbsp; 1122&nbsp; 4594&nbsp; 7852
              </div>

              <div className="bank-card-bottom">
                <div>
                  <small>Card holder</small>
                  <strong>Jack Peterson</strong>
                </div>

                <div>
                  <small>Expires</small>
                  <strong>11/22</strong>
                </div>
              </div>

              <div className="mastercard-mark">
                <i></i>
                <i></i>
              </div>
            </section>

            <section className="account-summary-card">
              <div className="summary-icon">▤</div>

              <div>
                <h3>Account Balance</h3>
                <p>Payments</p>
                <strong>+$2000</strong>
              </div>
            </section>

            <section className="account-summary-card">
              <div className="summary-icon">P</div>

              <div>
                <h3>Wallet Bank Card</h3>
                <p>Payments</p>
                <strong>$455.00</strong>
              </div>
            </section>
          </div>

          <div className="account-bottom-grid">
            <section className="payment-method panel">
              <div className="panel-heading">
                <h2>Payment Method</h2>

                <button className="add-card-button" onClick={() => { setCardForm({ brand: "Visa", number: "", expiry: "" }); setCardError(""); setCardDialog({ mode: "add" }); }}>
                  + ADD NEW CARD
                </button>
              </div>

              {cards.map((card) => <div className="saved-card" key={card.id}>
                <div className={`payment-brand ${card.brand.toLowerCase()}-small`}>{card.brand}</div>
                <span>**** &nbsp; **** &nbsp; **** &nbsp; {card.last4}</span>
                <div className="saved-card-actions">
                  <button aria-label={`Edit ${card.brand}`} onClick={() => { setCardForm({ brand: card.brand, number: card.last4, expiry: "" }); setCardError(""); setCardDialog({ mode: "edit", id: card.id }); }}>✎</button>
                  <button aria-label={`Delete ${card.brand}`} onClick={() => { if (window.confirm(`Delete the ${card.brand} ending in ${card.last4}?`)) { const next = cards.filter((item) => item.id !== card.id); setCards(next); writeList("mypatienthub-payment-cards", next); setAccountNotice("Payment card deleted."); } }}>×</button>
                </div>
              </div>)}
              {cards.length === 0 && <div className="functional-empty-state">No saved cards. Add a card to see it here.</div>}
            </section>

            <section className="invoices-panel panel">
              <div className="invoice-heading">
                <h2>Invoices</h2>

                <label className="invoice-search">
                  ⌕
                  <input value={invoiceQuery} onChange={(e) => setInvoiceQuery(e.target.value)} placeholder="Search invoices..." />
                </label>
              </div>

              <div className="invoice-list">
                {visibleInvoices.map(([date, number, amount]) => (
                  <div
                    className="invoice-row"
                    key={number + date}
                  >
                    <div className="invoice-info">
                      <strong>{date}</strong>
                      <span>{number}</span>
                    </div>

                    <strong className="invoice-amount">
                      {amount}
                    </strong>

                    <button className="pdf-button" onClick={() => { setAccountNotice(`Preparing invoice ${number} for printing. Use your browser Save as PDF option.`); window.print(); }}>▣ PDF</button>
                  </div>
                  
                ))}
              </div>
              

              {visibleInvoices.length === 0 && <div className="functional-empty-state">No invoices match “{invoiceQuery}”.</div>}
              <button className="view-all-button" onClick={() => setInvoiceQuery("")}>VIEW ALL / CLEAR SEARCH</button>

              
            </section>
            {/* Billing Information and Transactions */}
      <div className="account-extra-grid">
        <section className="billing-panel panel">
          <div className="panel-heading">
            <h2>Billing Information</h2>
            <button className="functional-button" onClick={() => { setBillingForm({ name: "", company: "", email: "", vat: "" }); setBillingDialog({ mode: "add" }); }}>+ Add billing</button>
          </div>

          <div className="billing-list">
            {billing.map((person) => (
              <div className="billing-item" key={person.id}>
                <div className="billing-details">
                  <h3>{person.name}</h3>
                  <p>
                    <strong>Company Name:</strong> {person.company}
                  </p>
                  <p>
                    <strong>Email Address:</strong> {person.email}
                  </p>
                  <p>
                    <strong>VAT Number:</strong> {person.vat}
                  </p>
                </div>

                <div className="billing-actions">
                  <button
                    className="delete-billing"
                    onClick={() => { if (window.confirm(`Delete billing information for ${person.name}?`)) { const next = billing.filter((item) => item.id !== person.id); setBilling(next); writeList("mypatienthub-billing", next); setAccountNotice("Billing information deleted."); } }}
                  >
                    ▣ DELETE
                  </button>
                  <button
                    className="edit-billing"
                    onClick={() => { setBillingForm({ name: person.name, company: person.company, email: person.email, vat: person.vat }); setBillingDialog({ mode: "edit", id: person.id }); }}
                  >
                    ✎ EDIT
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="transactions-panel panel">
          <div className="transactions-heading">
            <h2>Your Transactions</h2>
            <span className="transaction-date">▦ &nbsp; 23 - 30 March 2020</span>
          </div>

          <div className="transaction-group">
            <h3>NEWEST</h3>

            <div className="transaction-item">
              <span className="transaction-icon expense">↓</span>
              <div className="transaction-info">
                <strong>Food</strong>
                <p>27 March 2020, at 12:30 PM</p>
              </div>
              <strong className="transaction-amount expense-text">
                - $ 2,500
              </strong>
            </div>

            <div className="transaction-item">
              <span className="transaction-icon income">↑</span>
              <div className="transaction-info">
                <strong>Medicine</strong>
                <p>27 March 2020, at 04:30 AM</p>
              </div>
              <strong className="transaction-amount income-text">
                + $ 2,000
              </strong>
            </div>
          </div>

          <div className="transaction-group">
            <h3>YESTERDAY</h3>

            <div className="transaction-item">
              <span className="transaction-icon income">↑</span>
              <div className="transaction-info">
                <strong>Appointment</strong>
                <p>26 March 2020, at 12:45 PM</p>
              </div>
              <strong className="transaction-amount income-text">
                + $ 750
              </strong>
            </div>

            <div className="transaction-item">
              <span className="transaction-icon income">↑</span>
              <div className="transaction-info">
                <strong>Marketplace</strong>
                <p>26 March 2020, at 12:30 PM</p>
              </div>
              <strong className="transaction-amount income-text">
                + $ 1,000
              </strong>
            </div>

            <div className="transaction-item">
              <span className="transaction-icon income">↑</span>
              <div className="transaction-info">
                <strong>Pharmacy</strong>
                <p>26 March 2020, at 08:30 AM</p>
              </div>
              <strong className="transaction-amount income-text">
                + $ 2,500
              </strong>
            </div>

            <div className="transaction-item">
              <span className="transaction-icon pending">i</span>
              <div className="transaction-info">
                <strong>Bookings</strong>
                <p>26 March 2020, at 05:00 AM</p>
              </div>
              <strong className="transaction-amount pending-text">
                Pending
              </strong>
            </div>
          </div>
        </section>
          
      </div>
     
          </div>
          

       
        </div>
          <footer className="account-footer">
            <span>
              ©️ 2026, made with ♥️ by MyPiHUB for a better web.
            </span>

            <span>
              MyPatientHUB &nbsp;&nbsp; About Us &nbsp;&nbsp; Blog
            </span>
          </footer>
      </main>
      {cardDialog && <div className="functional-modal-backdrop" onClick={() => setCardDialog(null)}><section className="functional-modal" role="dialog" aria-modal="true" aria-labelledby="card-dialog-title" onClick={(e) => e.stopPropagation()}><h2 id="card-dialog-title">{cardDialog.mode === "add" ? "Add payment card" : "Edit payment card"}</h2><form onSubmit={(e) => { e.preventDefault(); const number = cardForm.number.replace(/\D/g, ""); if (number.length < 4) { setCardError("Enter at least four digits for this demo card."); return; } const next = cardDialog.mode === "add" ? [...cards, { id: createId(), brand: cardForm.brand, last4: number.slice(-4) }] : cards.map((card) => card.id === cardDialog.id ? { ...card, brand: cardForm.brand, last4: number.slice(-4) } : card); setCards(next); writeList("mypatienthub-payment-cards", next); setCardError(""); setAccountNotice("Payment card saved. This demo stores only the card brand and last four digits."); setCardDialog(null); }}><label>Card brand<select value={cardForm.brand} onChange={(e) => setCardForm({ ...cardForm, brand: e.target.value })}><option>Visa</option><option>Mastercard</option><option>American Express</option></select></label><label>Card number (demo)<input required inputMode="numeric" value={cardForm.number} onChange={(e) => setCardForm({ ...cardForm, number: e.target.value })} placeholder="Enter card number" /></label><label>Expiry date<input value={cardForm.expiry} onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })} placeholder="MM/YY" /></label>{cardError && <p className="functional-notice error" role="alert">{cardError}</p>}<p className="functional-notice">Demo only: never enter real payment details. This project does not process payments.</p><div className="functional-modal-actions"><button type="button" className="secondary" onClick={() => setCardDialog(null)}>Cancel</button><button className="primary" type="submit">Save card</button></div></form></section></div>}
      {billingDialog && <div className="functional-modal-backdrop" onClick={() => setBillingDialog(null)}><section className="functional-modal" role="dialog" aria-modal="true" aria-labelledby="billing-dialog-title" onClick={(e) => e.stopPropagation()}><h2 id="billing-dialog-title">{billingDialog.mode === "add" ? "Add billing information" : "Edit billing information"}</h2><form onSubmit={(e) => { e.preventDefault(); const next = billingDialog.mode === "add" ? [...billing, { id: createId(), ...billingForm }] : billing.map((item) => item.id === billingDialog.id ? { ...item, ...billingForm } : item); setBilling(next); writeList("mypatienthub-billing", next); setAccountNotice("Billing information saved."); setBillingDialog(null); }}><label>Name<input required value={billingForm.name} onChange={(e) => setBillingForm({ ...billingForm, name: e.target.value })} /></label><label>Company<input required value={billingForm.company} onChange={(e) => setBillingForm({ ...billingForm, company: e.target.value })} /></label><label>Email<input type="email" required value={billingForm.email} onChange={(e) => setBillingForm({ ...billingForm, email: e.target.value })} /></label><label>VAT number<input value={billingForm.vat} onChange={(e) => setBillingForm({ ...billingForm, vat: e.target.value })} /></label><div className="functional-modal-actions"><button type="button" className="secondary" onClick={() => setBillingDialog(null)}>Cancel</button><button className="primary" type="submit">Save</button></div></form></section></div>}
    </div>
  );
}

export default MyAccount;