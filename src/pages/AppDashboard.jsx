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

// ── Photo guidance tips ───────────────────────────────────────────
const DOC_TIPS = [
  { icon: "💡", title: "Use natural light", desc: "Place the document near a window. Avoid overhead lighting that creates glare on laminated surfaces." },
  { icon: "📐", title: "Fill the frame", desc: "The document should occupy at least 80% of the image. All four corners must be visible." },
  { icon: "🔍", title: "Keep it sharp", desc: "Hold the camera steady. Tap to focus before capturing. Blurred text will be rejected." },
  { icon: "🚫", title: "No obstructions", desc: "Fingers, shadows, and objects must not cover any part of the document, including the photo and MRZ strip." },
];

const FACE_TIPS = [
  { icon: "👤", title: "Face the camera directly", desc: "Look straight at the camera. Your full face — forehead to chin — must be clearly visible." },
  { icon: "💡", title: "Even lighting on your face", desc: "Avoid strong backlighting (e.g. sitting in front of a window). A well-lit wall behind you works best." },
  { icon: "🕶️", title: "Remove glasses and hats", desc: "Glasses, sunglasses, caps, and anything that covers part of your face must be removed." },
  { icon: "😐", title: "Neutral expression", desc: "Keep a neutral expression with your mouth closed. Do not tilt or turn your head." },
];

