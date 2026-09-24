import "./FindClinic.css";
import Sidebar from "../Sidebar/Sidebar";

function FindClinic({ goTo }) {
  return (
    <div className="find-clinic-page">

      <Sidebar
        goTo={goTo}
        activePage="find-clinic"
      />

      <div className="clinic-main">

        {/* Top Bar */}
        <header className="clinic-topbar">

          <div className="clinic-top-left">

            <button className="clinic-hamburger">
              ☰
            </button>

            <div>
              <div className="clinic-breadcrumb">
                ⌂ <span>/</span> Findhospital
              </div>

              <h1>Findhospital</h1>
            </div>

          </div>


          <div className="clinic-top-right">

            <div className="clinic-search">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Type here..."
              />
            </div>

            <button
              className="clinic-logout"
              onClick={() => goTo("login")}
            >
              ↪ Log out
            </button>

            <button className="clinic-icon">
              ⚙
            </button>

            <button className="clinic-icon">
              ♧
            </button>

          </div>

        </header>


        {/* Main Content */}
        <main className="clinic-content">

          {/* Search Banner */}
          <section className="clinic-banner">

            <div className="clinic-banner-left">

              <div>
                ⌂ <span>/</span> Findhospital
              </div>

              <h3>
                Findhospital
              </h3>

            </div>


            <div className="clinic-banner-center">

              <h2>
                Find a <b>Clinic</b>
              </h2>

              <p>
                Search Clinics and schedule an appointment
                with doctors through Clinic
              </p>

              <div className="clinic-form">

                <input
                  type="text"
                  placeholder="Search"
                />

                <input
                  type="text"
                  placeholder="Zip Code or Neighborhood"
                />

                <button>
                  CURRENT
                </button>

                <button>
                  SEARCH
                </button>

              </div>

            </div>


            <div className="clinic-banner-menu">
              ☰
            </div>

          </section>


          {/* Map / List */}
          <div className="clinic-tabs">

            <button className="active-tab">
              ◉ Map
            </button>

            <button>
              ▤ List
            </button>

          </div>


          {/* Filters + Map */}
          <section className="clinic-map-area">

            {/* Filters */}
            <aside className="clinic-filters">

              <input
                type="text"
                placeholder="Primary Care"
              />

              <input
                type="text"
                placeholder="Zip code or Neighborhood"
              />


              <div className="filter-line"></div>


              <h3>
                Filter By
              </h3>


              <button className="filter-select">

                <span>
                  Specialty
                </span>

                <span>
                  ⌄
                </span>

              </button>


              <button className="filter-select">

                <span>
                  Gender
                </span>

                <span>
                  ⌄
                </span>

              </button>


              <button className="filter-select">

                <span>
                  Condition
                </span>

                <span>
                  ⌄
                </span>

              </button>


              <button className="filter-select">

                <span>
                  languages
                </span>

                <span>
                  ⌄
                </span>

              </button>


              <h3 className="provider-title">
                Providers Who Treat
              </h3>


              <label className="check-row">

                <input type="checkbox" />

                <span>
                  All Ages
                </span>

              </label>


              <label className="check-row">

                <input type="checkbox" />

                <span>
                  Children
                </span>

              </label>


              <label className="check-row">

                <input type="checkbox" />

                <span>
                  Adults
                </span>

              </label>


              <div className="filter-line"></div>


              <h3 className="view-title">
                View Only
              </h3>


              <label className="check-row">

                <input type="checkbox" />

                <span>
                  Online Scheduling
                </span>

              </label>


              <label className="check-row">

                <input type="checkbox" />

                <span>
                  Primary Care
                </span>

              </label>

            </aside>


            {/* Online Map */}
            <div className="clinic-map">

              <div className="map-buttons">

                <button className="map-active">
                  Map
                </button>

                <button>
                  Satellite
                </button>

              </div>


              <img
                src="https://images.openai.com/static-rsc-4/NukSZMMWIM0bonrg349iMYWCVHSnDqIl_opR-U2oTQI6qEJTKn4_eEu3Q0XDT85rZvQVuzGKgbJAItbNYzij0B-L3sqWZTzlCpBr20G5VF74WSp0NpY_-6_Ooexxk9uKTKP3-oHX42Aa-NGUb7Pz_2gDgRQ-RBd4wr3L2D-Zm-kq0eSLbbz4wFSaXW2A586I?purpose=fullsize"
                alt="Kuala Lumpur clinic map"
              />


              <button className="map-fullscreen">
                ⛶
              </button>

            </div>

          </section>

        </main>


        {/* Footer */}
        <footer className="clinic-footer">

          <p>
            © 2026, made with ♥ by MyPiHUB for a better web.
          </p>

          <div>

            <a href="#patient">
              MyPatientHUB
            </a>

            <a href="#about">
              About Us
            </a>

            <a href="#blog">
              Blog
            </a>

          </div>

        </footer>

      </div>

    </div>
  );
}

export default FindClinic;