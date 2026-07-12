import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";

/* ════════════════════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════════════════════ */

const floatItems = [
  { cls: "fi-shield",   label: "Identity verified",      delay: "0s"    },
  { cls: "fi-lock",     label: "End-to-end encrypted",   delay: "0.6s"  },
  { cls: "fi-check",    label: "Crime check — clear",    delay: "1.2s"  },
  { cls: "fi-age",      label: "Age confirmed — 18+",    delay: "1.8s"  },
  { cls: "fi-qual",     label: "Qualification verified", delay: "2.4s"  },
];

function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow hero-glow--left"  />
      <div className="hero-glow hero-glow--right" />

      <div className="hero-inner">
        <div className="hero-copy">
        

          <h1 className="hero-h1">
            Verify anyone.<br />
            <em>Instantly.</em>
          </h1>

          <p className="hero-sub">
            VerifyChain is a secure, flexible verification platform that lets
            organisations confirm identity, age, qualifications and
            criminal history - in minutes, on any device, with zero data exposure.
          </p>

          <div className="hero-actions">
            <Link to="/contact?inquiry=demo">
              <button className="btn-dark btn-lg hero-btn-primary">
                Book a Personalised Walkthrough →
              </button>
            </Link>
            <Link to="/contact"><button className="btn-ghost btn-lg">Contact Us</button></Link>
          </div>

          <div className="hero-trust">
            <div className="hero-trust-avatars">
              {["SC","JW","PN","MO","LP"].map(i => (
                <div key={i} className="hero-trust-av">{i}</div>
              ))}
            </div>
            <span className="hero-trust-text">Trusted by HR, security & compliance teams</span>
          </div>
        </div>

        <div className="hero-visual">
          {floatItems.map((item) => (
            <div key={item.cls} className={`float-badge ${item.cls}`} style={{ animationDelay: item.delay }}>
              <span className="float-badge-dot" />
              <span className="float-badge-label">{item.label}</span>
            </div>
          ))}

          <div className="phone-device">
            <div className="phone-notch" />
            <div className="phone-screen">
              <div className="app-header">
                <div className="app-header-logo">
  <img src="/VC-Logo-Blue-01.png" alt="VerifyChain" style={{ height: "14px", width: "auto" }} />
