import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductDetailPage.css";

// ── Product data ─────────────────────────────────────────────────
const PRODUCTS = {
  "identity-verification": {
    num: "01", name: "Identity verification", statusLabel: "Production ready", status: "live",
    tagline: "Validate any identity document in under 5 minutes.",
    desc: "VerifyChain's identity verification checks passports, driver's licences, and national IDs against authoritative government databases in real time. No data is stored after the check is complete.",
    steps: [
      { n: "01", title: "Upload document",        icon: "📄", desc: "User uploads a photo of their driver's licence or passport via the secure web portal or mobile app. Front and back captured." },
      { n: "02", title: "Image quality check",    icon: "🔍", desc: "Automated checks for blur, glare, and obstruction. Document format is validated against known Australian licence templates." },
      { n: "03", title: "OCR data extraction",    icon: "🔤", desc: "OCR engine extracts name, licence number, date of birth, and expiry date. Structured into a standard schema." },
      { n: "04", title: "Fraud detection",        icon: "🛡️", desc: "Hologram and watermark pattern detection, tamper analysis, and deepfake/synthetic image detection run in parallel." },
      { n: "05", title: "Government database check", icon: "🏛️", desc: "API cross-check against government registries confirms licence validity, status (active/suspended/expired), and owner details." },
      { n: "06", title: "Biometric match",        icon: "👤", desc: "Optional live selfie is compared against the licence photo. Liveness detection prevents photo/video replay spoofing." },
      { n: "07", title: "Risk score & decision",  icon: "⚖️", desc: "All signals are aggregated into a risk score. Thresholds aligned to KYC/AML requirements determine Pass / Fail / Manual Review." },
      { n: "08", title: "Certificate issued",     icon: "✅", desc: "A zero-knowledge certificate is generated — confirming the result without exposing any raw personal data. Immutable audit log created." },
    ],
    compliance: ["ISO/IEC 27001", "NIST CSF", "KYC / AML", "Zero Trust"],
    time: "< 5 minutes",
  },
  "age-verification": {
    num: "02", name: "Age verification", statusLabel: "Production ready", status: "live",
    tagline: "Confirm age instantly — without revealing a birth date.",
    desc: "Tested by the Australian Government in age assurance trials. VerifyChain confirms whether a person meets an age threshold using document scanning or AI camera estimation — zero personal data retained.",
    steps: [
      { n: "01", title: "Select method",          icon: "🔀", desc: "User chooses document-based verification (passport/licence) or AI camera estimation — no document required for estimation." },
      { n: "02", title: "Capture input",          icon: "📷", desc: "Document uploaded or live camera feed captured. Metadata (device, IP) logged for fraud intelligence." },
      { n: "03", title: "Age extraction",         icon: "🔤", desc: "Date of birth extracted via OCR (document) or age estimated from facial geometry (camera). Threshold applied — no raw DOB exposed." },
      { n: "04", title: "Fraud & liveness check", icon: "🛡️", desc: "Deepfake detection, document tampering analysis, and liveness checks prevent spoofing attempts." },
      { n: "05", title: "Threshold decision",     icon: "⚖️", desc: "Result is simply: above threshold / below threshold. The actual age or DOB is never shared with the requesting organisation." },
      { n: "06", title: "Zero-knowledge proof issued", icon: "✅", desc: "A cryptographic proof confirms age compliance. No personal data leaves the system. Audit log written for compliance." },
    ],
    compliance: ["Digital ID Act 2024", "GDPR", "Zero Trust", "ISO/IEC 27001"],
    time: "< 2 minutes",
  },
  "qualification-verification": {
    num: "03", name: "Qualification verification", statusLabel: "Proof of concept", status: "poc",
    tagline: "Verify degrees and trade qualifications in real time.",
    desc: "VerifyChain cross-checks academic and trade credentials against issuing institutions and the USI registry. Eliminates fake qualifications at point of hire.",
    steps: [
      { n: "01", title: "Enter credential details", icon: "📝", desc: "User provides institution name, qualification type, graduation year, and their student ID or USI number." },
      { n: "02", title: "Institution lookup",      icon: "🏛️", desc: "VerifyChain identifies the issuing institution and selects the correct verification pathway (USI, direct API, or manual)." },
      { n: "03", title: "Cross-check registry",    icon: "🔍", desc: "Credential is verified against the USI registry (for Australian VET qualifications) or the institution's own verification API." },
      { n: "04", title: "Document upload (optional)", icon: "📄", desc: "User may upload a scanned certificate. OCR extraction and template matching confirm the document format matches the institution." },
      { n: "05", title: "Decision & certificate",  icon: "✅", desc: "Verified / Not verified result issued. Certificate generated confirming the credential check. Audit log written." },
    ],
    compliance: ["USI Registry", "ASQA standards", "ISO/IEC 27001"],
    time: "< 10 minutes",
  },
  "national-crime-check": {
    num: "04", name: "National crime check", statusLabel: "Production ready", status: "live",
    tagline: "Automated police checks — real time, every time.",
    desc: "VerifyChain submits background screening requests to Australian law enforcement databases automatically. Supports both one-time and repeat monitoring checks.",
    steps: [
      { n: "01", title: "Identity confirmation",  icon: "🪪", desc: "User's identity is first verified (passport or licence) to ensure the check is performed against the correct individual." },
      { n: "02", title: "Consent capture",        icon: "✍️", desc: "Explicit consent is recorded and timestamped. Required by Australian law before any criminal history check." },
      { n: "03", title: "Database submission",    icon: "🏛️", desc: "Request submitted to the Australian Federal Police (AFP) National Police Checking Service (NPCS) via secure API." },
      { n: "04", title: "Record matching",        icon: "🔍", desc: "Name, DOB, and identity document details cross-referenced against national criminal records." },
      { n: "05", title: "Disclosable outcome",    icon: "⚖️", desc: "Result categorised as: No disclosable outcome / Disclosable outcome. Full details sent only to the individual, not the organisation." },
      { n: "06", title: "Certificate & audit log", icon: "✅", desc: "Verified outcome certificate issued. Immutable audit trail stored. Repeat monitoring alert configured if requested." },
    ],
    compliance: ["AFP NPCS", "Privacy Act 1988", "KYC / AML", "ISO/IEC 27001"],
    time: "< 5 minutes",
  },
  "working-with-children-check": {
    num: "05", name: "Working with children check", statusLabel: "In development", status: "dev",
    tagline: "Validate WWCC clearance across all Australian jurisdictions.",
    desc: "VerifyChain checks Working with Children clearance status in real time against each state authority's database. Automatic revocation alerts notify organisations if a clearance is revoked.",
    steps: [
      { n: "01", title: "Enter card details",     icon: "📝", desc: "User provides their WWCC card number and selects the issuing state or territory." },
      { n: "02", title: "Identity verification",  icon: "🪪", desc: "Card number is matched against the user's verified identity to prevent impersonation." },
      { n: "03", title: "State authority check",  icon: "🏛️", desc: "Real-time API call to the relevant state authority (e.g. Working with Children Check Victoria) confirms current clearance status." },
      { n: "04", title: "Revocation scan",        icon: "🔍", desc: "Cross-jurisdiction scan checks for revocations, suspensions, or conditions attached to the clearance." },
      { n: "05", title: "Outcome & monitoring",   icon: "✅", desc: "Clearance confirmed certificate issued. Ongoing monitoring configured — organisation alerted immediately if status changes." },
    ],
    compliance: ["WWCC Act (VIC)", "Privacy Act 1988", "Zero Trust"],
    time: "< 3 minutes",
  },
  "eseal-document-verification": {
    num: "06", name: "eSeal document verification", statusLabel: "In development", status: "dev",
    tagline: "Tamper-proof digital notarisation at scale.",
    desc: "VerifyChain applies cryptographic electronic seals to documents, providing tamper-proof notarisation compliant with ESIGN and eIDAS regulations. Every seal is independently verifiable.",
    steps: [
      { n: "01", title: "Document upload",        icon: "📄", desc: "User uploads the document to be sealed. Supports PDF, DOCX, and image formats up to 50MB." },
      { n: "02", title: "Hash generation",        icon: "🔐", desc: "A cryptographic hash of the document is generated. Any future modification — even a single character — will invalidate the hash." },
      { n: "03", title: "Identity binding",       icon: "🪪", desc: "The seal is bound to the verified identity of the signing party. Ensures non-repudiation — the signer cannot deny their involvement." },
      { n: "04", title: "eSeal application",      icon: "🔏", desc: "An electronic seal compliant with ESIGN (US) and eIDAS (EU) regulations is applied. Timestamp recorded on the distributed ledger." },
      { n: "05", title: "Verification endpoint",  icon: "✅", desc: "A public verification URL is generated. Any party can independently confirm the document's authenticity without accessing VerifyChain." },
    ],
    compliance: ["ESIGN Act", "eIDAS Regulation", "ISO/IEC 27001", "Zero Trust"],
    time: "< 1 minute",
  },
};

