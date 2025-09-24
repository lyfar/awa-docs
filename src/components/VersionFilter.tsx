import React, {useCallback, useEffect, useMemo} from 'react';
import clsx from 'clsx';
import {useHistory, useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useNavbarSecondaryMenu} from '@docusaurus/theme-common/internal';

import {useVersionContext} from '@site/src/context/VersionContext';

import styles from './VersionFilter.module.css';

type VersionFilterVariant = 'desktop' | 'mobile';

interface VersionFilterProps {
  className?: string;
  variant?: VersionFilterVariant;
}

const VersionFilter: React.FC<VersionFilterProps> = ({className, variant = 'desktop'}) => {
  const {
    currentVersion,
    setVersion,
    versions,
    featureMetadata,
    showOnlySelectedVersion,
    setShowOnlySelectedVersion,
  } = useVersionContext();
  const history = useHistory();
  const location = useLocation();
  const baseUrl = useBaseUrl('/');
  const secondaryMenu = useNavbarSecondaryMenu();

  const versionBySlug = useMemo(
    () => Object.fromEntries(versions.map((version) => [version.slug, version.value])),
    [versions],
  );

  const versionDocUrls = useMemo(() => {
    const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    return Object.fromEntries(
      versions.map((version) => [
        version.value,
        `${base}${`docs/${version.docPath}`.replace(/^\/+/, '')}`,
      ]),
    );
  }, [baseUrl, versions]);

  const navigateToVersionIntro = useCallback(
    (versionValue: string, replace = false) => {
      const targetUrl = versionDocUrls[versionValue];
      if (!targetUrl) {
        return;
      }

      if (location.pathname === targetUrl) {
        return;
      }

      if (replace) {
        history.replace(targetUrl);
      } else {
        history.push(targetUrl);
      }
    },
    [history, location.pathname, versionDocUrls],
  );

  const handleVersionChange = (versionValue: string) => {
    setVersion(versionValue);
    navigateToVersionIntro(versionValue);
    if (variant === 'mobile') {
      secondaryMenu?.hide?.();
    }
  };

  const handleModeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowOnlySelectedVersion(event.target.checked);
  };

  useEffect(() => {
    const match = location.pathname.match(/\/docs\/versions\/([^/]+)/);
    if (match) {
      const slug = match[1];
      const derivedVersion = versionBySlug[slug];
      if (derivedVersion && derivedVersion !== currentVersion) {
        setVersion(derivedVersion);
      }
    }
  }, [location.pathname, versionBySlug, currentVersion, setVersion]);

  useEffect(() => {
    if (!featureMetadata) {
      return;
    }

    if (/\/docs\/?$/.test(location.pathname) || location.pathname.endsWith('/docs/intro')) {
      navigateToVersionIntro(currentVersion, true);
    }
  }, [featureMetadata, currentVersion, location.pathname, navigateToVersionIntro]);

  return (
    <div
      className={clsx(
        styles.wrapper,
        variant === 'mobile' && styles.mobile,
        className,
      )}>
      <div className={styles.label}>Version Filter</div>
      <select
        value={currentVersion}
        onChange={(event) => handleVersionChange(event.target.value)}
        className={styles.select}
        aria-label="Filter documentation by product version"
        disabled={!featureMetadata}
      >
        {versions.map((version) => (
          <option key={version.value} value={version.value}>
            {version.label}
          </option>
        ))}
      </select>
      <label className={styles.toggle}>
        <input
          type="checkbox"
          checked={showOnlySelectedVersion}
          onChange={handleModeToggle}
          className={styles.checkbox}
          disabled={!featureMetadata}
        />
        <span>Show only features introduced in this version</span>
      </label>
    </div>
  );
};

export default VersionFilter;
