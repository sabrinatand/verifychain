import { useState } from "react";
import { Link } from "react-router-dom";
import "./UseCasesPage.css";

// ── Check icon lookup — replaces emoji with consistent line-style SVGs ──
const CHECK_ICONS = {
  id: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M7 16h4M14 9h4M14 13h4"/>
    </svg>
  ),
  age: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  ),
  qualification: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
    </svg>
  ),
};

const INDUSTRIES = [
  {
    id: "hr",
    label: "HR and Recruitment",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    headline: "Hire with confidence. Stay compliant.",
    intro: "Every hire carries risk. VerifyChain gives HR and recruitment teams a faster, more reliable way to complete the compliance checks that protect their organisation and the people they serve.",
    checks: ["Identity verification", "National crime check", "Qualification verification", "Age verification"],
    scenarios: [
      { title: "Pre-employment screening", desc: "Run identity, criminal history, and qualification checks in one flow before a contract is signed — results in minutes, not days." },
      { title: "Ongoing workforce compliance", desc: "Automate re-verification for expiring credentials, so nothing relies on staff remembering to renew." },
      { title: "Contractor and volunteer onboarding", desc: "Bring the same compliance rigour to contractors and volunteers that you apply to permanent staff — with no extra administrative overhead." },
    ],
    quote: "We cut our pre-employment screening time from days to minutes. That's changed how fast we can make an offer.",
    quoteRole: "People and Culture Manager, Community Services Organisation",
  },
  {
    id: "education",
    label: "Education",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    headline: "Verify who is in your classroom.",
    intro: "From student admissions to staff compliance, education providers need to know the people on their campus are who they say they are.",
    checks: ["Identity verification", "Qualification verification", "National crime check"],
    scenarios: [
      { title: "Staff and contractor screening", desc: "Verify identity and background checks for staff, contractors, and visitors who interact with students." },
      { title: "Credential verification for admissions", desc: "Confirm prior qualifications and certifications from applicants against the USI registry or issuing institution." },
      { title: "International student identity verification", desc: "Verify government-issued photo ID across a wide range of countries — supporting both domestic and international enrolment processes." },
    ],
    quote: "We verify every person who walks through our door. VerifyChain makes that operationally possible.",
    quoteRole: "Compliance Lead, Vocational Training Provider",
  },
  {
    id: "financial",
    label: "Financial Services",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <path d="M2 10h20"/>
      </svg>
    ),
    headline: "KYC compliance, built in.",
    intro: "Banks, fintechs, and financial institutions face the strictest identity verification obligations of any industry. VerifyChain was built with financial services compliance in mind from day one.",
    checks: ["Identity verification", "Age verification", "National crime check"],
    scenarios: [
      { title: "Know Your Customer (KYC)", desc: "Verify customer identity against government sources in real time — satisfying KYC obligations without requiring customers to attend in person." },
      { title: "Anti-Money Laundering (AML) readiness", desc: "VerifyChain is preparing for expanded AML compliance ahead of Australia's legislation changes taking effect July 2026." },
      { title: "Streamlined onboarding", desc: "Reduce account opening friction with a verification flow customers complete entirely from their phone or browser." },
    ],
    quote: "We cut our KYC turnaround from three days to under five minutes. That changes the product we can offer.",
    quoteRole: "Head of Compliance, Australian Fintech",
  },
  {
    id: "government",
    label: "Government",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M16 10v11M12 10v11"/>
      </svg>
    ),
    headline: "Secure digital identity for citizen services.",
    intro: "Government agencies require verification that meets the highest standards of security, privacy, and accessibility. VerifyChain is designed and audited to meet Australian government compliance frameworks.",
    checks: ["Identity verification", "National crime check", "Age verification"],
    scenarios: [
      { title: "Citizen identity verification", desc: "Verify identity for access to government services — without centralised storage of personal data. Privacy-by-design meets the Privacy Act 1988." },
      { title: "Licence and permit applications", desc: "Automate identity and background checks as part of licence application workflows — reducing manual processing time and document fraud." },
      { title: "Interoperable credentials", desc: "Issue and verify credentials using W3C Verifiable Credentials standards, recognised across departments and jurisdictions." },
    ],
    quote: "Meeting ISM and IRAP requirements while keeping the citizen experience simple — that's what we needed.",
    quoteRole: "Digital Transformation Lead, State Government Department",
  },
];

