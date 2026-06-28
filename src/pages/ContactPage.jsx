import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./ContactPage.css";

// ── EmailJS config ────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_wof9sbb";
const EMAILJS_TEMPLATE_ID = "template_r8jkopj";
const EMAILJS_PUBLIC_KEY       = "V6Cz6xFQihHiqjre3";
const EMAILJS_AUTOREPLY_ID    = "template_j2qzuuq";

const INQUIRY_LABELS = {
  demo:    "Book a demo",
  general: "General enquiry",
  partner: "Partnership",
  support: "Technical support",
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

      {/* FIX: removed the conditional "--active" class — the dark navy
          background and white text are now the permanent style for
          both /contact and /contact?inquiry=demo, so the two no longer
          look inconsistent depending on how the visitor arrived. */}
      <section className="contact-demo-hero">
        <div className="contact-demo-inner">

          {/* Left: context */}
          <div className="contact-demo-left">
            <span className="contact-eyebrow">
              {isDemo ? "Book a demo" : "Get in touch"}
            </span>
            <h1 className="contact-h1">
              {isDemo
                ? <>See VerifyChain<br /><em>in person.</em></>
                : <>Talk to<br /><em>our team.</em></>}
            </h1>
            <p className="contact-hero-sub">
              {isDemo
                ? "Book a personalised walkthrough with our team. We'll show you how VerifyChain works for your specific industry, compliance obligations, and use case — and answer any questions."
                : "Whether you want to book a demo, discuss integration, or find out which checks your organisation needs — we're here to help."}
            </p>
            <div className="contact-demo-points">
              {[
                "30-minute personalised walkthrough",
                "Tailored to your industry and use case",
                "No commitment — just clarity",
                "Live Q&A with our team",
              ].map(p => (
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
                  {isDemo ? "Book a demo" : "Get in touch"}
                </h3>

                {/* Inquiry type tabs */}
                <div className="contact-inquiry-tabs">
                  {[
                    { val: "demo",    label: "📅 Book a demo" },
                    { val: "general", label: "💬 General enquiry" },
                    { val: "partner", label: "🤝 Partnership" },
                    { val: "support", label: "🛠️ Technical support" },
                  ].map(t => (
                    <button
                      key={t.val}
                      type="button"
                      className={`contact-inquiry-tab ${form.inquiry === t.val ? "contact-inquiry-tab--active" : ""}`}
                      onClick={() => setForm(f => ({ ...f, inquiry: t.val }))}
                    >
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
                          ? "e.g. We need to run WWCC and identity checks for school staff across Victoria…"
                          : "How can we help?"
                      }
                    />
                  </div>
                </div>

                {/* Error message */}
                {status === "error" && (
                  <div className="contact-error">
                    <span>⚠️</span> {errorMsg}
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
              { icon: "📧", label: "Email us",          value: "hello@verifychain.io",    sub: "We respond within one business day" },
              { icon: "📍", label: "Based in",           value: "Melbourne, Australia",    sub: "Serving customers across Australia and New Zealand" },
              { icon: "🔒", label: "Privacy & security", value: "Privacy Act 1988 compliant", sub: "Zero data retained after any check" },
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