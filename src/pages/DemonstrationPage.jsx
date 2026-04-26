import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import "./DemonstrationPage.css";

const VERIFICATION_TYPES = [
  {
    id: "identity",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2"/>
        <path d="M7 8h10M7 12h6M7 16h4"/>
      </svg>
    ),
    title: "Identity Verification",
    desc: "Verify your identity using a government-issued photo ID",
    duration: 5000,
    processingSteps: [
      "Uploading document securely...",
      "Extracting document data...",
      "Cross-checking government database...",
      "Applying zero-trust validation...",
      "Finalising verification...",
    ],
  },
  {
    id: "wwc",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Working with Children Check",
    desc: "Validate your Victorian WWC clearance in real time",
    duration: 6000,
    processingSteps: [
      "Connecting to Victorian registry...",
      "Validating WWC card number...",
      "Checking clearance status...",
      "Verifying expiry and conditions...",
      "Finalising verification...",
    ],
  },
];

function generateVerificationId() {
  return "VC-" + Math.random().toString(36).substring(2, 8).toUpperCase() + "-" + Date.now().toString().slice(-4);
}

const isValidDate = (val) => {
  const parts = val.split("/");
  if (parts.length !== 3) return false;
  const [d, m, y] = parts.map(Number);
  if (!d || !m || !y || y < 1900 || y > new Date().getFullYear()) return false;
  const date = new Date(y, m - 1, d);
  return date.getDate() === d && date.getMonth() === m - 1;
};

// ── FIELD ERROR component ────────────────────────────────────────
function FieldError({ message }) {
  if (!message) return null;
  return (
    <div className="demo-field-error">
      <svg viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="5" stroke="#dc2626" strokeWidth="1.2"/>
        <path d="M6 4v2.5M6 8h.01" stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
      {message}
    </div>
  );
}

// ── STEP 1: Choose type ──────────────────────────────────────────
function StepChoose({ onChoose }) {
  return (
    <div className="demo-choose">
      <div className="demo-hero-text">
        <span className="demo-eyebrow">Live demonstration</span>
        <h1 className="demo-h1">
          See VerifyChain<br /><em>in action</em>
        </h1>
        <p className="demo-sub">
          Choose a verification type below and experience how quickly
          and securely VerifyChain processes real-world checks.
        </p>
      </div>

      <div className="demo-type-grid">
        {VERIFICATION_TYPES.map((type) => (
          <button
            key={type.id}
            className="demo-type-card"
            onClick={() => onChoose(type)}
          >
            <div className="demo-type-icon">{type.icon}</div>
            <h2 className="demo-type-title">{type.title}</h2>
            <p className="demo-type-desc">{type.desc}</p>
            <span className="demo-type-cta">Start demonstration →</span>
          </button>
        ))}
      </div>

      <p className="demo-disclaimer">
        This is a demonstration using dummy data. No real personal information is stored or transmitted.
      </p>
    </div>
  );
}

