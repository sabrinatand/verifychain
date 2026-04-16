# VerifyChain Website

A clean, Persona-inspired marketing website for VerifyChain — built with React + Vite.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Project structure

```
src/
  App.jsx              # Root component — assembles all sections
  main.jsx             # React entry point
  styles/
    global.css         # Design tokens, resets, shared utilities
  components/
    Nav.jsx / .css     # Sticky navbar with scroll effect
    Hero.jsx / .css    # Hero with gradient bg + stats bar
    Ticker.jsx / .css  # Auto-scrolling product ticker
    TrustBar.jsx / .css
    Dashboard.jsx/.css # Live dashboard preview
    Products.jsx/.css  # Dark section — 6 product cards
    HowItWorks.jsx/.css
    WhyVerifyChain.jsx/.css
    UseCases.jsx/.css
    Technology.jsx/.css
    Compliance.jsx/.css
    Simulator.jsx/.css
    CTA.jsx / .css
    Footer.jsx / .css
```

## Design decisions

- **Font**: DM Serif Display (headings) + DM Sans (body) — editorial, refined, not generic
- **Background**: Soft gradient shifts between warm and cool tones (never plain white)
- **Animations**: CSS scroll-triggered fade-ups via IntersectionObserver
- **Dark sections**: Products and Footer in near-black to create contrast rhythm
- **Glassmorphism**: Subtle frosted glass on cards + hero stats bar
- **Honest**: Product status badges (Live / Proof of concept / In development) build trust
