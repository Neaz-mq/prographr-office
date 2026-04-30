# Prographr — Creative Agency Website

> A modern, high-performance agency website built with React 19, GSAP, Framer Motion, and Tailwind CSS.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP-3.14-88CE02?style=flat-square)](https://gsap.com)
[![License](https://img.shields.io/badge/License-Private-red?style=flat-square)]()

---

## Overview

**Prographr** is a full-service creative agency offering Graphic Design, Web Development, Web Design, and PowerPoint Design. This repository is the official agency website — a single-page landing experience with smooth scroll, pinned horizontal sections, animated service cards, portfolio carousel, and a working contact form.

---

## Live Demo

> 🌐 [prographr.com](https://prographr.com) — deployed on Vercel with auto-deploy on `main` push.

---

## Features

- ⚡ **Blazing fast** — Vite 7 + React 19 with optimized production builds
- 🎬 **GSAP animations** — ScrollTrigger-powered pinned horizontal scroll, fan card entrance animations
- 🌀 **Framer Motion** — Mobile carousel transitions, mobile menu open/close
- 🖱️ **Lenis smooth scroll** — Native-feeling inertia scroll synced with GSAP ScrollTrigger
- 🗂️ **Swiper.js carousels** — Auto-playing portfolio conveyor belt and testimonials slider
- 📬 **EmailJS contact form** — Working contact form with success/error states, no backend needed
- 📱 **Fully responsive** — Separate mobile and desktop layouts for complex sections
- 🔗 **Section-based navigation** — Navbar scrolls to sections smoothly via Lenis, works across pages
- 🎨 **Cloudinary media** — All images served via Cloudinary with `q_auto/f_auto` optimization

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + Vite 7 |
| Styling | Tailwind CSS v3 |
| Animation | GSAP 3 + ScrollTrigger |
| Motion | Framer Motion 12 |
| Smooth Scroll | Lenis 1.3 |
| Carousel | Swiper.js 12 |
| Routing | React Router DOM v7 |
| Email | EmailJS Browser |
| Icons | Lucide React + React Icons |
| Media | Cloudinary |
| Deployment | Vercel |

---

## Project Structure

```
prographr/
├── public/
│   └── logo.webp
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Section-scroll navbar with IntersectionObserver active state
│   │   ├── Footer.jsx
│   │   ├── Loader.jsx          # First-visit page loader (sessionStorage controlled)
│   │   └── CustomScrollbar.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── ServicesSection.jsx # GSAP fan cards (desktop) + Framer carousel (mobile)
│   │   ├── ClientLogos.jsx
│   │   ├── AboutSection.jsx    # GSAP pinned horizontal scroll
│   │   ├── PortfolioSection.jsx# Swiper conveyor belt
│   │   ├── Testimonials.jsx    # Swiper with split dark/white background
│   │   ├── ValueSection.jsx
│   │   ├── TechnologySection.jsx
│   │   ├── FAQ.jsx             # Accordion FAQ + Careers listings
│   │   └── CTA.jsx             # EmailJS contact form (id="contact")
│   ├── hooks/
│   │   └── useSmoothScroll.js  # Lenis + GSAP ScrollTrigger sync, exposes window.lenis
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.local                  # EmailJS keys (not committed)
├── package.json
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js `>=18`
- npm `>=9`

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/Neaz-mq/prographr-agency.git
cd prographr-agency

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in your EmailJS credentials (see Environment Variables section below)

# 4. Start the dev server
npm run dev
```

Visit `http://localhost:5173`

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> Get these from your [EmailJS dashboard](https://www.emailjs.com/). Never commit this file — it is already in `.gitignore`.

---

## Available Scripts

```bash
npm run dev        # Start local dev server at localhost:5173
npm run build      # Production build → ./dist
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```

---

## Section IDs (for navigation)

Each major section has an `id` for the navbar scroll system:

| Section | ID |
|---|---|
| Services | `#services` |
| Portfolio | `#portfolio` |
| About | `#about` |
| FAQ | `#faq` |
| Contact / CTA | `#contact` |

---

## Deployment

The site auto-deploys to **Vercel** on every push to `main`.

```bash
npm run build     # outputs to /dist
# Vercel picks up /dist automatically
```

For manual deploy:
```bash
npm i -g vercel
vercel --prod
```

---

## Key Implementation Notes

**Smooth scroll + GSAP sync**
Lenis is initialized in `useSmoothScroll.js` and exposed as `window.lenis`. The Navbar always calls `window.lenis.scrollTo(el)` instead of native `scrollIntoView` to prevent conflicts with ScrollTrigger.

**Cross-page navigation**
Clicking a nav link from a non-home route calls `navigate("/", { state: { scrollTo: sectionId } })`. The Navbar effect watches `location.state.scrollTo` and fires `lenisScrollTo()` after a 400ms delay to let Lenis initialize on mount.

**Mobile vs Desktop layouts**
`ServicesSection`, `AboutSection`, and `PortfolioSection` each detect `window.innerWidth >= 1024` via a state variable and render completely different JSX trees — GSAP animations only run on desktop, Framer Motion animations only run on mobile.

---

## Contact

**Prographr Agency**
📧 contact.prographr@gmail.com
🌐 [prographr.com](https://prographr.com)

---

<p align="center">Built with ❤️ by the Prographr team</p>