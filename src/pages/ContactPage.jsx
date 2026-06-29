import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./ContactPage.css";

// ── EmailJS config ────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_wof9sbb";
const EMAILJS_TEMPLATE_ID = "template_r8jkopj";
const EMAILJS_PUBLIC_KEY       = "V6Cz6xFQihHiqjre3";
const EMAILJS_AUTOREPLY_ID    = "template_j2qzuuq";

// ── Icon lookup — replaces emoji with consistent line-style SVGs ──
const ICONS = {
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
  ),
  message: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.5 8.5 0 11-3.8-7.1L21 3l-1.2 3.8a8.46 8.46 0 011.2 4.7z"/>
    </svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  tool: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/>
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
    </svg>
  ),
};

const INQUIRY_LABELS = {
  demo:    "Book a demo",
  general: "General enquiry",
  partner: "Partnership",
  support: "Technical support",
};

// FIX: left-side hero copy now keyed off form.inquiry (which updates
// live when the tabs are clicked) instead of the one-time isDemo flag
// from the URL — so clicking a different tab actually updates the
// headline/subtitle/points, not just the form itself.
const INQUIRY_HERO = {
  demo: {
    eyebrow: "Book a demo",
    headline: <>See VerifyChain<br /><em>in person.</em></>,
    sub: "Book a personalised walkthrough with our team. We'll show you how VerifyChain works for your specific industry, compliance obligations, and use case — and answer any questions.",
    points: [
      "30-minute personalised walkthrough",
      "Tailored to your industry and use case",
      "No commitment — just clarity",
      "Live Q&A with our team",
    ],
  },
  general: {
    eyebrow: "Get in touch",
    headline: <>Talk to<br /><em>our team.</em></>,
    sub: "Whether you want to book a demo, discuss integration, or find out which checks your organisation needs — we're here to help.",
    points: [
      "Response within one business day",
      "Talk to a real person, not a bot",
      "No obligation, just answers",
      "Happy to point you elsewhere if we're not the right fit",
    ],
  },
  partner: {
    eyebrow: "Partnership",
    headline: <>Let's build<br /><em>something together.</em></>,
    sub: "Integrating VerifyChain into your platform, exploring a reseller relationship, or co-building a solution for your industry — we'd love to hear what you have in mind.",
    points: [
      "Integration and API partnership options",
      "Reseller and white-label conversations welcome",
      "Tell us about your use case and audience",
      "Direct line to our founding team",
    ],
  },
  support: {
    eyebrow: "Technical support",
    headline: <>Get help<br /><em>from our team.</em></>,
    sub: "Running into an issue with integration, the API, or your account? Tell us what's happening and we'll help you sort it out.",
    points: [
      "Response within one business day",
      "Direct access to the team who built it",
      "Bring logs, error messages, or screenshots",
      "No issue too small to ask about",
    ],
  },
};

