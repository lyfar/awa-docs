import React, {useMemo} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import {useVersionContext} from '@site/src/context/VersionContext';

import styles from './VersionFeatureList.module.css';

interface VersionFeatureListProps {
  version: string;
}

type GroupedFeatures = Array<{
  capabilityLabel: string;
  capabilityKey: string;
  items: Array<{
    path: string;
    title: string;
  }>;
}>;

const VersionFeatureList: React.FC<VersionFeatureListProps> = ({version}) => {
  const {featureMetadata} = useVersionContext();
  const docsBaseUrl = useBaseUrl('docs/');

  const groupedFeatures: GroupedFeatures = useMemo(() => {
    if (!featureMetadata) {
      return [];
    }

    const entries = Object.entries(featureMetadata.featureMapping)
      .filter(([, info]) => info.version === version)
      .sort((a, b) => a[1].position - b[1].position || a[0].localeCompare(b[0]));

    const byCapability = new Map<string, {label: string; items: Array<{path: string; title: string}>}>();

    entries.forEach(([path, info]) => {
      const capabilityMeta = featureMetadata.capabilityMapping[info.capability];
      const label = capabilityMeta?.label ?? info.capability;
      if (!byCapability.has(info.capability)) {
        byCapability.set(info.capability, {label, items: []});
      }
      byCapability.get(info.capability)!.items.push({
        path,
        title: info.title,
      });
    });

    return Array.from(byCapability.entries())
      .sort((a, b) => a[1].label.localeCompare(b[1].label))
      .map(([capabilityKey, data]) => ({
        capabilityKey,
        capabilityLabel: data.label,
        items: data.items,
      }));
  }, [featureMetadata, version]);

  if (!featureMetadata) {
    return null;
  }

  if (groupedFeatures.length === 0) {
    return (
      <div className={styles.emptyState}>
        No feature documentation is tagged for version <strong>{version}</strong> yet.
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {groupedFeatures.map((group) => (
        <section key={group.capabilityKey} className={styles.group}>
          <h3 className={styles.groupTitle}>{group.capabilityLabel}</h3>
          <ul className={styles.featureList}>
            {group.items.map((feature) => {
            const href = `${docsBaseUrl}${feature.path}`.replace(/\/+$/, '');
            const featureInfo = featureMetadata.featureMapping[feature.path];
            return (
              <li key={feature.path} className={styles.featureLinkWrapper}>
                <a className={styles.featureLink} href={href}>
                  <div className={styles.featureLinkContent}>
                    <span className={styles.featureTitle}>{feature.title}</span>
                    <span className={styles.featureDescription}>View documentation</span>
                  </div>
                  <span className={styles.featureMeta}>
                    <span className={styles.versionBadge}>{featureInfo?.version ?? version}</span>
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

export default VersionFeatureList;
