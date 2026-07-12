import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Nav.css";

const PRODUCTS = [
  { slug: "identity-verification",        label: "Identity verification",        desc: "Validate passports, licences and national IDs in real time." },
  { slug: "age-verification",             label: "Age verification",             desc: "Confirm age without revealing a birth date — tested by the Australian Government." },
  { slug: "qualification-verification",   label: "Qualification verification",   desc: "Verify university degrees and trade qualifications." },
  { slug: "national-crime-check",         label: "National crime check",         desc: "Automated background screening via Australian law enforcement." },
];

const COMPANY = [
  { to: "/about",   label: "About us",  desc: "Our mission and the team behind VerifyChain." },
  { to: "/roadmap", label: "Roadmap",   desc: "What's live today and what's coming next." },
];

export default function Nav() {
  const [scrolled, setScrolled]         = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // "products" | "company" | null
  const navRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => { setOpenDropdown(null); }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (name) => setOpenDropdown(prev => prev === name ? null : name);

  return (
    <nav ref={navRef} className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav-inner">

        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={() => setOpenDropdown(null)}>
          <img src="/VC-Blue-Vertical-01-01.png" alt="VerifyChain" className="nav-logo-img" />
        </Link>

        {/* Links */}
        <ul className="nav-links">

          {/* Products dropdown */}
          <li className="nav-item nav-item--dropdown">
            <button
              className={`nav-link nav-link--btn ${openDropdown === "products" ? "nav-link--active" : ""}`}
              onClick={() => toggle("products")}
            >
              Products
              <svg className={`nav-chevron ${openDropdown === "products" ? "nav-chevron--open" : ""}`} viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {openDropdown === "products" && (
              <div className="nav-dropdown nav-dropdown--wide">
                <div className="nav-dropdown-header">
                  <p className="nav-dropdown-label">Verification products</p>
                  <p className="nav-dropdown-sub">All checks on a single platform — mix and match what your organisation needs.</p>
                </div>
                <div className="nav-dropdown-grid">
                  {PRODUCTS.map(p => (
                    <Link
                      key={p.slug}
                      to={`/products/${p.slug}`}
                      className="nav-dropdown-item"
                      onClick={() => setOpenDropdown(null)}
                    >
                      <span className="nav-dropdown-item-label">{p.label}</span>
                      <span className="nav-dropdown-item-desc">{p.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>

          {/* Technology */}
          <li className="nav-item">
            <Link to="/technology" className="nav-link" onClick={() => setOpenDropdown(null)}>
              Technology
            </Link>
          </li>

          {/* Use cases */}
          <li className="nav-item">
            <Link to="/use-cases" className="nav-link" onClick={() => setOpenDropdown(null)}>
              Use cases
            </Link>
          </li>

          {/* Company dropdown — now matches Products style */}
          <li className="nav-item nav-item--dropdown">
            <button
              className={`nav-link nav-link--btn ${openDropdown === "company" ? "nav-link--active" : ""}`}
              onClick={() => toggle("company")}
            >
              Company
              <svg className={`nav-chevron ${openDropdown === "company" ? "nav-chevron--open" : ""}`} viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {openDropdown === "company" && (
              <div className="nav-dropdown nav-dropdown--wide">
                <div className="nav-dropdown-header">
                  <p className="nav-dropdown-label">About VerifyChain</p>
                  <p className="nav-dropdown-sub">Who we are and where we're headed.</p>
                </div>
                <div className="nav-dropdown-grid">
                  {COMPANY.map(c => (
                    <Link
                      key={c.to}
                      to={c.to}
                      className="nav-dropdown-item"
                      onClick={() => setOpenDropdown(null)}
                    >
                      <span className="nav-dropdown-item-label">{c.label}</span>
                      <span className="nav-dropdown-item-desc">{c.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>
        </ul>

        {/* CTA buttons */}
        <div className="nav-right">
          <Link to="/register" className="btn-ghost">Register</Link>
          <Link to="/contact?inquiry=demo" className="btn-dark">Book a demo →</Link>
        </div>
      </div>
    </nav>
  );
}