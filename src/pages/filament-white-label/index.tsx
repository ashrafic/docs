import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import HeroSlider from '@site/src/components/HeroSlider';
import { Palette, LayoutDashboard, Gauge, LogIn, Puzzle, ShieldCheck, Globe, Database, RefreshCw } from 'lucide-react';

const fwlSlides = [
  { src: '/filament-white-label/assets/screenshots/brand-identity.png', alt: 'Brand Identity Settings' },
  { src: '/filament-white-label/assets/screenshots/colors.png', alt: 'Color Configuration' },
  { src: '/filament-white-label/assets/screenshots/typography-style-custom-css.png', alt: 'Typography, Styling & Custom CSS' },
  { src: '/filament-white-label/assets/screenshots/layout-nav-sidebar-display.png', alt: 'Layout, Navigation & Sidebar' },
  { src: '/filament-white-label/assets/screenshots/dimension-footer.png', alt: 'Dimensions & Footer' },
  { src: '/filament-white-label/assets/screenshots/advanced.png', alt: 'Advanced Settings' },
];

function FwlHeroSlider() {
  const [current, setCurrent] = React.useState(0);
  const [lightbox, setLightbox] = React.useState<number | null>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const ratiosRef = React.useRef<number[]>([]);

  const next = React.useCallback(() => setCurrent(c => (c + 1) % fwlSlides.length), []);
  const prev = React.useCallback(() => setCurrent(c => (c - 1 + fwlSlides.length) % fwlSlides.length), []);

  const updateHeight = React.useCallback(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const ratio = ratiosRef.current[current];
    if (ratio) {
      vp.style.height = `${vp.clientWidth / ratio}px`;
    }
  }, [current]);

  React.useEffect(() => {
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [next]);

  React.useEffect(() => { updateHeight(); }, [current, updateHeight]);

  React.useEffect(() => {
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [updateHeight]);

  React.useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setLightbox(null);
        if (e.key === 'ArrowRight') setLightbox(l => l !== null ? (l + 1) % fwlSlides.length : null);
        if (e.key === 'ArrowLeft') setLightbox(l => l !== null ? (l - 1 + fwlSlides.length) % fwlSlides.length : null);
      };
      window.addEventListener('keydown', onKey);
      return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
    }
  }, [lightbox]);

  const handleImgLoad = (i: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    ratiosRef.current[i] = img.naturalWidth / img.naturalHeight;
    if (i === current) updateHeight();
  };

  return (
    <div className="hero-slider">
      <div className="hero-slider-viewport" ref={viewportRef}>
        <div className="hero-slider-track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {fwlSlides.map((s, i) => (
            <div key={i} className="hero-slide" onClick={() => setLightbox(i)}>
              <img src={s.src} alt={s.alt} loading="lazy" onLoad={e => handleImgLoad(i, e)} />
              <div className="hero-slide-overlay">
                <svg className="hero-slide-zoom" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
        <button className="hero-slider-btn hero-slider-prev" onClick={prev} aria-label="Previous">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button className="hero-slider-btn hero-slider-next" onClick={next} aria-label="Next">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
      <div className="hero-slider-dots">
        {fwlSlides.map((_, i) => (
          <button key={i} className={'hero-slider-dot' + (i === current ? ' active' : '')} onClick={() => setCurrent(i)} aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>

      {lightbox !== null && (
        <div className="hero-lightbox" onClick={() => setLightbox(null)}>
          <div className="hero-lightbox-backdrop" />
          <div className="hero-lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={fwlSlides[lightbox].src} alt={fwlSlides[lightbox].alt} />
            <p className="hero-lightbox-caption">{fwlSlides[lightbox].alt}</p>
          </div>
          <button className="hero-lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <button className="hero-lightbox-nav hero-lightbox-prev" onClick={e => { e.stopPropagation(); setLightbox(l => l !== null ? (l - 1 + fwlSlides.length) % fwlSlides.length : null); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button className="hero-lightbox-nav hero-lightbox-next" onClick={e => { e.stopPropagation(); setLightbox(l => l !== null ? (l + 1) % fwlSlides.length : null); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
          <div className="hero-lightbox-counter">{lightbox + 1} / {fwlSlides.length}</div>
        </div>
      )}
    </div>
  );
}

const features = [
  { Icon: Palette, title: 'Complete Brand Control', desc: 'Logo, favicon, brand name, and six color roles — all configurable from a single UI. Palette presets from every Filament color plus custom hex. No code required.' },
  { Icon: LayoutDashboard, title: 'Layout Customization', desc: 'Top bar, top navigation, collapsible sidebar, breadcrumbs, content width, sidebar width, heading size, nav item spacing. Every aspect of the panel chrome.' },
  { Icon: Gauge, title: 'Density & Accessibility', desc: 'Font scale from 90% to 120%, form and table density controls, modal sizing, transition speed. Fine-tune how the panel feels for every user.' },
  { Icon: LogIn, title: 'Branded Login', desc: 'One class swap and the login page renders your logo, brand name, and colors. All native Filament auth features preserved.' },
  { Icon: Puzzle, title: 'Dual-Mode Ready', desc: 'Works with or without multi-tenancy. Single-tenant apps use a global settings record. Add the trait to your tenant model later — it auto-creates settings for existing tenants.' },
  { Icon: ShieldCheck, title: 'Secure by Default', desc: 'Custom CSS sanitized against XSS. File uploads validated and tenant-scoped. All user content escaped before rendering. Cache keys isolated per tenant and panel.' },
  { Icon: Globe, title: '49 Google Fonts', desc: 'Inter, Roboto, Poppins, JetBrains Mono, and 45 more — loaded via CDN. Searchable selector. Inter ships with Filament so there\'s zero cost for the default.' },
  { Icon: Database, title: 'Schema-Free Metadata', desc: 'All settings in one JSON column. Add new settings in future releases without migrations. The config file defines defaults — tenants override what they want.' },
  { Icon: RefreshCw, title: 'Cached & Fast', desc: 'Per-tenant, per-panel cache with automatic invalidation on save. TTL configurable from 0 (no cache) to any duration. Cache keys include tenant morph class, ID, and panel ID.' },
];

export default function FwlHome(): JSX.Element {
  return (
    <Layout title="Filament White Label" description="Total panel rebranding. For you and every tenant. No code.">
      {/* Hero */}
      <div className="pkg-hero">
        <div className="pkg-hero-inner">
          <div className="pkg-hero-text">
            <h1 className="pkg-hero-title">
              <span className="pkg-hero-line1">Filament</span>
              <span className="pkg-hero-line2">White Label</span>
            </h1>
            <p className="pkg-hero-tagline">Total panel rebranding.<br/>For you and every tenant. No code.</p>
            <p className="pkg-hero-sub">Open source. MIT licensed.</p>
            <p className="pkg-hero-desc">
              Logo, colors, fonts, layout, CSS, footer — every tenant gets their own brand. Or rebrand your own portal in a single-tenant setup. Install, add one line to your PanelProvider, done.
            </p>
            <div className="pkg-hero-actions">
              <Link className="pkg-btn pkg-btn-brand" to="/filament-white-label/getting-started">Get Started</Link>
              <Link className="pkg-btn pkg-btn-alt" to="/filament-white-label/features">Explore Features</Link>
              <Link className="pkg-btn pkg-btn-alt" to="/filament-white-label/installation">Installation</Link>
            </div>
          </div>
          <div className="pkg-hero-slider">
            <FwlHeroSlider />
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="pkg-features">
        <div className="pkg-features-grid">
          {features.map((f, i) => {
            const Icon = f.Icon;
            return (
            <div key={i} className="pkg-feature-card">
              <Icon className="pkg-feature-icon" />
              <h3 className="pkg-feature-title">{f.title}</h3>
              <p className="pkg-feature-desc">{f.desc}</p>
            </div>
            );
          })}
        </div>
      </div>

      {/* Feature Banner */}
      <div className="pkg-features-banner">
        <p>
          And more — multi-panel support, footer with custom links, conditional white-labeling, static facade access, granular trait integration, full i18n support.{' '}
          <Link to="/filament-white-label/features">See all features &rarr;</Link>
        </p>
      </div>
    </Layout>
  );
}
