import { useEffect, useRef, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import TrustBar from "./components/TrustBar";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import HowItWorks from "./components/HowItWorks";
import WhyVerifyChain from "./components/WhyVerifyChain";
import UseCases from "./components/UseCases";
import Technology from "./components/Technology";
import Compliance from "./components/Compliance";
import Simulator from "./components/Simulator";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import "./styles/global.css";

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    const els = document.querySelectorAll(".fade-up, .fade-in");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site">
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <TrustBar />
        <Dashboard />
        <Products />
        <HowItWorks />
        <WhyVerifyChain />
        <UseCases />
        <Technology />
        <Compliance />
        <Simulator />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
