import "./WhyVerifyChain.css";

const cards = [
  {
    title: "Blockchain-secured credentials",
    desc: "Every credential recorded on Hyperledger Fabric — tamper-proof, immutable, instantly verifiable by any party you authorise.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: "Zero-knowledge privacy",
    desc: "Verify age, identity, or qualifications without ever seeing the underlying personal data. Users stay in control of every share.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </svg>
    ),
  },
  {
    title: "Minutes, not weeks",
    desc: "Checks that used to take days now complete in under five minutes — with a full auditable trail kept on-chain.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: "No infrastructure needed",
    desc: "Fully cloud-hosted on AWS and Azure. No servers for your team to manage. Access via browser or PWA on any device.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    title: "Built for non-technical users",
    desc: "Designed for HR managers, compliance officers, and security teams. Simple enough for anyone, powerful enough for enterprise.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      </svg>
    ),
  },
  {
    title: "We never sell your data",
    desc: "VerifyChain stores nothing off-chain and tracks no user behaviour. Privacy is not a feature — it's the architecture.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
  },
];

export default function WhyVerifyChain() {
  return (
    <section className="why-section">
      <div className="section-inner">
        <span className="section-eyebrow">Why VerifyChain</span>
        <h2 className="section-h2">
          The difference is<br /><em>in the architecture</em>
        </h2>
        <p className="section-body">
          Traditional verification is slow, costly, and leaks personal data.
          VerifyChain is built differently — from the ground up.
        </p>

        <div className="why-grid">
          {cards.map((c) => (
            <div key={c.title} className="why-card fade-up">
              <div className="why-icon">{c.icon}</div>
              <h3 className="why-title">{c.title}</h3>
              <p className="why-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
