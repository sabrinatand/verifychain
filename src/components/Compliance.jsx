import "./Compliance.css";

const standards = [
  { label: "Digital ID Act 2024", achieved: true },
  { label: "Privacy Act 1988", achieved: true },
  { label: "GDPR (near-full)", achieved: true },
  { label: "W3C Verifiable Credentials", achieved: true },
  { label: "ISO 29100", achieved: true },
  { label: "eIDAS 2.0", achieved: false },
  { label: "ISO 27001", achieved: false },
];

export default function Compliance() {
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
