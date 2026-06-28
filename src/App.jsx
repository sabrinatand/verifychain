import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import AboutPage from "./pages/AboutPage";
import RoadmapPage from "./pages/RoadmapPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DemonstrationPage from "./pages/DemonstrationPage";
import ContactPage from "./pages/ContactPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AppDashboard from "./pages/AppDashboard";
import TechnologyPage from "./pages/TechnologyPage";
import DemoPage from "./pages/DemoPage";
import UseCasesPage from "./pages/UseCasesPage";
import Verabot from "./components/Verabot";
import "./styles/global.css";

function ScrollObserver() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      }),
      { threshold: 0.08 }
    );
    const timer = setTimeout(() => {
      document.querySelectorAll(".fade-up, .fade-in, .au-fade")
        .forEach((el) => observer.observe(el));
    }, 60);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [location.pathname]);
  return null;
}

function HomePage() {
  return (
    <>
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
    </>
  );
}

function AppInner() {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <div className="site">
      <ScrollObserver />
      {!isDashboard && <Nav />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/demonstration" element={<DemonstrationPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/dashboard" element={<AppDashboard />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/use-cases" element={<UseCasesPage />} />
          <Route path="/demo" element={<DemoPage />} />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
      <Verabot />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Full screen pages — no nav/footer */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Main site — with nav/footer */}
        <Route path="/*" element={<AppInner />} />
      </Routes>
    </BrowserRouter>
  );
}