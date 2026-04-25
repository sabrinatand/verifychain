import { useState, useEffect, useRef } from "react";
import "./AboutPage.css";

const team = [
  {
    id: "hormuz",
    name: "Hormuz Vazifdar",
    role: "Founder & CEO",
    initials: "HV",
    color: "#1a3a6b",
    photo: "/images/team/hormuz.png",
    bio: "Hormuz has four decades of business experience mainly in the Telecommunications and IT Industries. In the last decade Hormuz has successfully run an IT consultancy company specialising in managing large Transformation projects. This is his first foray in a tech start up which he started with Durai Ramachandran and Karl. Outside of work enjoys books, playing and watching sports, travel and photography",
  },
  {
    id: "durai",
    name: "Durai Ramachandran",
    role: "Co-Founder & Technical Director",
    initials: "DR",
    color: "#2a52c9",
    photo: "/images/team/durai.png",
    bio: "Durai is an experienced Agile Practitioner, helping organizations and individuals to lead the Agile Ways of Working. Coaching and mentoring teams in Better Customer Focus, Built-in Quality principles and Agile/Lean best practices.",
  },
  {
    id: "karl",
    name: "Karl Vazifdar",
    role: "Strategic Advisor",
    initials: "KV",
    color: "#0f6e56",
    photo: "/images/team/karl.png",
    bio: "A CPA with over 9 years experience who has routinely managed the budgets of companies in excess of $10b revenue per annum.",
  },
  {
    id: "zuben",
    name: "Zuben Rustomjee",
    role: "Consultant",
    initials: "ZR",
    color: "#6b3a8a",
    photo: "/images/team/zuben.png",
    bio: "Zuben is a Senior Managing Consultant at IBM Consulting focusing on strategy, ventures and unlocking high performing teams within organisations. Fast-tracked through IBM to play leading strategic advisory roles, his work has spanned corporate strategy for a $X00 million business, coordinated market diligence and prioritisation during M&A events and consults with external clients on technology operating model and cyber security policy. He is a recreational pianist, national karate champion ’15- ’19 and achieved his black belt in karate in 2021.",
  },
];

const values = [
  { icon: "🔒", title: "Privacy by design", desc: "Personal data is never stored off-chain. Users own and control every credential they hold." },
  { icon: "⚡", title: "Speed matters", desc: "We turned weeks of verification into minutes — without cutting corners on accuracy or security." },
  { icon: "🌏", title: "Built for Australia, ready for the world", desc: "Compliant with Australian Digital ID Act, GDPR, and eIDAS 2.0. Designed to scale globally." },
  { icon: "🤝", title: "Trust is earned", desc: "Blockchain immutability means every verified credential carries a proof that can't be faked or altered." },
];

const timeline = [
  {
    year: "March 2018",
    title: "The spark",
    desc: "Cambridge Analytica's misuse of personal data inspired the idea — what if identity could be private, portable, and user-controlled?",
  },
  {
    year: "June 2018",
    title: "Company founded",
    desc: "VerifyChain Pty Ltd registered in Victoria, Australia.",
  },
  {
    year: "2019",
    title: "Architecture defined",
    desc: "Developed the method to best manage a digital identity using blockchain — the foundation everything is built on.",
  },
  {
    year: "2020",
    title: "Proof of concept",
    desc: "Built and tested extensively to confirm the concept worked across multiple countries and use cases.",
  },
  {
    year: "2021",
    title: "Back to the drawing board",
    desc: "Identified architectural weaknesses and rebuilt — the hardest but most important step.",
  },
  {
    year: "2022",
    title: "Ready for launch",
    desc: "A full new operating system using multiple components of blockchain technology, ready for commercial launch.",
  },
  {
    year: "2024–25",
    title: "Government-tested",
    desc: "Age verification trialled in Australian Government Age Assurance Technology Trials. AML legislation response in progress.",
  },
];

