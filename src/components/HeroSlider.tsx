import React, { useState, useEffect, useCallback } from 'react';

const slides = [
  { src: '/filament-translation-suite/assets/screenshots/sys_trans_list.png', alt: 'System Translations List' },
  { src: '/filament-translation-suite/assets/screenshots/content_trans_page.png', alt: 'Content Translation Page' },
  { src: '/filament-translation-suite/assets/screenshots/health_dashboard.png', alt: 'Health Dashboard' },
  { src: '/filament-translation-suite/assets/screenshots/translatable_fields_tabs.png', alt: 'Translatable Fields Tabs' },
  { src: '/filament-translation-suite/assets/screenshots/translatable_fields_stack.png', alt: 'Translatable Fields Stack' },
  { src: '/filament-translation-suite/assets/screenshots/trans_fields_fieldset.png', alt: 'Translatable Fields Fieldset' },
  { src: '/filament-translation-suite/assets/screenshots/lang_switcher.png', alt: 'Language Switcher' },
  { src: '/filament-translation-suite/assets/screenshots/trans_backup.png', alt: 'Translation Backups' },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [next]);

  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setLightbox(null);
        if (e.key === 'ArrowRight') setLightbox(l => l !== null ? (l + 1) % slides.length : null);
        if (e.key === 'ArrowLeft') setLightbox(l => l !== null ? (l - 1 + slides.length) % slides.length : null);
      };
      window.addEventListener('keydown', onKey);
      return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
    }
  }, [lightbox]);

  return (
    <div className="hero-slider">
      <div className="hero-slider-viewport">
        <div className="hero-slider-track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {slides.map((s, i) => (
            <div key={i} className="hero-slide" onClick={() => setLightbox(i)}>
              <img src={s.src} alt={s.alt} loading="lazy" />
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
        {slides.map((_, i) => (
          <button key={i} className={'hero-slider-dot' + (i === current ? ' active' : '')} onClick={() => setCurrent(i)} aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>

      {lightbox !== null && (
        <div className="hero-lightbox" onClick={() => setLightbox(null)}>
          <div className="hero-lightbox-backdrop" />
          <div className="hero-lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={slides[lightbox].src} alt={slides[lightbox].alt} />
            <p className="hero-lightbox-caption">{slides[lightbox].alt}</p>
          </div>
          <button className="hero-lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <button className="hero-lightbox-nav hero-lightbox-prev" onClick={e => { e.stopPropagation(); setLightbox(l => l !== null ? (l - 1 + slides.length) % slides.length : null); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button className="hero-lightbox-nav hero-lightbox-next" onClick={e => { e.stopPropagation(); setLightbox(l => l !== null ? (l + 1) % slides.length : null); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
          <div className="hero-lightbox-counter">{lightbox + 1} / {slides.length}</div>
        </div>
      )}
    </div>
  );
}
