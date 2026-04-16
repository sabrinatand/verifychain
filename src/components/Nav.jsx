import { useState, useEffect } from "react";
import "./Nav.css";

const links = ["Products", "Technology", "Use cases", "About us"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav-inner">
        <div className="nav-logo">
          <div className="logo-mark">
            <svg viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="1.5" fill="none"/>
              <path d="M6.5 9L8 10.5L11.5 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span>VerifyChain</span>
        </div>

        <ul className="nav-links">
          {links.map((l) => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>

        <div className="nav-right">
          <button className="btn-ghost">Log in</button>
          <button className="btn-dark">Go to simulator →</button>
        </div>
      </div>
    </nav>
  );
}
