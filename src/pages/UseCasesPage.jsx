import { useState } from "react";
import { Link } from "react-router-dom";
import "./UseCasesPage.css";

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
    checks: ["Identity verification", "National crime check", "Qualification verification", "Working with Children Check", "Age verification"],
    scenarios: [
      { title: "Pre-employment screening", desc: "Run identity, criminal history, and qualification checks in one flow before a contract is signed — results in minutes, not days." },
      { title: "Ongoing workforce compliance", desc: "Automate re-verification for expiring credentials. Get alerted when a Working with Children Check is revoked, before you find out the hard way." },
      { title: "Contractor and volunteer onboarding", desc: "Bring the same compliance rigour to contractors and volunteers that you apply to permanent staff — with no extra administrative overhead." },
    ],
    quote: "The Working with Children Check revocation alert alone is worth it. We used to find out weeks after the fact.",
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
    intro: "From student admissions to staff compliance, education providers need to know the people on their campus are who they say they are — and have the clearances required by law.",
    checks: ["Working with Children Check", "Identity verification", "Qualification verification", "National crime check"],
    scenarios: [
      { title: "Staff and volunteer clearances", desc: "Verify Working with Children Checks for all staff, volunteers, and contractors who interact with students — with real-time revocation monitoring." },
      { title: "Credential verification for admissions", desc: "Confirm prior qualifications and certifications from applicants. Directly integrated with educational institution databases." },
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
    headline: "KYC and AML compliance, built in.",
    intro: "Banks, fintechs, and financial institutions face the strictest identity verification obligations of any industry. VerifyChain was built with financial services compliance in mind from day one.",
    checks: ["Identity verification", "Age verification", "National crime check", "eSeal document verification"],
    scenarios: [
      { title: "Know Your Customer (KYC)", desc: "Verify customer identity against government databases in real time — satisfying KYC obligations without requiring customers to attend in person or submit physical documents." },
      { title: "Anti-Money Laundering (AML) checks", desc: "VerifyChain is preparing PEP (Politically Exposed Persons), sanctions screening, and adverse media checks ahead of Australia's expanded AML legislation taking effect July 2026." },
      { title: "Document notarisation with eSeal", desc: "Issue cryptographically sealed documents for loan agreements, contracts, and compliance records — instantly verifiable by any authorised party." },
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
    checks: ["Identity verification", "National crime check", "Working with Children Check", "eSeal document verification", "Age verification"],
    scenarios: [
      { title: "Citizen identity verification", desc: "Verify identity for access to government services — without centralised storage of personal data. Privacy-by-design meets the Privacy Act 1988 and aligns with the ASD security blueprint." },
      { title: "Licence and permit applications", desc: "Automate identity and background checks as part of licence application workflows — reducing manual processing time and eliminating document fraud." },
      { title: "Inter-agency credential sharing", desc: "Issue and verify credentials that can be recognised across departments and jurisdictions using W3C Verifiable Credentials standards." },
    ],
    quote: "Meeting ISM and IRAP requirements while keeping the citizen experience simple — that's what we needed.",
    quoteRole: "Digital Transformation Lead, State Government Department",
  },
  {
    id: "childcare",
    label: "Childcare and Community",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    headline: "Every person working with children, verified.",
    intro: "Childcare centres, sports clubs, disability services, and community organisations have a legal and moral obligation to verify the people who work with vulnerable individuals. VerifyChain makes that continuous, not a one-time checkbox.",
    checks: ["Working with Children Check", "Identity verification", "National crime check"],
    scenarios: [
      { title: "Real-time clearance validation", desc: "Verify a Working with Children Check in real time against the state registry — not just on hire, but at any point you need confidence." },
      { title: "Revocation alerts", desc: "When a clearance is revoked, suspended, or modified, VerifyChain notifies the organisation immediately — not weeks later when the paper system catches up." },
      { title: "Multi-jurisdiction compliance", desc: "Staff who work across state lines carry clearances issued in different jurisdictions. VerifyChain maps and validates across all Australian states." },
    ],
    quote: "One of our volunteers had their WWCC revoked. We knew within the hour. That's what child safety looks like.",
    quoteRole: "Operations Manager, Youth Services NFP",
  },
];

const ALL_CHECKS = [
  { slug: "identity-verification",       label: "Identity verification",       icon: "🪪" },
  { slug: "age-verification",            label: "Age verification",            icon: "🎂" },
  { slug: "qualification-verification",  label: "Qualification verification",  icon: "🎓" },
  { slug: "national-crime-check",        label: "National crime check",        icon: "🛡️" },
  // Hidden per Hormuz's feedback — re-add when confirmed:
  // { slug: "working-with-children-check", label: "Working with Children Check", icon: "👶" },
  // { slug: "eseal-document-verification", label: "eSeal document verification", icon: "📄" },
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
            VerifyChain serves organisations across HR, financial services, education, government,
            and community services — each with different checks, different obligations, and different
            definitions of compliance. All on one platform.
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
                  {current.checks.map(c => (
                    <Link
                      key={c}
                      to={`/products/${ALL_CHECKS.find(a => a.label === c)?.slug || ""}`}
                      className="uc-check-pill"
                    >
                      {ALL_CHECKS.find(a => a.label === c)?.icon} {c}
                    </Link>
                  ))}
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
                <p>Run a live verification in under 5 minutes — no sign-up required.</p>
                <Link to="/contact?inquiry=demo" className="uc-cta-btn">Book a demo →</Link>
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
            <Link to="/contact" className="uc-cta-btn">Talk to us →</Link>
            <Link to="/contact?inquiry=demo" className="uc-cta-btn uc-cta-btn--ghost">Learn more →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}