const fs = require('fs');
const path = require('path');

// Capability mapping (this is static since capabilities don't change)
const capabilityMapping = {
  'app-infrastructure': { label: '01. App Infrastructure', path: 'capabilities/App-Infrastructure/index' },
  'visualization-map-layer': { label: '02. Visualization & Map Layer', path: 'capabilities/Visualization-Map-Layer/index' },
  'access': { label: '03. Access', path: 'capabilities/Access/index' },
  'identity': { label: '04. Identity', path: 'capabilities/Identity/index' },
  'practice': { label: '05. Practice', path: 'capabilities/Practice/index' },
  'engagement-notifications': { label: '06. Engagement & Notifications', path: 'capabilities/Engagement-Notifications/index' },
  'masters-practices': { label: '07. Masters Practices', path: 'capabilities/Masters-Practices/index' },
  'away-streaks': { label: '08. AWAY Streaks', path: 'capabilities/AWAY-Streaks/index' },
  'gamification-rewards': { label: '09. Gamification & Rewards', path: 'capabilities/Gamification-Rewards/index' },
  'product-analytics': { label: '10. Product Analytics', path: 'capabilities/Product-Analytics/index' },
  'customer-support': { label: '11. Customer Support', path: 'capabilities/Customer-Support/index' },
  'distribution': { label: '12. Distribution', path: 'capabilities/Distribution/index' },
};

function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) return {};

  const frontmatter = match[1];
  const result = {};

  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^"|"$/g, '');
      result[key] = value;
    }
  });

  return result;
}

function stripFrontmatter(content) {
  return content.replace(/^---[\s\S]*?---\n?/, '').trimStart();
}

function extractTitle(content) {
  const body = stripFrontmatter(content);
  const headingMatch = body.match(/^#\s+(.+)/m);
  return headingMatch ? headingMatch[1].trim() : undefined;
}

function formatFromSlug(slug) {
  if (!slug) {
    return '';
  }
  return slug
    .split(/[-_]/)
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

function readFeatureMetadata() {
  const docsPath = path.join(__dirname, '../docs');
  const featuresPath = path.join(docsPath, 'features');
  const versionsPath = path.join(docsPath, 'versions');

  const featureMapping = {};
  if (fs.existsSync(featuresPath)) {
    const featureFiles = fs
      .readdirSync(featuresPath)
      .filter(file => file.endsWith('.md') || file.endsWith('.mdx'));

    featureFiles.forEach(file => {
      const filePath = path.join(featuresPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const frontmatter = parseFrontmatter(content);

      const featureKey = `features/${file.replace(/\.mdx?$/, '')}`;

      if (frontmatter.version && frontmatter.capability) {
        const extractedTitle = extractTitle(content);
        const slug = featureKey.split('/').pop();
        const fallbackTitle = frontmatter.sidebar_label || extractedTitle || formatFromSlug(slug);

        featureMapping[featureKey] = {
          version: frontmatter.version,
          capability: frontmatter.capability,
          position: parseInt(frontmatter.sidebar_position || '999', 10),
          title: fallbackTitle,
        };
      }
    });
  } else {
    console.warn('Features directory not found:', featuresPath);
  }

  const versionDocMapping = {};
  if (fs.existsSync(versionsPath)) {
    const versionEntries = fs.readdirSync(versionsPath, {withFileTypes: true});
    versionEntries.forEach(entry => {
      if (!entry.isDirectory()) {
        return;
      }

      const introPathMd = path.join(versionsPath, entry.name, 'intro.md');
      const introPathMdx = path.join(versionsPath, entry.name, 'intro.mdx');
      const introPath = fs.existsSync(introPathMdx) ? introPathMdx : introPathMd;
      if (!introPath || !fs.existsSync(introPath)) {
        return;
      }

      const content = fs.readFileSync(introPath, 'utf-8');
      const frontmatter = parseFrontmatter(content);

      if (!frontmatter.version) {
        return;
      }

      const docKey = `versions/${entry.name}/intro`;
      versionDocMapping[docKey] = {
        version: frontmatter.version,
        position: parseInt(frontmatter.sidebar_position || '999', 10),
        label: frontmatter.sidebar_label || undefined,
        slug: entry.name,
      };
    });
  } else {
    console.warn('Versions directory not found:', versionsPath);
  }

  const jsonPath = path.join(__dirname, '../static/feature-metadata.json');
  const metadataJson = JSON.stringify({
    featureMapping,
    capabilityMapping,
    versionDocMapping,
    lastUpdated: new Date().toISOString()
  }, null, 2);

  fs.writeFileSync(jsonPath, metadataJson);
  console.log('Generated feature metadata JSON:', jsonPath);

  return {
    featureMapping,
    capabilityMapping,
    versionDocMapping
  };
}

module.exports = { readFeatureMetadata };