// FIX: replaced emoji icons with the CHECK_ICONS lookup defined above
const ALL_CHECKS = [
  { slug: "identity-verification",       label: "Identity verification",       icon: CHECK_ICONS.id },
  { slug: "age-verification",            label: "Age verification",            icon: CHECK_ICONS.age },
  { slug: "qualification-verification",  label: "Qualification verification",  icon: CHECK_ICONS.qualification },
  { slug: "national-crime-check",        label: "National crime check",        icon: CHECK_ICONS.shield },
  // Hidden per Hormuz's feedback — re-add when confirmed:
  // { slug: "working-with-children-check", label: "Working with Children Check", icon: CHECK_ICONS.child },
  // { slug: "eseal-document-verification", label: "eSeal document verification", icon: CHECK_ICONS.document },
];

export default function UseCasesPage() {
  const [active, setActive] = useState("hr");
  const current = INDUSTRIES.find(i => i.id === active);

  return (
    <div className="uc-page">

      {/* Hero */}
      <section className="uc-hero">
        <div className="uc-hero-inner">
          <span className="uc-eyebrow">Who uses VerifyChain</span>
          <h1 className="uc-h1">The right check<br /><em>for every industry.</em></h1>
          <p className="uc-hero-sub">
            VerifyChain serves organisations across HR, financial services, education, and government —
            each with different checks, different obligations, and different definitions of compliance.
            All on one platform.
          </p>
        </div>
      </section>

      {/* Industry tabs */}
      <section className="uc-industries">
        <div className="uc-industries-inner">
          <div className="uc-tabs">
            {INDUSTRIES.map(ind => (
              <button
                key={ind.id}
                className={`uc-tab ${active === ind.id ? "uc-tab--active" : ""}`}
                onClick={() => setActive(ind.id)}
              >
                <span className="uc-tab-icon">{ind.icon}</span>
                {ind.label}
              </button>
            ))}
          </div>

          <div className="uc-content">
            <div className="uc-content-left">
              <h2 className="uc-content-h2">{current.headline}</h2>
              <p className="uc-content-intro">{current.intro}</p>

              <div className="uc-checks-used">
                <p className="uc-checks-label">Checks commonly used</p>
                <div className="uc-checks-pills">
                  {current.checks.map(c => {
                    const match = ALL_CHECKS.find(a => a.label === c);
                    return (
                      <Link
                        key={c}
                        to={`/products/${match?.slug || ""}`}
                        className="uc-check-pill"
                      >
                        <span className="uc-check-pill-icon">{match?.icon}</span>
                        {c}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="uc-scenarios">
                {current.scenarios.map((s, i) => (
                  <div key={i} className="uc-scenario">
                    <div className="uc-scenario-num">{i + 1}</div>
                    <div>
                      <h4 className="uc-scenario-title">{s.title}</h4>
                      <p className="uc-scenario-desc">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="uc-content-right">
              <div className="uc-quote-card">
                <div className="uc-quote-mark">"</div>
                <p className="uc-quote-text">{current.quote}</p>
                <p className="uc-quote-role">{current.quoteRole}</p>
              </div>
              <div className="uc-cta-card">
                <h4>Ready to see how this works?</h4>
                <p>Book a personalised walkthrough and we'll show you the full verification flow.</p>
                <Link to="/contact?inquiry=demo" className="uc-cta-btn">Book a Personalised Walkthrough →</Link>
                <Link to="/contact" className="uc-cta-link">Or talk to our team</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All products overview */}
      <section className="uc-products-section">
        <div className="uc-products-inner">
          <p className="uc-section-label">The full platform</p>
          <h2 className="uc-section-h2">Every check, one platform</h2>
          <p className="uc-section-sub">Mix and match the checks your organisation needs. Each product can be used independently or as part of a combined onboarding workflow.</p>
          <div className="uc-products-grid">
            {ALL_CHECKS.map(c => (
              <Link key={c.slug} to={`/products/${c.slug}`} className="uc-product-card">
                <span className="uc-product-icon">{c.icon}</span>
                <span className="uc-product-label">{c.label}</span>
                <span className="uc-product-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="uc-bottom-cta">
        <div className="uc-bottom-cta-inner">
          <h2>Not sure which checks your organisation needs?</h2>
          <p>Our team can walk you through the right combination for your industry and compliance obligations.</p>
          <div className="uc-bottom-cta-btns">
            <Link to="/contact?inquiry=demo" className="uc-cta-btn">Book a Personalised Walkthrough →</Link>
            <Link to="/contact" className="uc-cta-btn uc-cta-btn--ghost">Talk to us →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}