import "./CTA.css";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-bg" />
      <div className="cta-inner fade-up">
        <h2 className="cta-h2">
          Ready to verify<br /><em>with confidence?</em>
        </h2>
        <p className="cta-body">
          Join the organisations that trust VerifyChain to protect
          their people and their compliance.
        </p>
        <div className="cta-btns">
          <Link to="/demonstration">
            <button className="btn-dark btn-lg">Go to demonstration</button>
          </Link>
          <Link to="/contact">
            <button className="btn-ghost btn-lg">Talk to sales</button>
          </Link>
        </div>
      </div>
    </section>
  );
}