import React from 'react';
import clsx from 'clsx';
import OriginalDocBreadcrumbs from '@theme-original/DocBreadcrumbs';
import type {Props} from '@theme/DocBreadcrumbs';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

import BreadcrumbFeatureSelector from '@site/src/components/BreadcrumbFeatureSelector';

import styles from './styles.module.css';

const DocBreadcrumbs = (props: Props): JSX.Element => {
  const doc = useDoc();
  const capability = doc?.metadata?.frontMatter?.capability;

  return (
    <div className={styles.container}>
      <OriginalDocBreadcrumbs {...props} />
      {capability ? (
        <div className={styles.controls}>
          <BreadcrumbFeatureSelector />
        </div>
      ) : null}
    </div>
  );
};

export default DocBreadcrumbs;
