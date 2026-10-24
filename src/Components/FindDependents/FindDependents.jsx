import { useState } from "react";
import "./FindDependents.css";
import Sidebar from "../Sidebar/Sidebar";
import TopbarSearch from "../TopbarSearch";
import { readList, writeList, createId } from "../../utils/storage";


// This page lets the user add a family member (dependent) to their account.
// It's a two-step form: first the basic details, then a confirmation screen.
function FindDependents({ goTo }) {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 850);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ first: "", last: "", month: "February", day: "1", year: "2021", relation: "", gender: "Male" });
  const [message, setMessage] = useState("");
  const [dependents, setDependents] = useState(() => readList("mypatienthub-dependents", []));

  function update(name, value) { setForm({ ...form, [name]: value }); }

  function nextStep(e) {
    e.preventDefault();
    if (!form.first.trim() || !form.last.trim() || !form.relation) {
      setMessage("Please enter the first name, last name and relation.");
      return;
    }
    setMessage("");
    setStep(2);
  }

  return (
    <div>
      <Sidebar goTo={goTo} activePage="dependents" open={sidebarOpen} />
      {sidebarOpen && <div className="menu-overlay" onClick={() => setSidebarOpen(false)} />}

      <main className={`page-main dependents-page ${sidebarOpen ? "" : "sidebar-is-closed"}`}>
        <header className="topbar">
          <div className="top-title">
            <div className="crumb">⌂ &nbsp;/&nbsp; Mydependents</div>
            <button className="hamburger-button" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          </div>
          <div className="top-actions">
            <TopbarSearch goTo={goTo} />
            <button onClick={() => goTo("login")} className="logout">◉ Log out</button>
            <button type="button" className="topbar-action" aria-label="Settings" onClick={() => goTo("settings")}>⚙</button><button type="button" className="topbar-action" aria-label="My account" onClick={() => goTo("my-account")}>♟</button>
          </div>
        </header>

        <div className="dependents-heading">
          <div>⌂ &nbsp;/&nbsp; Mydependents</div>
          <h1>Mydependents</h1>
        </div>

        <section className="dependents-content">
          <div className="dependents-intro">
            <h2>Build Your Profile</h2>
            <p>This information will let us know more about your Family</p>
          </div>

          <div className="steps">
            <div className={`step ${step >= 1 ? "active" : ""}`}><span>●</span><b>Dependents Registration</b></div>
            <div className={`step ${step >= 2 ? "active" : ""}`}><span>○</span><b>Dependents Health Records</b></div>
            <div className="step"><span>○</span><b>Family Care Plan</b></div>
          </div>

          <div className="dependent-card">
            {step === 1 ? (
              <form onSubmit={nextStep}>
                <h2>Let's start with the basic information</h2>
                <p>Let us know with name and last name. Contacting you at</p>
                <div className="form-grid">
                  <label>First Name<input value={form.first} onChange={(e) => update("first", e.target.value)} placeholder="Eg. Michael" /></label>
                  <label>Last Name<input value={form.last} onChange={(e) => update("last", e.target.value)} placeholder="Eg. Tomson" /></label>
                  <label>Birth Date<div className="select-row"><select value={form.month} onChange={(e) => update("month", e.target.value)}><option>February</option><option>January</option><option>March</option></select><select value={form.day} onChange={(e) => update("day", e.target.value)}><option>1</option><option>2</option><option>3</option></select><select value={form.year} onChange={(e) => update("year", e.target.value)}><option>2021</option><option>2020</option><option>2019</option></select></div></label>
                  <label>I'm<select value={form.gender} onChange={(e) => update("gender", e.target.value)}><option>Male</option><option>Female</option></select></label>
                  <label>Relation<select value={form.relation} onChange={(e) => update("relation", e.target.value)}><option value="">Eg. Brother Child</option><option>Brother</option><option>Sister</option><option>Child</option><option>Parent</option></select></label>
                </div>
                {message && <div className="dependent-message">{message}</div>}
                <button className="next-button" type="submit">NEXT</button>
              </form>
            ) : (
              <div className="dependent-success">
                <h2>Dependents health records</h2>
                <p>Review the information, then save this family member to your account.</p>
                <div className="dependent-review"><strong>{form.first} {form.last}</strong><span>{form.relation} · {form.gender}</span><span>{form.month} {form.day}, {form.year}</span></div>
                <div className="dependent-actions"><button type="button" onClick={() => setStep(1)}>BACK</button><button type="button" onClick={() => { const next = [...dependents, { id: createId(), ...form }]; setDependents(next); writeList("mypatienthub-dependents", next); setMessage(`${form.first} ${form.last} was added successfully.`); setForm({ first: "", last: "", month: "February", day: "1", year: "2021", relation: "", gender: "Male" }); setStep(1); }}>SAVE DEPENDENT</button></div>
              </div>
            )}
          </div>
          {message && step === 1 && <div className="functional-notice" role="status">{message}</div>}
          {dependents.length > 0 && <section className="saved-dependents"><h2>Saved Dependents ({dependents.length})</h2>{dependents.map((dependent) => <article className="dependent-review" key={dependent.id}><div><strong>{dependent.first} {dependent.last}</strong><span>{dependent.relation} · {dependent.gender}</span><small>{dependent.month} {dependent.day}, {dependent.year}</small></div><button type="button" onClick={() => { const next = dependents.filter((item) => item.id !== dependent.id); setDependents(next); writeList("mypatienthub-dependents", next); }}>Delete</button></article>)}</section>}
        </section>

        <footer className="dependents-footer">
          <span>© 2026, made with ♥ by MyPiHUB for a better web.</span>
          <span>MyPatientHUB &nbsp;&nbsp; About Us &nbsp;&nbsp; Blog</span>
        </footer>
      </main>
    </div>
  );
}

export default FindDependents;
