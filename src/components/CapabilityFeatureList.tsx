import React, {useMemo} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import {useVersionContext} from '@site/src/context/VersionContext';

import styles from './VersionFeatureList.module.css';

interface CapabilityFeatureListProps {
  capability: string;
}

type GroupedByVersion = Array<{
  version: string;
  items: Array<{
    path: string;
    title: string;
    summary: string;
  }>;
}>;

function parseVersion(version: string): number[] {
  return version
    .split('.')
    .map(part => Number.parseInt(part, 10))
    .filter(num => !Number.isNaN(num));
}

function compareVersions(a: string, b: string): number {
  const aParts = parseVersion(a);
  const bParts = parseVersion(b);

  const length = Math.max(aParts.length, bParts.length);
  for (let i = 0; i < length; i += 1) {
    const aVal = aParts[i] ?? 0;
    const bVal = bParts[i] ?? 0;
    if (aVal !== bVal) {
      return aVal - bVal;
    }
  }
  return a.localeCompare(b);
}

const CapabilityFeatureList: React.FC<CapabilityFeatureListProps> = ({capability}) => {
  const {featureMetadata} = useVersionContext();
  const docsBaseUrl = useBaseUrl('docs/');

  const groupedFeatures: GroupedByVersion = useMemo(() => {
    if (!featureMetadata) {
      return [];
    }

    const entries = Object.entries(featureMetadata.featureMapping)
      .filter(([, info]) => info.capability === capability)
      .sort((a, b) => a[1].position - b[1].position || a[0].localeCompare(b[0]));

    const byVersion = new Map<string, Array<{path: string; title: string}>>();

    entries.forEach(([path, info]) => {
      if (!byVersion.has(info.version)) {
        byVersion.set(info.version, []);
      }
      byVersion.get(info.version)!.push({
        path,
        title: info.title,
        summary: info.summary,
      });
    });

    return Array.from(byVersion.entries())
      .sort((a, b) => compareVersions(a[0], b[0]))
      .map(([version, items]) => ({
        version,
        items,
      }));
  }, [capability, featureMetadata]);

  if (!featureMetadata) {
    return null;
  }

  if (groupedFeatures.length === 0) {
    return (
      <div className={styles.emptyState}>
        No feature documentation is tagged to this capability yet.
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {groupedFeatures.map(group => (
        <section key={group.version} className={styles.group}>
          <h3 className={styles.groupTitle}>Version {group.version}</h3>
          <ul className={styles.featureList}>
            {group.items.map(feature => {
              const href = `${docsBaseUrl}${feature.path}`.replace(/\/+$/, '');
              return (
                <li key={feature.path} className={styles.featureLinkWrapper}>
                  <a className={styles.featureLink} href={href}>
                    <div className={styles.featureLinkContent}>
                      <span className={styles.featureTitle}>{feature.title}</span>
                      <span className={styles.featureDescription}>{feature.summary}</span>
                    </div>
                    <span className={styles.featureMeta}>
                      <span className={styles.versionBadge}>{group.version}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default CapabilityFeatureList;
