import React, {ReactElement} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import FooterShader from '@site/src/components/FooterShader';

import styles from './styles.module.css';

type FooterLink = {
  title: string;
  to: string;
};

type FooterSection = {
  label: string;
  links: FooterLink[];
};

const footerSections: FooterSection[] = [
  {
    label: 'Product',
    links: [
      {title: 'Versions', to: '/docs/versions/1.0-ignition/intro'},
      {title: 'Features', to: '/docs/features/intro'},
      {title: 'Capabilities', to: '/docs/capabilities/01-App-Infrastructure/index'},
    ],
  },
  {
    label: 'Templates',
    links: [
      {title: 'Capability Template', to: '/docs/product-templates/capability-template'},
      {title: 'Feature Template', to: '/docs/product-templates/feature-template'},
      {title: 'Version Template', to: '/docs/product-templates/version-template'},
    ],
  },
];

export default function Footer(): ReactElement {
  const logoUrl = useBaseUrl('img/awa-logo.svg');
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.shaderLayer} aria-hidden="true">
        <FooterShader />
      </div>
      <div className={styles.glow} />
      <div className={styles.inner}>
        <div className={styles.brandColumn}>
          <img src={logoUrl} alt="AWATERRA" className={styles.logo} />
          <p className={styles.tagline}>
            A living guide for the AWATERRA mindfulness platform. Track versions, share knowledge, and align teams.
          </p>
        </div>
        <div className={styles.linksGrid}>
          {footerSections.map((section) => (
            <div key={section.label} className={styles.section}>
              <h3 className={styles.sectionLabel}>{section.label}</h3>
              <ul className={styles.sectionList}>
                {section.links.map((link) => (
                  <li key={link.title}>
                    <Link className={styles.sectionLink} to={link.to}>
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span className={styles.copyright}>© {year} AWATERRA. All rights reserved.</span>
        <span className={styles.footerNote}>Built in mindful motion · Documentation v0.1</span>
      </div>
    </footer>
  );
}
