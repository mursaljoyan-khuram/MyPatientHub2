import "./FindDoctor.css";

import Sidebar from "../Sidebar/Sidebar";

function FindDoctor({ goTo }) {
  return (
    <div className="find-doctor-page">
      <Sidebar
        goTo={goTo}
        activePage="find-doctor"
      />

      <div className="doctor-main">

        {/* Top Bar */}
        <header className="doctor-topbar">
          <div className="doctor-top-left">
            <button className="hamburger">☰</button>

            <div>
              <div className="doctor-breadcrumb">
                ⌂ <span>/</span> Searchdoctor
              </div>

              <h1>Searchdoctor</h1>
            </div>
          </div>

          <div className="doctor-top-right">
            <div className="doctor-search">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Type here..."
              />
            </div>

            <button
              className="doctor-logout"
              onClick={() => goTo("login")}
            >
              ↪ Log out
            </button>

            <button className="top-icon">⚙</button>
            <button className="top-icon">♧</button>
          </div>
        </header>

        <main className="doctor-content">

          {/* Search Banner */}
          <section className="doctor-banner">

            <div className="banner-small">
              <div className="banner-breadcrumb">
                ⌂ <span>/</span> Searchdoctor
              </div>

              <h2>Searchdoctor</h2>
            </div>

            <div className="banner-center">
              <h2>
                Find a <span>Doctor</span>
              </h2>

              <p>
                Search doctors and schedule an appointment
              </p>

              <div className="doctor-form">
                <input
                  type="text"
                  placeholder="Search a doctor by name, specialty"
                />

                <input
                  type="text"
                  placeholder="Zip Code or Neighborhood"
                />

                <button className="current-btn">
                  CURRENT
                </button>

                <button className="search-btn">
                  SEARCH
                </button>
              </div>
            </div>

            <div className="banner-menu">
              ☰
            </div>
          </section>

          {/* Special Services */}
          <section className="services-section">
            <h2>Special Services</h2>

            <div className="services-grid">

              <div className="service-card">
                <div className="service-icon">
                  🩺
                </div>

                <div className="service-text">
                  <h3>Primary Care and Internal MD</h3>
                  <p>
                    Our Doctors Partner with you to help you
                    to reach your wellness
                  </p>
                </div>

                <span className="service-arrow">⌄</span>
              </div>

              <div className="service-card">
                <div className="service-icon imaging">
                  ❤️
                </div>

                <div className="service-text">
                  <h3>Imaging Services</h3>
                  <p>
                    From Xray to MR scan we offer...
                  </p>
                </div>

                <span className="service-arrow">⌄</span>
              </div>

              <div className="service-card">
                <div className="service-icon emergency">
                  🩺
                </div>

                <div className="service-text">
                  <h3>Emergency Care</h3>
                  <p>
                    We provide emergency care for adults
                    and children
                  </p>
                </div>

                <span className="service-arrow">⌄</span>
              </div>

              <div className="service-card">
                <div className="service-icon urgent">
                  ✚
                </div>

                <div className="service-text">
                  <h3>Urgent Care</h3>
                  <p>
                    We offer urgent care for none...
                  </p>
                </div>

                <span className="service-arrow">⌄</span>
              </div>

            </div>
          </section>

          {/* Specialties */}
          <section className="specialty-section">
            <h2>Find Doctors By Specialty</h2>

            <p className="specialty-subtitle">
              Select a Specialty to view all Doctors and
              schedule an Appointment
            </p>

            <div className="specialty-grid">

              <div className="specialty-column">
                <button>Anesthesiology <span>⌄</span></button>
                <button>Emergency medicine <span>⌄</span></button>
                <button>Consultation <span>⌄</span></button>
              </div>

              <div className="specialty-column">
                <button>Dermatology <span>⌄</span></button>
                <button>Neurology <span>⌄</span></button>
                <button>Ophthalmology <span>⌄</span></button>
              </div>

            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="doctor-footer">
          <p>
            © 2026, made with ♥ by MyPiHUB for a better web.
          </p>

          <div>
            <a href="#patient">MyPatientHUB</a>
            <a href="#about">About Us</a>
            <a href="#blog">Blog</a>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default FindDoctor;