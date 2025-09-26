import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const isVercelDeployment = Boolean(process.env.VERCEL);
const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;
const siteUrl = process.env.SITE_URL ?? vercelUrl ?? 'https://lyfar.github.io';
const baseUrl = process.env.BASE_URL ?? (isVercelDeployment ? '/' : '/awa-docs/');

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
  url: siteUrl,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl,

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

  plugins: [require.resolve('./plugins/gitLastUpdated.js')],

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
        src: 'img/awa-logo.svg',
        srcDark: 'img/awa-logo-dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Requirements',
        },
        {
          type: 'docSidebar',
          sidebarId: 'wikiSidebar',
          position: 'left',
          label: 'Wiki',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Product',
          items: [
            {label: 'Versions', to: '/docs/versions/1.0-ignition/intro'},
            {label: 'Features', to: '/docs/features/intro'},
            {label: 'Capabilities', to: '/docs/capabilities/01-App-Infrastructure/index'},
          ],
        },
        {
          title: 'Wiki',
          items: [
            {label: 'Overview', to: '/docs/wiki/index'},
            {label: 'Practices Catalogue', to: '/docs/wiki/practices/'},
            {label: 'Capability Template', to: '/docs/wiki/templates/capability-template'},
            {label: 'Feature Template', to: '/docs/wiki/templates/feature-template'},
            {label: 'Version Template', to: '/docs/wiki/templates/version-template'},
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
      options: {
        securityLevel: 'loose',
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
