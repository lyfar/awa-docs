import type {CSSProperties, ReactNode} from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Prism from '@site/src/components/Prism';
import {StarBorder} from '@site/src/components/StarBorder';

const heroStyles: CSSProperties = {
  minHeight: '100vh',
  padding: '6rem 1.5rem 4rem',
  textAlign: 'left',
  background: 'var(--ifm-background-color)',
  color: '#201a2e',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
};

const heroContentStyles: CSSProperties = {
  position: 'relative',
  zIndex: 1,
  maxWidth: '820px',
  margin: '0 auto 0 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  textAlign: 'left',
  alignItems: 'flex-start',
};

export default function Home(): ReactNode {
  const versionsUrl = useBaseUrl('docs/versions/1.0-ignition/intro');

  return (
    <Layout>
      <Head>
        <meta property="og:title" content="AWATERRA Product Guide" />
        <meta
          property="og:description"
          content="Explore the AWATERRA roadmap, product capabilities, and feature documentation."
        />
      </Head>
      <header className="awa-hero" style={heroStyles}>
        <Prism
          animationType="rotate"
          glow={2.1}
          bloom={1.35}
          scale={3.2}
          noise={0.12}
          hueShift={0.45}
          colorFrequency={0.85}
          timeScale={0.45}
          className="awa-hero-prism"
        />
        <div style={heroContentStyles}>
          <div className="awa-hero-badge">Product Strategy · Live Source</div>
          <h1 className="awa-hero-title">Shape every AWATERRA release with intent</h1>
          <p className="awa-hero-lede">
            One master reference for the platform: versions, capabilities, and feature specs captured in a voice that
            keeps product, design, and engineering breathing together.
          </p>
          <div className="awa-hero-ctaGroup">
            <StarBorder
              as={Link}
              to={versionsUrl}
              className="awa-cta"
              contentClassName="button button--secondary button--lg"
            >
              Browse Documentation
            </StarBorder>
          </div>
        </div>
      </header>
    </Layout>
  );
}
