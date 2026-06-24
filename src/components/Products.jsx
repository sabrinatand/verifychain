import "./Products.css";
import { useNavigate } from "react-router-dom";

const products = [
  {
    num: "01", slug: "identity-verification",
    name: "Identity verification",
    desc: "Validate passports, driver's licences, and national IDs against government databases in real time.",
    status: "live", statusLabel: "Production ready",
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
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  // Hidden per Hormuz's feedback — re-add when confirmed:
  // {
  //   num: "05", slug: "working-with-children-check",
  //   name: "Working with children check",
  //   desc: "Real-time clearance validation with automatic revocation alerts across multiple Australian jurisdictions.",
  //   status: "dev", statusLabel: "In development",
  //   icon: (
  //     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
  //       <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
  //       <circle cx="9" cy="7" r="4"/>
  //       <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
  //     </svg>
  //   ),
  // },
  // {
  //   num: "06", slug: "eseal-document-verification",
  //   name: "eSeal document verification",
  //   desc: "Tamper-proof digital notarisation. Cryptographic seals compliant with ESIGN and eIDAS regulations.",
  //   status: "dev", statusLabel: "In development",
  //   icon: (
  //     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
  //       <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
  //       <polyline points="14 2 14 8 20 8"/>
  //       <path d="M9 15l2 2 4-4"/>
  //     </svg>
  //   ),
  // },
];

export default function Products() {
  const navigate = useNavigate();

  return (
    <section className="products-section">
      <div className="products-inner">
        <span className="section-eyebrow products-eyebrow">Products</span>
        <h2 className="section-h2 products-h2">
          More than just<br /><em>identity</em>
        </h2>
        <p className="section-body products-body">
          All the necessary industry-driven verification products on a single platform — mix and match
          what your organisation needs.
        </p>

        <div className="products-grid">
          {products.map((p) => (
            <div key={p.num} className={`prod-cell fade-up ${p.status === "live" ? "prod-cell--live" : ""}`}>
              <span className="prod-num">{p.num}</span>
              <div className="prod-icon">{p.icon}</div>
              <h3 className="prod-name">{p.name}</h3>
              <p className="prod-desc">{p.desc}</p>
              <button
                className="prod-learn-more"
                onClick={() => navigate(`/products/${p.slug}`)}
              >
                Learn more →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}