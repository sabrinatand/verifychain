import { useState } from "react";
import "./RoadmapPage.css";

const categories = [
  {
    id: "identity",
    label: "Identity",
    icon: "🪪",
    desc: "Global identity document coverage",
    items: [
      { text: "Australia", status: "live" },
      { text: "India — Aadhar Card", status: "live" },
      { text: "Canada", status: "soon" },
      { text: "Singapore", status: "soon" },
      { text: "European Union (France, Germany, Italy, Finland, Norway, Sweden, Denmark)", status: "soon" },
    ],
  },
  {
    id: "business",
    label: "Business",
    icon: "🏢",
    desc: "Tools to help organisations verify and onboard",
    items: [
      { text: "New Zealand business verification", status: "soon" },
      { text: "USA, UK, Singapore, EU business verification", status: "planned" },
      { text: "Payment provider integration (Stripe, PayPal)", status: "planned" },
      { text: "Business admin panel", status: "planned" },
      { text: "White label solutions", status: "planned" },
      { text: "Multiple logins with privilege access", status: "planned" },
    ],
  },
  {
    id: "privacy",
    label: "Privacy",
    icon: "🔒",
    desc: "Compliance and data protection",
    items: [
      { text: "GDPR compliance", status: "progress" },
      { text: "Australia Privacy Act 1988", status: "live" },
      { text: "eIDAS 2.0 alignment", status: "progress" },
    ],
  },
  {
    id: "certificates",
    label: "Certificates",
    icon: "🎓",
    desc: "Credential and qualification verification",
    items: [
      { text: "University qualifications", status: "live" },
      { text: "Professional body certifications", status: "soon" },
      { text: "IT certifications", status: "soon" },
      { text: "Trade certificates", status: "planned" },
    ],
  },
  {
    id: "onboarding",
    label: "Onboarding",
    icon: "⚡",
    desc: "Corporate and building access",
    items: [
      { text: "Corporate onboarding via single identity", status: "soon" },
      { text: "Building access integration", status: "planned" },
    ],
  },
  {
    id: "civic",
    label: "Civic",
    icon: "🏛️",
    desc: "Civic and electoral use cases",
    items: [
      { text: "Federal, state and council elections", status: "planned" },
      { text: "University elections", status: "planned" },
      { text: "Sporting body governance", status: "planned" },
    ],
  },
];

const statusConfig = {
  live:     { label: "Live",        color: "rm-live"     },
  progress: { label: "In progress", color: "rm-progress" },
  soon:     { label: "Coming soon", color: "rm-soon"     },
  planned:  { label: "Planned",     color: "rm-planned"  },
};

export default function RoadmapPage() {
  const [active, setActive] = useState("identity");
  const current = categories.find((c) => c.id === active);

  return (
    <div className="roadmap-page">

      {/* ── HERO ── */}
      <div className="roadmap-hero">
        <div className="roadmap-hero-glow roadmap-hero-glow--l" />
        <div className="roadmap-hero-glow roadmap-hero-glow--r" />
        <div className="roadmap-hero-inner">
          <span className="roadmap-eyebrow">What's coming</span>
          <h1 className="roadmap-h1">
            Our <em>roadmap</em>
          </h1>
          <p className="roadmap-hero-sub">
            From identity to civic use cases — here's what we're building,
            what's live, and what's next. Fast-track any feature by
            contacting our team.
          </p>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="roadmap-body">
        <div className="roadmap-body-inner">

          {/* LEFT: category tabs */}
          <div className="roadmap-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`roadmap-tab ${active === cat.id ? "roadmap-tab--active" : ""}`}
                onClick={() => setActive(cat.id)}
              >
                <span className="roadmap-tab-icon">{cat.icon}</span>
                <span className="roadmap-tab-label">{cat.label}</span>
                <span className="roadmap-tab-count">
                  {cat.items.filter(i => i.status === "live").length > 0 &&
                    <span className="rm-live-dot" />
                  }
                </span>
              </button>
            ))}
          </div>

          {/* RIGHT: items */}
          <div className="roadmap-panel" key={active}>
            <div className="roadmap-panel-header">
              <span className="roadmap-panel-icon">{current.icon}</span>
              <div>
                <h2 className="roadmap-panel-title">{current.label}</h2>
                <p className="roadmap-panel-desc">{current.desc}</p>
              </div>
            </div>

            <div className="roadmap-items">
              {current.items.map((item, i) => (
                <div
                  key={i}
                  className="roadmap-item"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <span className="roadmap-item-text">{item.text}</span>
                  <span className={`roadmap-badge ${statusConfig[item.status].color}`}>
                    {statusConfig[item.status].label}
                  </span>
                </div>
              ))}
            </div>

            <div className="roadmap-cta">
              <p>Interested in fast-tracking any of these?</p>
              <button className="btn-dark">Contact our team →</button>
            </div>
          </div>

        </div>
      </div>

      {/* ── LEGEND ── */}
      <div className="roadmap-legend">
        <div className="roadmap-legend-inner">
          <span className="roadmap-legend-label">Status key</span>
          {Object.entries(statusConfig).map(([key, val]) => (
            <span key={key} className={`roadmap-badge ${val.color}`}>
              {val.label}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}