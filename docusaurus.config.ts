import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'AWATERRA Documentation',
  tagline: 'Your guide to the AWATERRA platform - Connect with the world through mindful practices',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://lyfar.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/awa-docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'lyfar', // Usually your GitHub org/user name.
  projectName: 'awa-docs', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],

  markdown: {
    mermaid: true,
  },

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'AWATERRA Docs',
      logo: {
        alt: 'AWATERRA Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'dropdown',
          label: 'Version',
          position: 'right',
          items: [
            {
              label: '0.1 Photon (MVP)',
              href: '/docs/versions/0.1-photon/intro',
            },
            {
              label: '0.2 Spark (Advanced Practices)',
              href: '/docs/versions/0.2-spark/intro',
            },
            {
              label: '0.3 Ember (Basic Masters)',
              href: '/docs/versions/0.3-ember/intro',
            },
            {
              label: '0.4 Flicker (AWA Units)',
              href: '/docs/versions/0.4-flicker/intro',
            },
            {
              label: '0.5 Glow (AWAWAY Streaks)',
              href: '/docs/versions/0.5-glow/intro',
            },
            {
              label: '0.6 Ray (Basic Missions)',
              href: '/docs/versions/0.6-ray/intro',
            },
            {
              label: '0.7 INT Beam (Advanced Features)',
              href: '/docs/versions/0.7-int-beam/intro',
            },
            {
              label: '0.8 INT Flame (Advanced Features)',
              href: '/docs/versions/0.8-int-flame/intro',
            },
            {
              label: '0.9 INT Blaze (Advanced Features)',
              href: '/docs/versions/0.9-int-blaze/intro',
            },
            {
              label: '1.0 Ignition (Full Platform)',
              href: '/docs/versions/1.0-ignition/intro',
            },
          ],
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Capabilities',
              to: '/docs/capabilities/intro',
            },
            {
              label: 'Features',
              to: '/docs/features/intro',
            },
            {
              label: 'Roadmap',
              to: '/docs/roadmap/intro',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AWATERRA Documentation.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
  } satisfies Preset.ThemeConfig,
};

export default config;