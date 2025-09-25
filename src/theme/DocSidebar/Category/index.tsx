import React from 'react';
import OriginalCategory from '@theme-original/DocSidebar/Category';

import styles from './styles.module.css';

export default function DocSidebarCategory(
  props: React.ComponentProps<typeof OriginalCategory>,
) {
  return <OriginalCategory {...props} className={styles.category} />;
}
