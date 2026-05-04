import "./Hero.css";
import { Link } from "react-router-dom";

const floatItems = [
  { cls: "fi-shield",   label: "Identity verified",      delay: "0s"    },
  { cls: "fi-lock",     label: "End-to-end encrypted",   delay: "0.6s"  },
  { cls: "fi-check",    label: "Crime check — clear",    delay: "1.2s"  },
  { cls: "fi-age",      label: "Age confirmed — 18+",    delay: "1.8s"  },
  { cls: "fi-qual",     label: "Qualification verified", delay: "2.4s"  },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow hero-glow--left"  />
      <div className="hero-glow hero-glow--right" />

      <div className="hero-inner">
        {/* ── LEFT: copy ── */}
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="hero-pulse" />
            Tested in Australian Government age assurance trials
          </div>

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
            <Link to="/demonstration">
              <button className="btn-dark btn-lg hero-btn-primary">
                Go to demo →
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

        {/* ── RIGHT: phone illustration ── */}
        <div className="hero-visual">
          {/* Floating badge items orbiting the phone */}
          {floatItems.map((item) => (
            <div key={item.cls} className={`float-badge ${item.cls}`} style={{ animationDelay: item.delay }}>
              <span className="float-badge-dot" />
              <span className="float-badge-label">{item.label}</span>
            </div>
          ))}

          {/* Phone device */}
          <div className="phone-device">
            <div className="phone-notch" />
            <div className="phone-screen">
              {/* App header */}
              <div className="app-header">
                <div className="app-header-logo">
                  <svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.2"/><path d="M5 7l1.5 1.5L9.5 5.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span>VerifyChain</span>
                <div className="app-header-badge">LIVE</div>
              </div>

              {/* Face scan area */}
              <div className="scan-zone">
                <div className="scan-frame">
                  <span className="scan-corner scan-corner--tl" />
                  <span className="scan-corner scan-corner--tr" />
                  <span className="scan-corner scan-corner--bl" />
                  <span className="scan-corner scan-corner--br" />
                  <div className="scan-face">
                    {/* SVG face illustration */}
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

              {/* Verify button */}
              <button className="app-verify-btn">
                <svg viewBox="0 0 16 16" fill="none"><path d="M3 8a5 5 0 1 0 10 0A5 5 0 0 0 3 8Z" stroke="white" strokeWidth="1.4"/><path d="M5.5 8l2 2L11 6" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                VERIFY
              </button>

              {/* Status row */}
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
            {/* Phone hand */}
            <div className="phone-hand" />
          </div>

          {/* Connection arcs (SVG) */}
          <svg className="hero-arcs" viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="240" cy="240" r="160" stroke="rgba(99,130,200,0.12)" strokeWidth="1" strokeDasharray="6 8"/>
            <circle cx="240" cy="240" r="210" stroke="rgba(99,130,200,0.07)" strokeWidth="1" strokeDasharray="4 10"/>
          </svg>
        </div>
      </div>

      {/* Stats strip */}
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
