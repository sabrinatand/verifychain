import "./Dashboard.css";

const rows = [
  { init: "SC", name: "Sarah Chen",    type: "Identity · passport",       badge: "green", label: "Verified" },
  { init: "JW", name: "James Wu",      type: "Age verification · 18+",    badge: "green", label: "Confirmed" },
  { init: "PN", name: "Dr. Priya Nair",type: "Qualification · PhD Medical",badge: "green", label: "Verified" },
  { init: "MO", name: "Mark O'Brien",  type: "National crime check",      badge: "green", label: "Clear" },
  { init: "LP", name: "Lisa Park",     type: "Working with children · NSW",badge: "blue",  label: "Processing" },
];

export default function Dashboard() {
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
