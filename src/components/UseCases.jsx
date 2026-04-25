import "./UseCases.css";

const cases = [
  {
    tag: "HR & recruitment",
    title: "Hire faster, hire safer",
    desc: "Run identity, crime, and qualification checks simultaneously. Candidates self-verify — your team just reviews the result. No paper chasing.",
  },
  {
    tag: "Security standards",
    title: "Security standards compliance",
    desc: "VerifyChain is developed in consultation with frameworks such as NIST, ISO 27001, architecture frameworks including TOGAF and SABSA — built to what the industry expects.",
  },
  {
    tag: "Financial services",
    title: "Know Your Customer (KYC)",
    desc: "Support KYC obligations for banks and financial institutions. Verify customer identity end-to-end, with full audit trail and AML-ready processes — as a separate, dedicated workflow.",
  },
  {
    tag: "Education & childcare",
    title: "Safe staffing, every time",
    desc: "Verify teacher qualifications, Working with Children checks, and academic credentials for every staff member — anywhere in Australia.",
  },
  {
    tag: "Government",
    title: "Government compliance",
    desc: "Meet compliance standards expected by government — including ISM, IRAP, and other frameworks that apply to businesses operating in or with the public sector.",
  },
];

export default function UseCases() {
  return (
    <section className="uc-section">
      <div className="section-inner">
        <span className="section-eyebrow">Use cases</span>
        <h2 className="section-h2">
          What makes us<br /><em>different</em>
        </h2>
        <p className="section-body">
          Fast, secure, and built to industry standards — here's what sets VerifyChain apart.
        </p>

        <div className="uc-grid">
          {cases.map((c) => (
            <div key={c.tag} className="uc-card fade-up">
              <span className="uc-tag">{c.tag}</span>
              <h3 className="uc-title">{c.title}</h3>
              <p className="uc-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
