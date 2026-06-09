---
layout: home

hero:
  name: "Documentation"
  text: "Tools for the Laravel & Filament ecosystem."
  tagline: "Explore our open-source and premium packages — built for developers who ship."
  actions:
    - theme: brand
      text: Explore Packages
      link: "#packages"
    - theme: alt
      text: Visit Site →
      link: https://ashraficlabs.com
---

<style>
html {
  scroll-behavior: smooth;
}

/* ---- Hero ---- */
.VPHero {
  text-align: center !important;
  padding: 120px 24px 100px !important;
  position: relative;
  overflow: hidden;
  max-width: 100vw;
  background:
    radial-gradient(ellipse 90% 70% at 50% 0%, rgba(184, 139, 74, 0.08) 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at 20% 100%, rgba(18, 53, 47, 0.06) 0%, transparent 55%),
    radial-gradient(ellipse 60% 50% at 80% 100%, rgba(18, 53, 47, 0.04) 0%, transparent 55%),
    var(--vp-c-bg);
}

.VPHero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(184, 139, 74, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(184, 139, 74, 0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
}

.VPHero .container {
  position: relative;
  z-index: 1;
}

.VPHero .name,
.VPHero .text {
  font-family: 'Optima', 'Palatino', 'Book Antiqua', 'Georgia', serif !important;
  max-width: 680px !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

:root {
  --vp-home-hero-name-color: #12352f;
  --vp-home-hero-name-background: linear-gradient(120deg, #12352f 30%, #b88b4a);
}

.dark {
  --vp-home-hero-name-color: #d7bd8b;
  --vp-home-hero-name-background: linear-gradient(120deg, #d7bd8b 30%, #31594f);
}

.VPHero .name {
  font-size: clamp(3rem, 6vw, 4.5rem) !important;
  font-weight: 700 !important;
  letter-spacing: -0.03em !important;
  line-height: 1.1 !important;
  margin-bottom: 8px !important;
}

.VPHero .text {
  font-weight: 500 !important;
  font-size: clamp(1.2rem, 2.5vw, 1.5rem) !important;
  color: var(--vp-c-text-2) !important;
  line-height: 1.4 !important;
  margin-bottom: 12px !important;
}

.VPHero .tagline {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--vp-c-text-3);
  max-width: 480px;
  margin: 0 auto;
}

.VPHero .actions {
  justify-content: center;
  margin-top: 28px;
}

/* ---- Action buttons ---- */
.VPHero .actions .VPButton {
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
  padding: 0 24px;
  line-height: 46px;
  font-size: 0.95rem;
  white-space: nowrap;
}

.VPHero .actions .VPButton.brand {
  background: linear-gradient(135deg, #12352f 0%, #31594f 100%);
  border: none;
}

.dark .VPHero .actions .VPButton.brand {
  background: linear-gradient(135deg, #12352f 0%, #1a3d36 100%);
}

.VPHero .actions .VPButton.alt {
  border-color: var(--vp-c-brand-3);
  color: var(--vp-c-brand-3);
  background: transparent;
}

.VPHero .actions .VPButton.alt:hover {
  background: rgba(184, 139, 74, 0.08);
}

/* ---- Packages section ---- */
#packages {
  scroll-margin-top: 80px;
}

.packages-section {
  padding: 10px 1.5rem 30px;
}

.packages-heading {
  text-align: center;
  font-family: 'Optima', 'Palatino', 'Book Antiqua', 'Georgia', serif;
  font-size: 3rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  letter-spacing: -0.02em;
  margin: 0 0 2.5rem;
  text-decoration: underline;
  text-decoration-color: #b88b4a;
  text-underline-offset: 8px;
  text-decoration-thickness: 2px;
}

/* ---- Package grid ---- */
.packages-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 1040px;
  margin: 0 auto 4rem;
  padding: 0 1.5rem;
}

@media (max-width: 768px) {
  .VPHero {
    padding: 80px 20px 64px !important;
  }

  .VPHero .name {
    font-size: 2.4rem !important;
  }

  .packages-grid {
    grid-template-columns: 1fr;
  }

  .packages-heading {
    font-size: 2.2rem;
  }
}

/* ---- Package card ---- */
.pkg-card {
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-elv);
  padding: 28px 28px 24px;
  text-decoration: none !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  color: inherit;
}

.pkg-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(18, 53, 47, 0.1);
  border-color: var(--vp-c-brand-3);
}

.dark .pkg-card:hover {
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
}

.pkg-card-title-svg {
  display: block;
  height: 30px;
  width: auto;
  max-width: 100%;
  margin-bottom: 14px;
}

.pkg-card-desc {
  color: var(--vp-c-text-2);
  line-height: 1.65;
  font-size: 0.9rem;
  flex: 1;
  margin: 0 0 16px;
}

.pkg-card-cta {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-brand-3);
}

.pkg-card:hover .pkg-card-cta {
  text-decoration: underline;
}

/* ---- Coming soon (not a card) ---- */
.coming-soon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  border: 1px dashed var(--vp-c-border);
  background: transparent;
  padding: 40px 28px;
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
}

.coming-soon-label {
  font-family: 'Optima', 'Palatino', 'Book Antiqua', 'Georgia', serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 6px;
}

/* ---- SVG fills ---- */
.pkg-tspan-gold {
  fill: #b88b4a;
}
.pkg-tspan-dark {
  fill: #171717;
}
.dark .pkg-tspan-gold {
  fill: #d7bd8b;
}
.dark .pkg-tspan-dark {
  fill: #f5f1e8;
}
</style>

<section id="packages" class="packages-section">
  <h2 class="packages-heading">Packages</h2>
</section>

<div class="packages-grid">
  <a class="pkg-card" href="/filament-translation-suite/">
    <svg class="pkg-card-title-svg" viewBox="0 0 290 32" xmlns="http://www.w3.org/2000/svg">
      <text y="24">
        <tspan class="pkg-tspan-gold" font-family="Optima, Palatino, 'Book Antiqua', Georgia, serif" font-size="26" font-weight="600" letter-spacing="-0.5">Filament</tspan>
        <tspan class="pkg-tspan-dark" font-family="Optima, Palatino, 'Book Antiqua', Georgia, serif" font-size="26" font-weight="600" letter-spacing="-0.5" dx="6">Translation Suite</tspan>
      </text>
    </svg>
    <p class="pkg-card-desc">The only professional-grade translation management system built natively for Laravel Filament. Unify lang/ files and Spatie translatable models with DeepL, Google Translate, ChatGPT &amp; Claude.</p>
    <span class="pkg-card-cta">View Documentation →</span>
  </a>

  <div class="coming-soon">
    <span class="coming-soon-label">More Coming Soon</span>
    <span>New tools for the Filament & Laravel ecosystem.</span>
  </div>
</div>
