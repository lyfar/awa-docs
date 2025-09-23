import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Main documentation sidebar with dynamic filtering
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Version Roadmap',
      items: [
        'versions/intro',
        'versions/0.1-photon/intro',
        'versions/0.2-spark/intro',
        'versions/0.3-ember/intro',
        'versions/0.4-flicker/intro',
        'versions/0.5-glow/intro',
        'versions/0.6-ray/intro',
        'versions/0.7-int-beam/intro',
        'versions/0.8-int-flame/intro',
        'versions/0.9-int-blaze/intro',
        'versions/1.0-ignition/intro',
      ],
    },
    {
      type: 'category',
      label: 'Capabilities',
      items: [
        'capabilities/intro',
        'capabilities/App-Infrastructure/index',
        'capabilities/Visualization-Map-Layer/index',
        'capabilities/Access/index',
        'capabilities/Identity/index',
        'capabilities/Practice/index',
        'capabilities/Engagement-Notifications/index',
        'capabilities/Masters-Practices/index',
        'capabilities/AWAY-Streaks/index',
        'capabilities/Gamification-Rewards/index',
        'capabilities/Product-Analytics/index',
        'capabilities/Customer-Support/index',
        'capabilities/Distribution/index',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        'features/intro',
        'features/push-notifications',
        'features/setup-backend-infrastructure',
        'features/app-architecture-base',
        'features/localization-management',
        'features/admin-area-cms',
        'features/layout-menu',
        'features/paid-subscription-profile',
        'features/light-ignition',
        'features/globe',
        'features/awa-soul',
        'features/awa-pulse-basic',
        'features/total-user-counter',
        'features/prototype-3d-map-fps',
        'features/masters-globe-planet-soul',
        'features/template',
      ],
    },
  ],
};

export default sidebars;
