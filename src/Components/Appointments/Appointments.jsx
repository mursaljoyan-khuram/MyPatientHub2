import { useState } from "react";
import "./Appointments.css";
import Sidebar from "../Sidebar/Sidebar";

const appointmentEvents = {
  3: [{ name: "Blood Bank Visit", color: "blue" }],
  4: [{ name: "Dr. Madina Visit", color: "orange" }],
  5: [{ name: "Dr. Shamsir Visit", color: "red" }],
  10: [{ name: "Apptms DR. Ali", color: "orange" }],
  12: [{ name: "Approved Apptm", color: "pink" }],
  16: [{ name: "Apptms DR. Ali", color: "orange" }],
  21: [{ name: "Lab Checkup", color: "red" }],
  25: [
    { name: "DR. Bilal Visit", color: "blue" },
    { name: "DR. Ibrahim Visit", color: "green" },
  ],
};

const previousAppointments = [
  {
    name: "DR. Mustafa",
    type: "Emergency",
    date: "Tuesday, April 5",
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "DR. KHIRULLAH",
    type: "Consultation",
    date: "Friday, November 2",
    image: "https://i.pravatar.cc/100?img=11",
  },
  {
    name: "DR. Bilal",
    type: "Examination",
    date: "Monday, March 9",
    image: "https://i.pravatar.cc/100?img=13",
  },
];

const chartData = [
  { month: "Jan", emergency: 44, examination: 13, consultation: 11, routine: 21 },
  { month: "Feb", emergency: 55, examination: 23, consultation: 17, routine: 7 },
  { month: "Mar", emergency: 44, examination: 20, consultation: 15, routine: 25 },
  { month: "Apr", emergency: 67, examination: 8, consultation: 15, routine: 13 },
  { month: "May", emergency: 22, examination: 13, consultation: 21, routine: 22 },
  { month: "Jun", emergency: 43, examination: 27, consultation: 14, routine: 8 },
];