// ── STEP 2A: Identity form ───────────────────────────────────────
function StepIdentityForm({ onSubmit, onBack }) {
  const [photo, setPhoto] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", dob: "", docType: "passport", docNumber: "",
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef();

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setPhoto(e.target.result);
    reader.readAsDataURL(file);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleDobChange = (e) => {
    let val = e.target.value.replace(/[^\d/]/g, "");
    if (val.length === 2 && form.dob.length === 1) val += "/";
    if (val.length === 5 && form.dob.length === 4) val += "/";
    const parts = val.split("/");
    if (parts[2] && parts[2].length > 4) return;
    if (val.length > 10) return;
    setForm({ ...form, dob: val });
  };

  const onBlur = (field) => setTouched((t) => ({ ...t, [field]: true }));

  const nameKeyDown = (e) => {
    if (
      !/[a-zA-Z\s\-']/.test(e.key) &&
      !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
    ) e.preventDefault();
  };

  const docKeyDown = (e) => {
    if (
      !/[a-zA-Z0-9]/.test(e.key) &&
      !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
    ) e.preventDefault();
  };

  const errors = {
    photo: !photo ? "Please upload or take a photo of your ID document" : null,
    firstName: !form.firstName ? "First name is required" : null,
    lastName: !form.lastName ? "Last name is required" : null,
    dob: !form.dob
      ? "Date of birth is required"
      : !isValidDate(form.dob)
      ? "Enter a valid date in DD/MM/YYYY format"
      : null,
    docNumber: !form.docNumber ? "Document number is required" : null,
  };

  const hasErrors = Object.values(errors).some(Boolean);

  const handleSubmit = () => {
    setSubmitted(true);
    setTouched({ firstName: true, lastName: true, dob: true, docNumber: true });
    if (!hasErrors) {
      onSubmit({ ...form, photo, type: "identity" });
    }
  };

  const showError = (field) => (touched[field] || submitted) && errors[field];

  return (
    <div className="demo-form-wrap">
      <button className="demo-back" onClick={onBack}>← Back</button>
      <h2 className="demo-form-title">Identity Verification</h2>
      <p className="demo-form-sub">Enter your details and upload a photo of your ID document.</p>

      {/* Photo upload */}
      <div
        className={`demo-dropzone ${dragging ? "demo-dropzone--active" : ""} ${photo ? "demo-dropzone--filled" : ""} ${(submitted || touched.photo) && errors.photo ? "demo-dropzone--error" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => !photo && fileRef.current.click()}
      >
        {photo ? (
          <div className="demo-photo-preview">
            <img src={photo} alt="ID preview" />
            <div className="demo-photo-overlay">
              <div className="demo-scan-line" />
              <div className="demo-scan-corners">
                <span className="demo-corner demo-corner--tl" />
                <span className="demo-corner demo-corner--tr" />
                <span className="demo-corner demo-corner--bl" />
                <span className="demo-corner demo-corner--br" />
              </div>
            </div>
            <button
              className="demo-photo-remove"
              onClick={(e) => { e.stopPropagation(); setPhoto(null); }}
            >
              ✕ Remove
            </button>
          </div>
        ) : (
          <div className="demo-dropzone-inner">
            <div className="demo-dropzone-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <p className="demo-dropzone-label">Drag & drop your ID photo here</p>
            <p className="demo-dropzone-hint">click to browse or take a photo — passport, licence, or national ID</p>
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: "none" }}
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>
      {(submitted || touched.photo) && errors.photo && (
        <FieldError message={errors.photo} />
      )}

      {/* Form fields */}
      <div className="demo-fields">
        <div className="demo-field-row">
          <div className="demo-field">
            <label>First name</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={onChange}
              onBlur={() => onBlur("firstName")}
              placeholder="Jane"
              maxLength={50}
              onKeyDown={nameKeyDown}
              className={showError("firstName") ? "demo-input--error" : ""}
            />
            <FieldError message={showError("firstName")} />
          </div>
          <div className="demo-field">
            <label>Last name</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={onChange}
              onBlur={() => onBlur("lastName")}
              placeholder="Smith"
              maxLength={50}
              onKeyDown={nameKeyDown}
              className={showError("lastName") ? "demo-input--error" : ""}
            />
            <FieldError message={showError("lastName")} />
          </div>
        </div>
        <div className="demo-field-row">
          <div className="demo-field">
            <label>Date of birth</label>
            <input
              name="dob"
              type="text"
              value={form.dob}
              onChange={handleDobChange}
              onBlur={() => onBlur("dob")}
              placeholder="DD/MM/YYYY"
              maxLength={10}
              className={showError("dob") ? "demo-input--error" : ""}
            />
            <FieldError message={showError("dob")} />
          </div>
          <div className="demo-field">
            <label>Document type</label>
            <select name="docType" value={form.docType} onChange={onChange}>
              <option value="passport">Passport</option>
              <option value="licence">Driver's Licence</option>
              <option value="national">National ID</option>
            </select>
          </div>
        </div>
        <div className="demo-field">
          <label>Document number</label>
          <input
            name="docNumber"
            value={form.docNumber}
            onChange={onChange}
            onBlur={() => onBlur("docNumber")}
            placeholder="e.g. PA1234567"
            maxLength={20}
            onKeyDown={docKeyDown}
            className={showError("docNumber") ? "demo-input--error" : ""}
          />
          <FieldError message={showError("docNumber")} />
        </div>
      </div>

      <button className="demo-submit" onClick={handleSubmit}>
        Run verification →
      </button>
    </div>
  );
}

// ── STEP 2B: WWC form ────────────────────────────────────────────
function StepWWCForm({ onSubmit, onBack }) {
  const [form, setForm] = useState({
    firstName: "", lastName: "", dob: "", wwcNumber: "", employer: "",
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleDobChange = (e) => {
    let val = e.target.value.replace(/[^\d/]/g, "");
    if (val.length === 2 && form.dob.length === 1) val += "/";
    if (val.length === 5 && form.dob.length === 4) val += "/";
    const parts = val.split("/");
    if (parts[2] && parts[2].length > 4) return;
    if (val.length > 10) return;
    setForm({ ...form, dob: val });
  };

  const onBlur = (field) => setTouched((t) => ({ ...t, [field]: true }));

  const nameKeyDown = (e) => {
    if (
      !/[a-zA-Z\s\-']/.test(e.key) &&
      !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
    ) e.preventDefault();
  };

  const wwcKeyDown = (e) => {
    if (
      !/[a-zA-Z0-9]/.test(e.key) &&
      !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
    ) e.preventDefault();
  };

  const errors = {
    firstName: !form.firstName ? "First name is required" : null,
    lastName: !form.lastName ? "Last name is required" : null,
    dob: !form.dob
      ? "Date of birth is required"
      : !isValidDate(form.dob)
      ? "Enter a valid date in DD/MM/YYYY format"
      : null,
    wwcNumber: !form.wwcNumber ? "WWC card number is required" : null,
  };

  const hasErrors = Object.values(errors).some(Boolean);

  const handleSubmit = () => {
    setSubmitted(true);
    setTouched({ firstName: true, lastName: true, dob: true, wwcNumber: true });
    if (!hasErrors) {
      onSubmit({ ...form, type: "wwc" });
    }
  };

  const showError = (field) => (touched[field] || submitted) && errors[field];

  return (
    <div className="demo-form-wrap">
      <button className="demo-back" onClick={onBack}>← Back</button>

      <div className="demo-wwc-header">
        <img src="/wwc-logo.png" alt="Working with Children Check Victoria" className="demo-wwc-logo" />
        <p className="demo-wwc-hero-desc">
            Enter your WWC card details below. Your clearance will be validated against the Victorian registry in real time.
        </p>
        </div>

      <div className="demo-fields">
        <div className="demo-field-row">
          <div className="demo-field">
            <label>First name</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={onChange}
              onBlur={() => onBlur("firstName")}
              placeholder="Jane"
              maxLength={50}
              onKeyDown={nameKeyDown}
              className={showError("firstName") ? "demo-input--error" : ""}
            />
            <FieldError message={showError("firstName")} />
          </div>
          <div className="demo-field">
            <label>Last name</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={onChange}
              onBlur={() => onBlur("lastName")}
              placeholder="Smith"
              maxLength={50}
              onKeyDown={nameKeyDown}
              className={showError("lastName") ? "demo-input--error" : ""}
            />
            <FieldError message={showError("lastName")} />
          </div>
        </div>
        <div className="demo-field">
          <label>Date of birth</label>
          <input
            name="dob"
            type="text"
            value={form.dob}
            onChange={handleDobChange}
            onBlur={() => onBlur("dob")}
            placeholder="DD/MM/YYYY"
            maxLength={10}
            className={showError("dob") ? "demo-input--error" : ""}
          />
          <FieldError message={showError("dob")} />
        </div>
        <div className="demo-field">
          <label>WWC Card number</label>
          <input
            name="wwcNumber"
            value={form.wwcNumber}
            onChange={onChange}
            onBlur={() => onBlur("wwcNumber")}
            placeholder="e.g. WWC1234567A"
            maxLength={15}
            onKeyDown={wwcKeyDown}
            className={showError("wwcNumber") ? "demo-input--error" : ""}
          />
          <FieldError message={showError("wwcNumber")} />
        </div>
        <div className="demo-field">
          <label>
            Employer / Organisation{" "}
            <span className="demo-optional">(optional)</span>
          </label>
          <input
            name="employer"
            value={form.employer}
            onChange={onChange}
            placeholder="e.g. Sunshine Primary School"
            maxLength={100}
          />
        </div>
      </div>

      <button className="demo-submit" onClick={handleSubmit}>
        Run verification →
      </button>
    </div>
  );
}

// ── STEP 3: Processing ───────────────────────────────────────────
function StepProcessing({ verificationType, formData, onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);
  const steps = verificationType.processingSteps;

  useState(() => {
    const interval = setInterval(() => {
      setStepIndex((i) => {
        if (i >= steps.length - 1) {
          clearInterval(interval);
          return i;
        }
        return i + 1;
      });
    }, (verificationType.duration - 800) / steps.length);

    const timeout = setTimeout(() => {
      onComplete(generateVerificationId());
    }, verificationType.duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="demo-processing">
      <div className="demo-processing-ring">
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(30,58,138,0.08)" strokeWidth="6"/>
          <circle
            cx="50" cy="50" r="44"
            fill="none" stroke="#1e3a8a" strokeWidth="6"
            strokeLinecap="round" strokeDasharray="276" strokeDashoffset="69"
            className="demo-ring-spin"
          />
        </svg>
        <div className="demo-processing-icon">
          {formData.photo ? (
            <img src={formData.photo} alt="" className="demo-processing-photo" />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="1.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          )}
        </div>
      </div>

      <h2 className="demo-processing-title">Verifying...</h2>
      <p className="demo-processing-sub">Please wait while we process your verification</p>

      <div className="demo-processing-steps">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`demo-processing-step ${i <= stepIndex ? "demo-processing-step--done" : ""} ${i === stepIndex ? "demo-processing-step--active" : ""}`}
          >
            <div className="demo-step-dot">
              {i < stepIndex ? (
                <svg viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ) : i === stepIndex ? (
                <div className="demo-step-spinner" />
              ) : null}
            </div>
            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── STEP 4: Result ───────────────────────────────────────────────
function StepResult({ verificationType, formData, verificationId, onReset }) {
  const timestamp = new Date().toLocaleString("en-AU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  const fullName = `${formData.firstName} ${formData.lastName}`;
  const handlePrint = () => window.print();

  return (
    <div className="demo-result">
      <div className="demo-result-badge">
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" fill="#1e3a8a"/>
          <path d="M7 12l3.5 3.5L17 8" stroke="#8bc34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Verification complete</span>
      </div>

      <div className="demo-certificate" id="demo-certificate">
        <div className="demo-cert-header">
          <img src="/verifychain-logo.png" alt="VerifyChain" className="demo-cert-logo" />
          <div className="demo-cert-header-right">
            <span className="demo-cert-verified">✓ VERIFIED</span>
            <span className="demo-cert-type">{verificationType.title}</span>
          </div>
        </div>

        <div className="demo-cert-body">
          {formData.photo && (
            <div className="demo-cert-photo-wrap">
              <img src={formData.photo} alt={fullName} className="demo-cert-photo" />
              <div className="demo-cert-photo-badge">
                <svg viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l2.5 2.5 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          )}

          <div className="demo-cert-details">
            <div className="demo-cert-name">{fullName}</div>

            {formData.type === "identity" && (
              <>
                <div className="demo-cert-row">
                  <span>Date of birth</span>
                  <span>{formData.dob}</span>
                </div>
                <div className="demo-cert-row">
                  <span>Document type</span>
                  <span style={{ textTransform: "capitalize" }}>{formData.docType}</span>
                </div>
                <div className="demo-cert-row">
                  <span>Document number</span>
                  <span>{formData.docNumber}</span>
                </div>
              </>
            )}

            {formData.type === "wwc" && (
              <>
                <div className="demo-cert-row">
                  <span>Date of birth</span>
                  <span>{formData.dob}</span>
                </div>
                <div className="demo-cert-row">
                  <span>WWC card number</span>
                  <span>{formData.wwcNumber}</span>
                </div>
                <div className="demo-cert-row">
                  <span>State</span>
                  <span>Victoria</span>
                </div>
                {formData.employer && (
                  <div className="demo-cert-row">
                    <span>Organisation</span>
                    <span>{formData.employer}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="demo-cert-footer">
          <div className="demo-cert-id">
            <span>Verification ID</span>
            <strong>{verificationId}</strong>
          </div>
          <div className="demo-cert-id">
            <span>Timestamp</span>
            <strong>{timestamp}</strong>
          </div>
          <div className="demo-cert-seal">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                fill="rgba(30,58,138,0.08)"
                stroke="#1e3a8a"
                strokeWidth="1.5"
              />
              <path d="M9 12l2 2 4-4" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Cryptographically secured</span>
          </div>
        </div>

        <div className="demo-cert-watermark">DEMONSTRATION ONLY</div>
      </div>

      <div className="demo-result-actions">
        <button className="demo-download" onClick={handlePrint}>
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M2 11v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          Download certificate
        </button>
        <button className="demo-restart" onClick={onReset}>
          Run another verification →
        </button>
      </div>

      <p className="demo-disclaimer">
        This is a demonstration only. No data has been stored or transmitted.
        In production, results are cryptographically signed and stored on a distributed ledger.
      </p>
    </div>
  );
}

// ── MAIN PAGE ────────────────────────────────────────────────────
export default function DemonstrationPage() {
  const [step, setStep] = useState("choose");
  const [verificationType, setVerificationType] = useState(null);
  const [formData, setFormData] = useState(null);
  const [verificationId, setVerificationId] = useState(null);

  const handleChoose = (type) => {
    setVerificationType(type);
    setStep("form");
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    setStep("processing");
  };

  const handleComplete = (id) => {
    setVerificationId(id);
    setStep("result");
  };

  const handleReset = () => {
    setStep("choose");
    setVerificationType(null);
    setFormData(null);
    setVerificationId(null);
  };

  return (
    <div className="demo-page">
      <div className="demo-bg-orb demo-bg-orb--1" />
      <div className="demo-bg-orb demo-bg-orb--2" />

      {step !== "choose" && (
        <div className="demo-progress">
          {["form", "processing", "result"].map((s, i) => (
            <div
              key={s}
              className={`demo-progress-step ${
                step === s ? "demo-progress-step--active" :
                ["form", "processing", "result"].indexOf(step) > i
                  ? "demo-progress-step--done"
                  : ""
              }`}
            >
              <div className="demo-progress-dot">{i + 1}</div>
              <span>{["Details", "Processing", "Result"][i]}</span>
            </div>
          ))}
        </div>
      )}

      <div className="demo-content">
        {step === "choose" && <StepChoose onChoose={handleChoose} />}

        {step === "form" && verificationType?.id === "identity" && (
          <StepIdentityForm onSubmit={handleFormSubmit} onBack={handleReset} />
        )}

        {step === "form" && verificationType?.id === "wwc" && (
          <StepWWCForm onSubmit={handleFormSubmit} onBack={handleReset} />
        )}

        {step === "processing" && (
          <StepProcessing
            verificationType={verificationType}
            formData={formData}
            onComplete={handleComplete}
          />
        )}

        {step === "result" && (
          <StepResult
            verificationType={verificationType}
            formData={formData}
            verificationId={verificationId}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}