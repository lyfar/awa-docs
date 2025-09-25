import React, {type ReactNode, useRef} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {isActiveSidebarItem} from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import type {Props} from '@theme/DocSidebarItem/Link';

import {useVersionContext} from '@site/src/context/VersionContext';

import styles from './styles.module.css';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  ...props
}: Props): ReactNode {
  const {href, label, className, autoAddBaseUrl} = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);
  const status = item.customProps?.['data-version-status'] as string | undefined;
  const version = item.customProps?.['data-feature-version'] as string | undefined;
  const showVersionBadge = Boolean(version && status === 'previous');
  const showCurrentIndicator = status === 'current';
  const {currentVersion, showOnlySelectedVersion} = useVersionContext();
  const filterSignature = `${currentVersion}|${showOnlySelectedVersion ? 'selected' : 'cumulative'}`;
  const dataAttributes = {
    ...(status ? {'data-version-status': status} : {}),
    ...(version ? {'data-feature-version': version} : {}),
  } as Record<string, string>;
  const itemRef = useRef<HTMLLIElement | null>(null);
  const previousRectRef = useRef<DOMRect | null>(null);
  const animationRef = useRef<Animation | null>(null);

  useIsomorphicLayoutEffect(() => {
    const node = itemRef.current;
    if (!node) {
      return;
    }

    const currentRect = node.getBoundingClientRect();

    if (animationRef.current) {
      animationRef.current.cancel();
      animationRef.current = null;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      previousRectRef.current = currentRect;
      return;
    }

    const baseTiming = {
      duration: 260,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    } satisfies KeyframeAnimationOptions;

    if (!previousRectRef.current) {
      const delay = status === 'current' ? 80 : status === 'previous' ? 40 : 0;
      animationRef.current = node.animate(
        [
          {transform: 'translateY(12px)', opacity: 0},
          {transform: 'translateY(0)', opacity: 1},
        ],
        {...baseTiming, delay},
      );
    } else {
      const deltaY = previousRectRef.current.top - currentRect.top;
      const deltaX = previousRectRef.current.left - currentRect.left;
      if (Math.abs(deltaY) > 0.5 || Math.abs(deltaX) > 0.5) {
        animationRef.current = node.animate(
          [
            {transform: `translate(${deltaX}px, ${deltaY}px)`},
            {transform: 'translate(0, 0)'},
          ],
          baseTiming,
        );
      }
    }

    previousRectRef.current = currentRect;

    return () => {
      animationRef.current?.cancel();
      animationRef.current = null;
    };
  }, [filterSignature, status]);

  const itemKey = item.docId ?? item.href ?? label;

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className,
        styles.menuItem,
      )}
      key={itemKey}
      ref={itemRef}
      {...dataAttributes}
    >
      <Link
        className={clsx(
          'menu__link',
          styles.menuLink,
          !isInternalLink && styles.menuExternalLink,
          {
            'menu__link--active': isActive,
          },
        )}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? 'page' : undefined}
        to={href}
        data-version-status={status}
        data-feature-version={version}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}
      >
        <span className={styles.menuLabel}>{label}</span>
        <span className={styles.rightSlot} aria-hidden="true">
          {showVersionBadge && <span className={styles.versionBadge}>v{version}</span>}
          {showCurrentIndicator && (
            <span className={styles.currentIndicator}>
              <span className={styles.currentIndicatorPing} />
              <span className={styles.currentIndicatorDot} />
            </span>
          )}
        </span>
        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>
  );
}
