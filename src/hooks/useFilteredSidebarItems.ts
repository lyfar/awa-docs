import {useMemo} from 'react';
import type {PropSidebarItem, PropSidebarItemCategory} from '@docusaurus/plugin-content-docs';

import {useVersionContext} from '@site/src/context/VersionContext';

function isDocSidebarItem(
  item: PropSidebarItem,
): item is Extract<PropSidebarItem, {type: 'link'; docId?: string}> {
  return item.type === 'link';
}

function isCategorySidebarItem(item: PropSidebarItem): item is PropSidebarItemCategory {
  return item.type === 'category';
}

export function useFilteredSidebarItems(items?: PropSidebarItem[]): PropSidebarItem[] {
  const {
    featureMetadata,
    versionOrder,
    currentVersion,
    defaultVersion,
    showOnlySelectedVersion,
  } = useVersionContext();

  return useMemo(() => {
    if (!items) {
      return [];
    }

    if (!featureMetadata) {
      return items;
    }

    const targetIndex = versionOrder[currentVersion] ?? versionOrder[defaultVersion];

    if (targetIndex === undefined) {
      return items;
    }

    const filterItems = (sidebarItems: PropSidebarItem[]): PropSidebarItem[] =>
      sidebarItems
        .map((item) => {
          if (isDocSidebarItem(item)) {
            const docId = item.docId;
            if (!docId) {
              return item;
            }

            const metadataEntry =
              featureMetadata.featureMapping[docId] ??
              featureMetadata.versionDocMapping[docId];

            if (!metadataEntry) {
              return item;
            }

            const docIndex = versionOrder[metadataEntry.version];

            const matchesVersion = docIndex === undefined
              ? true
              : showOnlySelectedVersion
                ? docIndex === targetIndex
                : docIndex <= targetIndex;

            if (!matchesVersion) {
              return null;
            }

            const status = docIndex === undefined
              ? 'unknown'
              : docIndex === targetIndex
                ? 'current'
                : docIndex < targetIndex
                  ? 'previous'
                  : 'future';

            if (status === 'future') {
              return null;
            }

            const classes = [
              item.className,
              status === 'previous' ? 'version-filter__item--previous' : undefined,
            ].filter(Boolean) as string[];

            return {
              ...item,
              ...(classes.length ? {className: classes.join(' ')} : {}),
              customProps: {
                ...item.customProps,
                'data-version-status': status,
                'data-feature-version': metadataEntry.version,
              },
            };
          }

          if (isCategorySidebarItem(item)) {
            const filteredChildren = filterItems(item.items);

            if (filteredChildren.length === 0) {
              return null;
            }

            const hasCurrentChild = filteredChildren.some((child) => {
              const childCustomProps = (child as {customProps?: Record<string, unknown>}).customProps;
              const childStatus = childCustomProps?.['data-version-status'];
              return childStatus === 'current';
            });

            const hasFutureChild = filteredChildren.some((child) => {
              const childCustomProps = (child as {customProps?: Record<string, unknown>}).customProps;
              const childStatus = childCustomProps?.['data-version-status'];
              return childStatus === 'future';
            });

            if (hasFutureChild) {
              return null;
            }

            const classes = [
              item.className,
              !hasCurrentChild ? 'version-filter__item--previous' : undefined,
            ].filter(Boolean) as string[];

            return {
              ...item,
              items: filteredChildren,
              ...(classes.length ? {className: classes.join(' ')} : {}),
            };
          }

          return item;
        })
        .filter((item): item is PropSidebarItem => item !== null);

    return filterItems(items);
  }, [items, featureMetadata, versionOrder, currentVersion, defaultVersion, showOnlySelectedVersion]);
}
