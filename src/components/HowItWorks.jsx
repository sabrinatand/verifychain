import "./HowItWorks.css";

const steps = [
  { n: "1", title: "User uploads credential", desc: "Passport, licence, or certificate — submitted via the secure wallet app or web portal.", active: true },
  { n: "2", title: "AI + database cross-check", desc: "OCR extracts data. Real-time APIs verify authenticity against authoritative government sources.", active: true },
  { n: "3", title: "Recorded on blockchain", desc: "A cryptographic hash is stored on Hyperledger Fabric. Raw personal data never leaves the user.", active: true },
  { n: "4", title: "Shared on user's terms", desc: "Users choose exactly who sees what. Organisations receive a verified proof — no raw data exposed.", active: false },
];

export default function HowItWorks() {
  return (
    <section className="hiw-section">
      <div className="hiw-inner">
        <span className="section-eyebrow">How it works</span>
        <h2 className="section-h2">
          Four steps.<br /><em>Minutes, not weeks.</em>
        </h2>

        <div className="hiw-steps">
          <div className="hiw-line" />
          {steps.map((s) => (
            <div key={s.n} className="hiw-step fade-up">
              <div className={`hiw-circle ${s.active ? "hiw-circle--active" : ""}`}>
                {s.n}
              </div>
              <h4 className="hiw-title">{s.title}</h4>
              <p className="hiw-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
