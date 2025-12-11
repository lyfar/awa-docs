import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

export interface VersionDefinition {
  value: string;
  label: string;
  slug: string;
  docPath: string;
}

const VERSION_OPTIONS: VersionDefinition[] = [
  {value: '0.1', label: '0.1 Photon (MVP)', slug: '0.1-photon', docPath: 'versions/0.1-photon/intro'},
  {value: '0.2', label: '0.2 Spark (Advanced Practices)', slug: '0.2-spark', docPath: 'versions/0.2-spark/intro'},
  {value: '0.3', label: '0.3 Ember (Basic Masters)', slug: '0.3-ember', docPath: 'versions/0.3-ember/intro'},
  {value: '0.4', label: '0.4 Flicker (Lumens)', slug: '0.4-flicker', docPath: 'versions/0.4-flicker/intro'},
  {value: '0.5', label: '0.5 Glow (AWAWAY Streaks)', slug: '0.5-glow', docPath: 'versions/0.5-glow/intro'},
  {value: '0.6', label: '0.6 Ray (Basic Missions)', slug: '0.6-ray', docPath: 'versions/0.6-ray/intro'},
  {value: '0.7', label: '0.7 INT Beam (Advanced Features)', slug: '0.7-int-beam', docPath: 'versions/0.7-int-beam/intro'},
  {value: '0.8', label: '0.8 INT Flame (Advanced Features)', slug: '0.8-int-flame', docPath: 'versions/0.8-int-flame/intro'},
  {value: '0.9', label: '0.9 INT Blaze (Advanced Features)', slug: '0.9-int-blaze', docPath: 'versions/0.9-int-blaze/intro'},
  {value: '1.0', label: '1.0 Ignition (Full Platform)', slug: '1.0-ignition', docPath: 'versions/1.0-ignition/intro'},
];

const VERSION_ORDER: Record<string, number> = VERSION_OPTIONS.reduce((acc, option, index) => {
  acc[option.value] = index;
  return acc;
}, {} as Record<string, number>);

const VERSION_OPTION_BY_VALUE: Record<string, VersionDefinition> = VERSION_OPTIONS.reduce(
  (acc, option) => {
    acc[option.value] = option;
    return acc;
  },
  {} as Record<string, VersionDefinition>,
);

const DEFAULT_VERSION = VERSION_OPTIONS[VERSION_OPTIONS.length - 1]?.value ?? VERSION_OPTIONS[0]?.value ?? '1.0';

export interface FeatureInfo {
  version: string;
  capability: string;
  position: number;
  title: string;
  summary: string;
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
  lastUpdated?: string;
}

export interface VersionContextValue {
  currentVersion: string;
  setVersion: (value: string) => void;
  versionOrder: Record<string, number>;
  defaultVersion: string;
  versions: VersionDefinition[];
  featureMetadata: FeatureMetadata | null;
  showOnlySelectedVersion: boolean;
  setShowOnlySelectedVersion: (value: boolean) => void;
  versionByValue: Record<string, VersionDefinition>;
}

const VersionContext = createContext<VersionContextValue | undefined>(undefined);

export const VersionProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [currentVersion, setCurrentVersion] = useState<string>(DEFAULT_VERSION);
  const [featureMetadata, setFeatureMetadata] = useState<FeatureMetadata | null>(null);
  const [showOnlySelectedVersion, setShowOnlySelectedVersion] = useState<boolean>(false);
  const metadataUrl = useBaseUrl('feature-metadata.json');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem('awa-docs-version');
    if (stored && VERSION_ORDER[stored] !== undefined) {
      setCurrentVersion(stored);
    }

    const storedMode = window.localStorage.getItem('awa-docs-version-mode');
    if (storedMode === 'selected') {
      setShowOnlySelectedVersion(true);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadMetadata = async () => {
      try {
        const response = await fetch(metadataUrl);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const metadata: FeatureMetadata = await response.json();
        if (!cancelled) {
          setFeatureMetadata(metadata);
        }
      } catch (error) {
        console.error('VersionProvider: Failed to load feature metadata', error);
        if (!cancelled) {
          setFeatureMetadata(null);
        }
      }
    };

    loadMetadata();

    return () => {
      cancelled = true;
    };
  }, [metadataUrl]);

  const setVersion = (value: string) => {
    if (VERSION_ORDER[value] === undefined) {
      return;
    }

    setCurrentVersion(value);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('awa-docs-version', value);
    }
  };

  const handleToggleShowSelected = (value: boolean) => {
    setShowOnlySelectedVersion(value);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('awa-docs-version-mode', value ? 'selected' : 'cumulative');
    }
  };

  const value = useMemo<VersionContextValue>(
    () => ({
      currentVersion,
      setVersion,
      versionOrder: VERSION_ORDER,
      defaultVersion: DEFAULT_VERSION,
      versions: VERSION_OPTIONS,
      featureMetadata,
      showOnlySelectedVersion,
      setShowOnlySelectedVersion: handleToggleShowSelected,
      versionByValue: VERSION_OPTION_BY_VALUE,
    }),
    [currentVersion, featureMetadata, showOnlySelectedVersion],
  );

  return <VersionContext.Provider value={value}>{children}</VersionContext.Provider>;
};

export const useVersionContext = (): VersionContextValue => {
  const context = useContext(VersionContext);
  if (!context) {
    throw new Error('useVersionContext must be used within a VersionProvider');
  }
  return context;
};
