import React from 'react';
import clsx from 'clsx';
import {useLocation} from '@docusaurus/router';
import {
  NavbarSecondaryMenuFiller,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import DocSidebarItems from '@theme/DocSidebarItems';

import SidebarVersionOrb from '@site/src/components/SidebarVersionOrb';

import styles from './styles.module.css';

interface DocSidebarMobileSecondaryMenuProps {
  sidebar: any;
  path: string;
}

const DocSidebarMobileSecondaryMenu: React.FC<DocSidebarMobileSecondaryMenuProps> = ({sidebar, path}) => {
  const mobileSidebar = useNavbarMobileSidebar();
  const {pathname} = useLocation();
  const hideVersionExtras = pathname.includes('/wiki/');

  return (
    <div className={styles.container}>
      <div className={styles.sidebarContent}>
        <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
          <DocSidebarItems
            items={sidebar}
            activePath={path}
            onItemClick={(item) => {
              if (item.type === 'category' && item.href) {
                mobileSidebar.toggle();
              }
              if (item.type === 'link') {
                mobileSidebar.toggle();
              }
            }}
            level={1}
          />
        </ul>
      </div>
      {!hideVersionExtras && (
        <div className={styles.orbBlock}>
          <SidebarVersionOrb variant="mobile" />
        </div>
      )}
    </div>
  );
};

function DocSidebarMobile(props: DocSidebarMobileSecondaryMenuProps) {
  return (
    <NavbarSecondaryMenuFiller component={DocSidebarMobileSecondaryMenu} props={props} />
  );
}

export default React.memo(DocSidebarMobile);