function PhotoGuidance({ tips, title, sub }) {
  return (
    <div className="photo-guidance">
      <p className="photo-guidance-title">{title}</p>
      <p className="photo-guidance-sub">{sub}</p>
      <div className="photo-tips-grid">
        {tips.map(t => (
          <div key={t.title} className="photo-tip">
            <span className="photo-tip-icon">{t.icon}</span>
            <div>
              <strong>{t.title}</strong>
              <p>{t.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FaceCaptureStep({ attempts, setAttempts, onCapture, captured, setCaptured }) {
  const MAX = 3;
  const remaining = MAX - attempts;
  const isLocked = attempts >= MAX;

  const simulateCapture = () => {
    if (isLocked) return;
    const success = Math.random() > 0.35;
    if (success) {
      setCaptured(true);
    } else {
      setAttempts(a => a + 1);
    }
  };

  if (isLocked) return (
    <div className="face-locked">
      <div className="face-locked-icon">🔒</div>
      <h4>Maximum attempts reached</h4>
      <p>You have used all {MAX} attempts. For security purposes, this verification session has been locked.</p>
      <p className="face-locked-sub">Please wait 10 minutes before trying again, or contact your organisation's administrator.</p>
    </div>
  );

  if (captured) return (
    <div className="face-captured">
      <div className="face-captured-icon">✓</div>
      <h4>Photo accepted</h4>
      <p>Your facial photo has been matched against your identity document. Liveness check passed.</p>
    </div>
  );

  return (
    <div className="face-capture">
      <div className="face-viewfinder">
        <div className="face-viewfinder-oval" />
        <div className="face-viewfinder-corner face-corner--tl" />
        <div className="face-viewfinder-corner face-corner--tr" />
        <div className="face-viewfinder-corner face-corner--bl" />
        <div className="face-viewfinder-corner face-corner--br" />
        <p className="face-viewfinder-hint">Position your face within the oval</p>
      </div>

      {attempts > 0 && (
        <div className="face-attempt-warning">
          <strong>Photo not accepted</strong> — {remaining} attempt{remaining !== 1 ? "s" : ""} remaining.
          {attempts === 2 && " This is your final attempt."}
        </div>
      )}

      <div className="face-attempt-dots">
        {Array.from({ length: MAX }).map((_, i) => (
          <div key={i} className={`face-dot ${i < attempts ? "face-dot--used" : ""}`} />
        ))}
        <span className="face-dot-label">{MAX - attempts} of {MAX} attempts remaining</span>
      </div>

      <button className="face-capture-btn" onClick={simulateCapture}>
        Take photo
      </button>
      <p className="flow-disclaimer">In the live app, your camera opens automatically. This is a simulated capture.</p>
    </div>
  );
}

// ── Per-product step configs ──────────────────────────────────────
const FLOWS = {
  "identity-verification": {
    steps: ["Your details", "Document", "Face photo", "Verification", "Certificate"],
    render: (step, form, setForm, file, setFile, fileRef, extraState) => {
      const { attempts = 0, setAttempts, captured = false, setCaptured } = extraState || {};

      // Step 0 — Personal details
      if (step === 0) return (
        <div className="flow-step">
          <h3 className="flow-step-title">Confirm your details</h3>
          <p className="flow-step-sub">Pre-filled from your account. Update if needed.</p>
          <div className="flow-grid">
            {[["First name","firstName"],["Last name","lastName"],["Date of birth","dob"],["Email","email"]].map(([l,k])=>(
              <div key={k} className="flow-field">
                <label>{l}</label>
                <input className="flow-input" value={form[k]||""} type={k==="dob"?"date":"text"}
                  onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}/>
              </div>
            ))}
          </div>
        </div>
      );

      // Step 1 — Document upload with guidance
      if (step === 1) return (
        <div className="flow-step">
          <h3 className="flow-step-title">Upload your identity document</h3>
          <p className="flow-step-sub">Passport or driver's licence. Your image is processed securely and never stored.</p>

          <PhotoGuidance
            tips={DOC_TIPS}
            title="How to photograph your document"
            sub="Poor quality images are the most common cause of rejection. Follow these guidelines to ensure your document is accepted first time."
          />

          <div className="flow-upload" style={{marginTop:16}} onClick={()=>fileRef.current?.click()}>
            {file ? (
              <><span className="flow-upload-icon">✓</span><p className="flow-upload-name">{file.name}</p><span className="flow-upload-change">Click to change</span></>
            ) : (
              <><span className="flow-upload-icon">📄</span><p>Click to upload or drag & drop</p><span className="flow-upload-hint">JPG, PNG or PDF · Max 10MB</span></>
            )}
            <input ref={fileRef} type="file" accept="image/*,.pdf" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])}/>
          </div>
          <p className="flow-disclaimer">No file is required for this demonstration — click Continue to proceed.</p>
        </div>
      );

      // Step 2 — Face photo with guidance + attempt limit
      if (step === 2) return (
        <div className="flow-step">
          <h3 className="flow-step-title">Live facial photo</h3>
          <p className="flow-step-sub">
            As required by current Australian legislation, a live photo of your face must be taken during this session.
            This is matched against your identity document to confirm you are the document holder.
          </p>

          <PhotoGuidance
            tips={FACE_TIPS}
            title="How to take your facial photo"
            sub="Your photo will be compared against the document you uploaded. You have 3 attempts — the session locks if all are used."
          />

          <div style={{marginTop:20}}>
            <FaceCaptureStep
              attempts={attempts}
              setAttempts={setAttempts}
              captured={captured}
              setCaptured={setCaptured}
            />
          </div>
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
    steps: ["Check type", "Your details", "Application", "Verification", "Certificate"],
    render: (step, form, setForm) => {

      // ── Step 0: Check type selection ──
      if (step === 0) return (
        <div className="flow-step">
          <h3 className="flow-step-title">What would you like to do?</h3>
          <p className="flow-step-sub">VerifyChain validates your existing Working with Children card in real time against the state registry.</p>

          {/* Purpose */}
          <p className="flow-section-label">I am applying as a…</p>
          <div className="flow-option-group">
            {[
              {
                k: "volunteer",
                title: "Volunteer",
                desc: "Unpaid or voluntary work involving children.",
                icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17s-7-4-7-9a4 4 0 018 0 4 4 0 018 0c0 5-7 9-7 9z"/></svg>
              },
              {
                k: "employee",
                title: "Employee",
                desc: "Paid work or employment involving children.",
                icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="14" height="10" rx="1.5"/><path d="M7 7V5a3 3 0 016 0v2"/><path d="M10 11v2"/></svg>
              },
            ].map(o => (
              <div key={o.k}
                className={`flow-option-card ${form.purpose === o.k ? "flow-option-card--active" : ""}`}
                onClick={() => setForm(f => ({ ...f, purpose: o.k }))}>
                <span className="flow-option-icon flow-option-icon--svg">{o.icon}</span>
                <div>
                  <strong>{o.title}</strong>
                  <p>{o.desc}</p>
                </div>
                <div className={`flow-option-radio ${form.purpose === o.k ? "flow-option-radio--checked" : ""}`} />
              </div>
            ))}
          </div>

          {/* What do you need to do */}
          <p className="flow-section-label" style={{ marginTop: 24 }}>What do you need?</p>
          <div className="flow-option-group">
            {[
              {
                k: "verify",
                title: "Verify my card",
                desc: "I have a WWCC card and want to validate it is current and not revoked.",
                icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2L3 5.5V10c0 4 3 7.5 7 8.5 4-1 7-4.5 7-8.5V5.5L10 2z"/><path d="M7 10l2 2 4-4"/></svg>
              },
              {
                k: "renew",
                title: "Renew my card",
                desc: "My card is expiring soon. VerifyChain will guide me to the government portal to renew.",
                icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10a6 6 0 016-6 6 6 0 014.24 1.76L16 8"/><path d="M16 4v4h-4"/><path d="M16 10a6 6 0 01-6 6 6 6 0 01-4.24-1.76L4 12"/><path d="M4 16v-4h4"/></svg>
              },
              {
                k: "status",
                title: "Check application status",
                desc: "I have applied but haven't received my card yet. Check where my application is up to.",
                icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 15l3 3"/><path d="M9 6v3l2 2"/></svg>
              },
            ].map(o => (
              <div key={o.k}
                className={`flow-option-card ${form.appType === o.k ? "flow-option-card--active" : ""}`}
                onClick={() => setForm(f => ({ ...f, appType: o.k }))}>
                <span className="flow-option-icon flow-option-icon--svg">{o.icon}</span>
                <div>
                  <strong>{o.title}</strong>
                  <p>{o.desc}</p>
                </div>
                <div className={`flow-option-radio ${form.appType === o.k ? "flow-option-radio--checked" : ""}`} />
              </div>
            ))}
          </div>
        </div>
      );

      // ── Step 1: Personal details ──
      if (step === 1) return (
        <div className="flow-step">
          <h3 className="flow-step-title">Your details</h3>
          <p className="flow-step-sub">
            {form.appType === "status"
              ? "We'll use these details to locate your existing application."
              : "Confirm your personal information before we proceed."}
          </p>
          <div className="flow-grid">
            {[["First name","firstName"],["Last name","lastName"],["Date of birth","dob"],["Email","email"]].map(([l,k]) => (
              <div key={k} className="flow-field">
                <label>{l}</label>
                <input className="flow-input" value={form[k]||""}
                  type={k==="dob"?"date":"text"}
                  onChange={e => setForm(f => ({...f,[k]:e.target.value}))}/>
              </div>
            ))}
          </div>
        </div>
      );

      // ── Step 2: Action-specific step ──
      if (step === 2) {

        // Check application status
        if (form.appType === "status") return (
          <div className="flow-step">
            <h3 className="flow-step-title">Check your application status</h3>
            <p className="flow-step-sub">Enter your application number to look up where your WWCC application is currently up to.</p>
            <div className="flow-field" style={{marginBottom:16}}>
              <label>Application reference number</label>
              <input className="flow-input flow-input--lg" placeholder="e.g. APP-98765 or WWC1234567E"
                value={form.cardNo||""} onChange={e=>setForm(f=>({...f,cardNo:e.target.value}))}/>
            </div>
            <div className="flow-field">
              <label>State applied in</label>
              <select className="flow-input" value={form.state||"Victoria"} onChange={e=>setForm(f=>({...f,state:e.target.value}))}>
                {["Victoria","New South Wales","Queensland","Western Australia","South Australia","Tasmania","ACT","Northern Territory"].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="flow-renewal-notice" style={{marginTop:16}}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" style={{width:18,height:18,flexShrink:0,color:"#92400e"}}>
                <circle cx="8" cy="8" r="6.5"/><path d="M8 5v3.5M8 11v.5"/>
              </svg>
              <div>
                <strong>Status check only</strong>
                <p>This will query the state registry for your application status. No verification result will be issued — only a status report.</p>
              </div>
            </div>
          </div>
        );

        // Renewal guidance
        if (form.appType === "renew") return (
          <div className="flow-step">
            <h3 className="flow-step-title">Renew your WWCC</h3>
            <p className="flow-step-sub">Renewal must be completed directly with the relevant state government. VerifyChain will record the renewal request and alert your organisation once confirmed.</p>
            <div className="flow-field" style={{marginBottom:16}}>
              <label>Current card number</label>
              <input className="flow-input flow-input--lg" placeholder="e.g. WWC1234567E"
                value={form.cardNo||""} onChange={e=>setForm(f=>({...f,cardNo:e.target.value}))}/>
            </div>
            <div className="flow-field" style={{marginBottom:16}}>
              <label>Card expiry date</label>
              <input className="flow-input" type="date" value={form.expiryDate||""}
                onChange={e=>setForm(f=>({...f,expiryDate:e.target.value}))}/>
            </div>
            <div className="flow-field">
              <label>State issued</label>
              <select className="flow-input" value={form.state||"Victoria"} onChange={e=>setForm(f=>({...f,state:e.target.value}))}>
                {["Victoria","New South Wales","Queensland","Western Australia","South Australia","Tasmania","ACT","Northern Territory"].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="flow-renewal-notice">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" style={{width:18,height:18,flexShrink:0,color:"#92400e"}}>
                <path d="M8 2L14 5.5V10c0 3-2.5 5.5-6 6-3.5-.5-6-3-6-6V5.5L8 2z"/>
              </svg>
              <div>
                <strong>Renewal happens via the government portal</strong>
                <p>After this step, you will be directed to the relevant state authority to complete your renewal. VerifyChain records the request and notifies your organisation when your new card is confirmed.</p>
              </div>
            </div>
          </div>
        );

        // Verify existing card (was "new")
        return (
          <div className="flow-step">
            <h3 className="flow-step-title">Enter your WWCC card details</h3>
            <p className="flow-step-sub">VerifyChain will check your card number against the {form.state || "Victorian"} registry in real time to confirm it is current and not revoked.</p>
            <div className="flow-field" style={{marginBottom:16}}>
              <label>Card number</label>
              <input className="flow-input flow-input--lg" placeholder="e.g. WWC1234567E"
                value={form.cardNo||""} onChange={e=>setForm(f=>({...f,cardNo:e.target.value}))}/>
            </div>
            <div className="flow-field" style={{marginBottom:16}}>
              <label>Card expiry date</label>
              <input className="flow-input" type="date" value={form.expiryDate||""}
                onChange={e=>setForm(f=>({...f,expiryDate:e.target.value}))}/>
            </div>
            <div className="flow-field" style={{marginBottom:16}}>
              <label>State issued</label>
              <select className="flow-input" value={form.state||"Victoria"} onChange={e=>setForm(f=>({...f,state:e.target.value}))}>
                {["Victoria","New South Wales","Queensland","Western Australia","South Australia","Tasmania","ACT","Northern Territory"].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="flow-alert-optin">
              <input type="checkbox" id="wwcc-alert" defaultChecked
                onChange={e=>setForm(f=>({...f,alertEnabled:e.target.checked}))}/>
              <label htmlFor="wwcc-alert">
                <strong>Enable expiry alerts</strong>
                <span>Notify me and my organisation 60 days before this card expires.</span>
              </label>
            </div>
          </div>
        );
      }
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

  const [step, setStep]         = useState(0);
  const [verified, setVerified] = useState(false);
  const [form, setForm]         = useState({
    firstName: session?.firstName || "",
    lastName:  session?.lastName  || "",
    email:     session?.email     || "",
    dob: "1990-04-12",
  });
  const [file, setFile]         = useState(null);
  const fileRef                 = { current: null };
  const [faceAttempts, setFaceAttempts] = useState(0);
  const [faceCaptured, setFaceCaptured] = useState(false);

  const extraState = {
    attempts: faceAttempts,
    setAttempts: setFaceAttempts,
    captured: faceCaptured,
    setCaptured: setFaceCaptured,
  };

  const isFaceStep = product.slug === "identity-verification" && step === 2;
  const canContinue = !isFaceStep || (faceCaptured);

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
          {step < verifyStep && flow.render(step, form, setForm, file, setFile, fileRef, extraState)}

          {step === verifyStep && (
            !verified ? (
              <VerifyAnimation onDone={() => setVerified(true)} />
            ) : (
              <div className="flow-success flow-success--centered">
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
          {step < verifyStep && (() => {
            // WWCC special routing: after step 2 (Application), skip verification
            const isWWCC = product.slug === "working-with-children-check";
            const isRenew  = isWWCC && form.appType === "renew";
            const isStatus = isWWCC && form.appType === "status";
            const isActionStep = isWWCC && step === 2;

            if (isActionStep && isRenew) return (
              <a
                href="https://www.service.vic.gov.au/find-services/work-and-volunteering/working-with-children-check/renew-your-working-with-children-check"
                target="_blank" rel="noreferrer"
                className="modal-btn-primary"
                style={{textDecoration:"none", display:"inline-flex", alignItems:"center", gap:6}}>
                Go to government portal →
              </a>
            );

            if (isActionStep && isStatus) return (
              <button className="modal-btn-primary" onClick={() => {
                // Save a status-check record and close — no verification
                const key = "vc_completed_checks";
                const existing = JSON.parse(localStorage.getItem(key) || "[]");
                const newCheck = {
                  id: "VC-" + Math.random().toString(36).slice(2,8).toUpperCase() + "-" + Date.now().toString().slice(-4),
                  check: "Working with Children Check (Status check)",
                  date: new Date().toLocaleDateString("en-AU", { day:"numeric", month:"short", year:"numeric" }),
                  status: "Status checked",
                  slug: product.slug,
                };
                localStorage.setItem(key, JSON.stringify([newCheck, ...existing]));
                onClose();
              }}>
                Submit status check →
              </button>
            );

            return (
              <button
                className={`modal-btn-primary ${!canContinue ? "modal-btn-primary--disabled" : ""}`}
                onClick={canContinue ? next : undefined}
                style={!canContinue ? {opacity:0.4,cursor:"not-allowed"} : {}}>
                {isFaceStep && !faceCaptured && faceAttempts < 3 ? "Take photo to continue" : "Continue →"}
              </button>
            );
          })()}
          {step === verifyStep && verified && (
            <button className="modal-btn-primary" onClick={() => {
              // Save completed check to localStorage for real-time history
              const key = "vc_completed_checks";
              const existing = JSON.parse(localStorage.getItem(key) || "[]");
              const newCheck = {
                id: "VC-" + Math.random().toString(36).slice(2,8).toUpperCase() + "-" + Date.now().toString().slice(-4),
                check: product.name,
                date: new Date().toLocaleDateString("en-AU", { day:"numeric", month:"short", year:"numeric" }),
                status: "Verified",
                slug: product.slug,
              };
              localStorage.setItem(key, JSON.stringify([newCheck, ...existing]));
              // Also save WWCC expiry if applicable
              if (product.slug === "working-with-children-check" && form.expiryDate) {
                localStorage.setItem("vc_wwcc_expiry", form.expiryDate);
              }
              next();
            }}>View certificate →</button>
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

// ── Dummy staff data for org dashboard ───────────────────────────
const DUMMY_STAFF = [
  { name: "Sarah Chen",    check: "Identity verification",       status: "verified",  date: "12 May 2026",  expiry: "2028-05-12", daysLeft: 730 },
  { name: "James Wu",      check: "Working with Children Check", status: "verified",  date: "03 Apr 2026",  expiry: "2026-06-15", daysLeft: 31  },
  { name: "Mark O'Brien",  check: "National crime check",        status: "verified",  date: "28 Mar 2026",  expiry: "2027-03-28", daysLeft: 317 },
  { name: "Lisa Park",     check: "Working with Children Check", status: "pending",   date: "—",            expiry: "2026-05-20", daysLeft: 5   },
  { name: "Tom Nguyen",    check: "Qualification verification",  status: "verified",  date: "01 Feb 2026",  expiry: "2029-02-01", daysLeft: 992 },
  { name: "Amy Roberts",   check: "Age verification",            status: "expired",   date: "10 Jan 2026",  expiry: "2026-01-10", daysLeft: -125 },
];

const STATUS_LABEL = {
  verified: { label: "Verified",  bg: "#dcfce7", color: "#15803d" },
  pending:  { label: "Pending",   bg: "#fef9c3", color: "#854d0e" },
  expired:  { label: "Expired",   bg: "#fee2e2", color: "#b91c1c" },
};

// ── Expiry alert helpers ──────────────────────────────────────────
function getExpiryInfo() {
  try {
    const raw = localStorage.getItem("vc_wwcc_expiry");
    if (!raw) return null;
    const expiry = new Date(raw);
    const today  = new Date();
    const days   = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return { days, dateStr: expiry.toLocaleDateString("en-AU", { day:"numeric", month:"long", year:"numeric" }) };
  } catch { return null; }
}

// ── Sidebar (shared) ─────────────────────────────────────────────
function AppSidebar({ session, onLogout, userType, activeNav, setActiveNav }) {
  const orgNavItems = [
    { label: "Dashboard",   icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="11" y="3" width="6" height="6" rx="1"/><rect x="3" y="11" width="6" height="6" rx="1"/><rect x="11" y="11" width="6" height="6" rx="1"/></svg> },
    { label: "Staff",       icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 17a6 6 0 00-12 0"/><path d="M18 12a3 3 0 11-6 0 3 3 0 016 0M18 17a3 3 0 00-6 0" opacity="0.4"/></svg> },
    { label: "Reports",     icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5H7a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="2" height="4" rx="1"/><path d="M7 10h6M7 13h4"/></svg> },
    { label: "Alerts",      icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 2a6 6 0 016 6v3l1 2H3l1-2V8a6 6 0 016-6z"/><path d="M8 15a2 2 0 004 0"/></svg> },
  ];
  const indNavItems = [
    { label: "Dashboard",      icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="11" y="3" width="6" height="6" rx="1"/><rect x="3" y="11" width="6" height="6" rx="1"/><rect x="11" y="11" width="6" height="6" rx="1"/></svg> },
    { label: "My checks",      icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5H7a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="2" height="4" rx="1"/><path d="M7 10h6M7 13h4"/></svg> },
    { label: "Certificates",   icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 3h10a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"/><path d="M7 8h6M7 11h4"/><circle cx="13" cy="14" r="2"/><path d="M13 16v2l1-1-1-1"/></svg> },
  ];
  const navItems = userType === "organisation" ? orgNavItems : indNavItems;

  return (
    <aside className="app-sidebar">
      <div className="app-sidebar-logo">
        <img src="/verifychain-logo.png" alt="VerifyChain" className="app-sidebar-logo-img" />
      </div>

      <div className="app-sidebar-type-badge">
        {userType === "organisation" ? "🏢 Organisation" : "👤 Individual"}
      </div>

      <nav className="app-nav">
        {navItems.map((item) => (
          <div key={item.label}
            className={`app-nav-item ${activeNav === item.label ? "app-nav-item--active" : ""}`}
            onClick={() => setActiveNav && setActiveNav(item.label)}>
            {item.icon}
            {item.label}
          </div>
        ))}
      </nav>

      <div className="app-sidebar-user">
        <div className="app-user-avatar">
          {session.firstName?.[0]}{session.lastName?.[0]}
        </div>
        <div className="app-user-info">
          <p className="app-user-name">{session.firstName} {session.lastName}</p>
          <p className="app-user-type">
            {userType === "organisation" ? (session.orgName || "Organisation") : "Individual account"}
          </p>
        </div>
        <button className="app-logout-btn" onClick={onLogout} title="Log out">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </aside>
  );
}

// ── Expiry alert banner ───────────────────────────────────────────
function ExpiryBanner({ expiry, onDismiss }) {
  const urgent = expiry.days <= 14;
  return (
    <div className={`app-expiry-banner ${urgent ? "app-expiry-banner--urgent" : ""}`}>
      <span className="app-expiry-banner-icon">{urgent ? "🔴" : "🟡"}</span>
      <div className="app-expiry-banner-body">
        <strong>
          {urgent
            ? `Your Working with Children Check expires in ${expiry.days} day${expiry.days !== 1 ? "s" : ""} — action required`
            : `Your Working with Children Check expires on ${expiry.dateStr}`}
        </strong>
        <p>
          {urgent
            ? "Your clearance is about to expire. Renew now to avoid a gap in your verification status."
            : `You have ${expiry.days} days remaining. We recommend renewing at least 2 weeks before the expiry date.`}
          {" "}
          <a href="https://www.vic.gov.au/working-children-check" target="_blank" rel="noreferrer" className="app-expiry-link">
            Renew through the government portal →
          </a>
        </p>
      </div>
      <button className="app-expiry-dismiss" onClick={onDismiss}>✕</button>
    </div>
  );
}

// ── ORGANISATION DASHBOARD ────────────────────────────────────────
// ── Staff table shared component ─────────────────────────────────
function StaffTable({ onRunCheck }) {
  return (
    <div className="app-staff-table">
      <div className="app-staff-table-head">
        <span>Staff member</span>
        <span>Check type</span>
        <span>Verified date</span>
        <span>Expiry</span>
        <span>Status</span>
      </div>
      {DUMMY_STAFF.map((s, i) => {
        const st = STATUS_LABEL[s.status];
        const nearExpiry = s.daysLeft >= 0 && s.daysLeft <= 60;
        return (
          <div key={i} className={`app-staff-row ${nearExpiry ? "app-staff-row--alert" : ""}`}>
            <span className="app-staff-name">
              <div className="app-staff-avatar">{s.name.split(" ").map(n=>n[0]).join("")}</div>
              {s.name}
            </span>
            <span className="app-staff-check">{s.check}</span>
            <span className="app-staff-date">{s.date}</span>
            <span className="app-staff-expiry">
              {s.expiry !== "—" && s.daysLeft >= 0 && s.daysLeft <= 60 && (
                <span className="app-expiry-pill">{s.daysLeft}d left</span>
              )}
              {s.daysLeft < 0 && <span className="app-expiry-pill app-expiry-pill--expired">Expired</span>}
              {s.expiry !== "—" && s.daysLeft > 60 && s.expiry}
              {s.expiry === "—" && "—"}
            </span>
            <span className="app-staff-status" style={{ background: st.bg, color: st.color }}>
              {st.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function OrgDashboard({ session, onLogout }) {
  const [active, setActive]       = useState(null);
  const [dismissed, setDismissed] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const expiry    = getExpiryInfo();
  const showBanner = expiry && expiry.days <= 60 && !dismissed;

  const expiringSoon = DUMMY_STAFF.filter(s => s.daysLeft >= 0 && s.daysLeft <= 60);
  const verified     = DUMMY_STAFF.filter(s => s.status === "verified").length;
  const pending      = DUMMY_STAFF.filter(s => s.status === "pending").length;
  const expired      = DUMMY_STAFF.filter(s => s.status === "expired").length;
  const greeting     = new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening";

  const StatRow = () => (
    <div className="app-stats-row">
      {[
        { label: "Total staff verified", value: verified,             color: "#15803d", bg: "#dcfce7" },
        { label: "Pending verification", value: pending,              color: "#854d0e", bg: "#fef9c3" },
        { label: "Expired / lapsed",     value: expired,              color: "#b91c1c", bg: "#fee2e2" },
        { label: "Expiring within 60d",  value: expiringSoon.length,  color: "#1d4ed8", bg: "#dbeafe" },
      ].map(s => (
        <div key={s.label} className="app-stat-card" style={{cursor: s.label === "Expiring within 60d" ? "pointer" : "default"}}
          onClick={() => s.label === "Expiring within 60d" && setActiveNav("Alerts")}>
          <span className="app-stat-value" style={{ color: s.color }}>{s.value}</span>
          <span className="app-stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );

  // ── Dashboard view ──
  const DashboardView = () => (
    <>
      <div className="app-topbar app-topbar--simple">
        <div>
          <h1 className="app-topbar-title">Good {greeting}, {session.firstName} 👋</h1>
          <p className="app-topbar-sub">{session.orgName || "Your organisation"} · Verification overview</p>
        </div>
        <div className="app-topbar-badge"><span className="app-live-dot" />Demo mode</div>
      </div>

      <StatRow />

      {expiringSoon.length > 0 && (
        <div className="app-section-alert">
          <span>⚠️</span>
          <div>
            <strong>{expiringSoon.length} staff member{expiringSoon.length > 1 ? "s" : ""} with checks expiring within 60 days</strong>
            <p>
              Review the staff list and prompt them to renew.{" "}
              <button className="app-section-link" onClick={() => setActiveNav("Alerts")}>View alerts →</button>
            </p>
          </div>
        </div>
      )}

      <div className="app-section-header">
        <h2 className="app-section-title">Recent staff verifications</h2>
        <button className="app-section-link" onClick={() => setActiveNav("Staff")}>View all →</button>
      </div>
      <StaffTable />

      <div className="app-section-header" style={{ marginTop: 40 }}>
        <h2 className="app-section-title">Run a verification</h2>
        <p className="app-section-sub">Select a product to start a new check for a staff member.</p>
      </div>
      <div className="app-products-grid">
        {products.map(p => {
          const st = STATUS[p.status];
          return (
            <div key={p.num} className="app-product-card" onClick={() => setActive(p)}>
              <div className="app-card-top">
                <span className="app-card-num">{p.num}</span>
                <span className="app-card-status" style={{ background: st.bg, color: st.color }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background: st.dot, display:"inline-block", marginRight:5 }}/>
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
    </>
  );

  // ── Staff view ──
  const StaffView = () => (
    <>
      <div className="app-topbar app-topbar--simple">
        <div>
          <h1 className="app-topbar-title">Staff</h1>
          <p className="app-topbar-sub">All staff verifications for {session.orgName || "your organisation"}.</p>
        </div>
        <button className="app-section-btn" onClick={() => setActive(products[0])}>+ Run new check</button>
      </div>

      <div className="app-stats-row" style={{ marginBottom: 24 }}>
        {[
          { label: "Verified",          value: verified, color: "#15803d", bg: "#dcfce7" },
          { label: "Pending",           value: pending,  color: "#854d0e", bg: "#fef9c3" },
          { label: "Expired",           value: expired,  color: "#b91c1c", bg: "#fee2e2" },
          { label: "Expiring ≤ 60 days", value: expiringSoon.length, color: "#1d4ed8", bg: "#dbeafe" },
        ].map(s => (
          <div key={s.label} className="app-stat-card">
            <span className="app-stat-value" style={{ color: s.color }}>{s.value}</span>
            <span className="app-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="app-section-header">
        <h2 className="app-section-title">All staff ({DUMMY_STAFF.length})</h2>
      </div>
      <StaffTable />
    </>
  );

  // ── Reports view ──
  const ReportsView = () => (
    <>
      <div className="app-topbar app-topbar--simple">
        <div>
          <h1 className="app-topbar-title">Reports</h1>
          <p className="app-topbar-sub">Compliance summary and verification activity for {session.orgName || "your organisation"}.</p>
        </div>
        <div className="app-topbar-badge"><span className="app-live-dot" />Demo mode</div>
      </div>

      {/* Compliance summary cards */}
      <div className="app-section-header">
        <h2 className="app-section-title">Compliance summary</h2>
      </div>
      <div className="app-reports-grid">
        <div className="app-report-card">
          <div className="app-report-card-header" style={{ background: "#dcfce7" }}>
            <span style={{ fontSize: 28 }}>✅</span>
            <div>
              <p className="app-report-card-num" style={{ color: "#15803d" }}>{verified}</p>
              <p className="app-report-card-label">Staff fully verified</p>
            </div>
          </div>
          <p className="app-report-card-desc">All required checks completed and current for these staff members.</p>
        </div>
        <div className="app-report-card">
          <div className="app-report-card-header" style={{ background: "#fef9c3" }}>
            <span style={{ fontSize: 28 }}>⏳</span>
            <div>
              <p className="app-report-card-num" style={{ color: "#854d0e" }}>{pending}</p>
              <p className="app-report-card-label">Verifications pending</p>
            </div>
          </div>
          <p className="app-report-card-desc">Checks initiated but not yet completed. Follow up with these staff members.</p>
        </div>
        <div className="app-report-card">
          <div className="app-report-card-header" style={{ background: "#fee2e2" }}>
            <span style={{ fontSize: 28 }}>❌</span>
            <div>
              <p className="app-report-card-num" style={{ color: "#b91c1c" }}>{expired}</p>
              <p className="app-report-card-label">Expired checks</p>
            </div>
          </div>
          <p className="app-report-card-desc">These staff have lapsed credentials. Action required before they can continue working.</p>
        </div>
        <div className="app-report-card">
          <div className="app-report-card-header" style={{ background: "#dbeafe" }}>
            <span style={{ fontSize: 28 }}>🔔</span>
            <div>
              <p className="app-report-card-num" style={{ color: "#1d4ed8" }}>{expiringSoon.length}</p>
              <p className="app-report-card-label">Expiring within 60 days</p>
            </div>
          </div>
          <p className="app-report-card-desc">Prompt these staff to renew before their credentials lapse.</p>
        </div>
      </div>

      {/* Verification breakdown */}
      <div className="app-section-header" style={{ marginTop: 36 }}>
        <h2 className="app-section-title">Verification breakdown</h2>
      </div>
      <div className="app-breakdown-list">
        {[
          { type: "Working with Children Check", count: DUMMY_STAFF.filter(s=>s.check==="Working with Children Check").length, color: "#3b5ccc" },
          { type: "Identity verification",        count: DUMMY_STAFF.filter(s=>s.check==="Identity verification").length,        color: "#0f6e56" },
          { type: "National crime check",         count: DUMMY_STAFF.filter(s=>s.check==="National crime check").length,         color: "#854f0b" },
          { type: "Qualification verification",   count: DUMMY_STAFF.filter(s=>s.check==="Qualification verification").length,   color: "#185fa5" },
          { type: "Age verification",             count: DUMMY_STAFF.filter(s=>s.check==="Age verification").length,             color: "#7e22ce" },
        ].map(b => (
          <div key={b.type} className="app-breakdown-row">
            <span className="app-breakdown-dot" style={{ background: b.color }} />
            <span className="app-breakdown-type">{b.type}</span>
            <div className="app-breakdown-bar-wrap">
              <div className="app-breakdown-bar" style={{ width: `${(b.count / DUMMY_STAFF.length) * 100}%`, background: b.color }} />
            </div>
            <span className="app-breakdown-count">{b.count}</span>
          </div>
        ))}
      </div>
    </>
  );

  // ── Alerts view ──
  const AlertsView = () => {
    const expiring = DUMMY_STAFF.filter(s => s.daysLeft >= 0 && s.daysLeft <= 60).sort((a,b) => a.daysLeft - b.daysLeft);
    const lapsed   = DUMMY_STAFF.filter(s => s.daysLeft < 0);
    const pend     = DUMMY_STAFF.filter(s => s.status === "pending");
    return (
      <>
        <div className="app-topbar app-topbar--simple">
          <div>
            <h1 className="app-topbar-title">Alerts</h1>
            <p className="app-topbar-sub">Items that require your attention.</p>
          </div>
          <div className="app-topbar-badge"><span className="app-live-dot" />Demo mode</div>
        </div>

        {expiring.length === 0 && lapsed.length === 0 && pend.length === 0 && (
          <div className="app-history-empty">
            <span>✅</span>
            <p>No alerts — all staff verifications are current.</p>
          </div>
        )}

        {lapsed.length > 0 && (
          <>
            <div className="app-section-header">
              <h2 className="app-section-title">Expired — action required</h2>
              <span className="app-section-count">{lapsed.length}</span>
            </div>
            <div className="app-alert-list">
              {lapsed.map((s, i) => (
                <div key={i} className="app-alert-card app-alert-card--expired">
                  <div className="app-alert-left">
                    <div className="app-staff-avatar">{s.name.split(" ").map(n=>n[0]).join("")}</div>
                    <div>
                      <strong>{s.name}</strong>
                      <p>{s.check} · Expired</p>
                    </div>
                  </div>
                  <button className="app-alert-btn" onClick={() => setActive(products.find(p => p.name.toLowerCase().includes(s.check.toLowerCase().split(" ")[0])) || products[0])}>
                    Run new check →
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {expiring.length > 0 && (
          <>
            <div className="app-section-header" style={{ marginTop: lapsed.length > 0 ? 32 : 0 }}>
              <h2 className="app-section-title">Expiring within 60 days</h2>
              <span className="app-section-count" style={{ background: "#fef9c3", color: "#854d0e" }}>{expiring.length}</span>
            </div>
            <div className="app-alert-list">
              {expiring.map((s, i) => (
                <div key={i} className="app-alert-card app-alert-card--expiring">
                  <div className="app-alert-left">
                    <div className="app-staff-avatar">{s.name.split(" ").map(n=>n[0]).join("")}</div>
                    <div>
                      <strong>{s.name}</strong>
                      <p>{s.check} · Expires in <strong>{s.daysLeft} day{s.daysLeft !== 1 ? "s" : ""}</strong></p>
                    </div>
                  </div>
                  <span className="app-expiry-pill" style={{ flexShrink: 0 }}>{s.daysLeft}d left</span>
                </div>
              ))}
            </div>
          </>
        )}

        {pend.length > 0 && (
          <>
            <div className="app-section-header" style={{ marginTop: 32 }}>
              <h2 className="app-section-title">Pending verification</h2>
              <span className="app-section-count" style={{ background: "#fef9c3", color: "#854d0e" }}>{pend.length}</span>
            </div>
            <div className="app-alert-list">
              {pend.map((s, i) => (
                <div key={i} className="app-alert-card">
                  <div className="app-alert-left">
                    <div className="app-staff-avatar">{s.name.split(" ").map(n=>n[0]).join("")}</div>
                    <div>
                      <strong>{s.name}</strong>
                      <p>{s.check} · Awaiting completion</p>
                    </div>
                  </div>
                  <button className="app-alert-btn" onClick={() => setActive(products.find(p => p.name.toLowerCase().includes(s.check.toLowerCase().split(" ")[0])) || products[0])}>
                    Follow up →
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <div className="app-shell">
      <AppSidebar session={session} onLogout={onLogout} userType="organisation"
        activeNav={activeNav} setActiveNav={setActiveNav} />

      <main className="app-main">
        {showBanner && (
          <ExpiryBanner expiry={expiry} onDismiss={() => { setDismissed(true); localStorage.removeItem("vc_wwcc_expiry"); }}/>
        )}
        {activeNav === "Dashboard" && <DashboardView />}
        {activeNav === "Staff"     && <StaffView />}
        {activeNav === "Reports"   && <ReportsView />}
        {activeNav === "Alerts"    && <AlertsView />}
      </main>

      {active && <VerifyModal product={active} session={session} onClose={() => setActive(null)} />}
    </div>
  );
}

// ── INDIVIDUAL DASHBOARD ──────────────────────────────────────────
function useCompletedChecks() {
  const [checks, setChecks] = useState(() => {
    try { return JSON.parse(localStorage.getItem("vc_completed_checks") || "[]"); }
    catch { return []; }
  });

  // Refresh when modal closes (parent calls this via onClose)
  const refresh = () => {
    try { setChecks(JSON.parse(localStorage.getItem("vc_completed_checks") || "[]")); }
    catch { setChecks([]); }
  };

  return [checks, refresh];
}

function IndividualDashboard({ session, onLogout }) {
  const [active, setActive]         = useState(null);
  const [dismissed, setDismissed]   = useState(false);
  const [completed, refreshChecks]  = useCompletedChecks();
  const [activeNav, setActiveNav]   = useState("Dashboard");
  // Keep expiry as state so it updates immediately without a page refresh
  const [expiryInfo, setExpiryInfo] = useState(() => getExpiryInfo());
  const showBanner = expiryInfo && expiryInfo.days <= 60 && !dismissed;

  const refreshExpiry = () => setExpiryInfo(getExpiryInfo());

  const greeting = new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening";

  const requested = [
    { from: "Sunshine Primary School", check: "Working with Children Check", due: "20 May 2026", urgent: true },
    { from: "Melbourne City Council",  check: "National crime check",         due: "30 May 2026", urgent: false },
  ];

  const dummyCompleted = [
    { check: "Identity verification", date: "12 May 2026", id: "VC-A1B2C3-7842", status: "Verified" },
    { check: "Age verification",      date: "03 Apr 2026", id: "VC-D4E5F6-3310", status: "Verified" },
  ];
  const allCompleted = [
    ...completed,
    ...dummyCompleted.filter(d => !completed.find(c => c.id === d.id)),
  ];

  const handleClose = () => {
    setActive(null);
    refreshChecks();
    refreshExpiry(); // re-read expiry immediately — no page refresh needed
  };

  // ── My Checks view ──
  const MyChecksView = () => (
    <>
      <div className="app-topbar app-topbar--simple">
        <div>
          <h1 className="app-topbar-title">My checks</h1>
          <p className="app-topbar-sub">All verifications you have completed.</p>
        </div>
        <div className="app-topbar-badge"><span className="app-live-dot" />Demo mode</div>
      </div>
      <div className="app-section-header">
        <h2 className="app-section-title">Verification history</h2>
        <span className="app-section-sub">{allCompleted.length} check{allCompleted.length !== 1 ? "s" : ""} completed</span>
      </div>
      {allCompleted.length === 0 ? (
        <div className="app-history-empty">
          <span>📋</span>
          <p>No verifications yet. Go to Dashboard and complete a check to see it here.</p>
        </div>
      ) : (
        <div className="app-history-list">
          {allCompleted.map((c, i) => (
            <div key={c.id || i} className="app-history-row">
              <div className="app-history-icon">✓</div>
              <div className="app-history-body">
                <strong>{c.check}</strong>
                <span>{c.date} · {c.id}</span>
              </div>
              <span className="app-history-status">{c.status}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );

  // ── Certificates view ──
  const CertificatesView = () => (
    <>
      <div className="app-topbar app-topbar--simple">
        <div>
          <h1 className="app-topbar-title">Certificates</h1>
          <p className="app-topbar-sub">Download or share your verification certificates.</p>
        </div>
        <div className="app-topbar-badge"><span className="app-live-dot" />Demo mode</div>
      </div>
      {allCompleted.length === 0 ? (
        <div className="app-history-empty">
          <span>🏅</span>
          <p>No certificates yet. Complete a verification to generate your first certificate.</p>
        </div>
      ) : (
        <div className="app-cert-grid">
          {allCompleted.map((c, i) => (
            <div key={c.id || i} className="app-cert-card">
              <div className="app-cert-card-stripe" />
              <div className="app-cert-card-body">
                <div className="app-cert-card-icon">🏅</div>
                <h4 className="app-cert-card-name">{c.check}</h4>
                <p className="app-cert-card-date">Verified {c.date}</p>
                <p className="app-cert-card-id">{c.id}</p>
                <span className="app-cert-card-badge">✓ Verified</span>
                <button className="app-cert-card-btn"
                  onClick={() => {
                    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="794" height="562" viewBox="0 0 794 562">
  <rect width="794" height="562" fill="#f8f7f3"/>
  <rect x="0" y="0" width="6" height="562" fill="#3b5ccc"/>
  <rect x="40" y="40" width="714" height="482" rx="8" fill="none" stroke="#e2e0d8" stroke-width="1"/>
  <text x="397" y="95" font-family="Georgia,serif" font-size="11" fill="#999" text-anchor="middle" letter-spacing="3">VERIFYCHAIN · CERTIFICATE OF VERIFICATION</text>
  <text x="397" y="155" font-family="Georgia,serif" font-size="30" fill="#13151f" text-anchor="middle">${c.check}</text>
  <line x1="200" y1="175" x2="594" y2="175" stroke="#e2e0d8" stroke-width="1"/>
  <text x="397" y="230" font-family="Georgia,serif" font-size="14" fill="#555" text-anchor="middle">This certifies that</text>
  <text x="397" y="275" font-family="Georgia,serif" font-size="26" fill="#13151f" text-anchor="middle" font-weight="bold">${session.firstName} ${session.lastName}</text>
  <text x="397" y="315" font-family="Georgia,serif" font-size="14" fill="#555" text-anchor="middle">has successfully completed verification on ${c.date}</text>
  <rect x="247" y="340" width="300" height="36" rx="18" fill="#3b5ccc"/>
  <text x="397" y="364" font-family="Georgia,serif" font-size="13" fill="#fff" text-anchor="middle">✓ Verified — Zero data retained</text>
  <text x="397" y="420" font-family="monospace" font-size="11" fill="#aaa" text-anchor="middle">Certificate ID: ${c.id}</text>
  <text x="397" y="458" font-family="Georgia,serif" font-size="11" fill="#aaa" text-anchor="middle">VerifyChain Pty Ltd · Melbourne, Australia · verifychain.io</text>
</svg>`;
                    const blob = new Blob([svg], { type: "image/svg+xml" });
                    const url  = URL.createObjectURL(blob);
                    const a    = document.createElement("a");
                    a.href = url; a.download = `VerifyChain-${c.id}.svg`; a.click();
                    URL.revokeObjectURL(url);
                  }}>
                  Download ↓
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );

  // ── Dashboard view (default) ──
  const DashboardView = () => (
    <>
      <div className="app-topbar app-topbar--simple">
        <div>
          <h1 className="app-topbar-title">Good {greeting}, {session.firstName} 👋</h1>
          <p className="app-topbar-sub">Here's what you need to complete and your verification history.</p>
        </div>
        <div className="app-topbar-badge"><span className="app-live-dot" />Demo mode</div>
      </div>

      {requested.length > 0 && (
        <>
          <div className="app-section-header">
            <h2 className="app-section-title">Action required</h2>
            <span className="app-section-count">{requested.length} pending</span>
          </div>
          <div className="app-requested-list">
            {requested.map((r, i) => (
              <div key={i} className={`app-requested-card ${r.urgent ? "app-requested-card--urgent" : ""}`}>
                <div className="app-requested-left">
                  <div className="app-requested-from">
                    <span className="app-requested-org-icon">🏢</span>
                    <strong>{r.from}</strong>
                  </div>
                  <p className="app-requested-check">{r.check}</p>
                  <p className="app-requested-due">
                    Due by {r.due}
                    {r.urgent && <span className="app-requested-urgent-tag">Action soon</span>}
                  </p>
                </div>
                <button className="app-requested-btn"
                  onClick={() => setActive(products.find(p => p.name.toLowerCase().includes(r.check.toLowerCase().split(" ")[0])) || products[0])}>
                  Start check →
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="app-section-header" style={{ marginTop: 36 }}>
        <h2 className="app-section-title">Start a verification</h2>
        <p className="app-section-sub">Run a check yourself and share the certificate with any organisation.</p>
      </div>
      <div className="app-products-grid">
        {products.map(p => {
          const st = STATUS[p.status];
          return (
            <div key={p.num} className="app-product-card" onClick={() => setActive(p)}>
              <div className="app-card-top">
                <span className="app-card-num">{p.num}</span>
                <span className="app-card-status" style={{ background: st.bg, color: st.color }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background: st.dot, display:"inline-block", marginRight:5 }}/>
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

      <div className="app-section-header" style={{ marginTop: 40 }}>
        <h2 className="app-section-title">Recent verifications</h2>
        <button className="app-section-link" onClick={() => setActiveNav("My checks")}>View all →</button>
      </div>
      {allCompleted.length === 0 ? (
        <div className="app-history-empty">
          <span>📋</span>
          <p>No verifications yet. Complete a check above to see it here.</p>
        </div>
      ) : (
        <div className="app-history-list">
          {allCompleted.slice(0, 3).map((c, i) => (
            <div key={c.id || i} className="app-history-row">
              <div className="app-history-icon">✓</div>
              <div className="app-history-body">
                <strong>{c.check}</strong>
                <span>{c.date} · {c.id}</span>
              </div>
              <span className="app-history-status">{c.status}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className="app-shell app-shell--no-topnav">
      <AppSidebar session={session} onLogout={onLogout} userType="individual"
        activeNav={activeNav} setActiveNav={setActiveNav} />

      <main className="app-main">
        {showBanner && (
          <ExpiryBanner expiry={expiryInfo} onDismiss={() => { setDismissed(true); localStorage.removeItem("vc_wwcc_expiry"); refreshExpiry(); }}/>
        )}
        {activeNav === "Dashboard"    && <DashboardView />}
        {activeNav === "My checks"    && <MyChecksView />}
        {activeNav === "Certificates" && <CertificatesView />}
      </main>

      {active && <VerifyModal product={active} session={session} onClose={handleClose} />}
    </div>
  );
}

// ── MAIN ENTRY ────────────────────────────────────────────────────
export default function AppDashboard() {
  const navigate = useNavigate();
  const session  = getSession();

  const handleLogout = () => { clearSession(); navigate("/login"); };

  if (!session) { navigate("/login"); return null; }

  return session.userType === "organisation"
    ? <OrgDashboard  session={session} onLogout={handleLogout} />
    : <IndividualDashboard session={session} onLogout={handleLogout} />;
}