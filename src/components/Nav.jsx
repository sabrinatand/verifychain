import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  const isCompany = ["/about", "/roadmap"].includes(location.pathname);

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <img src="/verifychain-logo.png" alt="VerifyChain" className="nav-logo-img" />
        </Link>

        <ul className="nav-links">
          <li><Link to="/" className={location.pathname === "/" ? "nav-active" : ""}>Products</Link></li>
          <li><Link to="/">Technology</Link></li>
          <li><Link to="/">Use cases</Link></li>

          {/* Company dropdown */}
          <li className="nav-dropdown-wrap" ref={dropdownRef}>
            <button
              className={`nav-dropdown-trigger ${isCompany ? "nav-active" : ""} ${dropdownOpen ? "nav-dropdown-trigger--open" : ""}`}
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              Company
              <svg className="nav-chevron" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.4"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {dropdownOpen && (
              <div className="nav-dropdown">
                <Link to="/about" className="nav-dropdown-item">
                  <div className="nav-dropdown-icon">
                    <svg viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.3"/>
                      <path d="M2 14c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="nav-dropdown-label">About us</div>
                    <div className="nav-dropdown-sub">Team, mission & story</div>
                  </div>
                </Link>

                <Link to="/roadmap" className="nav-dropdown-item">
                  <div className="nav-dropdown-icon">
                    <svg viewBox="0 0 16 16" fill="none">
                      <path d="M2 12h3M2 8h6M2 4h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                      <circle cx="13" cy="4" r="1.5" fill="currentColor"/>
                    </svg>
                  </div>
                  <div>
                    <div className="nav-dropdown-label">Roadmap</div>
                    <div className="nav-dropdown-sub">What we're building next</div>
                  </div>
                </Link>
              </div>
            )}
          </li>
        </ul>

        <div className="nav-right">
          <button className="btn-ghost">Log in</button>
          <button className="btn-dark">Go to demo →</button>
        </div>
      </div>
    </nav>
  );
}