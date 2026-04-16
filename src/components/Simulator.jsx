import "./Simulator.css";

const items = [
  { init: "SC", name: "Sarah Chen",     type: "Identity · passport",        badge: "green", label: "Verified" },
  { init: "JW", name: "James Wu",       type: "Age · 18+ confirmation",     badge: "green", label: "Confirmed" },
  { init: "MO", name: "Mark O'Brien",  type: "Crime check · national",     badge: "green", label: "Clear" },
  { init: "LP", name: "Lisa Park",      type: "WWCC · NSW",                 badge: "blue",  label: "Processing" },
];

export default function Simulator() {
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
              Walk through a real verification flow — no sign-up, no setup.
              See exactly how your team would use VerifyChain day to day.
            </p>
            <button className="btn-dark">Launch simulator →</button>
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
