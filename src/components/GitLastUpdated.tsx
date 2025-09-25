import React, {useEffect, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

interface GitLastUpdatedProps {
  docPath?: string;
}

interface GitMetadata {
  repoLastUpdated: string;
  docs: Record<string, string | null>;
}

const GitLastUpdated: React.FC<GitLastUpdatedProps> = ({docPath}) => {
  const [metadata, setMetadata] = useState<GitMetadata | null>(null);
  const metadataUrl = useBaseUrl('git-last-updated.json');

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        const response = await fetch(metadataUrl);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data: GitMetadata = await response.json();
        if (!cancelled) {
          setMetadata(data);
        }
      } catch (error) {
        console.error('Failed to load git last updated info', error);
      }
    };
    fetchData();
    return () => {
      cancelled = true;
    };
  }, [metadataUrl]);

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
