import { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterPage.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

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

        <div className="auth-form">
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
                className="auth-input auth-input--icon auth-input--eye"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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

          <button className="auth-submit">Log in</button>
        </div>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/register" className="auth-switch-link">Register</Link>
        </p>
      </div>
    </div>
  );
}