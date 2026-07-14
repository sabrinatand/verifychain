# VerifyChain

VerifyChain is a secure identity verification platform for Australian organisations, letting them confirm identity, age, qualifications, and criminal history in minutes. This repository contains the frontend marketing website and application shell.

**Live site:** [verifychain.io](https://verifychain.io)

## Tech stack

- **React 18 + Vite** — component framework and build tooling
- **React Router** — client-side routing, including full-screen auth pages that bypass the main nav/footer shell
- **Custom CSS** — no CSS framework; each component/page ships its own stylesheet (CSS Modules used for the chatbot)
- **EmailJS** — handles contact form and chatbot demo-request submissions, sending both a team notification and an auto-reply to the visitor
- **Zapier webhook** — logs chatbot demo requests to a Google Sheet as a fire-and-forget call alongside the EmailJS send
- **Claude API** — powers VeraBot, the in-app assistant, via a `/api/chat` backend proxy (see [Backend](#backend) below)

## Project structure

```
src/
  components/
    Nav.jsx           # Sticky top navigation with Products/Company dropdowns
    Footer.jsx         # Site footer with nav columns and contact details
    Verabot.jsx         # Floating chatbot widget
  pages/
    HomePage.jsx        # Landing page — hero, dashboard preview, products, tech, use cases
    AboutPage.jsx
    RoadmapPage.jsx
    ContactPage.jsx
    DemonstrationPage.jsx
    ProductDetailPage.jsx
    AppDashboard.jsx
    TechnologyPage.jsx
    UseCasesPage.jsx
    DemoPage.jsx
    RegisterPage.jsx    # Full-screen — no nav/footer
    LoginPage.jsx        # Full-screen — no nav/footer
  App.jsx                # Route definitions and layout shell
public/
  robots.txt
  sitemap.xml
  VC-Blue-Vertical-01-01.png   # Primary horizontal logo (nav, footer)
  VC-Logo-Blue-01.png           # Icon-only mark (compact placements)
```

### Routing

`App.jsx` splits routes into two groups:

- **Full-screen pages** (`/register`, `/login`) render without the shared `Nav`/`Footer` shell.
- **Main site** (`/*`) renders inside `AppInner`, which conditionally hides `Nav`/`Footer` on `/dashboard` as well.

A `ScrollObserver` component resets scroll position on route change and drives fade-up/fade-in animations via `IntersectionObserver`, re-scanning the DOM after each navigation.

## VeraBot (chatbot)

`Verabot.jsx` is a self-contained floating chat widget with three response paths:

1. **Predefined quick responses** for common questions (services, pricing, contact) — no API call needed
2. **Claude API** (via `POST /api/chat`) for open-ended questions, maintaining conversation history in component state
3. **Guided enquiry flow** — a multi-step form (name → email → company → message) triggered by "Request a Demo", which on completion:
   - Sends a team notification via EmailJS
   - Sends an auto-reply to the visitor via EmailJS
   - Logs the submission to a Google Sheet via a Zapier webhook (fire-and-forget, does not block the UI)

## Backend

The `/api/chat` endpoint that powers VeraBot's Claude integration is a separate Node.js/Express service, maintained outside this repository. This repo (frontend only) expects that endpoint to be available at `/api/chat` in production, and proxied to it during local development.

## Getting started

```bash
npm install
npm run dev       # local dev server, http://localhost:5173
npm run build     # production build → dist/
```

> Note: running `npm run dev` alone will show a proxy error for `/api/chat` unless the backend service is also running locally — this is expected and does not affect the rest of the site.

## Deployment

Static build output (`dist/`) is deployed to AWS S3 + CloudFront, with SSL managed via AWS Certificate Manager. The `dist/` folder is git-ignored and regenerated on each build — it is not committed to this repository.

## SEO

- `index.html` includes primary meta tags, Open Graph tags, and a canonical URL pointing to `https://verifychain.io`
- `public/robots.txt` and `public/sitemap.xml` are served as static files and list all indexable routes
