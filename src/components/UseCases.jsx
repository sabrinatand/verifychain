import "./UseCases.css";

const cases = [
  {
    tag: "HR & recruitment",
    title: "Hire faster, hire safer",
    desc: "Run identity, crime, and qualification checks simultaneously. Candidates self-verify — your team just reviews the result. No paper chasing.",
  },
  {
    tag: "Age-restricted industries",
    title: "Age compliance at point of sale",
    desc: "Alcohol, gambling, adult content — confirm age compliance instantly online or in person, with zero personal data retained post-check.",
  },
  {
    tag: "Financial services",
    title: "KYC and AML-ready",
    desc: "Meet Know Your Customer obligations under Australia's new AML legislation. PEP screening and adverse media checks coming mid-2026.",
  },
  {
    tag: "Education & childcare",
    title: "Safe staffing, every time",
    desc: "Verify teacher qualifications, Working with Children checks, and academic credentials for every staff member — anywhere in Australia.",
  },
];

export default function UseCases() {
  return (
    <section className="uc-section">
      <div className="section-inner">
        <span className="section-eyebrow">Use cases</span>
        <h2 className="section-h2">
          Why organisations<br /><em>choose us</em>
        </h2>
        <p className="section-body">
          Whether you're onboarding staff, verifying age at scale, or checking
          credentials across borders — one platform handles it all.
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
