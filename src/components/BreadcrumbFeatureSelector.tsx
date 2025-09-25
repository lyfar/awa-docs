import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useHistory, useLocation} from '@docusaurus/router';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

import {useVersionContext} from '@site/src/context/VersionContext';

import styles from './SidebarVersionOrb.module.css';

const normalizeDocPath = (source?: string) => {
  if (!source) return undefined;
  const match = source.match(/docs\/(.*\.(?:mdx?|md))/i);
  if (!match) return undefined;
  return match[1].replace(/\.mdx?$/, '');
};

const BreadcrumbFeatureSelector: React.FC = () => {
  const {featureMetadata} = useVersionContext();
  const {metadata} = useDoc();
  const history = useHistory();
  const location = useLocation();
  const docsBaseUrl = useBaseUrl('docs/');

  const capability = metadata.frontMatter?.capability as string | undefined;
  const currentDocPath = metadata.id ?? normalizeDocPath(metadata.source);

  const selectorRef = useRef<HTMLDivElement | null>(null);
  const listboxId = React.useId();
  const [isOpen, setIsOpen] = useState(false);

  const featureOptions = useMemo(() => {
    if (!featureMetadata || !capability) {
      return [];
    }

    return Object.entries(featureMetadata.featureMapping)
      .filter(([, info]) => info.capability === capability)
      .sort((a, b) => compareFeatureInfo(a[1], b[1]))
      .map(([path, info]) => ({
        id: path,
        label: info.title,
        summary: info.summary,
      }));
  }, [capability, featureMetadata]);

  const activeOption = featureOptions.find(option => option.id === currentDocPath);

  const handleSelect = useCallback(
    (optionId: string) => {
      const option = featureOptions.find(item => item.id === optionId);
      if (!option) {
        return;
      }
      const href = `${docsBaseUrl}${option.id}`.replace(/\/+$/, '');
      if (location.pathname === href) {
        setIsOpen(false);
        return;
      }
      history.push(href);
      setIsOpen(false);
    },
    [docsBaseUrl, featureOptions, history, location.pathname],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!selectorRef.current || selectorRef.current.contains(event.target as Node)) {
        return;
      }
      setIsOpen(false);
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
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
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  if (!featureMetadata || !capability || featureOptions.length <= 1) {
    return null;
  }

  return (
    <div className={clsx(styles.wrapper, styles.selectorOnly)}>
      <div className={styles.selector} ref={selectorRef}>
        <span className={styles.selectorEyebrow}>Feature</span>
        <button
          type="button"
          className={clsx(styles.selectorButton, isOpen && styles.selectorButtonActive)}
          onClick={() => setIsOpen(open => !open)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
        >
          <span className={styles.selectorLabel}>{activeOption?.label ?? 'Choose feature'}</span>
          <svg className={styles.selectorIcon} viewBox="0 0 16 16" role="presentation" focusable="false">
            <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
        {isOpen && (
          <ul className={styles.selectorMenu} role="listbox" id={listboxId}>
            {featureOptions.map((option, index) => (
              <li key={option.id} role="option">
                <button
                  type="button"
                  className={clsx(
                    styles.selectorOption,
                    styles.selectorOptionAnimated,
                    option.id === activeOption?.id && styles.selectorOptionActive,
                  )}
                  style={{animationDelay: `${index * 25}ms`}}
                  onClick={() => handleSelect(option.id)}
                >
                  <span className={styles.selectorOptionLabel}>{option.label}</span>
                  <span className={styles.selectorOptionValue}>v{featureMetadata.featureMapping[option.id]?.version}</span>
                </button>
                <p className={styles.selectorOptionSummary}>{option.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

function compareFeatureInfo(
  a: {position: number; title: string},
  b: {position: number; title: string},
) {
  if (a.position !== b.position) {
    return a.position - b.position;
  }
  return a.title.localeCompare(b.title);
}

export default BreadcrumbFeatureSelector;
