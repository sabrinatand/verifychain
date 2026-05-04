import { Link } from "react-router-dom";
import "./Footer.css";

const cols = [
  {
    title: "Products",
    links: [
      { label: "Identity verification", to: "/" },
      { label: "Age verification", to: "/" },
      { label: "Qualification check", to: "/" },
      { label: "Crime check", to: "/" },
      { label: "WWCC", to: "/" },
      { label: "eSeal documents", to: "/" },
    ],
  },
  {
    title: "Technology",
    links: [
      { label: "Architecture", to: "/" },
      { label: "API docs", to: "/" },
      { label: "Security", to: "/" },
      { label: "Compliance", to: "/" },
      { label: "Demonstration", to: "/demonstration" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", to: "/about" },
      { label: "Roadmap", to: "/roadmap" },
      { label: "Contact us", to: "/contact" },
      { label: "Privacy policy", to: "/" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src="/verifychain-logo.png" alt="VerifyChain" className="footer-logo-img" />
          </Link>
          <p className="footer-tagline">
            Melbourne-based verification platform.<br />
            Secure, private, and built to industry standards.
          </p>
          <div className="footer-contact">
            <a href="tel:+61407880432" className="footer-contact-link">+61 407 880 432</a>
            <a href="mailto:enquiry@verifychain.io" className="footer-contact-link">enquiry@verifychain.io</a>
          </div>
        </div>

        {/* Nav columns */}
        {cols.map((col) => (
          <div key={col.title} className="footer-col">
            <h5 className="footer-col-title">{col.title}</h5>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
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