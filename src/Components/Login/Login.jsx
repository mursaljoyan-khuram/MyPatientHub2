import { useState } from "react";
import "./Login.css";

function Login({ goTo }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [remember, setRemember] = useState(false);

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

    if (remember) {
      localStorage.setItem("mypatienthub-email", email);
    } else {
      localStorage.removeItem("mypatienthub-email");
    }

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
        <h2>Sign in to MyPatientHUB</h2>

        <div className="social-login">
          <button className="facebook">f</button>
          <button className="google">G</button>
        </div>

        <form onSubmit={signIn}>
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

          <button className="sign-in" type="submit">SIGN IN</button>

          <div className="login-options">
            <a href="#forgot" onClick={(e) => e.preventDefault()}>Forgot password?</a>
            <label>
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember me
            </label>
          </div>

          <div className="or">Or</div>

          <button className="sign-up" type="button" onClick={() => setMessage("Sign up page can be added next.")}>
            SIGN UP
          </button>

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
