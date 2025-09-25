import React, {useMemo} from 'react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pluginData = require('@generated/git-last-updated-plugin/default/git-last-updated.json') as GitMetadata;

interface GitLastUpdatedProps {
  docPath?: string;
}

interface GitMetadata {
  repoLastUpdated: string;
  docs: Record<string, string | null>;
}

const GitLastUpdated: React.FC<GitLastUpdatedProps> = ({docPath}) => {
  const metadata = pluginData;

  const lookupKeyRaw = docPath?.replace(/^@site\//, '') ?? '';
  const lookupCandidates = useMemo(() => {
    if (!lookupKeyRaw) {
      return [] as string[];
    }
    const base = lookupKeyRaw.replace(/\.(mdx?)$/i, '');
    return [
      lookupKeyRaw,
      `${base}.mdx`,
      `${base}.md`,
      base,
    ].filter((key, index, array) => key && array.indexOf(key) === index);
  }, [lookupKeyRaw]);

  const docDate = lookupCandidates
    .map((key) => metadata.docs[key])
    .find((value) => Boolean(value)) ?? null;
  const dateToUse = docDate || metadata.repoLastUpdated;

  if (!dateToUse) {
    return null;
  }

  const parsed = new Date(dateToUse);
  const formatted = Number.isNaN(parsed.getTime()) ? dateToUse : parsed.toLocaleString();

  return <span>{formatted}</span>;
};

export default GitLastUpdated;
