import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import {readFeatureMetadata, type FeatureMetadata} from './utils/featureMetadata';

const fallbackMetadata: FeatureMetadata = {
  featureMapping: {},
  capabilityMapping: {},
  versionDocMapping: {},
};

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// Read feature metadata to dynamically generate sidebar
const {featureMapping, capabilityMapping, versionDocMapping} = (() => {
  try {
    return readFeatureMetadata();
  } catch (error) {
    console.error('Failed to read feature metadata for sidebar generation:', error);
    return fallbackMetadata;
  }
})();

// Group features by capability
const featuresByCapability: Record<string, string[]> = {};
Object.entries(featureMapping).forEach(([featurePath, metadata]) => {
  const capability = metadata.capability;
  if (!featuresByCapability[capability]) {
    featuresByCapability[capability] = [];
  }
  featuresByCapability[capability].push(featurePath);
});

// Sort features within each capability by position
Object.keys(featuresByCapability).forEach(capability => {
  featuresByCapability[capability].sort((a, b) => {
    const posA = featureMapping[a]?.position || 999;
    const posB = featureMapping[b]?.position || 999;
    return posA - posB;
  });
});

const versionDocs = Object.entries(versionDocMapping)
  .map(([docPath, info]) => ({
    docPath,
    position: info.position ?? 999,
  }))
  .sort((a, b) => {
    if (a.position !== b.position) {
      return a.position - b.position;
    }
    return a.docPath.localeCompare(b.docPath);
  });

const templateDocs = [
  'product-templates/capability-template',
  'product-templates/feature-template',
  'product-templates/version-template',
];

const sidebars: SidebarsConfig = {
  // Main documentation sidebar with dynamic filtering
  tutorialSidebar: [
    ...(versionDocs.length > 0
      ? [{
          type: 'category' as const,
          label: 'Product Versions',
          items: versionDocs.map(version => version.docPath),
          collapsed: false,
        }]
      : []),
    // Features grouped by capabilities - dynamically generated from frontmatter metadata
    ...Object.entries(capabilityMapping)
      .filter(([capabilityKey]) => featuresByCapability[capabilityKey] && featuresByCapability[capabilityKey].length > 0)
      .map(([capabilityKey, capabilityInfo]) => ({
        type: 'category' as const,
        label: capabilityInfo.label,
        items: featuresByCapability[capabilityKey],
      })),
  ],
  templatesSidebar: [{
    type: 'category',
    label: 'Product Templates',
    collapsed: false,
    items: templateDocs,
  }],
};

export default sidebars;
