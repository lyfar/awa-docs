import * as fs from 'fs';
import * as path from 'path';

export interface FeatureInfo {
  version: string;
  capability: string;
  position: number;
  title: string;
}

export interface CapabilityInfo {
  label: string;
  path: string;
}

export interface VersionDocInfo {
  version: string;
  position: number;
  label?: string;
  slug: string;
}

export interface FeatureMetadata {
  featureMapping: Record<string, FeatureInfo>;
  capabilityMapping: Record<string, CapabilityInfo>;
  versionDocMapping: Record<string, VersionDocInfo>;
}

// Capability mapping (this is static since capabilities don't change)
const capabilityMapping: Record<string, CapabilityInfo> = {
  'app-infrastructure': { label: '01. App Infrastructure', path: 'capabilities/01-App-Infrastructure/index' },
  'visualization-map-layer': { label: '02. Visualization & Map Layer', path: 'capabilities/02-Visualization-Map-Layer/index' },
  'access': { label: '03. Access', path: 'capabilities/03-Access/index' },
  'identity': { label: '04. Identity', path: 'capabilities/04-Identity/index' },
  'practice': { label: '05. Practice', path: 'capabilities/05-Practice/index' },
  'engagement-notifications': { label: '06. Engagement & Notifications', path: 'capabilities/06-Engagement-Notifications/index' },
  'masters-practices': { label: '07. Masters Practices', path: 'capabilities/07-Masters-Practices/index' },
  'away-streaks': { label: '08. AWAY Streaks', path: 'capabilities/08-AWAY-Streaks/index' },
  'gamification-rewards': { label: '09. Gamification & Rewards', path: 'capabilities/09-Gamification-Rewards/index' },
  'product-analytics': { label: '10. Product Analytics', path: 'capabilities/10-Product-Analytics/index' },
  'customer-support': { label: '11. Customer Support', path: 'capabilities/11-Customer-Support/index' },
  'distribution': { label: '12. Distribution', path: 'capabilities/12-Distribution/index' },
};

function stripFrontmatter(content: string): string {
  return content.replace(/^---[\s\S]*?---\n?/, '').trimStart();
}

function extractTitle(content: string): string | undefined {
  const body = stripFrontmatter(content);
  const headingMatch = body.match(/^#\s+(.+)/m);
  if (headingMatch) {
    return headingMatch[1].trim();
  }
  return undefined;
}

function formatFromSlug(slug: string): string {
  if (!slug) {
    return '';
  }
  return slug
    .split(/[-_]/)
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

function parseFrontmatter(content: string): Record<string, any> {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) return {};

  const frontmatter = match[1];
  const result: Record<string, any> = {};

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

export function readFeatureMetadata(): FeatureMetadata {
  const docsPath = path.join(__dirname, '../docs');
  const featuresPath = path.join(docsPath, 'features');
  const versionsPath = path.join(docsPath, 'versions');

  const featureMapping: Record<string, FeatureInfo> = {};
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
        const slug = featureKey.split('/').pop() ?? '';
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

  const versionDocMapping: Record<string, VersionDocInfo> = {};
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