export default function AboutPage() {
  const [activeModal, setActiveModal] = useState(null);
  const modalRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setActiveModal(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Scroll lock when modal open
  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeModal]);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".au-fade").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const active = team.find((t) => t.id === activeModal);

  return (
    <div className="about-page">

      {/* ── HERO BANNER ── */}
      <div className="about-hero">
        <div className="about-hero-glow about-hero-glow--l" />
        <div className="about-hero-glow about-hero-glow--r" />
        <div className="about-hero-inner">
          <span className="about-eyebrow">Who we are</span>
          <h1 className="about-h1">
            The team behind<br /><em>VerifyChain</em>
          </h1>
          <p className="about-hero-sub">
            A Melbourne-based startup on a mission to make digital verification
            instant, private, and tamper-proof — for everyone.
          </p>
        </div>
      </div>

      {/* ── MISSION ── */}
      <section className="about-mission au-fade">
        <div className="about-mission-inner">
          <div className="about-mission-quote">
            <span className="about-quote-mark">"</span>
            Never compromise on your identity. We make identity management
            easy but immutable.
            <span className="about-quote-mark">"</span>
          </div>
          <p className="about-mission-sub">
            Founded in Melbourne, VerifyChain started in identity management
            and has grown into a full verification platform — covering age,
            qualifications, criminal history, and more. Blockchain-powered,
            privacy-first, built for the real world.
          </p>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="about-team">
        <div className="about-team-inner">
          <span className="about-section-eyebrow au-fade">Meet the team</span>
          <h2 className="about-section-h2 au-fade">
            The people who<br /><em>built this</em>
          </h2>

          <div className="about-team-grid">
            {team.map((member, i) => (
              <div
                key={member.id}
                className="team-card au-fade"
                style={{ transitionDelay: `${i * 0.1}s` }}
                onClick={() => setActiveModal(member.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setActiveModal(member.id)}
              >
                <div className="team-card-photo" style={{ background: member.color }}>
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="team-card-img"
                    />
                  ) : (
                    <span className="team-card-initials">{member.initials}</span>
                  )}
                  <div className="team-card-hover-hint">View profile →</div>
                </div>
                <div className="team-card-info">
                  <h3 className="team-card-name">{member.name}</h3>
                  <p className="team-card-role">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ORIGIN STORY ── */}
      <section className="about-origin au-fade">
        <div className="about-origin-inner">
          <span className="about-section-eyebrow">Our story</span>
          <h2 className="about-section-h2">
            What was<br /><em>the spark?</em>
          </h2>
          <blockquote className="origin-quote">
            "It was the time when Cambridge Analytica was in the news. 
            That moment defined it — we must protect identity with a 
            solution that is private, where only you decide who sees 
            your information."
            <cite>— Hormuz Vazifdar, Founder & CEO</cite>
          </blockquote>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="about-timeline">
        <div className="about-timeline-inner">
          <span className="about-section-eyebrow au-fade">Our timeline</span>
          <h2 className="about-section-h2 au-fade">
            Seven years in<br /><em>the making</em>
          </h2>

          <div className="timeline-track">
            <div className="timeline-line" />
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className={`timeline-item au-fade ${i % 2 === 0 ? "timeline-item--left" : "timeline-item--right"}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="timeline-card">
                  <span className="timeline-year">{item.year}</span>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
                <div className="timeline-dot" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="about-values">
        <div className="about-values-inner">
          <span className="about-section-eyebrow au-fade">Our core values</span>
          <h2 className="about-section-h2 au-fade">
            What we stand<br /><em>for</em>
          </h2>
          <div className="about-values-grid">
            {values.map((v, i) => (
              <div key={v.title} className="value-card au-fade" style={{ transitionDelay: `${i * 0.1}s` }}>
                <span className="value-icon">{v.icon}</span>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODAL ── */}
      {activeModal && (
        <div
          className="modal-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) setActiveModal(null); }}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-card" ref={modalRef}>
            <button className="modal-close" onClick={() => setActiveModal(null)} aria-label="Close">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="modal-body">
              <div className="modal-photo" style={{ background: active.color }}>
                {active.photo ? (
                  <img
                    src={active.photo}
                    alt={active.name}
                    className="modal-img"
                  />
                ) : (
                  <span className="modal-initials">{active.initials}</span>
                )}
              </div>
              <div className="modal-content">
                <h2 className="modal-name">{active.name}</h2>
                <p className="modal-role">{active.role}</p>
                <p className="modal-bio">{active.bio}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}