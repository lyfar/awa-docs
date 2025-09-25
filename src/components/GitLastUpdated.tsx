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
  const pluginData = usePluginData('git-last-updated-plugin') as GitMetadata | undefined;

  const metadata = useMemo<GitMetadata | null>(() => {
    if (!pluginData) {
      return null;
    }
    return pluginData;
  }, [pluginData]);

  if (!metadata) {
    return null;
  }

  const lookupKey = docPath?.replace(/^@site\//, '') ?? '';
  const docDate = lookupKey ? metadata.docs[lookupKey] : null;
  const dateToUse = docDate || metadata.repoLastUpdated;

  if (!dateToUse) {
    return null;
  }

  const parsed = new Date(dateToUse);
  const formatted = Number.isNaN(parsed.getTime()) ? dateToUse : parsed.toLocaleString();

  return <span>{formatted}</span>;
};

export default GitLastUpdated;
