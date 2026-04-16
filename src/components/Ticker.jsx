import "./Ticker.css";

const items = [
  "Identity verification",
  "Age verification",
  "National crime check",
  "Qualification verification",
  "eSeal document verification",
  "Working with children check",
  "Zero-knowledge privacy",
  "Blockchain-secured credentials",
  "GDPR compliant",
  "Digital ID Act 2024",
];

export default function Ticker() {
  const doubled = [...items, ...items];
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-sep">—</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
