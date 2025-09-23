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
  // Main documentation sidebar with version filtering
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
        'capabilities/01-App-Infrastructure/index',
        'capabilities/02-Visualization-Map-Layer/index',
        'capabilities/03-Access/index',
        'capabilities/04-Identity/index',
        'capabilities/05-Practice/index',
        'capabilities/06-Engagement-Notifications/index',
        'capabilities/07-Masters-Practices/index',
        'capabilities/08-AWAY-Streaks/index',
        'capabilities/09-Gamification-Rewards/index',
        'capabilities/10-Product-Analytics/index',
        'capabilities/11-Customer-Support/index',
        'capabilities/12-Distribution/index',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        'features/intro',
        {
          type: 'category',
          label: 'App Infrastructure',
          items: [
            'features/app-infrastructure/intro',
            'features/app-infrastructure/push-notifications',
            'features/app-infrastructure/setup-backend-infrastructure',
            'features/app-infrastructure/app-architecture-base',
            'features/app-infrastructure/localization-management',
            'features/app-infrastructure/admin-area-cms',
            'features/app-infrastructure/layout-menu',
            'features/app-infrastructure/paid-subscription-profile',
          ],
        },
        {
          type: 'category',
          label: 'Visualization & Map Layer',
          items: [
            'features/visualization-map-layer/intro',
            'features/visualization-map-layer/light-ignition',
            'features/visualization-map-layer/globe',
            'features/visualization-map-layer/awa-soul',
            'features/visualization-map-layer/awa-pulse-basic',
            'features/visualization-map-layer/total-user-counter',
            'features/visualization-map-layer/prototype-3d-map-fps',
            'features/visualization-map-layer/masters-globe-planet-soul',
          ],
        },
        {
          type: 'category',
          label: 'Access',
          items: [
            'features/access/intro',
          ],
        },
        {
          type: 'category',
          label: 'Identity',
          items: [
            'features/identity/intro',
          ],
        },
        {
          type: 'category',
          label: 'Practice',
          items: [
            'features/practice/intro',
          ],
        },
        {
          type: 'category',
          label: 'Engagement & Notifications',
          items: [
            'features/engagement-notifications/intro',
          ],
        },
        {
          type: 'category',
          label: 'Masters Practices',
          items: [
            'features/masters-practices/intro',
          ],
        },
        {
          type: 'category',
          label: 'AWAWAY (Streaks)',
          items: [
            'features/away-streaks/intro',
          ],
        },
        {
          type: 'category',
          label: 'Gamification & Rewards',
          items: [
            'features/gamification-rewards/intro',
          ],
        },
        {
          type: 'category',
          label: 'Product Analytics',
          items: [
            'features/product-analytics/intro',
          ],
        },
        {
          type: 'category',
          label: 'Customer Support',
          items: [
            'features/customer-support/intro',
          ],
        },
        {
          type: 'category',
          label: 'Distribution',
          items: [
            'features/distribution/intro',
          ],
        },
        'features/template',
      ],
    },
  ],
};

export default sidebars;
