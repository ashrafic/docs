import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';

export type HeroSlide = { src: string; alt: string };

const defaultSlides: HeroSlide[] = [
  { src: '/filament-translation-suite/assets/screenshots/sys_trans_list.png', alt: 'System Translations List' },
  { src: '/filament-translation-suite/assets/screenshots/content_trans_page.png', alt: 'Content Translation Page' },
  { src: '/filament-translation-suite/assets/screenshots/health_dashboard.png', alt: 'Health Dashboard' },
  { src: '/filament-translation-suite/assets/screenshots/translatable_fields_tabs.png', alt: 'Translatable Fields Tabs' },
  { src: '/filament-translation-suite/assets/screenshots/translatable_fields_stack.png', alt: 'Translatable Fields Stack' },
  { src: '/filament-translation-suite/assets/screenshots/trans_fields_fieldset.png', alt: 'Translatable Fields Fieldset' },
  { src: '/filament-translation-suite/assets/screenshots/lang_switcher.png', alt: 'Language Switcher' },
  { src: '/filament-translation-suite/assets/screenshots/trans_backup.png', alt: 'Translation Backups' },
];

export default function HeroSlider({ slides = defaultSlides }: { slides?: HeroSlide[] }) {
  const [failed, setFailed] = useState<Set<number>>(new Set());
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const ratiosRef = useRef<number[]>([]);

  const activeIdx = useMemo(
    () => slides.map((_, i) => i).filter(i => !failed.has(i)),
    [slides, failed],
  );

  const next = useCallback(
    () => setCurrent(c => (activeIdx.length ? (c + 1) % activeIdx.length : 0)),
    [activeIdx.length],
  );
  const prev = useCallback(
    () => setCurrent(c => (activeIdx.length ? (c - 1 + activeIdx.length) % activeIdx.length : 0)),
    [activeIdx.length],
  );

  const updateHeight = useCallback(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const ratio = ratiosRef.current[current];
    if (ratio) {
      vp.style.height = `${vp.clientWidth / ratio}px`;
    }
  }, [current]);

  useEffect(() => {
    if (current >= activeIdx.length) setCurrent(0);
  }, [activeIdx.length, current]);

  useEffect(() => {
    if (activeIdx.length < 2) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [next, activeIdx.length]);

  useEffect(() => { updateHeight(); }, [current, updateHeight]);

  useEffect(() => {
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [updateHeight]);

  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setLightbox(null);
        if (e.key === 'ArrowRight') setLightbox(l => l !== null && activeIdx.length ? (l + 1) % activeIdx.length : null);
        if (e.key === 'ArrowLeft') setLightbox(l => l !== null && activeIdx.length ? (l - 1 + activeIdx.length) % activeIdx.length : null);
      };
      window.addEventListener('keydown', onKey);
      return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
    }
  }, [lightbox, activeIdx.length]);

  const handleImgLoad = (i: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    ratiosRef.current[i] = img.naturalWidth / img.naturalHeight;
    if (i === current) updateHeight();
  };

  const handleImgError = (i: number) => {
    setFailed(prev => {
      const n = new Set(prev);
      n.add(i);
      return n;
    });
  };

  if (activeIdx.length === 0) {
    return <div className="hero-slider hero-slider-empty" aria-hidden="true" />;
  }

  const slideAt = (pos: number) => slides[activeIdx[pos]];

  return (
    <div className="hero-slider">
      <div className="hero-slider-viewport" ref={viewportRef}>
        <div className="hero-slider-track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {activeIdx.map((slideIdx, pos) => {
            const s = slides[slideIdx];
            return (
              <div key={slideIdx} className="hero-slide" onClick={() => setLightbox(pos)}>
                <img src={s.src} alt={s.alt} loading="lazy" onLoad={e => handleImgLoad(pos, e)} onError={() => handleImgError(slideIdx)} />
                <div className="hero-slide-overlay">
                  <svg className="hero-slide-zoom" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
        {activeIdx.length > 1 && (
          <>
            <button className="hero-slider-btn hero-slider-prev" onClick={prev} aria-label="Previous">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className="hero-slider-btn hero-slider-next" onClick={next} aria-label="Next">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </>
        )}
      </div>
      {activeIdx.length > 1 && (
        <div className="hero-slider-dots">
          {activeIdx.map((slideIdx, pos) => (
            <button key={slideIdx} className={'hero-slider-dot' + (pos === current ? ' active' : '')} onClick={() => setCurrent(pos)} aria-label={`Go to slide ${pos + 1}`} />
          ))}
        </div>
      )}

      {lightbox !== null && (
        <div className="hero-lightbox" onClick={() => setLightbox(null)}>
          <div className="hero-lightbox-backdrop" />
          <div className="hero-lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={slideAt(lightbox).src} alt={slideAt(lightbox).alt} />
            <p className="hero-lightbox-caption">{slideAt(lightbox).alt}</p>
          </div>
          <button className="hero-lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <button className="hero-lightbox-nav hero-lightbox-prev" onClick={e => { e.stopPropagation(); setLightbox(l => l !== null && activeIdx.length ? (l - 1 + activeIdx.length) % activeIdx.length : null); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button className="hero-lightbox-nav hero-lightbox-next" onClick={e => { e.stopPropagation(); setLightbox(l => l !== null && activeIdx.length ? (l + 1) % activeIdx.length : null); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
          <div className="hero-lightbox-counter">{lightbox + 1} / {activeIdx.length}</div>
        </div>
      )}
    </div>
  );
}
