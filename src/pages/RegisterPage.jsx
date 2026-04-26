import { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterPage.css";

export default function RegisterPage() {
  const [userType, setUserType] = useState("organisation");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="auth-page">
      <div className="auth-bg-orb auth-bg-orb--1" />
      <div className="auth-bg-orb auth-bg-orb--2" />
      <div className="auth-bg-orb auth-bg-orb--3" />

      <div className="auth-card">
        {/* Logo */}
        <Link to="/" className="auth-logo-wrap">
          <img src="/verifychain-logo.png" alt="VerifyChain" className="auth-logo-img" />
        </Link>

        <div className="auth-header">
          <h1 className="auth-h1">Create account</h1>
          <p className="auth-sub">Join VerifyChain to get started</p>
        </div>

        {/* Toggle */}
        <div className="auth-toggle">
          <button
            className={`auth-toggle-btn ${userType === "organisation" ? "active" : ""}`}
            onClick={() => setUserType("organisation")}
          >
            <svg viewBox="0 0 16 16" fill="none">
              <rect x="2" y="6" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M5 6V4.5a3 3 0 016 0V6" stroke="currentColor" strokeWidth="1.3"/>
            </svg>
            Organisation
          </button>
          <button
            className={`auth-toggle-btn ${userType === "individual" ? "active" : ""}`}
            onClick={() => setUserType("individual")}
          >
            <svg viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M2 14c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            Individual
          </button>
        </div>

        <p className="auth-toggle-hint">
          {userType === "organisation"
            ? "For HR managers, compliance officers and security teams."
            : "For individuals completing a verification request."}
        </p>

        {/* Form */}
        <div className="auth-form">
          <div className="auth-row">
            <div className="auth-field">
              <label className="auth-label">First name</label>
              <input className="auth-input" type="text" placeholder="Jane" />
            </div>
            <div className="auth-field">
              <label className="auth-label">Last name</label>
              <input className="auth-input" type="text" placeholder="Smith" />
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label">Email address</label>
            <div className="auth-input-wrap">
              <svg className="auth-input-icon" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M2 5l6 4.5L14 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <input className="auth-input auth-input--icon" type="email" placeholder="jane@company.com" />
            </div>
          </div>

          {userType === "organisation" && (
            <div className="auth-field">
              <label className="auth-label">Organisation name</label>
              <div className="auth-input-wrap">
                <svg className="auth-input-icon" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="5" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M5 5V3.5a3 3 0 016 0V5" stroke="currentColor" strokeWidth="1.3"/>
                </svg>
                <input className="auth-input auth-input--icon" type="text" placeholder="Acme Corp" />
              </div>
            </div>
          )}

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <div className="auth-input-wrap">
              <svg className="auth-input-icon" viewBox="0 0 16 16" fill="none">
                <rect x="3" y="7" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.3"/>
              </svg>
              <input
                className="auth-input auth-input--icon auth-input--eye"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
              />
              <button className="auth-eye-btn" onClick={() => setShowPassword(p => !p)} type="button">
                {showPassword ? (
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="M2 8s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4z" stroke="currentColor" strokeWidth="1.3"/>
                    <circle cx="8" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.3"/>
                    <path d="M3 3l10 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="M2 8s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4z" stroke="currentColor" strokeWidth="1.3"/>
                    <circle cx="8" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label">Confirm password</label>
            <div className="auth-input-wrap">
              <svg className="auth-input-icon" viewBox="0 0 16 16" fill="none">
                <rect x="3" y="7" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.3"/>
              </svg>
              <input
                className="auth-input auth-input--icon auth-input--eye"
                type={showConfirm ? "text" : "password"}
                placeholder="Repeat your password"
              />
              <button className="auth-eye-btn" onClick={() => setShowConfirm(p => !p)} type="button">
                {showConfirm ? (
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="M2 8s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4z" stroke="currentColor" strokeWidth="1.3"/>
                    <circle cx="8" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.3"/>
                    <path d="M3 3l10 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="M2 8s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4z" stroke="currentColor" strokeWidth="1.3"/>
                    <circle cx="8" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button className="auth-submit">Create account</button>
        </div>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login" className="auth-switch-link">Log in</Link>
        </p>
      </div>
    </div>
  );
}