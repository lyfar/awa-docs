import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {isActiveSidebarItem} from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import type {Props} from '@theme/DocSidebarItem/Link';

import styles from './styles.module.css';

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
  const dataAttributes = {
    ...(status ? {'data-version-status': status} : {}),
    ...(version ? {'data-feature-version': version} : {}),
  } as Record<string, string>;

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className,
      )}
      key={label}
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
