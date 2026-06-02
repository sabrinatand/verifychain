import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./DemoPage.css";

// ── Animated demo content ─────────────────────────────────────────
const DEMOS = [
  {
    id: "identity",
    label: "Identity verification",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2"/>
        <path d="M7 8h10M7 12h6M7 16h4"/>
      </svg>
    ),
    duration: 16000,
    steps: [
      {
        id: "upload",
        label: "Upload document",
        duration: 3500,
        screen: ({ progress }) => (
          <div className="ademo-screen">
            <ScreenChrome url="app.verifychain.io / identity / upload" />
            <div className="ademo-body">
              <p className="ademo-step-eyebrow">Step 1 of 4</p>
              <h3 className="ademo-step-title">Upload your identity document</h3>
              <p className="ademo-step-sub">Passport, driver's licence, or national ID. Your image is processed securely and never stored.</p>
              <div className={`ademo-upload-zone ${progress > 60 ? "ademo-upload-zone--filled" : ""}`}>
                {progress > 60 ? (
                  <>
                    <div className="ademo-upload-filled-icon">📄</div>
                    <p className="ademo-upload-filename">passport_jane_smith.jpg</p>
                    <p className="ademo-upload-size">2.4 MB · Uploaded</p>
                    <div className="ademo-scan-line" />
                  </>
                ) : (
                  <>
                    <div className="ademo-upload-icon">⬆️</div>
                    <p className="ademo-upload-main">Drag & drop your ID photo here</p>
                    <p className="ademo-upload-hint">JPG, PNG · Max 10 MB</p>
                    <div className="ademo-upload-btn">Choose file</div>
                  </>
                )}
              </div>
              <div className="ademo-tips-row">
                <span>💡 Natural light</span>
                <span>📐 Fill the frame</span>
                <span>🚫 No obstructions</span>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "face",
        label: "Live face check",
        duration: 3500,
        screen: ({ progress }) => (
          <div className="ademo-screen">
            <ScreenChrome url="app.verifychain.io / identity / face-check" />
            <div className="ademo-body ademo-body--center">
              <p className="ademo-step-eyebrow">Step 2 of 4</p>
              <h3 className="ademo-step-title">Live facial photo</h3>
              <p className="ademo-step-sub">Required by Australian legislation. Matched against your document to confirm you are the holder.</p>
              <div className={`ademo-viewfinder ${progress > 70 ? "ademo-viewfinder--captured" : ""}`}>
                <div className="ademo-oval" />
                <div className="ademo-corner ademo-corner--tl" />
                <div className="ademo-corner ademo-corner--tr" />
                <div className="ademo-corner ademo-corner--bl" />
                <div className="ademo-corner ademo-corner--br" />
                {progress > 70 ? (
                  <div className="ademo-captured-overlay">✓</div>
                ) : (
                  <p className="ademo-viewfinder-hint">Centre your face in the oval</p>
                )}
              </div>
              <div className="ademo-attempt-row">
                <div className="ademo-dot" /><div className="ademo-dot" /><div className="ademo-dot" />
                <span>3 of 3 attempts remaining</span>
              </div>
              <div className={`ademo-face-btn ${progress > 70 ? "ademo-face-btn--done" : ""}`}>
                {progress > 70 ? "✓ Photo accepted" : "Take photo"}
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "verify",
        label: "Verification",
        duration: 4500,
        screen: ({ progress }) => {
          const steps = [
            { label: "Document uploaded",              done: progress > 15 },
            { label: "OCR extraction complete",        done: progress > 30 },
            { label: "Fraud detection passed",         done: progress > 50 },
            { label: "Government database check",      done: progress > 70 },
            { label: "Biometric match confirmed",      done: progress > 85 },
          ];
          const activeIdx = steps.findIndex(s => !s.done);
          return (
            <div className="ademo-screen">
              <ScreenChrome url="app.verifychain.io / identity / verifying" />
              <div className="ademo-body ademo-body--center">
                <div className="ademo-spinner-wrap">
                  <svg viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="34" stroke="#e8ecff" strokeWidth="5" fill="none"/>
                    <circle cx="40" cy="40" r="34" stroke="#1e3a8a" strokeWidth="5" fill="none"
                      strokeDasharray={`${Math.min(progress * 2.14, 214)} 214`}
                      strokeLinecap="round"
                      style={{ transform:"rotate(-90deg)", transformOrigin:"center" }}
                    />
                  </svg>
                  <span className="ademo-pct">{Math.min(Math.round(progress * 1.0), 99)}%</span>
                </div>
                <p className="ademo-verifying-title">Verifying identity…</p>
                <div className="ademo-proc-steps">
                  {steps.map((s, i) => (
                    <div key={i} className={`ademo-proc-step ${s.done ? "ademo-proc-step--done" : i === activeIdx ? "ademo-proc-step--active" : ""}`}>
                      <span className="ademo-proc-dot">{s.done ? "✓" : i === activeIdx ? "⟳" : "·"}</span>
                      {s.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        id: "cert",
        label: "Certificate",
        duration: 4500,
        screen: ({ progress }) => (
          <div className="ademo-screen">
            <ScreenChrome url="app.verifychain.io / identity / certificate" />
            <div className="ademo-body ademo-body--center">
              <div className={`ademo-success-badge ${progress > 20 ? "ademo-success-badge--visible" : ""}`}>✓ Verified</div>
              <div className={`ademo-cert ${progress > 30 ? "ademo-cert--visible" : ""}`}>
                <div className="ademo-cert-stripe" />
                <div className="ademo-cert-body">
                  <p className="ademo-cert-eyebrow">VerifyChain · Certificate of Verification</p>
                  <p className="ademo-cert-type">Identity verification</p>
                  <p className="ademo-cert-name">Jane Smith</p>
                  <div className="ademo-cert-rows">
                    {[
                      { l: "Document type",   v: "Passport",       pass: false },
                      { l: "Facial match",    v: "✓ Confirmed",    pass: true },
                      { l: "Fraud check",     v: "✓ Passed",       pass: true },
                      { l: "Liveness check",  v: "✓ Passed",       pass: true },
                      { l: "Verification ID", v: "VC-A8F2-7741",   pass: false },
                    ].map((r, i) => (
                      <div key={i} className="ademo-cert-row" style={{ animationDelay: `${i * 0.1}s` }}>
                        <span>{r.l}</span>
                        <span className={r.pass ? "ademo-cert-pass" : ""}>{r.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="ademo-cert-note">Zero personal data transmitted to the requesting organisation.</p>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: "wwcc",
    label: "Working with Children Check",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    duration: 12000,
    steps: [
      {
        id: "details",
        label: "Card details",
        duration: 4000,
        screen: ({ progress }) => (
          <div className="ademo-screen">
            <ScreenChrome url="app.verifychain.io / wwcc / card-details" />
            <div className="ademo-body">
              <p className="ademo-step-eyebrow">Working with Children Check — Verify my card</p>
              <h3 className="ademo-step-title">Enter your WWCC card details</h3>
              <div className="ademo-form-fields">
                <div className="ademo-field"><label>Card number</label>
                  <div className={`ademo-input ${progress > 30 ? "ademo-input--filled" : ""}`}>{progress > 30 ? "WWC1234567A" : ""}</div>
                </div>
                <div className="ademo-field"><label>State issued</label>
                  <div className={`ademo-input ademo-input--select ${progress > 50 ? "ademo-input--filled" : ""}`}>{progress > 50 ? "Victoria ▾" : "Select… ▾"}</div>
                </div>
                <div className="ademo-field"><label>Card expiry date</label>
                  <div className={`ademo-input ${progress > 70 ? "ademo-input--filled" : ""}`}>{progress > 70 ? "15 / 06 / 2027" : ""}</div>
                </div>
              </div>
              <div className="ademo-alert-optin"><span>🔔</span> Notify me 60 days before this card expires</div>
              <div className={`ademo-submit-btn ${progress > 80 ? "ademo-submit-btn--active" : ""}`}>Verify card →</div>
            </div>
          </div>
        ),
      },
      {
        id: "registry",
        label: "Registry check",
        duration: 4000,
        screen: ({ progress }) => {
          const steps = [
            { label: "Card number validated",       done: progress > 20 },
            { label: "Connected to Victorian registry", done: progress > 40 },
            { label: "Identity matched",            done: progress > 60 },
            { label: "Scanning for revocations",    done: progress > 80 },
          ];
          const activeIdx = steps.findIndex(s => !s.done);
          return (
            <div className="ademo-screen">
              <ScreenChrome url="app.verifychain.io / wwcc / checking" />
              <div className="ademo-body ademo-body--center">
                <div className="ademo-spinner-wrap">
                  <svg viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="34" stroke="#e8ecff" strokeWidth="5" fill="none"/>
                    <circle cx="40" cy="40" r="34" stroke="#1e3a8a" strokeWidth="5" fill="none"
                      strokeDasharray={`${Math.min(progress * 2.14, 214)} 214`}
                      strokeLinecap="round"
                      style={{ transform:"rotate(-90deg)", transformOrigin:"center" }}
                    />
                  </svg>
                  <span className="ademo-pct">{Math.min(Math.round(progress * 1.0), 99)}%</span>
                </div>
                <p className="ademo-verifying-title">Checking registry…</p>
                <div className="ademo-proc-steps">
                  {steps.map((s, i) => (
                    <div key={i} className={`ademo-proc-step ${s.done ? "ademo-proc-step--done" : i === activeIdx ? "ademo-proc-step--active" : ""}`}>
                      <span className="ademo-proc-dot">{s.done ? "✓" : i === activeIdx ? "⟳" : "·"}</span>
                      {s.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        id: "cleared",
        label: "Clearance confirmed",
        duration: 4000,
        screen: ({ progress }) => (
          <div className="ademo-screen">
            <ScreenChrome url="app.verifychain.io / wwcc / certificate" />
            <div className="ademo-body ademo-body--center">
              <div className={`ademo-success-badge ${progress > 20 ? "ademo-success-badge--visible" : ""}`}>✓ Clearance confirmed</div>
              <div className={`ademo-cert ${progress > 30 ? "ademo-cert--visible" : ""}`}>
                <div className="ademo-cert-stripe" />
                <div className="ademo-cert-body">
                  <p className="ademo-cert-eyebrow">VerifyChain · WWCC Verification</p>
                  <p className="ademo-cert-type">Working with Children Check</p>
                  <p className="ademo-cert-name">James Wu</p>
                  <div className="ademo-cert-rows">
                    {[
                      { l: "Card number",       v: "WWC1234567A",  pass: false },
                      { l: "State",             v: "Victoria",     pass: false },
                      { l: "Clearance status",  v: "✓ Current",    pass: true },
                      { l: "Revocation check",  v: "✓ None found", pass: true },
                      { l: "Expiry alerts",     v: "✓ Enabled",    pass: true },
                    ].map((r, i) => (
                      <div key={i} className="ademo-cert-row">
                        <span>{r.l}</span>
                        <span className={r.pass ? "ademo-cert-pass" : ""}>{r.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
];

// ── Small shared components ───────────────────────────────────────
function ScreenChrome({ url }) {
  return (
    <div className="ademo-chrome">
      <div className="ademo-chrome-dots">
        <span className="ademo-dot-r" /><span className="ademo-dot-y" /><span className="ademo-dot-g" />
      </div>
      <span className="ademo-chrome-url">{url}</span>
    </div>
  );
}

// ── Animated walkthrough ──────────────────────────────────────────
function AnimatedDemo({ demo }) {
  const [stepIdx, setStepIdx]     = useState(0);
  const [progress, setProgress]   = useState(0);
  const [playing, setPlaying]     = useState(true);
  const [finished, setFinished]   = useState(false);
  const intervalRef = useRef(null);
  const step = demo.steps[stepIdx];

  useEffect(() => {
    setProgress(0);
    setFinished(false);
    if (!playing) return;

    const tick = 50;
    const increment = 100 / (step.duration / tick);
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(intervalRef.current);
          // Move to next step
          setTimeout(() => {
            if (stepIdx < demo.steps.length - 1) {
              setStepIdx(i => i + 1);
            } else {
              setFinished(true);
            }
          }, 600);
          return 100;
        }
        return Math.min(p + increment, 100);
      });
    }, tick);
    return () => clearInterval(intervalRef.current);
  }, [stepIdx, playing]);

  const reset = () => { setStepIdx(0); setProgress(0); setFinished(false); setPlaying(true); };
  const goTo = (i) => { setStepIdx(i); setProgress(0); setFinished(false); };

  return (
    <div className="ademo-layout">
      {/* Left: step nav */}
      <div className="ademo-steps-nav">
        <div className="ademo-demo-label">
          <span className="ademo-demo-icon">{demo.icon}</span>
          {demo.label}
        </div>
        {demo.steps.map((s, i) => (
          <button key={s.id}
            className={`ademo-step-btn ${i === stepIdx ? "ademo-step-btn--active" : ""} ${i < stepIdx ? "ademo-step-btn--done" : ""}`}
            onClick={() => goTo(i)}>
            <div className="ademo-step-btn-num">
              {i < stepIdx ? "✓" : i + 1}
            </div>
            <span>{s.label}</span>
          </button>
        ))}

        {/* Progress bar */}
        <div className="ademo-overall-progress">
          <div className="ademo-overall-bar"
            style={{ width: `${((stepIdx + progress / 100) / demo.steps.length) * 100}%` }}
          />
        </div>

        <div className="ademo-controls">
          <button className="ademo-control-btn" onClick={() => setPlaying(p => !p)}>
            {playing ? "⏸ Pause" : "▶ Play"}
          </button>
          <button className="ademo-control-btn" onClick={reset}>↺ Restart</button>
        </div>
      </div>

      {/* Right: screen */}
      <div className="ademo-screen-wrap">
        {finished ? (
          <div className="ademo-finished">
            <div className="ademo-finished-icon">✓</div>
            <h3>That's how {demo.label} works.</h3>
            <p>The full process takes {demo.id === "identity" ? "under 5 minutes" : "under 3 minutes"} from start to certificate. Want to see it with your own data?</p>
            <div className="ademo-finished-actions">
              <Link to="/contact?inquiry=demo" className="ademo-finished-btn">Book a personalised demo →</Link>
              <button className="ademo-finished-ghost" onClick={reset}>Watch again</button>
            </div>
          </div>
        ) : (
          <div className="ademo-screen-anim">
            <step.screen progress={progress} />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────
export default function DemoPage() {
  const [activeDemo, setActiveDemo] = useState("identity");
  const [demoKey, setDemoKey]       = useState(0); // force remount on switch
  const demo = DEMOS.find(d => d.id === activeDemo);

  return (
    <div className="ademo-page">
      <div className="ademo-page-header">
        <div className="ademo-page-header-inner">
          <div>
            <span className="ademo-eyebrow">VerifyChain · Animated demo</span>
            <h1 className="ademo-page-title">See how verification works</h1>
            <p className="ademo-page-sub">
              Watch the verification flow step by step. This is how it looks and feels inside the real product.
            </p>
          </div>
          <Link to="/contact?inquiry=demo" className="ademo-book-btn">Book a live demo →</Link>
        </div>

        {/* Demo selector */}
        <div className="ademo-selector">
          {DEMOS.map(d => (
            <button key={d.id}
              className={`ademo-selector-btn ${activeDemo === d.id ? "ademo-selector-btn--active" : ""}`}
              onClick={() => { setActiveDemo(d.id); setDemoKey(k => k + 1); }}>
              <span className="ademo-selector-icon">{d.icon}</span>
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="ademo-content">
        <AnimatedDemo key={`${activeDemo}-${demoKey}`} demo={demo} />
      </div>

      <div className="ademo-footer-cta">
        <div className="ademo-footer-cta-inner">
          <h2>Ready to run this for real?</h2>
          <p>Book a personalised demo — we'll walk through your specific use case with your team.</p>
          <Link to="/contact?inquiry=demo" className="ademo-book-btn">Book a demo →</Link>
        </div>
      </div>
    </div>
  );
}