</div>
                <span>VerifyChain</span>
                <div className="app-header-badge">LIVE</div>
              </div>

              <div className="scan-zone">
                <div className="scan-frame">
                  <span className="scan-corner scan-corner--tl" />
                  <span className="scan-corner scan-corner--tr" />
                  <span className="scan-corner scan-corner--bl" />
                  <span className="scan-corner scan-corner--br" />
                  <div className="scan-face">
                    <svg viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="40" cy="38" rx="24" ry="26" fill="#c8b8a2"/>
                      <ellipse cx="40" cy="38" rx="24" ry="26" fill="url(#face-grad)"/>
                      <ellipse cx="40" cy="70" rx="28" ry="18" fill="#b0a090" opacity="0.5"/>
                      <ellipse cx="40" cy="72" rx="30" ry="20" fill="#d4c4b0" opacity="0.6"/>
                      <ellipse cx="33" cy="36" rx="3.5" ry="4" fill="#5a4030"/>
                      <ellipse cx="47" cy="36" rx="3.5" ry="4" fill="#5a4030"/>
                      <ellipse cx="33" cy="35" rx="1.5" ry="1.8" fill="#fff" opacity="0.6"/>
                      <ellipse cx="47" cy="35" rx="1.5" ry="1.8" fill="#fff" opacity="0.6"/>
                      <path d="M34 46 Q40 51 46 46" stroke="#8a6a50" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                      <ellipse cx="40" cy="20" rx="20" ry="14" fill="#2d1a0e"/>
                      <defs>
                        <radialGradient id="face-grad" cx="40%" cy="40%" r="60%">
                          <stop offset="0%" stopColor="#e8d4bc"/>
                          <stop offset="100%" stopColor="#c8a888"/>
                        </radialGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="scan-line" />
                </div>
                <p className="scan-hint">Scanning identity document…</p>
              </div>

              <button className="app-verify-btn">
                <svg viewBox="0 0 16 16" fill="none"><path d="M3 8a5 5 0 1 0 10 0A5 5 0 0 0 3 8Z" stroke="white" strokeWidth="1.4"/><path d="M5.5 8l2 2L11 6" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                VERIFY
              </button>

              <div className="app-status-row">
                <div className="app-status app-status--done">
                  <svg viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  ID confirmed
                </div>
                <div className="app-status app-status--done">
                  <svg viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Age 18+
                </div>
                <div className="app-status app-status--pending">
                  <span className="app-spin" />
                  Crime check
                </div>
              </div>
            </div>
            <div className="phone-hand" />
          </div>

          <svg className="hero-arcs" viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="240" cy="240" r="160" stroke="rgba(99,130,200,0.12)" strokeWidth="1" strokeDasharray="6 8"/>
            <circle cx="240" cy="240" r="210" stroke="rgba(99,130,200,0.07)" strokeWidth="1" strokeDasharray="4 10"/>
          </svg>
        </div>
      </div>

      <div className="hero-stats-strip">
        {[
          { num: "Any device", label: "Works everywhere" },
          { num: "< 5 min",   label: "Average verify time"    },
          { num: "0",         label: "Data sold or tracked"   },
          { num: "AUS+",      label: "Global coverage"        },
        ].map((s) => (
          <div key={s.label} className="hero-stat">
            <span className="hero-stat-num">{s.num}</span>
            <span className="hero-stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   TICKER
   FIX: removed "Working with children check" (deprioritised) and
   "Blockchain-secured credentials" (moving away from blockchain)
════════════════════════════════════════════════════════════════ */

function Ticker() {
  const items = [
    "Identity verification",
    "Age verification",
    "National crime check",
    "Qualification verification",
    "Zero-knowledge privacy",
    "Document Verification Service",
    "GDPR compliant",
    "Digital ID Act 2024",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-sep">—</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   TRUST BAR
════════════════════════════════════════════════════════════════ */

function TrustBar() {
  const sectors = [
    "Government agencies",
    "Financial institutions",
    "Education providers",
    "HR & compliance",
    "Healthcare",
  ];
  return (
    <div className="trust-bar">
      <div className="trust-inner">
        <span className="trust-label">Serving</span>
        <div className="trust-chips">
          {sectors.map((s) => (
            <span key={s} className="trust-chip">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   DASHBOARD
   FIX: replaced WWCC sample row with Qualification verification
   to avoid showcasing a deprioritised product as live/active
════════════════════════════════════════════════════════════════ */

function Dashboard() {
  const rows = [
    { init: "SC", name: "Sarah Chen",    type: "Identity · passport",       badge: "green", label: "Verified" },
    { init: "JW", name: "James Wu",      type: "Age verification · 18+",    badge: "green", label: "Confirmed" },
    { init: "PN", name: "Dr. Priya Nair",type: "Qualification · PhD Medical",badge: "green", label: "Verified" },
    { init: "MO", name: "Mark O'Brien",  type: "National crime check",      badge: "green", label: "Clear" },
    { init: "LP", name: "Lisa Park",     type: "Identity · licence",        badge: "blue",  label: "Processing" },
  ];
  return (
    <section className="dash-section">
      <div className="section-inner">
        <span className="section-eyebrow">Live platform</span>
        <h2 className="section-h2">
          Verification at a<br /><em>glance</em>
        </h2>
        <p className="section-body">
          One dashboard. Every check your organisation needs.
          Results in under five minutes.
        </p>

        <div className="window-chrome fade-up">
          <div className="window-bar">
            <span className="window-dot" style={{ background: "#ff5f57" }} />
            <span className="window-dot" style={{ background: "#febc2e" }} />
            <span className="window-dot" style={{ background: "#28c840" }} />
            <span className="window-title">VerifyChain — verification dashboard</span>
          </div>
          <div className="dash-rows">
            {rows.map((r) => (
              <div key={r.name} className="dash-row">
                <div className="dash-left">
                  <div className="dash-avatar">{r.init}</div>
                  <div>
                    <div className="dash-name">{r.name}</div>
                    <div className="dash-type">{r.type}</div>
                  </div>
                </div>
                <span className={`badge badge-${r.badge}`}>
                  <span className="badge-dot" />
                  {r.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   PRODUCTS
   (already correct — WWCC/eSeal already hidden)
════════════════════════════════════════════════════════════════ */

const products = [
  {
    num: "01", slug: "identity-verification",
    name: "Identity verification",
    desc: "Validate passports, driver's licences, and national IDs against government databases in real time.",
    status: "live", statusLabel: "Production ready",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2"/>
        <path d="M7 8h10M7 12h6M7 16h4"/>
      </svg>
    ),
  },
  {
    num: "02", slug: "age-verification",
    name: "Age verification",
    desc: "Confirm age from documents or estimate via AI camera — without revealing a birth date. Tested by the Australian Government.",
    status: "live", statusLabel: "Production ready",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
  },
  {
    num: "03", slug: "qualification-verification",
    name: "Qualification verification",
    desc: "Verify university degrees and trade qualifications. USI integration in progress for complete Australian VET coverage.",
    status: "poc", statusLabel: "Proof of concept",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    num: "04", slug: "national-crime-check",
    name: "National crime check",
    desc: "Automated background screening via Australian law enforcement databases. Real-time and repeat checks supported.",
    status: "live", statusLabel: "Production ready",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  // Hidden per Hormuz's feedback — re-add when confirmed:
  // { num: "05", slug: "working-with-children-check", name: "Working with children check", ... },
  // { num: "06", slug: "eseal-document-verification", name: "eSeal document verification", ... },
];

function Products() {
  const navigate = useNavigate();
  return (
    <section className="products-section">
      <div className="products-inner">
        <span className="section-eyebrow products-eyebrow">Products</span>
        <h2 className="section-h2 products-h2">
          More than just<br /><em>identity</em>
        </h2>
        <p className="section-body products-body">
          All the necessary industry-driven verification products on a single platform — mix and match
          what your organisation needs.
        </p>

        <div className="products-grid">
          {products.map((p) => (
            <div key={p.num} className={`prod-cell fade-up ${p.status === "live" ? "prod-cell--live" : ""}`}>
              <span className="prod-num">{p.num}</span>
              <div className="prod-icon">{p.icon}</div>
              <h3 className="prod-name">{p.name}</h3>
              <p className="prod-desc">{p.desc}</p>
              <button className="prod-learn-more" onClick={() => navigate(`/products/${p.slug}`)}>
                Learn more →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   HOW IT WORKS
   (already corrected in a previous session — OCR removed, wallet
   language applied, DVS named explicitly)
════════════════════════════════════════════════════════════════ */

function HowItWorks() {
  const steps = [
    { n: "1", title: "Create account & select document", desc: "Choose your country and document type — driver's licence or passport — then enter your details.", active: true },
    { n: "2", title: "Document checked against government records", desc: "Verified in real time through official sources such as the Document Verification Service (DVS).", active: true },
    { n: "3", title: "Built to zero trust standards", desc: "Verified to industry zero trust requirements. Raw personal data never leaves the user.", active: true },
    { n: "4", title: "Shared on user's terms", desc: "Saved to your wallet. Organisations request access — you choose what to approve.", active: false },
  ];
  return (
    <section className="hiw-section">
      <div className="hiw-inner">
        <span className="section-eyebrow">How it works</span>
        <h2 className="section-h2">
          Four steps.<br /><em>Minutes, not weeks.</em>
        </h2>

        <div className="hiw-steps">
          <div className="hiw-line" />
          {steps.map((s) => (
            <div key={s.n} className="hiw-step fade-up">
              <div className={`hiw-circle ${s.active ? "hiw-circle--active" : ""}`}>
                {s.n}
              </div>
              <h4 className="hiw-title">{s.title}</h4>
              <p className="hiw-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   WHY VERIFYCHAIN
   FIX: "AWS and Azure" → "AWS, with flexibility to other providers"
   FIX: softened "cryptographically secured / tamper-proof / immutable"
        blockchain-adjacent language in card 1 — now privacy/architecture
        framed without overstating ledger-specific claims
════════════════════════════════════════════════════════════════ */

function WhyVerifyChain() {
  const cards = [
    {
      title: "Zero trust security architecture",
      desc: "Every request is verified — nothing is trusted by default. Built so a breach in one place can't cascade across the platform.",
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
      desc: "Checks that used to take days now complete in under five minutes — with a full auditable trail maintained securely",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
    },
    {
      title: "Flexible cloud hosting",
      desc: "Currently hosted on AWS, with the flexibility to deploy on any major cloud provider based on your requirements. No servers for your team to manage.",
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
      desc: "VerifyChain stores nothing externally and tracks no user behaviour. Privacy is not a feature — it's the architecture.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ),
    },
  ];
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

/* ════════════════════════════════════════════════════════════════
   USE CASES
   FIX: "Education & childcare" card no longer promotes WWCC as a
   current offering — reframed around qualification verification,
   which IS live
════════════════════════════════════════════════════════════════ */

function UseCases() {
  const cases = [
    {
      tag: "HR & recruitment",
      title: "Hire faster, hire safer",
      desc: "Run identity, crime, and qualification checks simultaneously. Candidates self-verify — your team just reviews the result. No paper chasing.",
    },
    {
      tag: "Security standards",
      title: "Security standards compliance",
      desc: "VerifyChain is developed in consultation with frameworks such as NIST, ISO 27001, architecture frameworks including TOGAF and SABSA — built to what the industry expects.",
    },
    {
      tag: "Financial services",
      title: "Know Your Customer (KYC)",
      desc: "Support KYC obligations for banks and financial institutions. Verify customer identity end-to-end, with full audit trail and AML-ready processes — as a separate, dedicated workflow.",
    },
    {
      tag: "Education",
      title: "Verified credentials, every time",
      desc: "Verify teacher and staff qualifications and academic credentials quickly — anywhere in Australia.",
    },
    {
      tag: "Government",
      title: "Government compliance",
      desc: "Meet compliance standards expected by government — including ISM, IRAP, and other frameworks that apply to businesses operating in or with the public sector.",
    },
  ];
  return (
    <section className="uc-section">
      <div className="section-inner">
        <span className="section-eyebrow">Use cases</span>
        <h2 className="section-h2">
          What makes us<br /><em>different</em>
        </h2>
        <p className="section-body">
          Fast, secure, and built to industry standards — here's what sets VerifyChain apart.
        </p>

        <div className="uc-grid">
          {cases.map((c) => (
            <div key={c.tag} className="uc-card fade-up">
              <span className="uc-tag">{c.tag}</span>
              <h3 className="uc-title">{c.title}</h3>
              <p className="uc-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   TECHNOLOGY (homepage section, with embedded SecurityHub diagram)
   FIX: "AWS and Azure" → flexible hosting language
   FIX: Hyperledger/blockchain-specific stack item softened to avoid
        contradicting the move away from blockchain architecture —
        replaced with a neutral "distributed ledger" framing pending
        Gina's confirmed architecture direction
════════════════════════════════════════════════════════════════ */

const stack = [
  { n: "01", title: "Secure distributed infrastructure", desc: "Enterprise-grade distributed architecture with multi-region redundancy. No single point of failure." },
  { n: "02", title: "W3C Verifiable Credentials", desc: "International standard for portable, interoperable digital credentials. Accepted across most global jurisdictions." },
  { n: "03", title: "Zero-knowledge proof layer", desc: "Cryptographic proofs that verify specific attributes without exposing any underlying personal data." },
  { n: "04", title: "REST + GraphQL APIs", desc: "OpenAPI 3.0 compliant. Integrate with existing HR, CRM, or compliance systems. Sync and async both supported." },
  { n: "05", title: "AES-256 + TLS 1.3 encryption", desc: "Military-grade security at rest and in transit. OAuth 2.0 and OpenID Connect for access control." },
];

const pillars = [
  { label: "Confidentiality", sub: "CIA Triad · 01", accent: "#4f46e5", ring: "#c7c4f8", title: "Zero-knowledge by design",    desc: "Personal data never leaves the user. VerifyChain generates a cryptographic proof of the result only — no raw data is ever exposed to the requesting organisation." },
  { label: "Integrity",       sub: "CIA Triad · 02", accent: "#0f6e56", ring: "#9fe1cb", title: "Tamper-evident records",       desc: "Credentials are cryptographically hashed. Any unauthorised change is detectable by any authorised party." },
  { label: "Availability",    sub: "CIA Triad · 03", accent: "#185fa5", ring: "#85b7eb", title: "Always on, any device",        desc: "Cloud-hosted on AWS, with the flexibility to deploy on other providers as required. No servers for your team to manage — access via browser or PWA from anywhere in the world." },
  { label: "Authentication",  sub: "Supporting · 04", accent: "#4f46e5", ring: "#c7c4f8", title: "Real-time identity checks",   desc: "Document checks verified instantly against authoritative government sources such as the Document Verification Service (DVS). Multi-factor by default." },
  { label: "Authorisation",   sub: "Supporting · 05", accent: "#0f6e56", ring: "#9fe1cb", title: "User-controlled access",      desc: "Organisations see only the verified proof they are permitted to see. Users explicitly grant and revoke access. Role-based controls manage organisational staff." },
  { label: "Accountability",  sub: "Supporting · 06", accent: "#854f0b", ring: "#f5c97a", title: "Full audit trail",            desc: "Every check is logged — who requested it, when, which credential was verified, and the outcome. Logs are available for compliance review at any time." },
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

function Technology() {
  return (
    <section className="tech-section">
      <div className="section-inner">

        <div className="tech-layout">
          <div className="tech-left">
            <span className="section-eyebrow">Technology</span>
            <h2 className="section-h2">
              Secure by design,<br /><em>simple by choice</em>
            </h2>
            <p className="section-body">
              Built to enterprise security standards — every layer of VerifyChain maps to recognised information security frameworks. Simple interface, serious architecture underneath.
            </p>
            <Link to="/technology"><button className="btn-ghost">Architecture overview →</button></Link>
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

/* ════════════════════════════════════════════════════════════════
   COMPLIANCE
   (already clean — no changes needed)
════════════════════════════════════════════════════════════════ */

function Compliance() {
  const standards = [
    { label: "Digital ID Act 2024", achieved: true },
    { label: "Privacy Act 1988", achieved: true },
    { label: "GDPR (near-full)", achieved: true },
    { label: "W3C Verifiable Credentials", achieved: true },
    { label: "ISO 29100", achieved: true },
    { label: "eIDAS 2.0", achieved: false },
    { label: "ISO 27001", achieved: false },
  ];
  return (
    <div className="comp-bar">
      <div className="comp-inner">
        <span className="comp-label">Compliance & standards</span>
        <div className="comp-chips">
          {standards.map((s) => (
            <span key={s.label} className={`comp-chip ${s.achieved ? "comp-chip--done" : "comp-chip--progress"}`}>
              <span className="comp-dot">{s.achieved ? "✓" : "~"}</span>
              {s.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   SIMULATOR
   FIX: "Launch simulator →" button was a dead button with no link —
   now links to /demo (the animated walkthrough)
   FIX: removed WWCC sample row, replaced with a live product
════════════════════════════════════════════════════════════════ */

function Simulator() {
  const items = [
    { init: "SC", name: "Sarah Chen",     type: "Identity · passport",        badge: "green", label: "Verified" },
    { init: "JW", name: "James Wu",       type: "Age · 18+ confirmation",     badge: "green", label: "Confirmed" },
    { init: "MO", name: "Mark O'Brien",   type: "Crime check · national",     badge: "green", label: "Clear" },
    { init: "PN", name: "Dr. Priya Nair", type: "Qualification · PhD",        badge: "blue",  label: "Processing" },
  ];
  return (
    <section className="sim-section">
      <div className="section-inner">
        <div className="sim-layout">
          <div className="sim-left">
            <span className="section-eyebrow">Simulator</span>
            <h2 className="section-h2">
              See it before<br /><em>you commit</em>
            </h2>
            <p className="section-body">
              Walk through an illustrative verification flow — no sign-up, no setup.
              See exactly how your team would use VerifyChain day to day.
            </p>
            <Link to="/demo"><button className="btn-dark">Launch simulator →</button></Link>
          </div>

          <div className="window-chrome sim-window fade-up">
            <div className="window-bar">
              <span className="window-dot" style={{ background: "#ff5f57" }} />
              <span className="window-dot" style={{ background: "#febc2e" }} />
              <span className="window-dot" style={{ background: "#28c840" }} />
              <span className="sim-url">app.verifychain.io/dashboard</span>
            </div>
            <div className="sim-header">
              <span className="sim-header-title">Recent verifications</span>
              <span className="sim-header-sub">Last 24 hours</span>
            </div>
            {items.map((r) => (
              <div key={r.name} className="sim-row">
                <div className="sim-left-row">
                  <div className="sim-avatar">{r.init}</div>
                  <div>
                    <div className="sim-name">{r.name}</div>
                    <div className="sim-type">{r.type}</div>
                  </div>
                </div>
                <span className={`badge badge-${r.badge}`} style={{ fontSize: "11px" }}>
                  <span className="badge-dot" />
                  {r.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   CTA
   FIX: "Go to demonstration" → "Book a Personalised Walkthrough"
════════════════════════════════════════════════════════════════ */

function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-bg" />
      <div className="cta-inner fade-up">
        <h2 className="cta-h2">
          Ready to verify<br /><em>with confidence?</em>
        </h2>
        <p className="cta-body">
          Join the organisations that trust VerifyChain to protect
          their people and their compliance.
        </p>
        <div className="cta-btns">
          <Link to="/contact?inquiry=demo">
            <button className="btn-dark btn-lg">Book a Personalised Walkthrough</button>
          </Link>
          <Link to="/contact">
            <button className="btn-ghost btn-lg">Talk to sales</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <TrustBar />
      <Dashboard />
      <Products />
      <HowItWorks />
      <WhyVerifyChain />
      <UseCases />
      <Technology />
      <Compliance />
      <Simulator />
      <CTA />
    </>
  );
}