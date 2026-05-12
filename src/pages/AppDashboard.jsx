import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSession, clearSession } from "../hooks/useAuth";
import "./AppDashboard.css";

const products = [
  {
    num: "01", slug: "identity-verification",
    name: "Identity verification",
    desc: "Validate passports, driver's licences, and national IDs against government databases in real time.",
    status: "live", statusLabel: "Production ready",
    time: "< 5 min",
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
    time: "< 2 min",
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
    time: "< 10 min",
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
    time: "< 5 min",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    num: "05", slug: "working-with-children-check",
    name: "Working with children check",
    desc: "Real-time clearance validation with automatic revocation alerts across multiple Australian jurisdictions.",
    status: "dev", statusLabel: "In development",
    time: "< 3 min",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    num: "06", slug: "eseal-document-verification",
    name: "eSeal document verification",
    desc: "Tamper-proof digital notarisation. Cryptographic seals compliant with ESIGN and eIDAS regulations.",
    status: "dev", statusLabel: "In development",
    time: "< 1 min",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <path d="M9 15l2 2 4-4"/>
      </svg>
    ),
  },
];

const STATUS = {
  live: { bg: "#dcfce7", color: "#15803d", dot: "#16a34a" },
  poc:  { bg: "#dbeafe", color: "#1d4ed8", dot: "#3b82f6" },
  dev:  { bg: "#f3e8ff", color: "#7e22ce", dot: "#a855f7" },
};

