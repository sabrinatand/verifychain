import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isAbout = location.pathname === "/about";

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <div className="logo-mark">
            <svg viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="1.5" fill="none"/>
              <path d="M6.5 9L8 10.5L11.5 7" stroke="white" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span>VerifyChain</span>
        </Link>

        <ul className="nav-links">
          <li><Link to="/" className={!isAbout ? "nav-active" : ""}>Products</Link></li>
          <li><Link to="/" >Technology</Link></li>
          <li><Link to="/">Use cases</Link></li>
          <li><Link to="/about" className={isAbout ? "nav-active" : ""}>About us</Link></li>
        </ul>

        <div className="nav-right">
          <button className="btn-ghost">Log in</button>
          <button className="btn-dark">Go to simulator →</button>
        </div>
      </div>
    </nav>
  );
}