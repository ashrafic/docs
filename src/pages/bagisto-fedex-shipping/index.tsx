import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import HeroSlider from '@site/src/components/HeroSlider';
import { DollarSign, CalendarClock, Boxes, Tags, PackageSearch, MapPinCheck, Timer, LayoutList, ShieldCheck } from 'lucide-react';

const slides = [
  { src: '/bagisto-fedex-shipping/assets/screenshots/checkout.png', alt: 'Live FedEx rates at checkout' },
  { src: '/bagisto-fedex-shipping/assets/screenshots/order-details.png', alt: 'FedEx fulfillment on the admin order screen' },
  { src: '/bagisto-fedex-shipping/assets/screenshots/admin-configure.png', alt: 'FedEx Shipping configuration' },
];

const features = [
  { Icon: DollarSign, title: 'Live FedEx Rates', desc: 'Real FedEx prices at checkout for every service you allow — Ground, Home Delivery, 2Day, Overnight, International. Quoted in real time from the modern FedEx REST API, never guessed from a table.' },
  { Icon: CalendarClock, title: 'Delivery Estimates', desc: 'Each service shows its estimated delivery date right at checkout. Customers pick faster shipping because they can see exactly when it arrives. Toggle it off anytime.' },
  { Icon: Boxes, title: 'Smart Package Packing', desc: 'Cart items are consolidated into weight-capped packages automatically — with store-unit conversion and dimension pass-through for dimensional-weight pricing. Nothing oversize slips through.' },
  { Icon: Tags, title: 'Shipping Labels', desc: 'Create FedEx labels from the admin order screen. PDFs stored on a private disk, postage cost captured per shipment, download and void built in. Tracking number lands on the shipment automatically.' },
  { Icon: PackageSearch, title: 'Tracking', desc: 'Refresh status and scan events for any label straight from the FedEx Track API. Newest-first scan history with locations — know where every parcel is without leaving the admin.' },
  { Icon: MapPinCheck, title: 'Address Validation', desc: 'Check any address against the FedEx database — from the command line or programmatically. Catch bad addresses before they become failed deliveries and residential surcharge surprises.' },
  { Icon: Timer, title: 'Rate Caching', desc: 'Quotes are cached against a full pricing fingerprint — packages, destination, fees, account, mode. Your FedEx API quota stays protected and customers never see a stale price.' },
  { Icon: LayoutList, title: 'Admin Shipments Page', desc: 'Every label with its status, cost, and actions in one place — Sales → FedEx Shipments. ACL-gated like any Bagisto page, so fulfillment staff get exactly the access they need.' },
  { Icon: ShieldCheck, title: 'Never Breaks Checkout', desc: 'On any FedEx failure — outage, timeout, bad credentials — the carrier quietly hides itself and logs the cause. Your checkout keeps selling while FedEx recovers.' },
];

export default function BfsHome(): JSX.Element {
  return (
    <Layout title="Bagisto FedEx Shipping" description="Live FedEx rates, labels, and tracking for Bagisto 2.x.">
      {/* Hero */}
      <div className="pkg-hero">
        <div className="pkg-hero-inner">
          <div className="pkg-hero-text">
            <h1 className="pkg-hero-title">
              <span className="pkg-hero-line1">Bagisto</span>
              <span className="pkg-hero-line2">FedEx Shipping</span>
            </h1>
            <p className="pkg-hero-tagline">Real Rates. Real Labels. Real Tracking.</p>
            <p className="pkg-hero-sub">Buy once. Own forever. No subscriptions.</p>
            <p className="pkg-hero-desc">
              Live FedEx rates at checkout, shipping labels from the admin order screen, tracking and address validation —
              built on the modern FedEx REST API. Sandbox keys are free; go live from the admin panel with no code changes.
            </p>
            <div className="pkg-hero-actions">
              <Link className="pkg-btn pkg-btn-brand" to="/bagisto-fedex-shipping/getting-started">Get Started</Link>
              <Link className="pkg-btn pkg-btn-alt" to="/bagisto-fedex-shipping/features">Explore Features</Link>
              <Link className="pkg-btn pkg-btn-alt" to="/bagisto-fedex-shipping/pricing">View Pricing</Link>
            </div>
          </div>
          <div className="pkg-hero-slider">
            <HeroSlider slides={slides} />
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
          And more — negotiated account rates, handling fees, residential/commercial pricing, 11 service types,
          sandbox-to-production toggle, artisan commands.{' '}
          <Link to="/bagisto-fedex-shipping/features">See all features →</Link>
        </p>
      </div>
    </Layout>
  );
}
