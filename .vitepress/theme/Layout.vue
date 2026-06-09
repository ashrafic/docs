<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HeroSlider from './components/HeroSlider.vue'
import MadeByFooter from './components/MadeByFooter.vue'

const { Layout: BaseLayout } = DefaultTheme
const route = useRoute()

const packages: Record<string, { id: string }> = {
  '/filament-translation-suite/': { id: 'fts' },
}

const isRoot = computed(() => route.path === '/' || route.path === '/index.html')
const isPackagePage = computed(() => !isRoot.value && Object.keys(packages).some(p => route.path.startsWith(p)))

function currentPkgId(): string | null {
  for (const [prefix, pkg] of Object.entries(packages)) {
    if (route.path.startsWith(prefix)) return pkg.id
  }
  return null
}

watch(() => route.path, (path) => {
  const root = path === '/' || path === '/index.html'
  const pkg = currentPkgId()
  document.documentElement.classList.toggle('is-root-page', root)
  document.documentElement.classList.toggle('is-package-page', !root && !!pkg)
  document.documentElement.dataset.package = pkg || ''
}, { immediate: true })
</script>

<template>
  <BaseLayout>
    <!-- Root: desktop nav links -->
    <template #nav-bar-content-before>
      <nav v-if="isRoot" class="root-nav">
        <a class="root-nav-link" href="https://ashraficlabs.com">Main Site →</a>
        <a class="root-nav-link" href="#packages">Our Packages</a>
      </nav>
    </template>

    <!-- Root: mobile nav links -->
    <template #nav-screen-content-before>
      <div v-if="isRoot" class="mobile-nav-links">
        <a class="mobile-nav-link" href="https://ashraficlabs.com">Main Site →</a>
        <a class="mobile-nav-link" href="#packages">Our Packages</a>
      </div>
    </template>

    <!-- Package pages: nav title SVG after logo -->
    <template v-if="isPackagePage" #nav-bar-title-after>
      <a v-if="currentPkgId() === 'fts'" class="pkg-nav-title" href="/filament-translation-suite/">
        <svg class="pkg-title-svg" viewBox="0 0 290 32" xmlns="http://www.w3.org/2000/svg">
          <text y="24">
            <tspan class="pkg-tspan-gold" font-family="Optima, Palatino, 'Book Antiqua', Georgia, serif" font-size="26" font-weight="600" letter-spacing="-0.5">Filament</tspan>
            <tspan class="pkg-tspan-dark" font-family="Optima, Palatino, 'Book Antiqua', Georgia, serif" font-size="26" font-weight="600" letter-spacing="-0.5" dx="6">Translation Suite</tspan>
          </text>
        </svg>
      </a>
    </template>

    <!-- Package pages: custom hero -->
    <template v-if="isPackagePage" #home-hero-after>
      <div v-if="currentPkgId() === 'fts'" class="custom-hero-wrapper">
        <div class="custom-hero">
          <div class="hero-info">
            <h1 class="hero-title">
              <span class="line-filament">Filament</span>
              <span class="line-suite">Translation Suite</span>
            </h1>
            <p class="hero-text">One Suite. Every String. Zero Friction.</p>
            <p class="hero-tagline">
              The only professional-grade translation management system built natively for Laravel Filament.
              Unify file-based UI translations and database-driven content models — with DeepL, Google Translate, ChatGPT &amp; Claude — without ever leaving your admin panel.
            </p>
            <div class="hero-actions">
              <a href="/filament-translation-suite/getting-started" class="VPButton brand">Get Started</a>
              <a href="/filament-translation-suite/features/" class="VPButton alt">Explore Features</a>
              <a href="/filament-translation-suite/pricing" class="VPButton alt">View Pricing</a>
            </div>
          </div>
          <div class="hero-image-slot">
            <HeroSlider />
          </div>
        </div>
      </div>
    </template>

    <!-- Package pages: custom footer -->
    <template v-if="isPackagePage" #layout-bottom>
      <MadeByFooter />
    </template>
  </BaseLayout>
</template>

<style>
/* ---- Root: hide FTS desktop nav, show custom links ---- */
.is-root-page .VPNavBarMenu {
  display: none !important;
}

/* ---- Root mobile: hide config nav items, only show custom links ---- */
.is-root-page .VPNavScreenMenu {
  display: none !important;
}

/* ---- Tablet (768-959px): force hamburger ---- */
@media (min-width: 768px) and (max-width: 959px) {
  .VPNavBarMenu { display: none !important; }
  .VPNavBarHamburger { display: flex !important; }
  .VPNavScreen { display: block !important; }
}

