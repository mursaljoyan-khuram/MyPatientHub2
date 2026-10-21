import { useState } from "react";
import "./Login.css";

function Login({ goTo }) {
  const [email, setEmail] = useState(() => localStorage.getItem("mypatienthub-email") || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [remember, setRemember] = useState(() => Boolean(localStorage.getItem("mypatienthub-email")));
  const [mode, setMode] = useState("login");
  const [fullName, setFullName] = useState("");

  function validateEmail(value) {
    if (!value.trim()) {
      setEmailError("Please enter your email.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Please enter a valid email with @.");
      return false;
    }

    setEmailError("");
    return true;
  }

  function signUp(e) {
    e.preventDefault();
    const validEmail = validateEmail(email);
    if (!fullName.trim()) { setMessage("Please enter your full name."); return; }
    if (password.length < 6) { setPasswordError("Password must be at least 6 characters."); return; }
    if (!validEmail) return;
    const accounts = JSON.parse(localStorage.getItem("mypatienthub-demo-accounts") || "[]");
    if (accounts.some((account) => account.email.toLowerCase() === email.toLowerCase())) { setMessage("An account with this email already exists. Please sign in."); return; }
    accounts.push({ name: fullName.trim(), email: email.trim() });
    localStorage.setItem("mypatienthub-demo-accounts", JSON.stringify(accounts));
    localStorage.setItem("mypatienthub-email", email.trim());
    setMessage("Demo account created. Welcome to MyPatientHUB!");
    goTo("dashboard");
  }

  function signIn(e) {
    e.preventDefault();
    const validEmail = validateEmail(email);
    const validPassword = password.length >= 6;

    if (!validPassword) {
      setPasswordError(password ? "Password must be at least 6 characters." : "Please enter your password.");
    } else {
      setPasswordError("");
    }

    if (!validEmail || !validPassword) {
      setMessage("");
      return;
    }

    const accounts = JSON.parse(localStorage.getItem("mypatienthub-demo-accounts") || "[]");
    const accountExists = accounts.length === 0 || accounts.some((account) => account.email.toLowerCase() === email.toLowerCase());
    if (!accountExists) { setMessage("No demo account was found for this email. Create an account first or use a fresh demo email."); return; }
    if (remember) localStorage.setItem("mypatienthub-email", email);
    else localStorage.removeItem("mypatienthub-email");
    setMessage("");
    goTo("dashboard");
  }

  return (
    <div className="login-page">
      <div className="login-hero">
        <div className="hero-content">
          <h1>Welcome to MyPatientHUB!</h1>
          <p>We provide smart healthcare services in your hands.</p>
        </div>
      </div>

      <div className="login-card">
        <h2>{mode === "signup" ? "Create your MyPatientHUB account" : "Sign in to MyPatientHUB"}</h2>

        <div className="social-login">
          <button type="button" className="facebook" onClick={() => setMessage("Social sign-in is not connected in this demo. Use your email instead.")}>f</button>
          <button type="button" className="google" onClick={() => setMessage("Google sign-in is not connected in this demo. Use your email instead.")}>G</button>
        </div>

        <form onSubmit={mode === "signup" ? signUp : signIn}>
          {mode === "signup" && <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full name" autoComplete="name" required />}
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) validateEmail(e.target.value);
            }}
            onBlur={() => validateEmail(email)}
            placeholder="Email or phone number"
          />
          {emailError && <p className="field-error">{emailError}</p>}

          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError(e.target.value.length >= 6 ? "" : "Password must be at least 6 characters.");
            }}
            placeholder="Please enter your password"
          />
          {passwordError && <p className="field-error">{passwordError}</p>}

          <button className="sign-in" type="submit">{mode === "signup" ? "CREATE ACCOUNT" : "SIGN IN"}</button>

          <div className="login-options">
            <button type="button" className="login-text-button" onClick={() => setMessage(email.trim() ? `Password reset emails are not available in this demo. The email entered is ${email}; use the demo sign-in form or contact the app administrator in a real deployment.` : "Enter your email first. Password reset needs a real email service, which is not connected in this demo.")}>Forgot password?</button>
            <label>
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember me
            </label>
          </div>

          <div className="or">Or</div>

          <button className="sign-up" type="button" onClick={() => { setMode(mode === "signup" ? "login" : "signup"); setMessage(""); setPasswordError(""); setEmailError(""); }}>{mode === "signup" ? "BACK TO SIGN IN" : "SIGN UP"}</button>

          {message && <p className="login-message">{message}</p>}
        </form>
      </div>

      <footer className="login-footer">
        <div>Google Play Store App</div>
        <div>App Store App</div>
        <div>About MyPatientHUB</div>
        <div>About us</div>
        <div>Our Blog</div>
        <div className="social-row">f &nbsp; ♥ &nbsp; ◎ &nbsp; ◉ &nbsp; in</div>
        <small>Copyright © 2022 MyPiHUB.</small>
      </footer>
    </div>
  );
}

export default Login;
