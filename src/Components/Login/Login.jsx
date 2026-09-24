import "./Login.css";



function Login({ goTo }) {
  return (
    <div className="login-page">
      <div className="login-top">
        <div className="welcome">
          <h1>Welcome to MyPatientHUB!</h1>

          <p>
            We provide smart healthcare services in your hands.
          </p>
        </div>

        <div className="login-box">
          <h2>Sign in to MyPatientHUB</h2>

          <div className="social-buttons">
            <button className="facebook">f</button>
            <button className="google">G</button>
          </div>

          <input
            type="text"
            placeholder="Email or Phone number"
          />

          <input
            type="password"
            placeholder="Please enter your password"
          />

          <button
            className="sign-in"
            onClick={() => goTo("dashboard")}
          >
            SIGN IN
          </button>

          <div className="options">
            <a href="#forgot">Forgot password?</a>

            <label>
              <input type="checkbox" />
              Remember me
            </label>
          </div>

          <div className="or">
            <span>or</span>
          </div>

          <button className="sign-up">
            SIGN UP
          </button>
        </div>
      </div>

      <footer className="login-footer">
        <a href="#play">Google Play Store APP</a>
        <a href="#app">App Store APP</a>
        <a href="#patient">About MyPatientHUB</a>
        <a href="#about">About Us</a>
        <a href="#blog">Our Blog</a>
      </footer>
    </div>
  );
}

export default Login;