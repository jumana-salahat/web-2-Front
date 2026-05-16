import { useNavigate } from "react-router-dom";
import {
  auth,
  provider,
  signInWithPopup,
  isFirebaseConfigured,
} from "../../lib/firebase";
import "./auth-pages.css";

import heroImg from "../../assets/auth/hero.png";
import logoImg from "../../assets/auth/logo.webp";

function SignUp() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleGoogleSignUp = async () => {
    if (!isFirebaseConfigured || !auth || !provider) {
      window.alert(
        "Firebase is not configured. Add keys to `.env` — use VITE_FIREBASE_* or the same REACT_APP_* names as the Adam branch (see README), then restart the dev server.",
      );
      return;
    }
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const response = await fetch(
        "http://localhost:5000/api/firebase-auth/google",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Backend error:", data.error);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", token);

      if (data.user.role === "admin") {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div className="fitgenie-auth-page">
      <div className="heroWrapper">
        <img src={heroImg} className="hero" alt="" />

        <header
          className="auth-page-header"
          onClick={handleLogoClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleLogoClick();
          }}
          role="button"
          tabIndex={0}
        >
          <img src={logoImg} alt="" className="logo" />
          <h1 className="brand-title">
            Fit<span>Genie</span>
          </h1>
        </header>

        <section className="auth-hero-section">
          <h2>
            Transform Your <br /> <span>Fitness Journey</span>
          </h2>
          <p>
            AI-powered workout plans, personalized nutrition guides, and
            progress tracking — all tailored to your goals.
          </p>
          <div className="statusContainer">
            <p className="numOfUsers">
              10K+ <br />
              <span>Active Users</span>
            </p>
            <p className="numOfSuccess">
              95% <br />
              <span>Success Rate</span>
            </p>
          </div>
        </section>
      </div>

      <div className="authContainer">
        <div className="mobile-auth-logo">
  <img src={logoImg} alt="FitGenie Logo" />
  <span>
    Fit<span>Genie</span>
  </span>
</div>
        <h3>Create your account</h3>
        <p className="subtitle">Start your fitness transformation today</p>

        {!isFirebaseConfigured && (
          <p
            className="subtitle"
            style={{ color: "#ffb020", marginBottom: 12 }}
          >
            Firebase env vars are missing — copy your Adam `.env` keys here
            (REACT_APP_* or VITE_FIREBASE_*), then restart{" "}
            <code style={{ color: "#fff" }}>npm run dev</code>.
          </p>
        )}

        <button
          type="button"
          className="googleBtn"
          onClick={handleGoogleSignUp}
          disabled={!isFirebaseConfigured}
        >
          <svg className="googleIcon" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <p className="signinText">
          Already have an account? <span onClick={handleSignIn}>Sign in</span>
        </p>

        <h5 className="termsText">
          By continuing, you agree to our <span>Terms of Service</span> and{" "}
          <span>Privacy Policy</span>
        </h5>
      </div>
    </div>
  );
}

export default SignUp;
