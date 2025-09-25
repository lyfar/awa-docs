import React, {useMemo} from 'react';
import usePluginData from '@docusaurus/useGlobalData';

interface GitLastUpdatedProps {
  docPath?: string;
}

interface GitMetadata {
  repoLastUpdated: string;
  docs: Record<string, string | null>;
}

const GitLastUpdated: React.FC<GitLastUpdatedProps> = ({docPath}) => {
  const pluginData = usePluginData('git-last-updated-plugin') as unknown;

  const metadata = useMemo<GitMetadata | null>(() => {
    if (!pluginData) {
      return null;
    }

    if (typeof pluginData === 'object' && pluginData !== null) {
      const direct = pluginData as Record<string, unknown>;
      if ('repoLastUpdated' in direct && 'docs' in direct) {
        return direct as GitMetadata;
      }

      const defaultEntry = (direct as {default?: GitMetadata}).default;
      if (defaultEntry && typeof defaultEntry === 'object') {
        return defaultEntry;
      }
    }

    return null;
  }, [pluginData]);

  if (!metadata) {
    return null;
  }

  const lookupKeyRaw = docPath?.replace(/^@site\//, '') ?? '';
  const lookupKey = lookupKeyRaw.endsWith('.md') || lookupKeyRaw.endsWith('.mdx')
    ? lookupKeyRaw
    : `${lookupKeyRaw}.mdx`;
  const docDate = lookupKey ? metadata.docs[lookupKey] ?? metadata.docs[lookupKeyRaw] : null;
  const dateToUse = docDate || metadata.repoLastUpdated;

  if (!dateToUse) {
    return null;
  }

  const parsed = new Date(dateToUse);
  const formatted = Number.isNaN(parsed.getTime()) ? dateToUse : parsed.toLocaleString();

  return <span>{formatted}</span>;
};

export default GitLastUpdated;
