import { useState } from "react";
import "./MyAccount.css";
import Sidebar from "../Sidebar/Sidebar";

function MyAccount({ goTo }) {
  const [sidebarOpen, setSidebarOpen] = useState(
    () => window.innerWidth > 850
  );

  const invoices = [
    ["March, 01, 2020", "#MS-154564", "$180"],
    ["February, 10, 2021", "#RV-172649", "$250"],
    ["April, 05, 2020", "#QW-103578", "$120"],
    ["June, 25, 2019", "#MS-154564", "$180"],
    ["March, 01, 2019", "#AR-803481", "$300"],
  ];

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
            <div className="top-search">
              ⌕ <input placeholder="Type here..." />
            </div>

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

                <button className="add-card-button">
                  + ADD NEW CARD
                </button>
              </div>

              <div className="saved-card">
                <div className="payment-brand mastercard-small">
                  <i></i>
                  <i></i>
                </div>

                <span>**** &nbsp; **** &nbsp; **** &nbsp; 7852</span>

                <button aria-label="Edit Mastercard">✎</button>
              </div>

              <div className="saved-card">
                <div className="payment-brand visa-small">
                  VISA
                </div>

                <span>**** &nbsp; **** &nbsp; **** &nbsp; 5248</span>

                <button aria-label="Edit Visa">✎</button>
              </div>
            </section>

            <section className="invoices-panel panel">
              <div className="invoice-heading">
                <h2>Invoices</h2>

                <label className="invoice-search">
                  ⌕
                  <input placeholder="Type here..." />
                </label>
              </div>

              <div className="invoice-list">
                {invoices.map(([date, number, amount]) => (
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

                    <button className="pdf-button">
                      ▣ PDF
                    </button>
                  </div>
                  
                ))}
              </div>
              

              <button className="view-all-button">
                VIEW ALL
              </button>

              
            </section>
            {/* Billing Information and Transactions */}
      <div className="account-extra-grid">
        <section className="billing-panel panel">
          <div className="panel-heading">
            <h2>Billing Information</h2>
          </div>

          <div className="billing-list">
            {[
              {
                name: "Oliver Liam",
                company: "Viking Burrito",
                email: "oliver@burrito.com",
                vat: "FRB1235476",
              },
              {
                name: "Lucas Harper",
                company: "Stone Tech Zone",
                email: "lucas@stone-tech.com",
                vat: "FRB1235476",
              },
              {
                name: "Ethan James",
                company: "Fiber Notion",
                email: "ethan@fiber.com",
                vat: "FRB1235476",
              },
            ].map((person) => (
              <div className="billing-item" key={person.name}>
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
                    onClick={() => alert("Delete billing information")}
                  >
                    ▣ DELETE
                  </button>
                  <button
                    className="edit-billing"
                    onClick={() => alert("Edit billing information")}
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

      
    </div>
  );
}

export default MyAccount;