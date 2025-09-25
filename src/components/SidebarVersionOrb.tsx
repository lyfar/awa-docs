import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import {useHistory, useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useNavbarSecondaryMenu} from '@docusaurus/theme-common/internal';

import {useVersionContext} from '@site/src/context/VersionContext';

import DitheringShader from './DitheringShader';
import styles from './SidebarVersionOrb.module.css';

interface SidebarVersionOrbProps {
  variant?: 'desktop' | 'mobile' | 'breadcrumbs';
  showOrb?: boolean;
  className?: string;
}

const SidebarVersionOrb: React.FC<SidebarVersionOrbProps> = ({
  variant = 'desktop',
  showOrb = true,
  className,
}) => {
  const {
    currentVersion,
    versionByValue,
    versions,
    setVersion,
    featureMetadata,
    showOnlySelectedVersion,
    setShowOnlySelectedVersion,
  } = useVersionContext();
  const {colorMode} = useColorMode();
  const history = useHistory();
  const location = useLocation();
  const baseUrl = useBaseUrl('/');
  const secondaryMenu = useNavbarSecondaryMenu();
  const selectorRef = useRef<HTMLDivElement | null>(null);
  const [isSelectorOpen, setSelectorOpen] = useState(false);
  const listboxId = React.useId();
  const versionInfo = versionByValue[currentVersion] ?? null;
  const versionValue = versionInfo?.value ?? currentVersion;
  const versionLabel = versionInfo?.label ?? `Version ${versionValue}`;
  const isToggleDisabled = !featureMetadata;

  const handleModeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowOnlySelectedVersion(event.target.checked);
  };

  const wrapperClass = [
    styles.wrapper,
    variant === 'mobile' ? styles.compact : '',
    variant === 'breadcrumbs' ? styles.breadcrumbs : '',
    !showOrb ? styles.selectorOnly : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const shaderSize = variant === 'mobile' ? 104 : 128;
  const shaderBack = colorMode === 'dark' ? 'rgba(20, 17, 31, 0.85)' : 'rgba(255, 255, 255, 0.82)';
  const shaderFront = colorMode === 'dark' ? '#b6a9ff' : '#6d5ae6';

  const versionBySlug = useMemo(
    () => Object.fromEntries(versions.map((definition) => [definition.slug, definition.value])),
    [versions],
  );

  const versionDocUrls = useMemo(() => {
    const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    return Object.fromEntries(
      versions.map((definition) => [
        definition.value,
        `${base}${`docs/${definition.docPath}`.replace(/^\/+/, '')}`,
      ]),
    );
  }, [baseUrl, versions]);

  const navigateToVersionIntro = useCallback(
    (value: string, replace = false) => {
      const targetUrl = versionDocUrls[value];
      if (!targetUrl || location.pathname === targetUrl) {
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

  const handleVersionSelect = useCallback(
    (value: string) => {
      setVersion(value);
      navigateToVersionIntro(value);
      setSelectorOpen(false);
      if (variant === 'mobile') {
        secondaryMenu?.hide?.();
      }
    },
    [navigateToVersionIntro, secondaryMenu, setVersion, variant],
  );

  useEffect(() => {
    const match = location.pathname.match(/\/docs\/versions\/([^/]+)/);
    if (!match) {
      return;
    }

    const [, slug] = match;
    const derived = versionBySlug[slug];
    if (derived && derived !== currentVersion) {
      setVersion(derived);
    }
  }, [currentVersion, location.pathname, setVersion, versionBySlug]);

  useEffect(() => {
    if (!featureMetadata) {
      return;
    }

    if (/\/docs\/?$/.test(location.pathname) || location.pathname.endsWith('/docs/intro')) {
      navigateToVersionIntro(currentVersion, true);
    }
  }, [featureMetadata, currentVersion, location.pathname, navigateToVersionIntro]);

  useEffect(() => {
    if (!isSelectorOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!selectorRef.current || selectorRef.current.contains(event.target as Node)) {
        return;
      }
      setSelectorOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectorOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, {passive: true});
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isSelectorOpen]);

  useEffect(() => {
    setSelectorOpen(false);
  }, [location.pathname]);

  return (
    <div className={wrapperClass}>
      {showOrb && (
        <div className={styles.shaderShell}>
          <DitheringShader
            width={shaderSize}
            height={shaderSize}
            shape="sphere"
            type="random"
            pxSize={2.2}
            speed={1.2}
            colorBack={shaderBack}
            colorFront={shaderFront}
          />
          <span className={styles.value}>v{versionValue}</span>
        </div>
      )}
      <div className={styles.selector} ref={selectorRef}>
        <span className={styles.selectorEyebrow}>Version</span>
        <button
          type="button"
          className={[
            styles.selectorButton,
            isSelectorOpen ? styles.selectorButtonActive : '',
            isToggleDisabled ? styles.selectorButtonDisabled : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => !isToggleDisabled && setSelectorOpen((open) => !open)}
          aria-haspopup="listbox"
          aria-expanded={isSelectorOpen}
          aria-controls={listboxId}
          disabled={isToggleDisabled}
        >
          <span className={styles.selectorLabel}>{versionLabel}</span>
          <svg
            className={styles.selectorIcon}
            viewBox="0 0 16 16"
            role="presentation"
            focusable="false"
          >
            <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
        {isSelectorOpen && (
          <ul className={styles.selectorMenu} role="listbox" id={listboxId}>
            {versions.map((definition, index) => {
              const isActive = definition.value === currentVersion;
              return (
                <li key={definition.value} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    className={[
                      styles.selectorOption,
                      styles.selectorOptionAnimated,
                      isActive ? styles.selectorOptionActive : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => handleVersionSelect(definition.value)}
                    style={{animationDelay: `${index * 40}ms`}}
                  >
                    <span className={styles.selectorOptionLabel}>{definition.label}</span>
                    <span className={styles.selectorOptionValue}>v{definition.value}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <label
        className={[
          styles.toggle,
          variant === 'mobile' ? styles.toggleCompact : '',
          isToggleDisabled ? styles.toggleDisabled : '',
        ]
          .filter(Boolean)
          .join(' ')}
        data-disabled={isToggleDisabled || undefined}
      >
        <input
          type="checkbox"
          checked={showOnlySelectedVersion}
          onChange={handleModeToggle}
          className={styles.checkboxInput}
          disabled={isToggleDisabled}
          aria-label="Toggle to show only features introduced in this release"
        />
        <span className={styles.checkboxVisual} aria-hidden="true">
          <svg className={styles.checkboxSvg} viewBox="0 0 12 12" focusable="false">
            <path d="M2.3 6.1 4.5 8.1 9.7 3" className={styles.checkboxPath} />
          </svg>
        </span>
        <span className={styles.toggleText}>Only features introduced in this release</span>
      </label>
    </div>
  );
};

export default SidebarVersionOrb;
