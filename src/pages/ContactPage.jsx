import { useState } from "react";
import { Link } from "react-router-dom";
import "./ContactPage.css";

const ENQUIRY_TYPES = [
  {
    id: "demo",
    label: "Book a demonstration",
    icon: (
      <svg viewBox="0 0 16 16" fill="none">
        <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M6 7l2.5 2L11 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    desc: "See VerifyChain in action with a personalised walkthrough",
  },
  {
    id: "sales",
    label: "Talk to sales",
    icon: (
      <svg viewBox="0 0 16 16" fill="none">
        <path d="M2 4a1 1 0 011-1h10a1 1 0 011 1v6a1 1 0 01-1 1H9l-3 2v-2H3a1 1 0 01-1-1V4z" stroke="currentColor" strokeWidth="1.3"/>
      </svg>
    ),
    desc: "Discuss pricing, plans and how VerifyChain fits your organisation",
  },
  {
    id: "support",
    label: "Technical support",
    icon: (
      <svg viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M8 7v4M8 5h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    desc: "Get help with a product issue or raise a support ticket",
  },
  {
    id: "general",
    label: "General enquiry",
    icon: (
      <svg viewBox="0 0 16 16" fill="none">
        <path d="M8 2a6 6 0 100 12A6 6 0 008 2z" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M6.5 6.5a1.5 1.5 0 112.5 1.118V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <circle cx="8" cy="11" r=".5" fill="currentColor"/>
      </svg>
    ),
    desc: "Any other question or partnership enquiry",
  },
];

// Fields that change based on enquiry type
const DYNAMIC_FIELDS = {
  demo: [
    { name: "organisation", label: "Organisation name", placeholder: "Acme Corp", required: true },
    { name: "role", label: "Your role", placeholder: "e.g. HR Manager, IT Director", required: true },
    { name: "teamSize", label: "Estimated verifications per month", placeholder: "e.g. 50–200", required: false },
    { name: "preferredTime", label: "Preferred time to meet", placeholder: "e.g. Weekday mornings AEST", required: false },
  ],
  sales: [
    { name: "organisation", label: "Organisation name", placeholder: "Acme Corp", required: true },
    { name: "role", label: "Your role", placeholder: "e.g. Procurement, CEO", required: true },
    { name: "teamSize", label: "Estimated verifications per month", placeholder: "e.g. 100–500", required: false },
    { name: "useCase", label: "Primary use case", placeholder: "e.g. Employee onboarding, Age verification", required: false },
  ],
  support: [
    { name: "organisation", label: "Organisation name", placeholder: "Acme Corp", required: false },
    { name: "product", label: "Which product?", placeholder: "e.g. Identity verification, WWC Check", required: true },
    { name: "issue", label: "Describe the issue", placeholder: "What happened and what did you expect?", required: true, multiline: true },
  ],
  general: [
    { name: "organisation", label: "Organisation name (optional)", placeholder: "Acme Corp", required: false },
    { name: "message", label: "Your message", placeholder: "Tell us how we can help...", required: true, multiline: true },
  ],
};

function FieldError({ message }) {
  if (!message) return null;
  return (
    <div className="contact-field-error">
      <svg viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="5" stroke="#dc2626" strokeWidth="1.2"/>
        <path d="M6 4v2.5M6 8h.01" stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
      {message}
    </div>
  );
}

export default function ContactPage() {
  const [enquiryType, setEnquiryType] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const dynamicFields = enquiryType ? DYNAMIC_FIELDS[enquiryType] : [];

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onBlur = (field) => setTouched((t) => ({ ...t, [field]: true }));

  const getErrors = () => {
    const errors = {};
    if (!form.name) errors.name = "Full name is required";
    if (!form.email) errors.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email address";
    if (!enquiryType) errors.enquiryType = "Please select an enquiry type";

    dynamicFields.forEach((field) => {
      if (field.required && !form[field.name]) {
        errors[field.name] = `${field.label.replace(" (optional)", "")} is required`;
      }
    });
    return errors;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const allFields = ["name", "email", ...dynamicFields.map((f) => f.name)];
    const newTouched = {};
    allFields.forEach((f) => (newTouched[f] = true));
    setTouched(newTouched);

    const errors = getErrors();
    if (Object.keys(errors).length === 0) {
      setSuccess(true);
    }
  };

  const errors = getErrors();
  const showError = (field) => (touched[field] || submitted) && errors[field];

  const handleReset = () => {
    setEnquiryType(null);
    setForm({ name: "", email: "" });
    setTouched({});
    setSubmitted(false);
    setSuccess(false);
  };

  return (
    <div className="contact-page">
      <div className="contact-bg-orb contact-bg-orb--1" />
      <div className="contact-bg-orb contact-bg-orb--2" />

      {/* Hero */}
      <div className="contact-hero">
        <div className="contact-hero-inner">
          <span className="contact-eyebrow">Get in touch</span>
          <h1 className="contact-h1">
            Ready to <em>verify</em> smarter?<br />
            Our team is here to <strong>help</strong>.
            </h1>
         <p className="contact-hero-sub">
            Whether you're exploring VerifyChain for the first time, ready to get started,
            or need technical support — select your enquiry type and we'll connect you with the right person.
            </p>
        </div>
      </div>

      <div className="contact-body">
        <div className="contact-body-inner">

          {/* LEFT: contact info */}
          <div className="contact-info">
            <div className="contact-info-card">
              <h2 className="contact-info-title">Contact details</h2>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="M3 3h3l1.5 3.5-1.5 1a7 7 0 003.5 3.5l1-1.5L14 11v3a1 1 0 01-1 1C6 15 1 10 1 4a1 1 0 011-1h1z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <p className="contact-info-label">Phone & WhatsApp</p>
                  <a href="tel:+61407880432" className="contact-info-value">+61 407 880 432</a>
                  <p className="contact-info-sub">Mon–Fri, 8:30 AM – 6:00 PM AET</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                    <path d="M2 5l6 4.5L14 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <p className="contact-info-label">Email</p>
                  <a href="mailto:enquiry@verifychain.io" className="contact-info-value">enquiry@verifychain.io</a>
                  <p className="contact-info-sub">We respond within 1 business day</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="M8 1.5a5 5 0 100 10A5 5 0 008 1.5z" stroke="currentColor" strokeWidth="1.3"/>
                    <path d="M8 4v4l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <p className="contact-info-label">Support</p>
                  <a href="mailto:enquiry@verifychain.io" className="contact-info-value">Raise a support ticket</a>
                  <p className="contact-info-sub">For existing customers with product issues</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.3"/>
                    <path d="M2 14c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <p className="contact-info-label">Based in</p>
                  <p className="contact-info-value">Melbourne, Australia</p>
                  <p className="contact-info-sub">VerifyChain Pty Ltd · ABN 27 626 882 415</p>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="contact-quick">
              <p className="contact-quick-title">Quick links</p>
              <Link to="/demonstration" className="contact-quick-link">
                <svg viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                Try the live demonstration
              </Link>
              <Link to="/roadmap" className="contact-quick-link">
                <svg viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                View our product roadmap
              </Link>
              <Link to="/about" className="contact-quick-link">
                <svg viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                Meet the team
              </Link>
            </div>
          </div>

          {/* RIGHT: smart form */}
          <div className="contact-form-wrap">
            {success ? (
              <div className="contact-success">
                <div className="contact-success-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11" fill="#1e3a8a"/>
                    <path d="M7 12l3.5 3.5L17 8" stroke="#8bc34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="contact-success-title">Message sent!</h2>
                <p className="contact-success-sub">
                  Thanks for reaching out. Our team will get back to you within one business day.
                </p>
                {enquiryType === "demo" && (
                  <Link to="/demonstration" className="contact-success-demo">
                    While you wait, try our live demonstration →
                  </Link>
                )}
                <button className="contact-success-reset" onClick={handleReset}>
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="contact-form-title">Send us a message</h2>
                <p className="contact-form-sub">
                  Select what you need help with and we'll make sure it reaches the right person.
                </p>

                {/* Enquiry type selector */}
                <div className="contact-type-grid">
                  {ENQUIRY_TYPES.map((type) => (
                    <button
                      key={type.id}
                      className={`contact-type-btn ${enquiryType === type.id ? "contact-type-btn--active" : ""}`}
                      onClick={() => {
                        setEnquiryType(type.id);
                        setForm({ name: form.name, email: form.email });
                        setTouched({});
                        setSubmitted(false);
                      }}
                    >
                      <span className="contact-type-icon">{type.icon}</span>
                      <span className="contact-type-label">{type.label}</span>
                    </button>
                  ))}
                </div>
                {submitted && errors.enquiryType && (
                  <FieldError message={errors.enquiryType} />
                )}

                {enquiryType && (
                  <p className="contact-type-desc">
                    {ENQUIRY_TYPES.find((t) => t.id === enquiryType)?.desc}
                  </p>
                )}

                {/* Always-visible fields */}
                <div className="contact-fields">
                  <div className="contact-field">
                    <label>Full name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      onBlur={() => onBlur("name")}
                      placeholder="Jane Smith"
                      maxLength={100}
                      className={showError("name") ? "contact-input--error" : ""}
                    />
                    <FieldError message={showError("name")} />
                  </div>

                  <div className="contact-field">
                    <label>Email address</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={onChange}
                      onBlur={() => onBlur("email")}
                      placeholder="jane@company.com"
                      maxLength={100}
                      className={showError("email") ? "contact-input--error" : ""}
                    />
                    <FieldError message={showError("email")} />
                  </div>

                  {/* Dynamic fields based on enquiry type */}
                  {dynamicFields.map((field) => (
                    <div key={field.name} className="contact-field">
                      <label>{field.label}</label>
                      {field.multiline ? (
                        <textarea
                          name={field.name}
                          value={form[field.name] || ""}
                          onChange={onChange}
                          onBlur={() => onBlur(field.name)}
                          placeholder={field.placeholder}
                          maxLength={1000}
                          rows={4}
                          className={showError(field.name) ? "contact-input--error" : ""}
                        />
                      ) : (
                        <input
                          name={field.name}
                          value={form[field.name] || ""}
                          onChange={onChange}
                          onBlur={() => onBlur(field.name)}
                          placeholder={field.placeholder}
                          maxLength={200}
                          className={showError(field.name) ? "contact-input--error" : ""}
                        />
                      )}
                      <FieldError message={showError(field.name)} />
                    </div>
                  ))}
                </div>

                <button className="contact-submit" onClick={handleSubmit}>
                  Send message →
                </button>

                <p className="contact-privacy">
                  Your information is handled in accordance with our privacy policy and the Australian Privacy Act 1988. We never sell your data.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}