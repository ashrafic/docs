import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function FtsTitleSvg() {
  return (
    <svg viewBox="0 0 290 32" xmlns="http://www.w3.org/2000/svg" style={{ height: 30, width: 'auto' }}>
      <text y="24" fontFamily="Optima, Palatino, 'Book Antiqua', Georgia, serif" fontSize="26" fontWeight="600" letterSpacing="-0.5">
        <tspan fill="#b88b4a">Filament</tspan>
        <tspan fill="var(--ifm-font-color-base)" dx="6">Translation Suite</tspan>
      </text>
    </svg>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Documentation" description={siteConfig.tagline}>
      {/* Hero */}
      <div style={{
        textAlign: 'center',
        padding: '120px 24px 100px',
        position: 'relative',
        overflow: 'hidden',
        background: `
          radial-gradient(ellipse 90% 70% at 50% 0%, rgba(184,139,74,0.08) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 20% 100%, rgba(18,53,47,0.06) 0%, transparent 55%),
          radial-gradient(ellipse 60% 50% at 80% 100%, rgba(18,53,47,0.04) 0%, transparent 55%),
          var(--ifm-background-color)
        `,
      }}>
        {/* Grid pattern overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(184,139,74,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(184,139,74,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto' }}>
          <h1 style={{
            fontFamily: "Optima, Palatino, 'Book Antiqua', Georgia, serif",
            fontSize: 'clamp(3rem, 6vw, 4.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            margin: '0 0 8px',
            background: 'linear-gradient(120deg, #12352f 30%, #b88b4a)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Documentation
          </h1>
          <p style={{
            fontFamily: "Optima, Palatino, 'Book Antiqua', Georgia, serif",
            fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
            fontWeight: 500,
            color: 'var(--ifm-color-secondary-darkest)',
            lineHeight: 1.4,
            margin: '0 0 12px',
          }}>
            {siteConfig.tagline}
          </p>
          <p style={{
            fontSize: '0.95rem',
            lineHeight: 1.7,
            color: 'var(--ifm-color-secondary-darkest)',
            maxWidth: 480,
            margin: '0 auto',
          }}>
            Explore our open-source and premium packages — built for developers who ship.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 28, flexWrap: 'wrap' }}>
            <Link className="button button--primary" to="#packages" style={{ borderRadius: 8, fontWeight: 600, padding: '0 24px', lineHeight: '46px', fontSize: '0.95rem', whiteSpace: 'nowrap', background: 'linear-gradient(135deg, #12352f 0%, #31594f 100%)', border: 'none' }}>
              Explore Packages
            </Link>
            <Link className="button button--outline" href="https://ashraficlabs.com" style={{ borderRadius: 8, fontWeight: 600, padding: '0 24px', lineHeight: '46px', fontSize: '0.95rem', whiteSpace: 'nowrap', color: '#b88b4a', borderColor: '#b88b4a' }}>
              Visit Site →
            </Link>
          </div>
        </div>
      </div>

      {/* Packages */}
      <div id="packages" style={{ padding: '10px 1.5rem 30px' }}>
        <h2 style={{
          textAlign: 'center',
          fontFamily: "Optima, Palatino, 'Book Antiqua', Georgia, serif",
          fontSize: '3rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          margin: '0 0 2.5rem',
          textDecoration: 'underline',
          textDecorationColor: '#b88b4a',
          textUnderlineOffset: 8,
          textDecorationThickness: 2,
          color: 'var(--ifm-font-color-base)',
        }}>
          Packages
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 20,
          maxWidth: 1040,
          margin: '0 auto 4rem',
          width: '100%',
        }}>
          {/* FTS Card */}
          <Link to="/filament-translation-suite" style={{
            display: 'flex', flexDirection: 'column',
            borderRadius: 14,
            border: '1px solid var(--ifm-color-emphasis-300)',
            background: 'var(--ifm-card-background-color)',
            padding: '28px 28px 24px',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
          }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(18,53,47,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = '#b88b4a'; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; (e.currentTarget as HTMLElement).style.borderColor = ''; }}
          >
            <FtsTitleSvg />
            <p style={{ color: 'var(--ifm-color-secondary-darkest)', lineHeight: 1.65, fontSize: '0.9rem', flex: 1, margin: '14px 0 16px' }}>
              The only professional-grade translation management system built natively for Laravel Filament. Unify lang/ files and Spatie translatable models with DeepL, Google Translate, ChatGPT & Claude.
            </p>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#b88b4a' }}>View Documentation →</span>
          </Link>

          {/* Coming Soon */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            borderRadius: 14,
            border: '1px dashed var(--ifm-color-emphasis-300)',
            background: 'transparent',
            padding: '40px 28px',
            textAlign: 'center',
            color: 'var(--ifm-color-secondary-darkest)',
            fontSize: '0.9rem',
          }}>
            <span style={{ fontFamily: "Optima, Palatino, 'Book Antiqua', Georgia, serif", fontSize: '1.2rem', fontWeight: 600, color: 'var(--ifm-color-secondary-darkest)', marginBottom: 6 }}>
              More Coming Soon
            </span>
            <span>New tools for the Filament & Laravel ecosystem.</span>
          </div>
        </div>
      </div>

      {/* Smooth scroll */}
      <style>{`html { scroll-behavior: smooth; }`}</style>
    </Layout>
  );
}
