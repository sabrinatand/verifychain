import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { findUser, setSession } from "../hooks/useAuth";
import "./RegisterPage.css";

function validate(form) {
  const errors = {};
  if (!form.email.trim())    errors.email    = "Email is required.";
  else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Enter a valid email address.";
  if (!form.password)        errors.password = "Password is required.";
  return errors;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted]       = useState(false);
  const [globalError, setGlobalError]   = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  const errors = submitted ? validate(form) : {};
  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = () => {
    setSubmitted(true);
    setGlobalError("");
    const errs = validate(form);
    if (Object.keys(errs).length > 0) return;

    const user = findUser(form.email);

    if (!user) {
      setGlobalError("No account found with this email. Please register first.");
      return;
    }

    if (user.password !== form.password) {
      setGlobalError("Incorrect password. Please try again.");
      return;
    }

    setSession(user);
    navigate(redirectTo);
  };

  // Allow pressing Enter to submit
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-orb auth-bg-orb--1" />
      <div className="auth-bg-orb auth-bg-orb--2" />
      <div className="auth-bg-orb auth-bg-orb--3" />

      <div className="auth-card">
        <Link to="/" className="auth-logo-wrap">
          <img src="/verifychain-logo.png" alt="VerifyChain" className="auth-logo-img" />
        </Link>

        <div className="auth-header">
          <h1 className="auth-h1">Welcome back</h1>
          <p className="auth-sub">Log in to your VerifyChain account</p>
        </div>

        {/* Global error */}
        {globalError && (
          <div className="auth-global-error">
            <svg viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M8 5v3.5M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {globalError}
          </div>
        )}

        <div className="auth-form">
          <div className="auth-field">
            <label className="auth-label">Email address</label>
            <div className="auth-input-wrap">
              <svg className="auth-input-icon" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M2 5l6 4.5L14 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <input
                className={`auth-input auth-input--icon ${errors.email ? "auth-input--error" : ""}`}
                type="email" placeholder="jane@company.com"
                value={form.email} onChange={set("email")} onKeyDown={handleKeyDown}
              />
            </div>
            {errors.email && <span className="auth-error-msg">{errors.email}</span>}
          </div>

          <div className="auth-field">
            <div className="auth-label-row">
              <label className="auth-label">Password</label>
              <button className="auth-forgot" type="button">Forgot password?</button>
            </div>
            <div className="auth-input-wrap">
              <svg className="auth-input-icon" viewBox="0 0 16 16" fill="none">
                <rect x="3" y="7" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.3"/>
              </svg>
              <input
                className={`auth-input auth-input--icon auth-input--eye ${errors.password ? "auth-input--error" : ""}`}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password} onChange={set("password")} onKeyDown={handleKeyDown}
              />
              <button className="auth-eye-btn" onClick={() => setShowPassword(p => !p)} type="button">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M2 8s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4z" stroke="currentColor" strokeWidth="1.3"/>
                  <circle cx="8" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.3"/>
                  {showPassword && <path d="M3 3l10 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>}
                </svg>
              </button>
            </div>
            {errors.password && <span className="auth-error-msg">{errors.password}</span>}
          </div>

          <button className="auth-submit" onClick={handleSubmit}>
            Log in
          </button>
        </div>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link
            to={`/register${redirectTo !== "/dashboard" ? `?redirect=${redirectTo}` : ""}`}
            className="auth-switch-link"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}