import React from 'react';
import clsx from 'clsx';
import OriginalDocBreadcrumbs from '@theme-original/DocBreadcrumbs';
import type {Props} from '@theme/DocBreadcrumbs';
import {useDoc} from '@docusaurus/plugin-content-docs/client';


import styles from './styles.module.css';

const DocBreadcrumbs = (props: Props): JSX.Element => {
  const doc = useDoc();

  return (
    <div className={styles.container}>
      <OriginalDocBreadcrumbs {...props} />
    </div>
  );
};

export default DocBreadcrumbs;