const STATUS_STYLES = {
  live: { bg: "#dcfce7", color: "#15803d", dot: "#16a34a" },
  poc:  { bg: "#dbeafe", color: "#1d4ed8", dot: "#3b82f6" },
  dev:  { bg: "#f3e8ff", color: "#7e22ce", dot: "#a855f7" },
};

// ── Product simulation component ─────────────────────────────────
const SIMULATION_SCREENS = {
  "identity-verification": [
    {
      label: "Upload document",
      desc: "The user uploads a photo of their passport or licence from any device — mobile or desktop.",
      screen: (
        <div className="sim-screen">
          <div className="sim-screen-header">
            <div className="sim-dot sim-dot--red"/><div className="sim-dot sim-dot--yellow"/><div className="sim-dot sim-dot--green"/>
            <span className="sim-url">app.verifychain.io / identity / upload</span>
          </div>
          <div className="sim-body sim-upload-body">
            <p className="sim-step-label">Step 1 of 4 — Upload your document</p>
            <div className="sim-upload-zone">
              <div className="sim-upload-icon">📄</div>
              <p className="sim-upload-main">Drag and drop your ID here</p>
              <p className="sim-upload-hint">Passport · Driver's licence · National ID · JPG or PNG</p>
              <div className="sim-upload-btn">Choose file</div>
            </div>
            <div className="sim-tip-row">
              <span>💡</span> Use natural light · Fill the frame · No glare or obstruction
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Live face check",
      desc: "The user takes a live selfie — matched against their document to confirm they are the holder. Required by Australian legislation.",
      screen: (
        <div className="sim-screen">
          <div className="sim-screen-header">
            <div className="sim-dot sim-dot--red"/><div className="sim-dot sim-dot--yellow"/><div className="sim-dot sim-dot--green"/>
            <span className="sim-url">app.verifychain.io / identity / face-check</span>
          </div>
          <div className="sim-body sim-face-body">
            <p className="sim-step-label">Step 2 of 4 — Live facial photo</p>
            <div className="sim-face-viewfinder">
              <div className="sim-face-oval"/>
              <p className="sim-face-hint">Centre your face in the oval</p>
              <div className="sim-face-corner sim-fc--tl"/><div className="sim-face-corner sim-fc--tr"/>
              <div className="sim-face-corner sim-fc--bl"/><div className="sim-face-corner sim-fc--br"/>
            </div>
            <div className="sim-face-attempts">
              <div className="sim-face-dot"/><div className="sim-face-dot"/><div className="sim-face-dot"/>
              <span>3 of 3 attempts remaining</span>
            </div>
            <div className="sim-face-btn">Take photo</div>
          </div>
        </div>
      ),
    },
    {
      label: "Verification in progress",
      desc: "VerifyChain cross-checks against government databases in real time. The whole process takes under 30 seconds.",
      screen: (
        <div className="sim-screen">
          <div className="sim-screen-header">
            <div className="sim-dot sim-dot--red"/><div className="sim-dot sim-dot--yellow"/><div className="sim-dot sim-dot--green"/>
            <span className="sim-url">app.verifychain.io / identity / verifying</span>
          </div>
          <div className="sim-body sim-processing-body">
            <div className="sim-spinner-ring">
              <svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="34" stroke="#e8ecff" strokeWidth="5" fill="none"/><circle cx="40" cy="40" r="34" stroke="#1e3a8a" strokeWidth="5" fill="none" strokeDasharray="120 214" strokeLinecap="round" className="sim-ring-spin"/></svg>
              <span className="sim-pct">72%</span>
            </div>
            <p className="sim-processing-title">Verifying identity…</p>
            <div className="sim-processing-steps">
              {["✓ Document uploaded","✓ OCR extraction complete","✓ Fraud detection passed","⟳ Government database check…"].map((s,i)=>(<div key={i} className={`sim-proc-step ${s.startsWith("✓") ? "sim-proc-step--done" : "sim-proc-step--active"}`}>{s}</div>))}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Certificate issued",
      desc: "A cryptographically signed certificate is issued instantly. The organisation sees the result — not any personal data.",
      screen: (
        <div className="sim-screen">
          <div className="sim-screen-header">
            <div className="sim-dot sim-dot--red"/><div className="sim-dot sim-dot--yellow"/><div className="sim-dot sim-dot--green"/>
            <span className="sim-url">app.verifychain.io / identity / certificate</span>
          </div>
          <div className="sim-body sim-cert-body">
            <div className="sim-cert-badge">✓ Verified</div>
            <div className="sim-cert-card">
              <div className="sim-cert-stripe"/>
              <div className="sim-cert-inner">
                <p className="sim-cert-eyebrow">VerifyChain · Certificate of Verification</p>
                <p className="sim-cert-type">Identity verification</p>
                <p className="sim-cert-name">Jane Smith</p>
                <div className="sim-cert-rows">
                  <div className="sim-cert-row"><span>Document type</span><span>Passport</span></div>
                  <div className="sim-cert-row"><span>Facial match</span><span className="sim-cert-pass">✓ Confirmed</span></div>
                  <div className="sim-cert-row"><span>Fraud check</span><span className="sim-cert-pass">✓ Passed</span></div>
                  <div className="sim-cert-row"><span>Verification ID</span><span>VC-A8F2C1-7741</span></div>
                </div>
              </div>
            </div>
            <p className="sim-cert-note">Zero personal data transmitted to the requesting organisation.</p>
          </div>
        </div>
      ),
    },
  ],
  "working-with-children-check": [
    {
      label: "Enter card details",
      desc: "The cardholder enters their WWCC card number and selects the issuing state. VerifyChain knows which state registry to query.",
      screen: (
        <div className="sim-screen">
          <div className="sim-screen-header">
            <div className="sim-dot sim-dot--red"/><div className="sim-dot sim-dot--yellow"/><div className="sim-dot sim-dot--green"/>
            <span className="sim-url">app.verifychain.io / wwcc / card-details</span>
          </div>
          <div className="sim-body sim-form-body">
            <p className="sim-step-label">Working with Children Check — Verify my card</p>
            <div className="sim-form-fields">
              <div className="sim-form-field"><label>Card number</label><div className="sim-form-input">WWC1234567A</div></div>
              <div className="sim-form-field"><label>State issued</label><div className="sim-form-input sim-form-select">Victoria ▾</div></div>
              <div className="sim-form-field"><label>Card expiry date</label><div className="sim-form-input">15 / 06 / 2027</div></div>
            </div>
            <div className="sim-alert-opt"><span>🔔</span> Notify me 60 days before this card expires</div>
            <div className="sim-submit-btn">Verify card →</div>
          </div>
        </div>
      ),
    },
    {
      label: "Registry check",
      desc: "VerifyChain queries the Victorian WWCC registry in real time. The check includes revocation and condition scans.",
      screen: (
        <div className="sim-screen">
          <div className="sim-screen-header">
            <div className="sim-dot sim-dot--red"/><div className="sim-dot sim-dot--yellow"/><div className="sim-dot sim-dot--green"/>
            <span className="sim-url">app.verifychain.io / wwcc / checking</span>
          </div>
          <div className="sim-body sim-processing-body">
            <div className="sim-spinner-ring">
              <svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="34" stroke="#e8ecff" strokeWidth="5" fill="none"/><circle cx="40" cy="40" r="34" stroke="#1e3a8a" strokeWidth="5" fill="none" strokeDasharray="150 214" strokeLinecap="round" className="sim-ring-spin"/></svg>
              <span className="sim-pct">85%</span>
            </div>
            <p className="sim-processing-title">Checking registry…</p>
            <div className="sim-processing-steps">
              {["✓ Card number validated","✓ Connected to Victorian registry","✓ Identity matched","⟳ Scanning for revocations…"].map((s,i)=>(<div key={i} className={`sim-proc-step ${s.startsWith("✓") ? "sim-proc-step--done" : "sim-proc-step--active"}`}>{s}</div>))}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Clearance confirmed",
      desc: "Certificate issued immediately. The organisation dashboard is updated. Ongoing monitoring is configured — any future revocation triggers an instant alert.",
      screen: (
        <div className="sim-screen">
          <div className="sim-screen-header">
            <div className="sim-dot sim-dot--red"/><div className="sim-dot sim-dot--yellow"/><div className="sim-dot sim-dot--green"/>
            <span className="sim-url">app.verifychain.io / wwcc / certificate</span>
          </div>
          <div className="sim-body sim-cert-body">
            <div className="sim-cert-badge">✓ Clearance confirmed</div>
            <div className="sim-cert-card">
              <div className="sim-cert-stripe"/>
              <div className="sim-cert-inner">
                <p className="sim-cert-eyebrow">VerifyChain · WWCC Verification</p>
                <p className="sim-cert-type">Working with Children Check</p>
                <p className="sim-cert-name">James Wu</p>
                <div className="sim-cert-rows">
                  <div className="sim-cert-row"><span>Card number</span><span>WWC1234567A</span></div>
                  <div className="sim-cert-row"><span>State</span><span>Victoria</span></div>
                  <div className="sim-cert-row"><span>Clearance status</span><span className="sim-cert-pass">✓ Current</span></div>
                  <div className="sim-cert-row"><span>Revocation check</span><span className="sim-cert-pass">✓ None found</span></div>
                  <div className="sim-cert-row"><span>Expiry alerts</span><span className="sim-cert-pass">✓ Enabled</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ],
};

// Generic simulation for products without custom screens
function GenericSimulation({ product }) {
  return (
    <div className="sim-generic">
      <div className="sim-screen sim-screen--wide">
        <div className="sim-screen-header">
          <div className="sim-dot sim-dot--red"/><div className="sim-dot sim-dot--yellow"/><div className="sim-dot sim-dot--green"/>
          <span className="sim-url">app.verifychain.io / {product.num} / {product.name.toLowerCase().replace(/ /g,"-")}</span>
        </div>
        <div className="sim-body sim-dashboard-body">
          <div className="sim-dash-topbar">
            <p className="sim-dash-title">{product.name}</p>
            <div className="sim-dash-actions">
              <div className="sim-dash-btn">+ New check</div>
            </div>
          </div>
          <div className="sim-dash-stats">
            {[{label:"Verified this month",val:"14"},{label:"Pending",val:"3"},{label:"Average time",val:product.time},{label:"Pass rate",val:"96%"}].map(s=>(
              <div key={s.label} className="sim-dash-stat"><p className="sim-dash-stat-val">{s.val}</p><p className="sim-dash-stat-label">{s.label}</p></div>
            ))}
          </div>
          <div className="sim-dash-table">
            <div className="sim-dash-thead"><span>Name</span><span>Status</span><span>Date</span><span>Result</span></div>
            {[
              {name:"Sarah Chen",   status:"Verified",  date:"12 May 2026", result:"Pass"},
              {name:"James Wu",     status:"Pending",   date:"27 May 2026", result:"—"},
              {name:"Mark O'Brien", status:"Verified",  date:"10 May 2026", result:"Pass"},
            ].map((r,i)=>(
              <div key={i} className="sim-dash-row">
                <span>{r.name}</span>
                <span className={`sim-dash-status ${r.status==="Verified"?"sim-dash-status--verified":r.status==="Pending"?"sim-dash-status--pending":""}`}>{r.status}</span>
                <span>{r.date}</span>
                <span className={r.result==="Pass"?"sim-cert-pass":""}>{r.result}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductSimulation({ product }) {
  const [activeStep, setActiveStep] = useState(0);
  const screens = SIMULATION_SCREENS[product.num === "01" ? "identity-verification" : product.num === "05" ? "working-with-children-check" : null];

  if (!screens) return <GenericSimulation product={product} />;

  return (
    <div className="sim-layout">
      {/* Step selector */}
      <div className="sim-steps-nav">
        {screens.map((s, i) => (
          <button key={i} className={`sim-step-btn ${activeStep === i ? "sim-step-btn--active" : ""}`} onClick={() => setActiveStep(i)}>
            <div className="sim-step-btn-num">{i + 1}</div>
            <div>
              <p className="sim-step-btn-label">{s.label}</p>
              <p className="sim-step-btn-desc">{s.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Screen preview */}
      <div className="sim-preview">
        <div className="sim-preview-inner">
          {screens[activeStep].screen}
        </div>
        <div className="sim-preview-nav">
          <button className="sim-nav-btn" onClick={() => setActiveStep(i => Math.max(0, i-1))} disabled={activeStep === 0}>← Previous</button>
          <span className="sim-nav-counter">{activeStep + 1} / {screens.length}</span>
          <button className="sim-nav-btn" onClick={() => setActiveStep(i => Math.min(screens.length-1, i+1))} disabled={activeStep === screens.length-1}>Next →</button>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product   = PRODUCTS[slug];

  if (!product) {
    return (
      <div className="pdp-not-found">
        <h2>Product not found</h2>
        <Link to="/">← Back to home</Link>
      </div>
    );
  }

  const st = STATUS_STYLES[product.status];

  return (
    <div className="pdp-page">
      {/* ── Hero banner ── */}
      <div className="pdp-hero">
        <div className="pdp-hero-inner">
          <Link to="/#products" className="pdp-back">← All products</Link>
          <div className="pdp-hero-meta">
            <span className="pdp-num">{product.num}</span>
            <span className="pdp-status-pill" style={{ background: st.bg, color: st.color }}>
              <span className="pdp-status-dot" style={{ background: st.dot }} />
              {product.statusLabel}
            </span>
          </div>
          <h1 className="pdp-title">{product.name}</h1>
          <p className="pdp-tagline">{product.tagline}</p>
          <p className="pdp-desc">{product.desc}</p>

          <div className="pdp-hero-stats">
            <div className="pdp-stat">
              <span className="pdp-stat-num">{product.time}</span>
              <span className="pdp-stat-label">Average completion time</span>
            </div>
            <div className="pdp-stat">
              <span className="pdp-stat-num">0</span>
              <span className="pdp-stat-label">Data stored after check</span>
            </div>
            <div className="pdp-stat">
              <span className="pdp-stat-num">{product.steps.length}</span>
              <span className="pdp-stat-label">Verification steps</span>
            </div>
          </div>

          <div className="pdp-hero-actions">
            <Link to="/contact?inquiry=demo" className="btn-pdp-primary">
              Book a demo →
            </Link>
            <a href="#pdp-simulation" className="btn-pdp-ghost">
              See how it works ↓
            </a>
          </div>
        </div>
      </div>

      {/* ── Verification process ── */}
      <div className="pdp-section">
        <div className="pdp-section-inner">
          <span className="section-eyebrow">How it works</span>
          <h2 className="pdp-section-title">
            The verification<br /><em>process</em>
          </h2>
          <p className="pdp-section-sub">
            Every check follows a rigorous, multi-layer process aligned to zero trust principles.
            Each step is logged to an immutable audit trail.
          </p>

          <div className="pdp-steps">
            {product.steps.map((s, i) => (
              <div key={s.n} className="pdp-step fade-up">
                <div className="pdp-step-left">
                  <div className="pdp-step-icon">{s.icon}</div>
                  {i < product.steps.length - 1 && <div className="pdp-step-line" />}
                </div>
                <div className="pdp-step-body">
                  <div className="pdp-step-header">
                    <span className="pdp-step-num">{s.n}</span>
                    <h4 className="pdp-step-title">{s.title}</h4>
                  </div>
                  <p className="pdp-step-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Product simulation ── */}
      <div className="pdp-simulation" id="pdp-simulation">
        <div className="pdp-section-inner">
          <span className="section-eyebrow">Product preview</span>
          <h2 className="pdp-section-title">
            What the experience<br /><em>looks like</em>
          </h2>
          <p className="pdp-section-sub">
            This is a preview of how {product.name.toLowerCase()} works inside VerifyChain.
            Each screen below represents a step in the actual product.
          </p>
          <ProductSimulation product={product} />
        </div>
      </div>

      {/* ── Compliance strip ── */}
      <div className="pdp-compliance">
        <div className="pdp-section-inner">
          <p className="pdp-compliance-label">Standards & compliance alignment</p>
          <div className="pdp-compliance-tags">
            {product.compliance.map(c => (
              <span key={c} className="pdp-compliance-tag">{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="pdp-cta">
        <div className="pdp-section-inner pdp-cta-inner">
          <div>
            <h3 className="pdp-cta-title">Want to see this in action?</h3>
            <p className="pdp-cta-sub">Book a personalised demo with our team. We'll walk you through the full verification flow for your industry.</p>
          </div>
          <div className="pdp-cta-actions">
            <Link to="/contact?inquiry=demo" className="btn-pdp-primary">
              Book a demo →
            </Link>
            <Link to="/contact" className="btn-pdp-ghost">
              Talk to our team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}