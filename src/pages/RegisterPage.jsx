import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { findUser, saveUser, setSession } from "../hooks/useAuth";
import "./RegisterPage.css";

function validate(form) {
  const errors = {};
  if (!form.firstName.trim())         errors.firstName = "First name is required.";
  if (!form.lastName.trim())          errors.lastName  = "Last name is required.";
  if (!form.email.trim())             errors.email     = "Email is required.";
  else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Enter a valid email address.";
  if (form.userType === "organisation" && !form.orgName.trim())
                                      errors.orgName   = "Organisation name is required.";
  if (!form.password)                 errors.password  = "Password is required.";
  else if (form.password.length < 8)  errors.password  = "Password must be at least 8 characters.";
  if (!form.confirm)                  errors.confirm   = "Please confirm your password.";
  else if (form.confirm !== form.password) errors.confirm = "Passwords do not match.";
  return errors;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [userType, setUserType]         = useState("organisation");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [submitted, setSubmitted]       = useState(false);
  const [globalError, setGlobalError]   = useState("");

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    orgName: "", password: "", confirm: "",
    userType: "organisation",
  });

  const errors = submitted ? validate({ ...form, userType }) : {};

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleTypeChange = (t) => {
    setUserType(t);
    setForm(f => ({ ...f, userType: t }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setGlobalError("");
    const errs = validate({ ...form, userType });
    if (Object.keys(errs).length > 0) return;

    if (findUser(form.email)) {
      setGlobalError("An account with this email already exists. Please log in.");
      return;
    }

    const user = {
      firstName: form.firstName.trim(),
      lastName:  form.lastName.trim(),
      email:     form.email.trim().toLowerCase(),
      password:  form.password,
      userType,
      orgName:   userType === "organisation" ? form.orgName.trim() : null,
      createdAt: new Date().toISOString(),
    };

    saveUser(user);
    setSession(user);
    navigate(redirectTo);
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
          <h1 className="auth-h1">Create account</h1>
          <p className="auth-sub">Join VerifyChain to get started</p>
        </div>

        {/* Toggle */}
        <div className="auth-toggle">
          <button
            className={`auth-toggle-btn ${userType === "organisation" ? "active" : ""}`}
            onClick={() => handleTypeChange("organisation")}
          >
            <svg viewBox="0 0 16 16" fill="none">
              <rect x="2" y="6" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M5 6V4.5a3 3 0 016 0V6" stroke="currentColor" strokeWidth="1.3"/>
            </svg>
            Organisation
          </button>
          <button
            className={`auth-toggle-btn ${userType === "individual" ? "active" : ""}`}
            onClick={() => handleTypeChange("individual")}
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

        {/* Form */}
        <div className="auth-form">
          <div className="auth-row">
            <div className="auth-field">
              <label className="auth-label">First name</label>
              <input
                className={`auth-input ${errors.firstName ? "auth-input--error" : ""}`}
                type="text" placeholder="Jane"
                value={form.firstName} onChange={set("firstName")}
              />
              {errors.firstName && <span className="auth-error-msg">{errors.firstName}</span>}
            </div>
            <div className="auth-field">
              <label className="auth-label">Last name</label>
              <input
                className={`auth-input ${errors.lastName ? "auth-input--error" : ""}`}
                type="text" placeholder="Smith"
                value={form.lastName} onChange={set("lastName")}
              />
              {errors.lastName && <span className="auth-error-msg">{errors.lastName}</span>}
            </div>
          </div>

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
                value={form.email} onChange={set("email")}
              />
            </div>
            {errors.email && <span className="auth-error-msg">{errors.email}</span>}
          </div>

          {userType === "organisation" && (
            <div className="auth-field">
              <label className="auth-label">Organisation name</label>
              <div className="auth-input-wrap">
                <svg className="auth-input-icon" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="5" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M5 5V3.5a3 3 0 016 0V5" stroke="currentColor" strokeWidth="1.3"/>
                </svg>
                <input
                  className={`auth-input auth-input--icon ${errors.orgName ? "auth-input--error" : ""}`}
                  type="text" placeholder="Acme Corp"
                  value={form.orgName} onChange={set("orgName")}
                />
              </div>
              {errors.orgName && <span className="auth-error-msg">{errors.orgName}</span>}
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
                className={`auth-input auth-input--icon auth-input--eye ${errors.password ? "auth-input--error" : ""}`}
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={form.password} onChange={set("password")}
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

          <div className="auth-field">
            <label className="auth-label">Confirm password</label>
            <div className="auth-input-wrap">
              <svg className="auth-input-icon" viewBox="0 0 16 16" fill="none">
                <rect x="3" y="7" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.3"/>
              </svg>
              <input
                className={`auth-input auth-input--icon auth-input--eye ${errors.confirm ? "auth-input--error" : ""}`}
                type={showConfirm ? "text" : "password"}
                placeholder="Repeat your password"
                value={form.confirm} onChange={set("confirm")}
              />
              <button className="auth-eye-btn" onClick={() => setShowConfirm(p => !p)} type="button">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M2 8s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4z" stroke="currentColor" strokeWidth="1.3"/>
                  <circle cx="8" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.3"/>
                  {showConfirm && <path d="M3 3l10 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>}
                </svg>
              </button>
            </div>
            {errors.confirm && <span className="auth-error-msg">{errors.confirm}</span>}
          </div>

          <button className="auth-submit" onClick={handleSubmit}>
            Create account
          </button>
        </div>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to={`/login${redirectTo !== "/dashboard" ? `?redirect=${redirectTo}` : ""}`} className="auth-switch-link">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}