function Appointments({ goTo }) {
  const [sidebarOpen, setSidebarOpen] = useState(
    () => window.innerWidth > 850
  );
  const [calendarDate, setCalendarDate] = useState(new Date(2022, 3, 1));
  const [search, setSearch] = useState("");

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const monthName = calendarDate.toLocaleString("en-US", {
    month: "long",
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();

  const calendarDays = [];

  for (let i = 0; i < 42; i++) {
    if (i < firstDay) {
      calendarDays.push({
        day: daysInPreviousMonth - firstDay + i + 1,
        outside: true,
        key: `prev-${i}`,
      });
    } else if (i >= firstDay + daysInMonth) {
      calendarDays.push({
        day: i - firstDay - daysInMonth + 1,
        outside: true,
        key: `next-${i}`,
      });
    } else {
      calendarDays.push({
        day: i - firstDay + 1,
        outside: false,
        key: `current-${i}`,
      });
    }
  }

  const filteredAppointments = previousAppointments.filter((appointment) =>
    `${appointment.name} ${appointment.type}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function changeMonth(amount) {
    setCalendarDate(new Date(year, month + amount, 1));
  }

  return (
    <div className="appointments-layout">
      <Sidebar
        goTo={goTo}
        activePage="appointments"
        open={sidebarOpen}
      />

      {sidebarOpen && (
        <div
          className="appointment-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main
        className={`page-main appointments-page ${
          sidebarOpen ? "" : "sidebar-is-closed"
        }`}
      >
        <header className="topbar appointment-topbar">
          <div className="appointment-top-title">
            <div className="crumb">⌂ &nbsp;/&nbsp; Appointment</div>
            <button
              className="hamburger-button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
              aria-expanded={sidebarOpen}
            >
              ☰
            </button>
          </div>

          <div className="appointment-top-actions">
            <label className="appointment-search">
              <span>⌕</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Type here..."
              />
            </label>

            <button
              className="appointment-logout"
              onClick={() => goTo("login")}
            >
              ◉ Log out
            </button>
            <span className="appointment-top-icon">⚙</span>
            <span className="appointment-top-icon">♟</span>
          </div>
        </header>

        <div className="appointments-content">
          <div className="appointments-heading">
            <div>
              
              <h1>Appointment</h1>
             
            </div>

            <button
              className="new-appointment-button"
              onClick={() =>
                alert("Your new appointment form can be connected here.")
              }
            >
              <span>+</span> New Appointment
            </button>
          </div>

          <section className="appointment-stats">
            <div className="procedure-card appointment-chart-card">
              <div className="chart-card-heading">
                <div>
                  <h2>Procedures Taken</h2>
                  <strong>30 <span>+3</span></strong>
                </div>
                <span className="chart-symbol">↗</span>
              </div>

              <div className="mini-line-chart">
                <div className="line-y-labels">
                  <span>80</span>
                  <span>40</span>
                  <span>0</span>
                </div>
                <svg viewBox="0 0 300 100" preserveAspectRatio="none">
                  <path
                    d="M0 68 C20 62 24 76 45 65 S75 65 90 54 S120 64 140 46 S165 56 185 35 S210 50 230 27 S260 35 300 10"
                    fill="none"
                    stroke="#66b8d3"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="mini-chart-months">
                {["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                  (item) => <span key={item}>{item}</span>
                )}
              </div>
            </div>

            <div className="procedure-card appointment-chart-card">
              <div className="chart-card-heading">
                <div>
                  <h2>Treatments Taken</h2>
                  <strong>12 <span>+1</span></strong>
                </div>
                <span className="chart-symbol purple-symbol">✚</span>
              </div>

              <div className="mini-line-chart">
                <div className="line-y-labels">
                  <span>80</span>
                  <span>40</span>
                  <span>0</span>
                </div>
                <svg viewBox="0 0 300 100" preserveAspectRatio="none">
                  <path
                    d="M0 72 C20 62 35 78 55 61 S80 68 100 48 S130 63 150 43 S175 56 195 35 S220 48 245 26 S275 35 300 12"
                    fill="none"
                    stroke="#66b8d3"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="mini-chart-months">
                {["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                  (item) => <span key={item}>{item}</span>
                )}
              </div>
            </div>

            <button
              className="new-appointment-card"
              onClick={() =>
                alert("Your new appointment form can be connected here.")
              }
            >
              <span className="new-appointment-plus">+</span>
              <strong>New Appointment</strong>
              <small>Book a visit with your doctor</small>
            </button>
          </section>

          <section className="appointment-lower-grid">
            <div className="calendar-card">
              <div className="calendar-heading">
                <div>
                  <h2>{monthName} {year}</h2>
                  <p>Keep track of your scheduled visits</p>
                </div>

                <div className="calendar-controls">
                  <button
                    onClick={() => setCalendarDate(new Date())}
                    className="today-button"
                  >
                    today
                  </button>
                  <button
                    onClick={() => changeMonth(-1)}
                    aria-label="Previous month"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => changeMonth(1)}
                    aria-label="Next month"
                  >
                    ›
                  </button>
                </div>
              </div>

              <div className="calendar-grid calendar-weekdays">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => <div key={day}>{day}</div>
                )}
              </div>

              <div className="calendar-grid calendar-days">
                {calendarDays.map((item) => (
                  <div
                    className={`calendar-day ${
                      item.outside ? "outside-month" : ""
                    }`}
                    key={item.key}
                  >
                    <span className="calendar-day-number">{item.day}</span>

                    {!item.outside &&
                      month === 3 &&
                      year === 2022 &&
                      appointmentEvents[item.day]?.map((event, index) => (
                        <span
                          className={`calendar-event event-${event.color}`}
                          key={`${event.name}-${index}`}
                        >
                          {event.name}
                        </span>
                      ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="appointment-side-column">
              <section className="appointment-bar-card">
                <div className="side-card-heading">
                  <div>
                    <h2>Appointment</h2>
                    <p>Monthly appointment overview</p>
                  </div>
                  <span>☰</span>
                </div>

                <div className="appointment-bar-chart">
                  <div className="bar-y-axis">
                    <span>120</span>
                    <span>90</span>
                    <span>60</span>
                    <span>30</span>
                    <span>0</span>
                  </div>

                  <div className="bar-months">
                    {chartData.map((data) => (
                      <div className="bar-month-column" key={data.month}>
                        <div className="stacked-bar">
                          <span
                            className="bar-segment bar-routine"
                            style={{ height: `${data.routine / 120 * 100}%` }}
                            title={`Routine Checkup: ${data.routine}`}
                          >
                            {data.routine}
                          </span>
                          <span
                            className="bar-segment bar-consultation"
                            style={{ height: `${data.consultation / 120 * 100}%` }}
                            title={`Consultation: ${data.consultation}`}
                          >
                            {data.consultation}
                          </span>
                          <span
                            className="bar-segment bar-examination"
                            style={{ height: `${data.examination / 120 * 100}%` }}
                            title={`Examination: ${data.examination}`}
                          >
                            {data.examination}
                          </span>
                          <span
                            className="bar-segment bar-emergency"
                            style={{ height: `${data.emergency / 120 * 100}%` }}
                            title={`Emergency: ${data.emergency}`}
                          >
                            {data.emergency}
                          </span>
                        </div>
                        <small>{data.month}</small>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="appointment-chart-legend">
                  <span><i className="legend-blue" /> Emergency</span>
                  <span><i className="legend-green" /> Examination</span>
                  <span><i className="legend-orange" /> Consultation</span>
                  <span><i className="legend-red" /> Routine Checkup</span>
                </div>
              </section>

              <section className="previous-appointments-card">
                <div className="side-card-heading">
                  <div>
                    <h2>Previous Appointments</h2>
                    <p>Your recent doctor visits</p>
                  </div>
                  <span>☰</span>
                </div>

                <div className="previous-appointments-list">
                  {filteredAppointments.map((appointment) => (
                    <div
                      className="previous-appointment"
                      key={appointment.name}
                    >
                      <img
                        src={appointment.image}
                        alt="Doctor"
                        className="doctor-avatar"
                      />
                      <div className="previous-appointment-info">
                        <strong>{appointment.name}</strong>
                        <span>{appointment.type}</span>
                      </div>
                      <div className="previous-appointment-date">
                        <span>{appointment.date}</span>
                        <button aria-label={`Options for ${appointment.name}`}>
                          ⋮
                        </button>
                      </div>
                    </div>
                  ))}

                  {filteredAppointments.length === 0 && (
                    <p className="no-appointments">
                      No matching appointments found.
                    </p>
                  )}
                </div>
              </section>
            </div>
          </section>

          <footer className="appointments-footer">
            <span>© 2026, made with ♥ by MyPiHUB for a better web.</span>
            <span>MyPatientHUB &nbsp; About Us &nbsp; Blog</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default Appointments;