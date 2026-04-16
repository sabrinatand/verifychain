import "./CTA.css";

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
          <button className="btn-dark btn-lg">Go to simulator</button>
          <button className="btn-ghost btn-lg">Talk to sales</button>
        </div>
      </div>
    </section>
  );
}
