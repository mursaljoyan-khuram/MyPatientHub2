import { useEffect, useMemo, useRef, useState } from "react";
import "./AccountSettings.css";
import Sidebar from "../Sidebar/Sidebar";

const PROFILE_KEY = "mypatienthub-account-profile";

const defaultProfile = {
  firstName: "Azam",
  lastName: "Shah",
  email: "azam@example.com",
  gender: "Male",
  birthMonth: "June",
  birthDay: "1",
  birthYear: "2001",
  bloodGroup: "",
  location: "",
  phone: "",
  height: "",
  weight: "",
  invisible: false,
};

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const passwordRules = [
  { label: "At least 8 characters", test: (v) => v.length >= 8 },
  { label: "One uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { label: "One lowercase letter", test: (v) => /[a-z]/.test(v) },
  { label: "One number", test: (v) => /\d/.test(v) },
  {
    label: "One special character",
    test: (v) => /[^A-Za-z0-9]/.test(v),
  },
];

function loadProfile() {
  try {
    const saved = localStorage.getItem(PROFILE_KEY);
    return saved ? { ...defaultProfile, ...JSON.parse(saved) } : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

function validateProfile(profile) {
  const errors = {};

  if (!profile.firstName.trim()) {
    errors.firstName = "First name is required.";
  } else if (profile.firstName.trim().length > 60) {
    errors.firstName = "First name must be 60 characters or fewer.";
  }

  if (!profile.lastName.trim()) {
    errors.lastName = "Last name is required.";
  } else if (profile.lastName.trim().length > 60) {
    errors.lastName = "Last name must be 60 characters or fewer.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (profile.phone && !/^[+\d\s().-]{7,20}$/.test(profile.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (profile.height) {
    const heightValue = Number(profile.height);
    if (!Number.isFinite(heightValue) || heightValue <= 0 || heightValue > 300) {
      errors.height = "Enter a height between 1 and 300 cm.";
    }
  }

  if (profile.weight) {
    const weightValue = Number(profile.weight);
    if (!Number.isFinite(weightValue) || weightValue <= 0 || weightValue > 700) {
      errors.weight = "Enter a weight between 1 and 700 kg.";
    }
  }

  const year = Number(profile.birthYear);
  const monthIndex = months.indexOf(profile.birthMonth);
  const day = Number(profile.birthDay);
  const date = new Date(year, monthIndex, day);

  if (
    !year ||
    year > new Date().getFullYear() ||
    monthIndex < 0 ||
    date.getFullYear() !== year ||
    date.getMonth() !== monthIndex ||
    date.getDate() !== day
  ) {
    errors.birthDay = "Choose a valid date of birth.";
  }

  return errors;
}

function FieldError({ children }) {
  if (!children) return null;

  return (
    <span className="settings-field-error" role="alert">
      {children}
    </span>
  );
}

function AccountSettings({ goTo }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profile, setProfile] = useState(loadProfile);
  const [savedProfile, setSavedProfile] = useState(() => ({ ...loadProfile() }));
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [profileMessage, setProfileMessage] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [passwordSubmitting, setPasswordSubmitting] = useState(false);

  const [twoFactor, setTwoFactor] = useState(false);
  const [showTwoFactorDialog, setShowTwoFactorDialog] = useState(false);

  const [sessions, setSessions] = useState([
    { id: "current", device: "This browser", location: "Current device", current: true },
    { id: "demo-chrome", device: "Chrome on macOS", location: "Example session", current: false },
    { id: "demo-safari", device: "Safari on iPhone", location: "Example session", current: false },
  ]);
  const [sessionToEnd, setSessionToEnd] = useState(null);

  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  const [accountMessage, setAccountMessage] = useState(null);
  const [activeSection, setActiveSection] = useState("basic-info");
  const [toast, setToast] = useState(null);

  const sectionIds = useMemo(
    () => ["basic-info", "change-password", "two-factor", "sessions", "delete-account"],
    []
  );

  const profileDirty = JSON.stringify(profile) !== JSON.stringify(savedProfile);
  const firstNameRef = useRef(null);

  const passwordChecks = passwordRules.map((rule) => ({
    ...rule,
    passed: rule.test(newPassword),
  }));

  const passwordStrength = passwordChecks.filter((rule) => rule.passed).length;
  const passwordValid = passwordStrength === passwordRules.length;

  function notify(message, type = "success") {
    setToast({ message, type });
  }

  function updateProfile(field, value) {
    setProfile((previous) => ({ ...previous, [field]: value }));
    setProfileMessage(null);

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
  }

  function markTouched(field) {
    setTouched((previous) => ({ ...previous, [field]: true }));
  }

  function visibleError(field) {
    return touched[field] ? errors[field] : undefined;
  }

  useEffect(() => {
    function warnBeforeLeaving(event) {
      if (!profileDirty) return;
      event.preventDefault();
      event.returnValue = "";
    }

    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, [profileDirty]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: [0, 0.25, 0.5] }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  function saveBasicInfo(event) {
    event.preventDefault();

    const nextErrors = validateProfile(profile);
    setErrors(nextErrors);
    setTouched(
      Object.keys(profile).reduce((result, field) => {
        result[field] = true;
        return result;
      }, {})
    );

    if (Object.keys(nextErrors).length > 0) {
      setProfileMessage({
        type: "error",
        text: "Please correct the highlighted fields.",
      });

      firstNameRef.current?.focus();
      return;
    }

    setSavingProfile(true);
    setProfileMessage(null);

    try {
      const normalized = {
        ...profile,
        firstName: profile.firstName.trim(),
        lastName: profile.lastName.trim(),
        email: profile.email.trim(),
      };

      localStorage.setItem(PROFILE_KEY, JSON.stringify(normalized));
      setProfile(normalized);
      setSavedProfile({ ...normalized });
      setProfileMessage({
        type: "success",
        text: "Profile saved in this browser.",
      });
      notify("Your profile has been saved.");
    } catch {
      setProfileMessage({
        type: "error",
        text: "The browser could not save your changes. Check browser storage settings.",
      });
    } finally {
      setSavingProfile(false);
    }
  }

  function resetProfile() {
    if (
      profileDirty &&
      !window.confirm("Discard your unsaved profile changes?")
    ) {
      return;
    }

    setProfile({ ...savedProfile });
    setErrors({});
    setTouched({});
    setProfileMessage({ type: "success", text: "Unsaved changes discarded." });
  }

  function updatePassword(event) {
    event.preventDefault();
    setPasswordMessage(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage({
        type: "error",
        text: "Complete all three password fields.",
      });
      return;
    }

    if (!passwordValid) {
      setPasswordMessage({
        type: "error",
        text: "Your new password does not meet every requirement.",
      });
      return;
    }

    if (newPassword === currentPassword) {
      setPasswordMessage({
        type: "error",
        text: "Choose a new password that differs from your current password.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({
        type: "error",
        text: "The new password and confirmation do not match.",
      });
      return;
    }

    // This frontend has no authentication API, so it cannot change a real password.
    setPasswordSubmitting(true);
    setPasswordMessage({
      type: "info",
      text: "The form is valid, but no password was changed. Connect an authentication backend to complete this securely.",
    });
    setPasswordSubmitting(false);
  }

  function clearPasswordFields() {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordMessage(null);
  }

  function goToSection(sectionId) {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function requestTwoFactorChange() {
    setShowTwoFactorDialog(true);
  }

  function confirmTwoFactorDemo() {
    setShowTwoFactorDialog(false);
    notify(
      "No 2FA setting was changed. A backend and authenticator verification are required.",
      "info"
    );
  }

  function endSessionDemo() {
    if (!sessionToEnd) return;

    setSessions((previous) =>
      previous.filter((session) => session.id !== sessionToEnd.id)
    );
    setSessionToEnd(null);
    notify("Demo session removed from this page. No real session was terminated.", "info");
  }

  function requestDeleteAccount() {
    setAccountMessage(null);

    if (!deleteConfirmed || deleteText !== "DELETE") {
      setAccountMessage({
        type: "error",
        text: 'Tick the confirmation box and type DELETE exactly to continue.',
      });
      return;
    }

    setAccountMessage({
      type: "info",
      text: "Your confirmation was validated, but your account has NOT been deleted. A secure backend and re-authentication are required.",
    });
  }

  function requestDeactivation() {
    setAccountMessage({
      type: "info",
      text: "Your account has NOT been deactivated. Connect a secure backend to implement this action.",
    });
  }

  function logOut() {
    if (profileDirty && !window.confirm("You have unsaved changes. Leave this page anyway?")) {
      return;
    }

    if (typeof goTo === "function") {
      goTo("login");
    } else {
      notify("Connect your app navigation to complete logout.", "info");
    }
  }

  const initials = `${profile.firstName.trim().charAt(0)}${profile.lastName.trim().charAt(0)}`.toUpperCase();

  return (
    <div className={sidebarOpen ? "" : "settings-sidebar-closed"}>
      <Sidebar goTo={goTo} activePage="settings" open={sidebarOpen} />

      {sidebarOpen && (
        <div
          className="settings-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <main
        className={`page-main account-settings-page ${
          sidebarOpen ? "" : "sidebar-is-closed"
        }`}
      >
        <header className="topbar">
          <div className="account-top-title">
            <button
              type="button"
              className="hamburger-button"
              onClick={() => setSidebarOpen((open) => !open)}
              aria-label={sidebarOpen ? "Collapse sidebar" : "Open sidebar"}
              aria-expanded={sidebarOpen}
            >
              ☰
            </button>
            <div className="crumb">⌂ &nbsp;/&nbsp; Accountsetting</div>
          </div>

          <div className="top-actions">
            <div className="top-search">
              ⌕ <input aria-label="Search" placeholder="Type here..." />
            </div>
            <button type="button" className="logout" onClick={logOut}>
              ◉ Log out
            </button>
            <button type="button" aria-label="Settings" onClick={() => goToSection("basic-info")}>⚙</button>
            <button type="button" aria-label="Profile" onClick={() => goToSection("basic-info")}>♟</button>
          </div>
        </header>

        {toast && (
          <div
            className={`settings-toast settings-toast-${toast.type}`}
            role="status"
            aria-live="polite"
          >
            <span>{toast.message}</span>
            <button type="button" aria-label="Dismiss notification" onClick={() => setToast(null)}>
              ×
            </button>
          </div>
        )}

        <div className="settings-content">
          <aside className="settings-menu" aria-label="Account settings navigation">
            <h3>Accountsetting</h3>

            {[
              ["basic-info", "▣", "Basic Info"],
              ["change-password", "◈", "Change Password"],
              ["two-factor", "▣", "2FA"],
              ["sessions", "⚒", "Sessions"],
              ["delete-account", "▣", "Delete Account"],
            ].map(([id, icon, label]) => (
              <button
                key={id}
                type="button"
                className={activeSection === id ? "active" : ""}
                onClick={() => goToSection(id)}
                aria-current={activeSection === id ? "location" : undefined}
              >
                {icon} &nbsp; {label}
              </button>
            ))}

            {profileDirty && (
              <p className="settings-unsaved-note" role="status">
                You have unsaved profile changes.
              </p>
            )}
          </aside>

          <div className="settings-sections">
            <section className="settings-card profile-card">
              <div className="profile-avatar" aria-label="Profile initials">
                {initials || "?"}
              </div>

              <div className="profile-details">
                <h2>{profile.firstName} {profile.lastName}</h2>
                <p>Patient</p>
              </div>

              <label className="invisible-toggle">
                <input
                  type="checkbox"
                  checked={profile.invisible}
                  onChange={(event) => updateProfile("invisible", event.target.checked)}
                />
                <span>{profile.invisible ? "Invisible" : "Switch to invisible"}</span>
              </label>
            </section>

            <section id="basic-info" className="settings-card">
              <h2>Basic Info</h2>

              <form onSubmit={saveBasicInfo} noValidate>
                <div className="settings-form-grid">
                  <label>
                    First Name
                    <input
                      ref={firstNameRef}
                      value={profile.firstName}
                      onChange={(event) => updateProfile("firstName", event.target.value)}
                      onBlur={() => markTouched("firstName")}
                      maxLength={60}
                      autoComplete="given-name"
                      aria-invalid={Boolean(visibleError("firstName"))}
                      aria-describedby={visibleError("firstName") ? "firstName-error" : undefined}
                      required
                    />
                    <FieldError>{visibleError("firstName")}</FieldError>
                  </label>

                  <label>
                    Last Name
                    <input
                      value={profile.lastName}
                      onChange={(event) => updateProfile("lastName", event.target.value)}
                      onBlur={() => markTouched("lastName")}
                      maxLength={60}
                      autoComplete="family-name"
                      aria-invalid={Boolean(visibleError("lastName"))}
                      required
                    />
                    <FieldError>{visibleError("lastName")}</FieldError>
                  </label>

                  <label>
                    Gender
                    <select value={profile.gender} onChange={(event) => updateProfile("gender", event.target.value)}>
                      {["Male", "Female", "Other", "Prefer not to say"].map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Birth Month
                    <select value={profile.birthMonth} onChange={(event) => updateProfile("birthMonth", event.target.value)}>
                      {months.map((month) => <option key={month}>{month}</option>)}
                    </select>
                  </label>

                  <label>
                    Birth Day
                    <select
                      value={profile.birthDay}
                      onChange={(event) => updateProfile("birthDay", event.target.value)}
                      onBlur={() => markTouched("birthDay")}
                      aria-invalid={Boolean(visibleError("birthDay"))}
                    >
                      {Array.from({ length: 31 }, (_, index) => String(index + 1)).map((day) => (
                        <option key={day}>{day}</option>
                      ))}
                    </select>
                    <FieldError>{visibleError("birthDay")}</FieldError>
                  </label>

                  <label>
                    Birth Year
                    <select value={profile.birthYear} onChange={(event) => updateProfile("birthYear", event.target.value)}>
                      {Array.from({ length: 121 }, (_, index) => String(new Date().getFullYear() - index)).map((year) => (
                        <option key={year}>{year}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Email
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(event) => updateProfile("email", event.target.value)}
                      onBlur={() => markTouched("email")}
                      autoComplete="email"
                      maxLength={254}
                      aria-invalid={Boolean(visibleError("email"))}
                      required
                    />
                    <FieldError>{visibleError("email")}</FieldError>
                  </label>

                  <label>
                    Blood Group
                    <select value={profile.bloodGroup} onChange={(event) => updateProfile("bloodGroup", event.target.value)}>
                      <option value="">Select blood group</option>
                      {bloodGroups.map((group) => <option key={group}>{group}</option>)}
                    </select>
                  </label>

                  <label>
                    Your Location
                    <input
                      value={profile.location}
                      onChange={(event) => updateProfile("location", event.target.value)}
                      autoComplete="address-level2"
                      maxLength={120}
                    />
                  </label>

                  <label>
                    Phone Number
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(event) => updateProfile("phone", event.target.value)}
                      onBlur={() => markTouched("phone")}
                      autoComplete="tel"
                      maxLength={20}
                      aria-invalid={Boolean(visibleError("phone"))}
                    />
                    <FieldError>{visibleError("phone")}</FieldError>
                  </label>

                  <label>
                    Height (cm)
                    <input
                      type="number"
                      min="1"
                      max="300"
                      step="0.1"
                      value={profile.height}
                      onChange={(event) => updateProfile("height", event.target.value)}
                      onBlur={() => markTouched("height")}
                      placeholder="e.g. 170"
                      aria-invalid={Boolean(visibleError("height"))}
                    />
                    <FieldError>{visibleError("height")}</FieldError>
                  </label>

                  <label>
                    Weight (kg)
                    <input
                      type="number"
                      min="1"
                      max="700"
                      step="0.1"
                      value={profile.weight}
                      onChange={(event) => updateProfile("weight", event.target.value)}
                      onBlur={() => markTouched("weight")}
                      placeholder="e.g. 65"
                      aria-invalid={Boolean(visibleError("weight"))}
                    />
                    <FieldError>{visibleError("weight")}</FieldError>
                  </label>
                </div>

                {profileMessage && (
                  <p className={`settings-message settings-message-${profileMessage.type}`} role="status">
                    {profileMessage.text}
                  </p>
                )}

                <div className="settings-button-row">
                  <button className="settings-primary-button" type="submit" disabled={savingProfile}>
                    {savingProfile ? "SAVING..." : "SAVE CHANGES"}
                  </button>
                  <button className="settings-secondary-button" type="button" onClick={resetProfile} disabled={!profileDirty}>
                    RESET CHANGES
                  </button>
                </div>
              </form>
            </section>

            <section id="change-password" className="settings-card">
              <h2>Change Password</h2>

              <form onSubmit={updatePassword} noValidate>
                <label className="settings-full-field">
                  Current Password
                  <div className="settings-password-input">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(event) => setCurrentPassword(event.target.value)}
                      autoComplete="current-password"
                      required
                    />
                    <button type="button" onClick={() => setShowCurrentPassword((value) => !value)}>
                      {showCurrentPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </label>

                <label className="settings-full-field">
                  New Password
                  <div className="settings-password-input">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      autoComplete="new-password"
                      required
                    />
                    <button type="button" onClick={() => setShowNewPassword((value) => !value)}>
                      {showNewPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </label>

                <div className="settings-password-strength" aria-live="polite">
                  <div className="settings-strength-track">
                    <div
                      className={`settings-strength-fill strength-${passwordStrength}`}
                      style={{ width: `${(passwordStrength / passwordRules.length) * 100}%` }}
                    />
                  </div>
                  <p>
                    Password strength: {
                      !newPassword ? "Not entered" :
                      passwordStrength <= 2 ? "Weak" :
                      passwordStrength <= 4 ? "Moderate" : "Strong"
                    }
                  </p>
                  <ul className="settings-password-checklist">
                    {passwordChecks.map((rule) => (
                      <li key={rule.label} className={rule.passed ? "passed" : ""}>
                        <span aria-hidden="true">{rule.passed ? "✓" : "○"}</span> {rule.label}
                      </li>
                    ))}
                  </ul>
                </div>

                <label className="settings-full-field">
                  Confirm New Password
                  <div className="settings-password-input">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      autoComplete="new-password"
                      aria-invalid={Boolean(confirmPassword && confirmPassword !== newPassword)}
                      required
                    />
                    <button type="button" onClick={() => setShowConfirmPassword((value) => !value)}>
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {confirmPassword && confirmPassword !== newPassword && (
                    <FieldError>Passwords do not match.</FieldError>
                  )}
                </label>

                <div className="password-requirements">
                  <h3>Password requirements</h3>
                  <p>Use a unique password that meets every requirement above.</p>
                </div>

                {passwordMessage && (
                  <p className={`settings-message settings-message-${passwordMessage.type}`} role="status">
                    {passwordMessage.text}
                  </p>
                )}

                <div className="settings-button-row">
                  <button className="settings-primary-button" type="submit" disabled={passwordSubmitting}>
                    {passwordSubmitting ? "CHECKING..." : "UPDATE PASSWORD"}
                  </button>
                  <button className="settings-secondary-button" type="button" onClick={clearPasswordFields}>
                    CLEAR FIELDS
                  </button>
                </div>
              </form>
            </section>

            <section id="two-factor" className="settings-card settings-inline-card">
              <div>
                <h2>Two-factor authentication</h2>
                <p>Authenticator app</p>
                <p className="settings-muted-note">
                  {twoFactor ? "This page's demo state is enabled." : "An authenticator setup requires a secure backend."}
                </p>
              </div>

              <span className={`settings-status ${twoFactor ? "enabled" : ""}`}>
                {twoFactor ? "DEMO ENABLED" : "NOT CONFIGURED"}
              </span>

              <button className="settings-secondary-button" type="button" onClick={requestTwoFactorChange}>
                {twoFactor ? "MANAGE" : "SET UP"}
              </button>
            </section>

            <section id="sessions" className="settings-card">
              <h2>Sessions</h2>
              <p>
                Example sessions are shown for interface demonstration. Real sessions must come from your authentication backend.
              </p>

              {sessions.map((session) => (
                <div className="session-row" key={session.id}>
                  <span aria-hidden="true">▣</span>
                  <div>
                    <b>{session.device}</b>
                    <p>{session.location}</p>
                  </div>
                  {session.current ? (
                    <span className="settings-status enabled">CURRENT</span>
                  ) : (
                    <button
                      type="button"
                      className="settings-secondary-button"
                      onClick={() => setSessionToEnd(session)}
                    >
                      Remove demo
                    </button>
                  )}
                </div>
              ))}

              {sessions.length === 1 && (
                <p className="settings-muted-note">No additional demo sessions are listed.</p>
              )}
            </section>

            <section id="delete-account" className="settings-card">
              <h2>Delete Account</h2>
              <p>
                Account deletion is permanent. This demonstration will not delete real account data.
              </p>

              <label className="delete-confirmation">
                <input
                  type="checkbox"
                  checked={deleteConfirmed}
                  onChange={(event) => setDeleteConfirmed(event.target.checked)}
                />
                I understand that account deletion is permanent.
              </label>

              <label className="settings-full-field">
                Type DELETE to confirm
                <input
                  value={deleteText}
                  onChange={(event) => setDeleteText(event.target.value)}
                  autoComplete="off"
                  spellCheck="false"
                />
              </label>

              {accountMessage && (
                <p className={`settings-message settings-message-${accountMessage.type}`} role="status">
                  {accountMessage.text}
                </p>
              )}

              <div className="settings-button-row">
                <button type="button" className="settings-secondary-button" onClick={requestDeactivation}>
                  DEACTIVATE
                </button>
                <button type="button" className="settings-danger-button" onClick={requestDeleteAccount}>
                  DELETE ACCOUNT
                </button>
              </div>
            </section>
          </div>
        </div>

        <footer className="site-footer">
          <span>© 2026, made with ♥ by MyPiHUB for a better web.</span>
          <span>MyPatientHUB &nbsp;&nbsp; About Us &nbsp;&nbsp; Blog</span>
        </footer>
      </main>

      {showTwoFactorDialog && (
        <div className="settings-modal-backdrop" role="presentation" onClick={() => setShowTwoFactorDialog(false)}>
          <div
            className="settings-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="two-factor-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="two-factor-dialog-title">Authenticator setup</h2>
            <p>
              Real 2FA requires a server-generated secret, an authenticator QR code, and verification of a one-time code. None is configured in this frontend.
            </p>
            <div className="settings-button-row">
              <button type="button" className="settings-secondary-button" onClick={() => setShowTwoFactorDialog(false)}>
                CANCEL
              </button>
              <button type="button" className="settings-primary-button" onClick={confirmTwoFactorDemo}>
                OK, I UNDERSTAND
              </button>
            </div>
          </div>
        </div>
      )}

      {sessionToEnd && (
        <div className="settings-modal-backdrop" role="presentation" onClick={() => setSessionToEnd(null)}>
          <div
            className="settings-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="session-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="session-dialog-title">Remove example session?</h2>
            <p>
              This only removes the example row from this page. It does not sign a device out of a real account.
            </p>
            <div className="settings-button-row">
              <button type="button" className="settings-secondary-button" onClick={() => setSessionToEnd(null)}>
                CANCEL
              </button>
              <button type="button" className="settings-danger-button" onClick={endSessionDemo}>
                REMOVE EXAMPLE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountSettings;