import { useState, useRef, useEffect } from "react";
import "./Technology.css";

const stack = [
  { n: "01", title: "Hyperledger Fabric + Aries + Ursa", desc: "Enterprise permissioned distributed ledger with Raft consensus. Nodes distributed across multiple geographic regions — no single point of failure." },
  { n: "02", title: "W3C Verifiable Credentials", desc: "International standard for portable, interoperable digital credentials. Accepted across most global jurisdictions." },
  { n: "03", title: "Zero-knowledge proof layer", desc: "Cryptographic proofs that verify specific attributes without exposing any underlying personal data." },
  { n: "04", title: "REST + GraphQL APIs", desc: "OpenAPI 3.0 compliant. Integrate with existing HR, CRM, or compliance systems. Sync and async both supported." },
  { n: "05", title: "AES-256 + TLS 1.3 encryption", desc: "Military-grade security at rest and in transit. OAuth 2.0 and OpenID Connect for access control." },
];

const pillars = [
  { label: "Confidentiality", sub: "CIA Triad · 01", accent: "#4f46e5", ring: "#c7c4f8", title: "Zero-knowledge by design",    desc: "Personal data never leaves the user. VerifyChain generates a cryptographic proof of the result only — no raw data is ever exposed to the requesting organisation." },
  { label: "Integrity",       sub: "CIA Triad · 02", accent: "#0f6e56", ring: "#9fe1cb", title: "Tamper-proof records",         desc: "Every credential is hashed and recorded on a permissioned ledger. Once written, records cannot be altered — any change is instantly detectable by any authorised party." },
  { label: "Availability",    sub: "CIA Triad · 03", accent: "#185fa5", ring: "#85b7eb", title: "Always on, any device",        desc: "Cloud-hosted on AWS and Azure with geographic redundancy. No servers for your team to manage — access via browser or PWA from anywhere in the world." },
  { label: "Authentication",  sub: "Supporting · 04", accent: "#4f46e5", ring: "#c7c4f8", title: "Real-time identity checks",   desc: "Passport, licence, biometrics, and document checks verified instantly against authoritative government databases. Multi-factor by default." },
  { label: "Authorisation",   sub: "Supporting · 05", accent: "#0f6e56", ring: "#9fe1cb", title: "User-controlled access",      desc: "Organisations see only the verified proof they are permitted to see. Users explicitly grant and revoke access. Role-based controls manage organisational staff." },
  { label: "Accountability",  sub: "Supporting · 06", accent: "#854f0b", ring: "#f5c97a", title: "Full immutable audit trail",  desc: "Every check is logged — who requested it, when, which credential was verified, and the outcome. Logs are immutable and available for compliance review at any time." },
  { label: "Non-repudiation", sub: "Supporting · 07", accent: "#185fa5", ring: "#85b7eb", title: "Signed and timestamped",      desc: "Digital signatures and cryptographic timestamps on every event. No party can dispute the authenticity, timing, or outcome of a completed verification." },
];

const complianceItems = [
  { tag: "Security standards",    title: "NIST · ISO 27001 · TOGAF · SABSA", desc: "Developed in consultation with leading security and architecture frameworks to ensure every design decision meets recognised industry standards." },
  { tag: "Financial compliance",  title: "KYC and AML-ready",                desc: "Supports Know Your Customer obligations under Australian AML legislation. Purpose-built for banks and financial institutions." },
  { tag: "Government compliance", title: "ISM · IRAP",                       desc: "Aligned with the Australian Information Security Manual and IRAP assessment frameworks — meeting the standards government and regulated industries expect." },
];

const CX = 250, CY = 250, R = 175, NR = 46;

function getPos(i) {
  const a = -Math.PI / 2 + (2 * Math.PI / pillars.length) * i;
  return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) };
}

function NodeLabel({ label, accent }) {
  const words = label.split(" ");
  if (words.length === 1) {
    return (
      <text textAnchor="middle" dominantBaseline="central"
        fontSize="11" fontWeight="600" fill={accent}
        fontFamily="'DM Sans', sans-serif" y="4">
        {label}
      </text>
    );
  }
  return (
    <>
      {words.map((w, wi) => (
        <text key={wi} textAnchor="middle" dominantBaseline="central"
          fontSize="11" fontWeight="600" fill={accent}
          fontFamily="'DM Sans', sans-serif"
          y={words.length === 2 ? (wi === 0 ? -2 : 12) : -6 + wi * 12}>
          {w}
        </text>
      ))}
    </>
  );
}

