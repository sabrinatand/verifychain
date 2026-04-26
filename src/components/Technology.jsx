import "./Technology.css";

const stack = [
  { n: "01", title: "Hyperledger Fabric + Aries + Ursa", desc: "Enterprise permissioned distributed ledger with Raft consensus. Nodes distributed across multiple geographic regions — no single point of failure." },
  { n: "02", title: "W3C Verifiable Credentials", desc: "International standard for portable, interoperable digital credentials. Accepted across most global jurisdictions." },
  { n: "03", title: "Zero-knowledge proof layer", desc: "Cryptographic proofs that verify specific attributes without exposing any underlying personal data." },
  { n: "04", title: "REST + GraphQL APIs", desc: "OpenAPI 3.0 compliant. Integrate with existing HR, CRM, or compliance systems. Sync and async both supported." },
  { n: "05", title: "AES-256 + TLS 1.3 encryption", desc: "Military-grade security at rest and in transit. OAuth 2.0 and OpenID Connect for access control." },
];

export default function Technology() {
  return (
    <section className="tech-section">
      <div className="section-inner">
        <div className="tech-layout">
          <div className="tech-left">
            <span className="section-eyebrow">Technology</span>
            <h2 className="section-h2">
              Secure by design,<br /><em>simple by choice</em>
            </h2>
            <p className="section-body">
              Built to enterprise security standards — every layer of VerifyChain maps to recognised information security frameworks. Simple interface, serious architecture underneath.
            </p>
            <button className="btn-ghost">Architecture overview →</button>
          </div>

          <div className="tech-list">
            {stack.map((s) => (
              <div key={s.n} className="tech-row fade-up">
                <span className="tech-num">{s.n}</span>
                <div>
                  <h4 className="tech-title">{s.title}</h4>
                  <p className="tech-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
