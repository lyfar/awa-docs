const fs = require('fs');
const path = require('path');

const DOCS_ROOT = path.join(__dirname, '..', 'docs');

const capabilityMapping = {
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

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    return {};
  }

  return match[1].split(/\n/).reduce((acc, line) => {
    const idx = line.indexOf(':');
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim().replace(/^"|"$/g, '');
      acc[key] = value;
    }
    return acc;
  }, {});
}

function stripFrontmatter(content) {
  return content.replace(/^---[\s\S]*?---\n?/, '').trimStart();
}

function extractHeading(content) {
  const body = stripFrontmatter(content);
  const headingMatch = body.match(/^#\s+(.+)/m);
  return headingMatch ? headingMatch[1].trim() : undefined;
}

function formatFromSlug(slug) {
  return slug
    .split(/[-_]/)
    .filter(Boolean)
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

function collectFeatures() {
  const featuresDir = path.join(DOCS_ROOT, 'features');
  const featureEntries = fs.readdirSync(featuresDir);
  const grouped = {};

  for (const entry of featureEntries) {
    if (!entry.endsWith('.md') && !entry.endsWith('.mdx')) {
      continue;
    }

    const slug = entry.replace(/\.mdx?$/, '');
    const filePath = path.join(featuresDir, entry);
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatter = parseFrontmatter(content);
    const capability = frontmatter.capability;

    if (!capability) {
      continue;
    }

    const heading = extractHeading(content);
    const title = frontmatter.sidebar_label || frontmatter.title || heading || formatFromSlug(slug);
    const position = parseInt(frontmatter.sidebar_position || '999', 10);

    if (!grouped[capability]) {
      grouped[capability] = [];
    }

    grouped[capability].push({
      title,
      slug,
      position,
    });
  }

  for (const capability of Object.keys(grouped)) {
    grouped[capability].sort((a, b) => {
      if (a.position !== b.position) {
        return a.position - b.position;
      }
      return a.title.localeCompare(b.title);
    });
  }

  return grouped;
}

function replaceRelatedSection(original, replacementBlock) {
  const sectionRegex = /(## Related Features\n)([\s\S]*?)(?=\n## |\n# |$)/;
  const match = original.match(sectionRegex);

  if (match) {
    const trimmedReplacement = replacementBlock.endsWith('\n') ? replacementBlock : `${replacementBlock}\n`;
    return original.replace(sectionRegex, `## Related Features\n\n${trimmedReplacement}`);
  }

  const appendBlock = `\n\n## Related Features\n\n${replacementBlock}\n`;
  return `${original.trimEnd()}${appendBlock}`;
}

function updateCapabilities() {
  const featuresByCapability = collectFeatures();
  const updates = [];

  Object.entries(capabilityMapping).forEach(([capabilityKey, { path: docPath }]) => {
    const absolutePath = path.join(DOCS_ROOT, `${docPath}.md`);

    if (!fs.existsSync(absolutePath)) {
      return;
    }

    const featureEntries = featuresByCapability[capabilityKey] || [];
    const replacementLines = featureEntries.length > 0
      ? featureEntries.map(feature => `- [${feature.title}](/docs/features/${feature.slug})`).join('\n')
      : '- _No mapped features yet._';

    const originalContent = fs.readFileSync(absolutePath, 'utf8');
    const updatedContent = replaceRelatedSection(originalContent, replacementLines);

    if (updatedContent !== originalContent) {
      fs.writeFileSync(absolutePath, updatedContent, 'utf8');
      updates.push({ capability: capabilityKey, file: absolutePath, count: featureEntries.length });
    }
  });

  if (updates.length === 0) {
    console.log('No capability files required updates.');
    return;
  }

  updates.forEach(update => {
    console.log(`Updated ${update.file} with ${update.count} related feature(s).`);
  });
}

updateCapabilities();
