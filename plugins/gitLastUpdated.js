const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');

function getRepoLastUpdatedDate() {
  try {
    const output = execSync('git log -1 --format=%cd').toString().trim();
    if (!output) {
      return new Date().toISOString();
    }
    const date = new Date(output);
    if (Number.isNaN(date.getTime())) {
      return new Date().toISOString();
    }
    return date.toISOString();
  } catch (error) {
    console.warn('Unable to read last git update date:', error);
    return new Date().toISOString();
  }
}

function getDocPaths(rootDir) {
  const entries = fs.readdirSync(rootDir, {withFileTypes: true});
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.')) {
      continue;
    }
    const absPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getDocPaths(absPath));
    } else if (/\.(mdx?)$/i.test(entry.name)) {
      files.push(absPath);
    }
  }
  return files;
}

function getDocLastUpdatedDates() {
  const docsDir = path.resolve(__dirname, '../docs');
  if (!fs.existsSync(docsDir)) {
    return {};
  }

  const docFiles = getDocPaths(docsDir);
  const results = {};

  docFiles.forEach((absPath) => {
    const relPath = path.relative(path.resolve(__dirname, '..'), absPath).replace(/\\/g, '/');
    try {
      const output = execSync(`git log -1 --format=%cd -- "${absPath}"`).toString().trim();
      const date = output ? new Date(output) : null;
      results[relPath] = date && !Number.isNaN(date.getTime()) ? date.toISOString() : null;
    } catch (error) {
      console.warn(`Unable to read git update for ${relPath}:`, error.message);
      results[relPath] = null;
    }
  });

  return results;
}

function createPlugin() {
  return {
    name: 'git-last-updated-plugin',
    async loadContent() {
      const repoLastUpdated = getRepoLastUpdatedDate();
      const docs = getDocLastUpdatedDates();
      return {repoLastUpdated, docs};
    },
    async contentLoaded({content, actions}) {
      const {createData, setGlobalData} = actions;
      await createData('git-last-updated.json', JSON.stringify(content));
      setGlobalData(content);
    },
  };
}

module.exports = createPlugin;