/* ---- Root desktop nav ---- */
.root-nav {
  display: none;
  align-items: center;
  gap: 4px;
}
.is-root-page .root-nav { display: flex; }

.root-nav-link {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  text-decoration: none;
  padding: 0 12px;
  border-radius: 6px;
  line-height: 32px;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.root-nav-link:hover {
  color: var(--vp-c-brand-3);
  background: var(--vp-c-bg-soft);
}
@media (max-width: 959px) {
  .root-nav { display: none !important; }
}

/* ---- Mobile nav (root) ---- */
.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 0;
  border-bottom: 1px solid var(--vp-c-border);
  margin-bottom: 12px;
}
.mobile-nav-link {
  display: block;
  padding: 10px 16px;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.15s ease;
}
.mobile-nav-link:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-3);
}

/* ---- FTS: swap logo to icon-only ---- */
.is-package-page .VPNavBarTitle .title img {
  content: url('https://ashraficlabs.com/brand/ashrafic-labs-icon-primary.svg');
  height: 40px !important;
  width: auto !important;
}

/* ---- Package nav title SVG ---- */
.pkg-nav-title {
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
}
.pkg-title-svg {
  height: 28px;
  width: auto;
  max-width: 100%;
}
@media (max-width: 767px) {
  .pkg-title-svg .pkg-tspan-gold { display: none; }
  .pkg-title-svg { height: 22px; }
}
.pkg-tspan-gold { fill: #b88b4a; }
.pkg-tspan-dark  { fill: #171717; }
.dark .pkg-tspan-gold { fill: #d7bd8b; }
.dark .pkg-tspan-dark  { fill: #f5f1e8; }

/* ---- Package pages: hide default VPHero ---- */
.is-package-page .VPHome .VPHero {
  display: none !important;
}

/* ---- Custom Hero ---- */
.custom-hero-wrapper {
  padding: 48px 24px 64px;
  background: linear-gradient(180deg, var(--vp-c-bg) 0%, var(--vp-c-bg-alt) 100%);
  border-bottom: 1px solid var(--vp-c-border);
}
.custom-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
  max-width: 1200px;
  margin: 0 auto;
}
.hero-info {
  flex: 1;
  max-width: 560px;
}
.hero-title {
  font-family: 'Optima', 'Palatino', 'Book Antiqua', 'Georgia', serif;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0 0 16px;
}
.hero-title .line-filament {
  display: block;
  font-size: clamp(2.8rem, 5.5vw, 4.5rem);
  color: #12352f;
}
.dark .hero-title .line-filament { color: #d7bd8b; }
.hero-title .line-suite {
  display: block;
  font-size: clamp(2rem, 4vw, 3.2rem);
  color: #b88b4a;
}
.dark .hero-title .line-suite { color: #f5f1e8; }
.hero-text {
  font-family: 'Optima', 'Palatino', 'Book Antiqua', 'Georgia', serif;
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin: 0 0 16px;
  letter-spacing: 0.01em;
}
.hero-tagline {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--vp-c-text-3);
  margin: 0 0 28px;
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.hero-actions .VPButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 0 20px;
  line-height: 44px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}
.hero-actions .VPButton.brand {
  background: linear-gradient(135deg, #12352f 0%, #31594f 100%);
  color: #f5f1e8;
}
.hero-actions .VPButton.brand:hover {
  background: linear-gradient(135deg, #1a4d43 0%, #3d6b5f 100%);
}
.hero-actions .VPButton.alt {
  border: 1px solid #b88b4a;
  color: #b88b4a;
  background: transparent;
}
.hero-actions .VPButton.alt:hover {
  background: rgba(184, 139, 74, 0.08);
}
.dark .hero-actions .VPButton.brand {
  background: linear-gradient(135deg, #12352f 0%, #1a3d36 100%);
}
.dark .hero-actions .VPButton.alt {
  border-color: #d7bd8b;
  color: #d7bd8b;
}
.hero-image-slot {
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 640px;
}
@media (max-width: 960px) {
  .custom-hero {
    flex-direction: column;
    text-align: center;
  }
  .hero-info { max-width: 100%; }
  .hero-actions { justify-content: center; }
  .hero-image-slot { max-width: 100%; width: 100%; }
}
@media (max-width: 768px) {
  .custom-hero-wrapper { padding: 32px 20px 48px; }
  .hero-title .line-filament { font-size: 2.4rem; }
  .hero-title .line-suite { font-size: 1.8rem; }
}
.VPHome .VPFeatures { margin-top: 4rem !important; }
</style>
