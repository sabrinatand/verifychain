import "./Footer.css";

const cols = [
  {
    title: "Products",
    links: ["Identity verification", "Age verification", "Qualification check", "Crime check", "WWCC", "eSeal documents"],
  },
  {
    title: "Technology",
    links: ["Architecture", "API docs", "Security", "Compliance", "Simulator"],
  },
  {
    title: "Company",
    links: ["About us", "Use cases", "Contact sales", "Privacy policy"],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="logo-mark">
              <svg viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="1.5" fill="none"/>
                <path d="M6.5 9L8 10.5L11.5 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>VerifyChain</span>
          </div>
          <p className="footer-tagline">
            Melbourne-based verification platform.<br />
            Blockchain-powered. Privacy-first.
          </p>
        </div>

        {cols.map((col) => (
          <div key={col.title} className="footer-col">
            <h5 className="footer-col-title">{col.title}</h5>
            <ul>
              {col.links.map((l) => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© 2025 VerifyChain Pty Ltd · ABN 27 626 882 415</p>
          <p>VerifyChain is a trademark of VerifyChain Pty Ltd</p>
        </div>
      </div>
    </footer>
  );
}
