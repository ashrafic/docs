import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

function FtsTitleSvg() {
  return (
    <ThemedImage
      sources={{
        light: useBaseUrl('/img/filament-translation-suite/title.svg'),
        dark: useBaseUrl('/img/filament-translation-suite/title-dark.svg'),
      }}
      alt="Filament Translation Suite"
      className="pkg-card-title-svg"
    />
  );
}

const cardHover = (e: React.MouseEvent<HTMLAnchorElement>, on: boolean) => {
  const el = e.currentTarget;
  el.style.transform = on ? 'translateY(-3px)' : '';
  el.style.boxShadow = on ? '0 12px 32px rgba(18,53,47,0.1)' : '';
  el.style.borderColor = on ? '#b88b4a' : '';
};

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Documentation" description={siteConfig.tagline}>
      <div className="home-hero">
        <div className="home-hero-grid" />
        <div className="home-hero-inner">
          <h1 className="home-hero-title">Documentation</h1>
          <p className="home-hero-subtitle">{siteConfig.tagline}</p>
          <p className="home-hero-tagline">Explore our open-source and premium packages — built for developers who ship.</p>
          <div className="home-hero-actions">
            <Link className="home-btn home-btn-brand" to="#packages">Explore Packages</Link>
            <Link className="home-btn home-btn-outline" href="https://ashraficlabs.com">Visit Site →</Link>
          </div>
        </div>
      </div>

      <div id="packages" className="home-packages-section">
        <h2 className="home-packages-heading">Packages</h2>
        <div className="home-packages-grid">
          <Link className="pkg-card" to="/filament-translation-suite"
            onMouseOver={e => cardHover(e, true)}
            onMouseOut={e => cardHover(e, false)}>
            <FtsTitleSvg />
            <p className="pkg-card-desc">Translate both file-based strings and database content — all from one Filament panel. Track coverage with a complete overview. Bulk-translate thousands of keys. Powered by DeepL, Google Translate, ChatGPT &amp; Claude.</p>
            <span className="pkg-card-cta">View Documentation →</span>
          </Link>

          <div className="coming-soon">
            <span className="coming-soon-label">More Coming Soon</span>
            <span>New tools for the Filament &amp; Laravel ecosystem.</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
