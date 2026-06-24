import { useState } from "react";
import { Link } from "react-router-dom";
import "./TechnologyPage.css";

const STACK = [
  {
    num: "01",
    title: "Secure distributed ledger",
    sub: "Infrastructure",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><path d="M12 12v3M10 14h4"/>
      </svg>
    ),
    desc: "VerifyChain is built on enterprise-grade distributed ledger technology (Hyperledger Fabric, Aries, and Ursa) providing the scalability, security, and governance features required for large-scale verification. Once a credential is recorded, it cannot be altered — any tampering is immediately detectable.",
    points: ["Permissioned architecture — only authorised parties can participate", "Multi-region nodes ensure no single point of failure", "Smart contracts automate verification logic with no manual steps"],
  },
  {
    num: "02",
    title: "W3C Verifiable Credentials",
    sub: "Standards",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    desc: "All credentials issued by VerifyChain comply with the W3C Verifiable Credentials international standard — the same standard adopted by governments and enterprises across the globe. This means your organisation's verified credentials are portable, interoperable, and future-proof.",
    points: ["Accepted across most global jurisdictions", "Interoperates with other compliant identity systems", "Future-proofed against evolving regulatory requirements"],
  },
  {
    num: "03",
    title: "Zero-knowledge proofs",
    sub: "Privacy layer",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
        <line x1="3" y1="3" x2="21" y2="21"/>
      </svg>
    ),
    desc: "Personal information never leaves the user. When a check is requested, VerifyChain produces a cryptographic proof — proving only the specific fact being asked about (e.g. 'this person is over 18') without exposing the underlying data. The requesting organisation sees the result, not the record.",
    points: ["No raw personal data transmitted to verifying organisations", "Privacy Act 1988 and GDPR compliant by design", "Selective disclosure — users control exactly what is shared"],
  },
  {
    num: "04",
    title: "AES-256 + TLS 1.3 encryption",
    sub: "Security",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
    desc: "Every piece of data is encrypted at rest using AES-256 — the same standard used by financial institutions and government agencies — and protected in transit with TLS 1.3. Access is controlled through OAuth 2.0 and OpenID Connect protocols.",
    points: ["Military-grade encryption at rest and in transit", "OAuth 2.0 and OpenID Connect for secure access control", "Hardware Security Modules (HSM) for cryptographic key management"],
  },
  {
    num: "05",
    title: "REST and GraphQL APIs",
    sub: "Integration",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 9l3 3-3 3M13 15h3"/><rect x="2" y="4" width="20" height="16" rx="2"/>
      </svg>
    ),
    desc: "VerifyChain provides comprehensive REST and GraphQL APIs that let your existing HR, CRM, or compliance systems connect without rebuilding anything. OpenAPI 3.0 compliant documentation makes integration straightforward for any development team.",
    points: ["Synchronous and asynchronous verification supported", "Plug into existing HR, CRM, and compliance platforms", "SDKs and documentation provided for rapid integration"],
  },
  {
    num: "06",
    title: "Zero-trust architecture",
    sub: "Security model",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    desc: "No user, device, or system component is automatically trusted — regardless of location or previous authentication. Every access request is continuously verified based on current context and risk. Role-based access control (RBAC) ensures users only see what they are permitted to see.",
    points: ["Continuous verification — trust is never assumed", "Role-based access control for organisations and individuals", "Multi-factor authentication (MFA) with SMS and email today, biometrics in the roadmap"],
  },
];

const COMPLIANCE = [
  { label: "NIST",      full: "National Institute of Standards & Technology",  desc: "The most widely adopted security framework in the world, covering identify, protect, detect, respond, and recover across VerifyChain's entire platform." },
  { label: "ISO 27001", full: "Information Security Management",                desc: "Internationally recognised standard for managing information security risks. VerifyChain's security controls, incident response, and monitoring processes are aligned to ISO 27001." },
  { label: "TOGAF",     full: "The Open Group Architecture Framework",          desc: "Enterprise architecture methodology guiding how VerifyChain's systems are designed, integrated, and governed — ensuring a coherent, scalable platform structure." },
  { label: "SABSA",     full: "Sherwood Applied Business Security Architecture", desc: "Security architecture framework that ties every technical control back to a business outcome — so VerifyChain's security posture directly supports your compliance obligations." },
  { label: "KYC / AML", full: "Know Your Customer & Anti-Money Laundering",     desc: "Purpose-built for financial institutions. VerifyChain supports KYC obligations and is preparing for expanded AML compliance ahead of Australia's July 2026 legislation changes." },
  { label: "ISM / IRAP",full: "Australian Government Security Requirements",     desc: "Aligned with the Australian Information Security Manual and IRAP assessment frameworks — meeting the standards required for government and regulated industry deployments." },
];

