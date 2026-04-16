import "./TrustBar.css";

const sectors = [
  "Government agencies",
  "Financial institutions",
  "Education providers",
  "HR & compliance",
  "Healthcare",
];

export default function TrustBar() {
  return (
    <div className="trust-bar">
      <div className="trust-inner">
        <span className="trust-label">Serving</span>
        <div className="trust-chips">
          {sectors.map((s) => (
            <span key={s} className="trust-chip">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