export default function ContactPage() {
  const location = useLocation();
  const params   = new URLSearchParams(location.search);
  const isDemo   = params.get("inquiry") === "demo";
  const formRef  = useRef();

  const [form, setForm] = useState({
    name: "", email: "", organisation: "", role: "", size: "", message: "",
    inquiry: isDemo ? "demo" : "general",
  });

  const [status, setStatus] = useState("idle"); // "idle" | "sending" | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isDemo) setForm(f => ({ ...f, inquiry: "demo" }));
  }, [isDemo]);

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  // FIX: hero content now derived from form.inquiry every render,
  // so it updates live as the person clicks between tabs.
  const hero = INQUIRY_HERO[form.inquiry] || INQUIRY_HERO.general;

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    // Map form fields to EmailJS template variables
    const templateParams = {
      from_name:    form.name,
      from_email:   form.email,
      email:        form.email,       // used for Reply-To in template
      organisation: form.organisation || "Not provided",
      role:         form.role         || "Not provided",
      org_size:     form.size         || "Not provided",
      inquiry_type: INQUIRY_LABELS[form.inquiry] || form.inquiry,
      message:      form.message      || "No message provided",
    };

    try {
      // 1. Send notification to you/Hormuz
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      // 2. Send auto-reply confirmation to the visitor
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_AUTOREPLY_ID,
        {
          to_name:      form.name,
          to_email:     form.email,
          inquiry_type: INQUIRY_LABELS[form.inquiry] || form.inquiry,
          organisation: form.organisation || "Not provided",
          role:         form.role         || "Not provided",
          message:      form.message      || "No message provided",
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or email us directly at hello@verifychain.io");
    }
  };

  return (
    <div className="contact-page">

      <section className="contact-demo-hero">
        <div className="contact-demo-inner">

          {/* Left: context — now reactive to form.inquiry */}
          <div className="contact-demo-left">
            <span className="contact-eyebrow">{hero.eyebrow}</span>
            <h1 className="contact-h1">{hero.headline}</h1>
            <p className="contact-hero-sub">{hero.sub}</p>
            <div className="contact-demo-points">
              {hero.points.map(p => (
                <div key={p} className="contact-demo-point">
                  <span>✓</span>{p}
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="contact-form-wrap">
            {status === "success" ? (
              <div className="contact-success">
                <div className="contact-success-icon">✓</div>
                <h3>Request received</h3>
                <p>
                  Thanks <strong>{form.name}</strong>. We've received your{" "}
                  {form.inquiry === "demo" ? "demo request" : "message"} and
                  will get back to you at <strong>{form.email}</strong> within
                  one business day.
                </p>
                {form.inquiry === "demo" && (
                  <p className="contact-success-note">
                    In the meantime, you can explore our animated demo on the
                    Technology page to see how verification works.
                  </p>
                )}
              </div>
            ) : (
              <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
                <h3 className="contact-form-title">
                  {form.inquiry === "demo" ? "Book a demo" : "Get in touch"}
                </h3>

                {/* Inquiry type tabs */}
                <div className="contact-inquiry-tabs">
                  {[
                    { val: "demo",    label: "Book a demo",        icon: ICONS.calendar },
                    { val: "general", label: "General enquiry",    icon: ICONS.message },
                    { val: "partner", label: "Partnership",        icon: ICONS.handshake },
                    { val: "support", label: "Technical support",  icon: ICONS.tool },
                  ].map(t => (
                    <button
                      key={t.val}
                      type="button"
                      className={`contact-inquiry-tab ${form.inquiry === t.val ? "contact-inquiry-tab--active" : ""}`}
                      onClick={() => setForm(f => ({ ...f, inquiry: t.val }))}
                    >
                      <span className="contact-inquiry-tab-icon">{t.icon}</span>
                      {t.label}
                    </button>
                  ))}
                </div>

                <div className="contact-fields">
                  <div className="contact-field-row">
                    <div className="contact-field">
                      <label>Full name *</label>
                      <input
                        name="name" value={form.name} onChange={onChange}
                        placeholder="Jane Smith" required
                      />
                    </div>
                    <div className="contact-field">
                      <label>Work email *</label>
                      <input
                        name="email" type="email" value={form.email}
                        onChange={onChange} placeholder="jane@company.com.au" required
                      />
                    </div>
                  </div>

                  <div className="contact-field-row">
                    <div className="contact-field">
                      <label>Organisation</label>
                      <input
                        name="organisation" value={form.organisation}
                        onChange={onChange} placeholder="Company or department name"
                      />
                    </div>
                    <div className="contact-field">
                      <label>Your role</label>
                      <input
                        name="role" value={form.role} onChange={onChange}
                        placeholder="e.g. HR Manager, Compliance Lead"
                      />
                    </div>
                  </div>

                  <div className="contact-field">
                    <label>Organisation size</label>
                    <select name="size" value={form.size} onChange={onChange}>
                      <option value="">Select…</option>
                      <option value="1-10">1 – 10 employees</option>
                      <option value="11-50">11 – 50 employees</option>
                      <option value="51-200">51 – 200 employees</option>
                      <option value="201-1000">201 – 1,000 employees</option>
                      <option value="1000+">1,000+ employees</option>
                      <option value="Government agency">Government agency</option>
                    </select>
                  </div>

                  <div className="contact-field">
                    <label>
                      {form.inquiry === "demo"
                        ? "What would you like to see in the demo?"
                        : "Message"}
                    </label>
                    <textarea
                      name="message" value={form.message} onChange={onChange}
                      rows={4}
                      placeholder={
                        form.inquiry === "demo"
                          ? "e.g. We need to run identity and qualification checks for school staff across Victoria…"
                          : "How can we help?"
                      }
                    />
                  </div>
                </div>

                {/* Error message */}
                {status === "error" && (
                  <div className="contact-error">
                    <span className="contact-error-icon">{ICONS.warning}</span> {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  className="contact-submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <span className="contact-sending">
                      <span className="contact-spinner" /> Sending…
                    </span>
                  ) : (
                    form.inquiry === "demo" ? "Request demo →" : "Send message →"
                  )}
                </button>

                <p className="contact-privacy">
                  We never share your details. Privacy Act 1988 compliant.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Other contact options */}
      <section className="contact-options">
        <div className="contact-options-inner">
          <h2 className="contact-options-h2">Other ways to connect</h2>
          <div className="contact-options-grid">
            {[
              { icon: ICONS.mail, label: "Email us",          value: "hello@verifychain.io",    sub: "We respond within one business day" },
              { icon: ICONS.pin,  label: "Based in",           value: "Melbourne, Australia",    sub: "Serving customers across Australia and New Zealand" },
              { icon: ICONS.lock, label: "Privacy & security", value: "Privacy Act 1988 compliant", sub: "Zero data retained after any check" },
            ].map(o => (
              <div key={o.label} className="contact-option-card">
                <span className="contact-option-icon">{o.icon}</span>
                <p className="contact-option-label">{o.label}</p>
                <p className="contact-option-value">{o.value}</p>
                <p className="contact-option-sub">{o.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}