// ── Verification flows ────────────────────────────────────────────
function VerifyAnimation({ onDone }) {
  const [pct, setPct] = useState(0);
  const [stage, setStage] = useState(0);
  const msgs = [
    "Scanning document…",
    "Running OCR extraction…",
    "Cross-referencing government database…",
    "Applying fraud detection…",
    "Generating zero-knowledge proof…",
  ];

  useState(() => {
    let p = 0;
    const t = setInterval(() => {
      p += 2;
      setPct(p);
      setStage(Math.min(Math.floor((p / 100) * msgs.length), msgs.length - 1));
      if (p >= 100) { clearInterval(t); setTimeout(onDone, 500); }
    }, 55);
    return () => clearInterval(t);
  });

  return (
    <div className="app-verifying">
      <div className="app-verifying-ring">
        <svg viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="34" stroke="#e8ecff" strokeWidth="5" fill="none"/>
          <circle cx="40" cy="40" r="34" stroke="#3b5ccc" strokeWidth="5" fill="none"
            strokeDasharray={`${pct * 2.136} 214`} strokeLinecap="round"
            style={{ transform: "rotate(-90deg)", transformOrigin: "center", transition: "stroke-dasharray 0.055s linear" }}/>
        </svg>
        <span className="app-verifying-pct">{pct}%</span>
      </div>
      <p className="app-verifying-msg">{msgs[stage]}</p>
      <div className="app-progress-track">
        <div className="app-progress-bar" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function downloadCert(productName, firstName, lastName) {
  const date = new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
  const id   = Math.random().toString(36).slice(2, 10).toUpperCase();
  const svg  = `<svg xmlns="http://www.w3.org/2000/svg" width="794" height="562" viewBox="0 0 794 562">
  <rect width="794" height="562" fill="#f8f7f3"/>
  <rect x="0" y="0" width="6" height="562" fill="#3b5ccc"/>
  <rect x="40" y="40" width="714" height="482" rx="8" fill="none" stroke="#e2e0d8" stroke-width="1"/>
  <text x="397" y="95" font-family="Georgia,serif" font-size="11" fill="#999" text-anchor="middle" letter-spacing="3">VERIFYCHAIN · CERTIFICATE OF VERIFICATION</text>
  <text x="397" y="155" font-family="Georgia,serif" font-size="30" fill="#13151f" text-anchor="middle">${productName}</text>
  <line x1="200" y1="175" x2="594" y2="175" stroke="#e2e0d8" stroke-width="1"/>
  <text x="397" y="220" font-family="Georgia,serif" font-size="14" fill="#555" text-anchor="middle">This certifies that</text>
  <text x="397" y="265" font-family="Georgia,serif" font-size="26" fill="#13151f" text-anchor="middle" font-weight="bold">${firstName} ${lastName}</text>
  <text x="397" y="305" font-family="Georgia,serif" font-size="14" fill="#555" text-anchor="middle">has successfully completed verification on ${date}</text>
  <rect x="247" y="330" width="300" height="36" rx="18" fill="#3b5ccc"/>
  <text x="397" y="354" font-family="Georgia,serif" font-size="13" fill="#fff" text-anchor="middle">✓ Verified — Zero data retained</text>
  <text x="397" y="415" font-family="monospace" font-size="11" fill="#aaa" text-anchor="middle">Certificate ID: VC-${id}</text>
  <text x="397" y="458" font-family="Georgia,serif" font-size="11" fill="#aaa" text-anchor="middle">VerifyChain Pty Ltd · Melbourne, Australia · verifychain.io</text>
</svg>`;
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url; a.download = `VerifyChain-certificate.svg`; a.click();
  URL.revokeObjectURL(url);
}

// ── Per-product step configs ──────────────────────────────────────
const FLOWS = {
  "identity-verification": {
    steps: ["Your details", "Upload ID", "Verification", "Certificate"],
    render: (step, form, setForm, file, setFile, fileRef) => {
      if (step === 0) return (
        <div className="flow-step">
          <h3 className="flow-step-title">Confirm your details</h3>
          <p className="flow-step-sub">Pre-filled from your account. Update if needed.</p>
          <div className="flow-grid">
            {[["First name","firstName"],["Last name","lastName"],["Date of birth","dob"],["Email","email"]].map(([l,k])=>(
              <div key={k} className="flow-field">
                <label>{l}</label>
                <input className="flow-input" value={form[k]||""} type={k==="dob"?"date":"text"} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}/>
              </div>
            ))}
          </div>
        </div>
      );
      if (step === 1) return (
        <div className="flow-step">
          <h3 className="flow-step-title">Upload your ID</h3>
          <p className="flow-step-sub">Passport or driver's licence. Your image is never stored.</p>
          <div className="flow-upload" onClick={()=>fileRef.current?.click()}>
            {file ? (
              <><span className="flow-upload-icon">✓</span><p className="flow-upload-name">{file.name}</p><span className="flow-upload-change">Click to change</span></>
            ) : (
              <><span className="flow-upload-icon">📄</span><p>Click to upload or drag & drop</p><span className="flow-upload-hint">JPG, PNG or PDF · Max 10MB</span></>
            )}
            <input ref={fileRef} type="file" accept="image/*,.pdf" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])}/>
          </div>
          <p className="flow-disclaimer">No file required for this demonstration.</p>
        </div>
      );
    }
  },
  "age-verification": {
    steps: ["Your details", "Select method", "Verification", "Certificate"],
    render: (step, form, setForm) => {
      if (step === 0) return (
        <div className="flow-step">
          <h3 className="flow-step-title">Confirm your details</h3>
          <div className="flow-grid">
            {[["First name","firstName"],["Last name","lastName"],["Date of birth","dob"]].map(([l,k])=>(
              <div key={k} className="flow-field">
                <label>{l}</label>
                <input className="flow-input" value={form[k]||""} type={k==="dob"?"date":"text"} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}/>
              </div>
            ))}
          </div>
        </div>
      );
      if (step === 1) return (
        <div className="flow-step">
          <h3 className="flow-step-title">Select verification method</h3>
          <div className="flow-method-cards">
            {[{k:"doc",icon:"📄",t:"Document scan",d:"Upload your licence or passport. Exact age confirmed."},
              {k:"cam",icon:"📷",t:"AI camera estimate",d:"Live camera only. Confirms age threshold — no DOB revealed."}]
              .map(m=>(
              <div key={m.k} className={`flow-method-card ${form.method===m.k?"flow-method-card--active":""}`}
                onClick={()=>setForm(f=>({...f,method:m.k}))}>
                <span>{m.icon}</span>
                <div><strong>{m.t}</strong><p>{m.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  },
  "working-with-children-check": {
    steps: ["Your details", "Card number", "Verification", "Certificate"],
    render: (step, form, setForm) => {
      if (step === 0) return (
        <div className="flow-step">
          <h3 className="flow-step-title">Confirm your details</h3>
          <div className="flow-grid">
            {[["First name","firstName"],["Last name","lastName"],["Date of birth","dob"],["Email","email"]].map(([l,k])=>(
              <div key={k} className="flow-field">
                <label>{l}</label>
                <input className="flow-input" value={form[k]||""} type={k==="dob"?"date":"text"} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}/>
              </div>
            ))}
          </div>
        </div>
      );
      if (step === 1) return (
        <div className="flow-step">
          <h3 className="flow-step-title">Enter your WWCC card number</h3>
          <p className="flow-step-sub">Your card number will be validated in real time against the relevant state authority.</p>
          <div className="flow-field" style={{marginBottom:16}}>
            <label>Card number</label>
            <input className="flow-input flow-input--lg" placeholder="e.g. WWC1234567E"
              value={form.cardNo||""} onChange={e=>setForm(f=>({...f,cardNo:e.target.value}))}/>
          </div>
          <div className="flow-field">
            <label>State issued</label>
            <select className="flow-input" value={form.state||"Victoria"} onChange={e=>setForm(f=>({...f,state:e.target.value}))}>
              {["Victoria","New South Wales","Queensland","Western Australia","South Australia","Tasmania","ACT","Northern Territory"].map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
      );
    }
  },
};

// Generic fallback for products without custom steps
const GENERIC_FLOW = {
  steps: ["Your details", "Verification", "Certificate"],
  render: (step, form, setForm) => step === 0 && (
    <div className="flow-step">
      <h3 className="flow-step-title">Confirm your details</h3>
      <div className="flow-grid">
        {[["First name","firstName"],["Last name","lastName"],["Email","email"]].map(([l,k])=>(
          <div key={k} className="flow-field">
            <label>{l}</label>
            <input className="flow-input" value={form[k]||""} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}/>
          </div>
        ))}
      </div>
    </div>
  ),
};

// ── Verification modal ────────────────────────────────────────────
function VerifyModal({ product, session, onClose }) {
  const flow = FLOWS[product.slug] || GENERIC_FLOW;
  const totalSteps = flow.steps.length;
  const verifyStep = totalSteps - 2; // second-to-last
  const certStep   = totalSteps - 1;

  const [step, setStep]       = useState(0);
  const [verified, setVerified] = useState(false);
  const [form, setForm]       = useState({
    firstName: session?.firstName || "",
    lastName:  session?.lastName  || "",
    email:     session?.email     || "",
    dob: "1990-04-12",
  });
  const [file, setFile]       = useState(null);
  const fileRef               = { current: null };

  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => s - 1);

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-product-icon">{product.icon}</div>
            <div>
              <p className="modal-eyebrow">VerifyChain · Demo</p>
              <h2 className="modal-title">{product.name}</h2>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <svg viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Step progress */}
        <div className="modal-steps">
          {flow.steps.map((s, i) => (
            <div key={s} className={`modal-step ${i === step ? "modal-step--active" : ""} ${i < step ? "modal-step--done" : ""}`}>
              <div className="modal-step-dot">
                {i < step ? (
                  <svg viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ) : i + 1}
              </div>
              <span>{s}</span>
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="modal-body">
          {step < verifyStep && flow.render(step, form, setForm, file, setFile, fileRef)}

          {step === verifyStep && (
            !verified ? (
              <VerifyAnimation onDone={() => setVerified(true)} />
            ) : (
              <div className="flow-success">
                <div className="flow-success-icon">✓</div>
                <h3>Verification complete</h3>
                <p>All checks passed successfully.</p>
              </div>
            )
          )}

          {step === certStep && (
            <div className="flow-step">
              <h3 className="flow-step-title">Your certificate is ready</h3>
              <div className="flow-cert">
                <div className="flow-cert-stripe" />
                <div className="flow-cert-body">
                  <p className="flow-cert-eyebrow">VerifyChain · Certificate of Verification</p>
                  <h4 className="flow-cert-type">{product.name}</h4>
                  <p className="flow-cert-name">{form.firstName} {form.lastName}</p>
                  <p className="flow-cert-date">Verified {new Date().toLocaleDateString("en-AU",{day:"numeric",month:"long",year:"numeric"})}</p>
                  <span className="flow-cert-badge">✓ Verified — Zero data retained</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          {step > 0 && step !== verifyStep && (
            <button className="modal-btn-ghost" onClick={back}>← Back</button>
          )}
          {step < verifyStep && (
            <button className="modal-btn-primary" onClick={next}>Continue →</button>
          )}
          {step === verifyStep && verified && (
            <button className="modal-btn-primary" onClick={next}>View certificate →</button>
          )}
          {step === certStep && (
            <button className="modal-btn-primary"
              onClick={() => downloadCert(product.name, form.firstName, form.lastName)}>
              Download certificate ↓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main dashboard ────────────────────────────────────────────────
export default function AppDashboard() {
  const navigate  = useNavigate();
  const session   = getSession();
  const [active, setActive] = useState(null);

  const handleLogout = () => {
    clearSession();
    navigate("/");
  };

  if (!session) {
    navigate("/login");
    return null;
  }

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <aside className="app-sidebar">
        <div className="app-sidebar-logo">
          <div className="app-logo-icon">
            <svg viewBox="0 0 20 20" fill="none">
              <path d="M10 2L3 5.5V10c0 4.4 3.1 7.9 7 9 3.9-1.1 7-4.6 7-9V5.5L10 2z" stroke="white" strokeWidth="1.4" strokeLinejoin="round"/>
              <path d="M7 10l2 2 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span>VerifyChain</span>
        </div>

        <nav className="app-nav">
          <div className="app-nav-item app-nav-item--active">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="6" height="6" rx="1"/><rect x="11" y="3" width="6" height="6" rx="1"/>
              <rect x="3" y="11" width="6" height="6" rx="1"/><rect x="11" y="11" width="6" height="6" rx="1"/>
            </svg>
            Dashboard
          </div>
          <div className="app-nav-item">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h0a2 2 0 002-2M9 5a2 2 0 012-2h0a2 2 0 012 2"/>
            </svg>
            History
          </div>
          <div className="app-nav-item">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="10" cy="10" r="7"/><path d="M10 7v4l2 2"/>
            </svg>
            Reports
          </div>
        </nav>

        <div className="app-sidebar-user">
          <div className="app-user-avatar">
            {session.firstName?.[0]}{session.lastName?.[0]}
          </div>
          <div className="app-user-info">
            <p className="app-user-name">{session.firstName} {session.lastName}</p>
            <p className="app-user-type">{session.userType === "organisation" ? session.orgName || "Organisation" : "Individual"}</p>
          </div>
          <button className="app-logout-btn" onClick={handleLogout} title="Log out">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="app-main">
        <div className="app-topbar">
          <div>
            <h1 className="app-topbar-title">
              Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"}, {session.firstName} 👋
            </h1>
            <p className="app-topbar-sub">Select a verification product to begin.</p>
          </div>
          <div className="app-topbar-badge">
            <span className="app-live-dot" />
            Demo mode
          </div>
        </div>

        <div className="app-products-grid">
          {products.map(p => {
            const st = STATUS[p.status];
            return (
              <div key={p.num} className="app-product-card" onClick={() => setActive(p)}>
                <div className="app-card-top">
                  <span className="app-card-num">{p.num}</span>
                  <span className="app-card-status" style={{ background: st.bg, color: st.color }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: st.dot, display: "inline-block", marginRight: 5 }} />
                    {p.statusLabel}
                  </span>
                </div>
                <div className="app-card-icon">{p.icon}</div>
                <h3 className="app-card-name">{p.name}</h3>
                <p className="app-card-desc">{p.desc}</p>
                <div className="app-card-footer">
                  <span className="app-card-time">⏱ {p.time}</span>
                  <span className="app-card-cta">Start verification →</span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {active && <VerifyModal product={active} session={session} onClose={() => setActive(null)} />}
    </div>
  );
}