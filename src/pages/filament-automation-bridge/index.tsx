import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { Zap, GlobeLock, Filter, CodeXml, BarChart3, History, ShieldCheck, CopyCheck, Wrench } from 'lucide-react';

const fabSlides = [
  { src: '/filament-automation-bridge/assets/screenshots/triggers_list.png', alt: 'Triggers Dashboard' },
  { src: '/filament-automation-bridge/assets/screenshots/trigger_create_top.png', alt: 'Create Trigger — Configuration' },
  { src: '/filament-automation-bridge/assets/screenshots/trigger_create_bottom.png', alt: 'Create Trigger — Destination & Payload' },
  { src: '/filament-automation-bridge/assets/screenshots/trigger_edit_top.png', alt: 'Test Connection' },
  { src: '/filament-automation-bridge/assets/screenshots/templates_list.png', alt: 'Templates List' },
  { src: '/filament-automation-bridge/assets/screenshots/delivery_log_list.png', alt: 'Delivery Log' },
  { src: '/filament-automation-bridge/assets/screenshots/delivery_log_details.png', alt: 'Delivery Details' },
];

function FabHeroSlider() {
  const [current, setCurrent] = React.useState(0);
  const [lightbox, setLightbox] = React.useState<number | null>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const ratiosRef = React.useRef<number[]>([]);

  const next = React.useCallback(() => setCurrent(c => (c + 1) % fabSlides.length), []);
  const prev = React.useCallback(() => setCurrent(c => (c - 1 + fabSlides.length) % fabSlides.length), []);

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
        if (e.key === 'ArrowRight') setLightbox(l => l !== null ? (l + 1) % fabSlides.length : null);
        if (e.key === 'ArrowLeft') setLightbox(l => l !== null ? (l - 1 + fabSlides.length) % fabSlides.length : null);
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
          {fabSlides.map((s, i) => (
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
        {fabSlides.map((_, i) => (
          <button key={i} className={'hero-slider-dot' + (i === current ? ' active' : '')} onClick={() => setCurrent(i)} aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>

      {lightbox !== null && (
        <div className="hero-lightbox" onClick={() => setLightbox(null)}>
          <div className="hero-lightbox-backdrop" />
          <div className="hero-lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={fabSlides[lightbox].src} alt={fabSlides[lightbox].alt} />
            <p className="hero-lightbox-caption">{fabSlides[lightbox].alt}</p>
          </div>
          <button className="hero-lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <button className="hero-lightbox-nav hero-lightbox-prev" onClick={e => { e.stopPropagation(); setLightbox(l => l !== null ? (l - 1 + fabSlides.length) % fabSlides.length : null); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button className="hero-lightbox-nav hero-lightbox-next" onClick={e => { e.stopPropagation(); setLightbox(l => l !== null ? (l + 1) % fabSlides.length : null); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
          <div className="hero-lightbox-counter">{lightbox + 1} / {fabSlides.length}</div>
        </div>
      )}
    </div>
  );
}

const features = [
  { Icon: Zap, title: 'Six Trigger Types', desc: 'Model events (created, updated, deleted), status transitions, schedules (every minute to custom cron), date conditions (X days before/after), manual buttons, and any Laravel event class. If it happens in your app, it can trigger an automation.' },
  { Icon: GlobeLock, title: 'Multi-Platform Destinations', desc: 'Send to Zapier, Make, n8n, or any custom webhook endpoint. Each platform auto-formats the payload and uses native auth — API keys, Basic Auth, Bearer tokens, or HMAC signing. No middleware needed.' },
  { Icon: Filter, title: 'Visual Condition Builder', desc: 'Nine operators including equals, contains, greater/less than, changed, and changed_to. Chain conditions with AND/OR logic. The changed/changed_to operators let you fire only when specific fields actually changed — not on every update.' },
  { Icon: CodeXml, title: 'Smart Payload Builder', desc: 'Three payload modes: hand-picked fields, all model attributes, or custom JSON templates with {{ field }} placeholders. Wildcard relations, eager loading, and automatic exclusion of password-style fields.' },
  { Icon: BarChart3, title: 'Delivery Monitoring', desc: 'Every webhook call is logged with status, HTTP code, response body, and duration. Color-coded success-rate tracking per trigger. Failed deliveries retry with exponential backoff. Bulk retry failed deliveries from the UI.' },
  { Icon: History, title: 'Historical Sync', desc: 'Backfill existing records into any automation. Pick a trigger, choose batch size, and the queue syncs every matching record. Track progress via cache keys. Cancel an in-flight sync with one click.' },
  { Icon: ShieldCheck, title: 'Enterprise Security', desc: 'HMAC-SHA256 payload signing with per-trigger secrets. SSRF prevention blocks internal IP ranges. HTTPS enforced in production. Encrypted secrets at rest. Rate limiting per destination hostname. Sandbox mode for safe testing.' },
  { Icon: CopyCheck, title: 'Reusable Templates', desc: 'Save any trigger configuration as a template and apply it to new models in one click. Built-in templates ship with the package. Perfect for standardizing webhook payloads across your team.' },
  { Icon: Wrench, title: 'Developer Friendly', desc: 'Five artisan commands for install, prune, sync, test, and scheduled processing. Five dispatchable events for extension. HasAutomationTriggers trait for model-level control. Auto-discovers Eloquent models across your app. HTTP method selection per trigger — GET, POST, PUT, PATCH, DELETE.' },
];

export default function FabHome(): JSX.Element {
  return (
    <Layout title="Filament Automation Bridge" description="Turn any Eloquent model event into an automation trigger for Zapier, Make, or n8n — without writing code.">
      {/* Hero */}
      <div className="pkg-hero">
        <div className="pkg-hero-inner">
          <div className="pkg-hero-text">
            <h1 className="pkg-hero-title">
              <span className="pkg-hero-line1">Filament</span>
              <span className="pkg-hero-line2">Automation Bridge</span>
            </h1>
            <p className="pkg-hero-tagline">Every model event. Any automation platform. Zero code.</p>
            <p className="pkg-hero-sub">Open source. MIT licensed.</p>
            <p className="pkg-hero-desc">
              Define triggers from your Filament admin panel and instantly connect Eloquent model events to Zapier, Make, n8n, or any webhook endpoint. Filter with conditions, shape custom payloads, monitor every delivery — all without touching a line of integration code.
            </p>
            <div className="pkg-hero-actions">
              <Link className="pkg-btn pkg-btn-brand" to="/filament-automation-bridge/getting-started">Get Started</Link>
              <Link className="pkg-btn pkg-btn-alt" to="/filament-automation-bridge/features">Explore Features</Link>
              <Link className="pkg-btn pkg-btn-alt" to="/filament-automation-bridge/installation">Installation</Link>
            </div>
          </div>
          <div className="pkg-hero-slider">
            <FabHeroSlider />
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
          And more — Model Discovery, Field Schema Analysis, Sandbox Mode, Rate Limiting, Health Widget, Artisan Commands, translatable UI.{' '}
          <Link to="/filament-automation-bridge/features">See all features →</Link>
        </p>
      </div>
    </Layout>
  );
}