export default function TechnologyPage() {
  const [active, setActive] = useState(0);

  return (
    <div className="tech-page">

      {/* Hero */}
      <section className="tech-hero">
        <div className="tech-hero-inner">
          <span className="tech-eyebrow">How VerifyChain works</span>
          <h1 className="tech-h1">Built on security.<br /><em>Designed for trust.</em></h1>
          <p className="tech-hero-sub">
            VerifyChain combines internationally recognised credential standards with enterprise-grade
            security to make verification fast, private, and tamper-proof — without exposing any
            personal data to the organisations requesting checks.
          </p>
          <div className="tech-hero-ctas">
            <Link to="/contact?inquiry=demo" className="tech-cta-primary">Book a demo →</Link>
            <Link to="/contact" className="tech-cta-ghost">Talk to our team</Link>
          </div>
        </div>
        <div className="tech-hero-badge-row">
          {["Zero personal data transmitted", "Tamper-proof records", "Instant verification", "Globally recognised standards"].map(b => (
            <span key={b} className="tech-hero-badge">✓ {b}</span>
          ))}
        </div>
      </section>

      {/* How it works — 3 steps */}
      <section className="tech-section tech-how">
        <div className="tech-section-inner">
          <p className="tech-section-label">The process</p>
          <h2 className="tech-section-h2">How verification works</h2>
          <p className="tech-section-sub">From request to result in minutes — with zero raw data ever leaving the individual.</p>
          <div className="tech-steps">
            {[
              { n: "1", title: "Request is made",    desc: "An organisation requests a verification check via VerifyChain's platform or API. The individual is notified and consents to the specific check." },
              { n: "2", title: "Proof is generated", desc: "VerifyChain queries the relevant authoritative data source — government database, educational registry, or law enforcement database — and generates a cryptographic proof of the result." },
              { n: "3", title: "Result is delivered", desc: "The organisation receives a verified result and a tamper-proof certificate. No personal data is transmitted — only the cryptographic confirmation that the check passed or failed." },
            ].map((s, i) => (
              <div key={i} className="tech-step">
                <div className="tech-step-num">{s.n}</div>
                <div>
                  <h3 className="tech-step-title">{s.title}</h3>
                  <p className="tech-step-desc">{s.desc}</p>
                </div>
                {i < 2 && <div className="tech-step-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack interactive */}
      <section className="tech-section tech-stack-section">
        <div className="tech-section-inner">
          <p className="tech-section-label">Under the hood</p>
          <h2 className="tech-section-h2">The technology stack</h2>
          <p className="tech-section-sub">Every layer is chosen to meet the security and compliance requirements of government and financial services.</p>

          <div className="tech-stack-layout">
            <div className="tech-stack-tabs">
              {STACK.map((s, i) => (
                <button
                  key={i}
                  className={`tech-stack-tab ${active === i ? "tech-stack-tab--active" : ""}`}
                  onClick={() => setActive(i)}
                >
                  <span className="tech-stack-tab-num">{s.num}</span>
                  <div>
                    <p className="tech-stack-tab-title">{s.title}</p>
                    <p className="tech-stack-tab-sub">{s.sub}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="tech-stack-detail">
              <div className="tech-stack-detail-icon">{STACK[active].icon}</div>
              <h3 className="tech-stack-detail-title">{STACK[active].title}</h3>
              <p className="tech-stack-detail-sub">{STACK[active].sub}</p>
              <p className="tech-stack-detail-desc">{STACK[active].desc}</p>
              <ul className="tech-stack-detail-points">
                {STACK[active].points.map((pt, i) => (
                  <li key={i}><span>✓</span>{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance frameworks */}
      <section className="tech-section tech-compliance">
        <div className="tech-section-inner">
          <p className="tech-section-label">Compliance and standards</p>
          <h2 className="tech-section-h2">Built to industry requirements</h2>
          <p className="tech-section-sub">VerifyChain is designed and audited against the frameworks that matter to government, financial services, and enterprise.</p>
          <div className="tech-compliance-grid">
            {COMPLIANCE.map(c => (
              <div key={c.label} className="tech-compliance-card">
                <div className="tech-compliance-tag">{c.label}</div>
                <p className="tech-compliance-full">{c.full}</p>
                <p className="tech-compliance-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform */}
      <section className="tech-section tech-platform">
        <div className="tech-section-inner">
          <p className="tech-section-label">Deployment</p>
          <h2 className="tech-section-h2">Flexible cloud hosting</h2>
          <p className="tech-section-sub">VerifyChain is currently hosted on AWS, with the flexibility to deploy on any major cloud provider based on your organisation's requirements.</p>
          <div className="tech-platform-grid">
            {[
              { icon: "☁️", title: "Hosted on AWS",       desc: "Currently deployed on Amazon Web Services. Can be hosted on Azure, GCP, or a provider of your choice if your organisation has specific requirements." },
              { icon: "📱", title: "Works on any device",                 desc: "Responsive web portal for HR and compliance teams. Progressive Web App (PWA) for individuals — download once, works like a native app on iOS or Android." },
              { icon: "🔌", title: "Plug into your existing systems",     desc: "REST and GraphQL APIs connect VerifyChain to your HR platform, CRM, or compliance tools. OpenAPI 3.0 documentation included." },
              { icon: "🌐", title: "Browser-compatible everywhere",        desc: "Chrome, Edge, Firefox, and Safari all supported. No proprietary plugins or software required for your team or your clients." },
            ].map(p => (
              <div key={p.title} className="tech-platform-card">
                <span className="tech-platform-icon">{p.icon}</span>
                <h4 className="tech-platform-title">{p.title}</h4>
                <p className="tech-platform-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tech-cta-section">
        <div className="tech-cta-inner">
          <h2>Ready to see it in action?</h2>
          <p>Run a live verification in under 5 minutes — no sign-up required.</p>
          <div className="tech-hero-ctas">
            <Link to="/contact?inquiry=demo" className="tech-cta-primary">Book a demo →</Link>
            <Link to="/contact" className="tech-cta-ghost">Contact us</Link>
          </div>
        </div>
      </section>

    </div>
  );
}