function SecurityHub() {
  const [active, setActive] = useState(null);
  const infoRef = useRef(null);

  const handleSelect = (i) => setActive(i === active ? null : i);

  useEffect(() => {
    if (infoRef.current && active !== null) {
      infoRef.current.classList.remove("hub-info--animate");
      void infoRef.current.offsetWidth;
      infoRef.current.classList.add("hub-info--animate");
    }
  }, [active]);

  return (
    <div className="hub-outer">
      <div className="hub-diagram-wrap">
        <svg viewBox="0 0 500 500" className="hub-svg">
          <defs>
            <radialGradient id="hubBgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(200,210,255,0.3)" />
              <stop offset="100%" stopColor="rgba(200,210,255,0)" />
            </radialGradient>
          </defs>

          <circle cx={CX} cy={CY} r={210} fill="url(#hubBgGrad)" />
          <circle cx={CX} cy={CY} r={175} fill="none" stroke="rgba(180,190,220,0.35)" strokeWidth="1" />
          <circle cx={CX} cy={CY} r={110} fill="none" stroke="rgba(180,190,220,0.35)" strokeWidth="1" strokeDasharray="6 5" />

          {pillars.map((p, i) => {
            const { x, y } = getPos(i);
            return (
              <line key={i}
                x1={CX} y1={CY} x2={x} y2={y}
                className={`hub-spoke${active === i ? " hub-spoke--active" : ""}`}
                style={active === i ? { stroke: p.accent } : {}}
              />
            );
          })}

          {pillars.map((p, i) => {
            const { x, y } = getPos(i);
            const isActive = active === i;
            return (
              <g key={i}
                className={`hub-node${isActive ? " hub-node--active" : ""}`}
                transform={`translate(${x},${y})`}
                onClick={() => handleSelect(i)}>
                <circle r={NR} fill="rgba(0,0,0,0.06)" cx="1" cy="3" />
                <circle r={NR} fill="#fff"
                  stroke={isActive ? p.accent : p.ring}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  className="hub-node-circle"
                />
                <circle r="5" cy="-14" cx="0" fill={p.accent} />
                <NodeLabel label={p.label} accent={p.accent} />
              </g>
            );
          })}

          <g className="hub-center">
            <circle cx={CX} cy={CY + 4} r={52} fill="rgba(0,0,0,0.07)" />
            <circle cx={CX} cy={CY} r={52} fill="#fff" stroke="#3b5ccc" strokeWidth="1.5" />
            <path
              d={`M${CX} ${CY-20} C${CX-14} ${CY-20} ${CX-20} ${CY-10} ${CX-20} ${CY} C${CX-20} ${CY+14} ${CX-8} ${CY+20} ${CX} ${CY+22} C${CX+8} ${CY+20} ${CX+20} ${CY+14} ${CX+20} ${CY} C${CX+20} ${CY-10} ${CX+14} ${CY-20} ${CX} ${CY-20}Z`}
              fill="none" stroke="#3b5ccc" strokeWidth="1.5" strokeLinejoin="round"
            />
            <path
              d={`M${CX-7} ${CY+1} L${CX-2} ${CY+6} L${CX+8} ${CY-5}`}
              fill="none" stroke="#3b5ccc" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>

      <div className="hub-info-area">
        {active === null ? (
          <p className="hub-info-placeholder">
            Select a pillar to explore how VerifyChain addresses it
          </p>
        ) : (
          <div className="hub-info-content" ref={infoRef} key={active}>
            <p className="hub-info-eyebrow">{pillars[active].sub}</p>
            <h4 className="hub-info-title">{pillars[active].title}</h4>
            <p className="hub-info-desc">{pillars[active].desc}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Technology() {
  return (
    <section className="tech-section">
      <div className="section-inner">

        {/* ── Tech stack ── */}
        <div className="tech-layout">
          <div className="tech-left">
            <span className="section-eyebrow">Technology</span>
            <h2 className="section-h2">
              Secure by design,<br /><em>simple by choice</em>
            </h2>
            <p className="section-body">
              Built to enterprise security standards — every layer of VerifyChain maps to recognised information security frameworks. Simple interface, serious architecture underneath.
            </p>
            <button className="btn-ghost">Architecture overview →</button>
          </div>

          <div className="tech-list">
            {stack.map((s) => (
              <div key={s.n} className="tech-row fade-up">
                <span className="tech-num">{s.n}</span>
                <div>
                  <h4 className="tech-title">{s.title}</h4>
                  <p className="tech-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Security framework ── */}
        <div className="pillars-section fade-up">
          <div className="pillars-header">
            <span className="section-eyebrow">Security framework</span>
            <h3 className="pillars-h3">
              Built on every<br /><em>security pillar</em>
            </h3>
            <p className="section-body pillars-intro">
              VerifyChain addresses all seven pillars of the CIA cybersecurity framework — not retrofitted for compliance, but architected for it from the ground up.
            </p>
          </div>

          <SecurityHub />

          {/* Compliance rows */}
          <div className="compliance-list">
            {complianceItems.map((c) => (
              <div key={c.tag} className="compliance-row fade-up">
                <span className="compliance-tag">{c.tag}</span>
                <div className="compliance-body">
                  <h4 className="compliance-title">{c.title}</h4>
                  <p className="compliance-desc">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="pillars-footnote">
            VerifyChain is developed in consultation with NIST, ISO 27001, TOGAF, and SABSA architecture frameworks — with alignment to Australian government ISM and IRAP requirements.
          </p>
        </div>

      </div>
    </section>
  );
}