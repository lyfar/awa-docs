import React, {type ReactElement} from 'react';
import {useLocation} from '@docusaurus/router';
import {useThemeConfig} from '@docusaurus/theme-common';
import {useNavbarSecondaryMenu} from '@docusaurus/theme-common/internal';
import Translate from '@docusaurus/Translate';

import VersionFilter from '@site/src/components/VersionFilter';
import SidebarVersionOrb from '@site/src/components/SidebarVersionOrb';

import styles from './styles.module.css';

function SecondaryMenuBackButton(props: React.ComponentProps<'button'>) {
  return (
    <button {...props} type="button" className="clean-btn navbar-sidebar__back">
      <Translate
        id="theme.navbar.mobileSidebarSecondaryMenu.backButtonLabel"
        description="The label of the back button to return to main menu, inside the mobile navbar sidebar secondary menu"
      >
        ← Back to main menu
      </Translate>
    </button>
  );
}

export default function NavbarMobileSidebarSecondaryMenu(): ReactElement {
  const {pathname} = useLocation();
  const hideVersionExtras = pathname.includes('/product-templates/');
  const isPrimaryMenuEmpty = useThemeConfig().navbar.items.length === 0;
  const secondaryMenu = useNavbarSecondaryMenu();

  return (
    <div className={styles.container}>
      {!isPrimaryMenuEmpty && (
        <SecondaryMenuBackButton onClick={() => secondaryMenu.hide()} />
      )}
      {!hideVersionExtras && (
        <div className={styles.filterBlock}>
          <VersionFilter variant="mobile" />
        </div>
      )}
      <div className={styles.sidebarContent}>{secondaryMenu.content}</div>
      {!hideVersionExtras && (
        <div className={styles.orbBlock}>
          <SidebarVersionOrb variant="mobile" />
        </div>
      )}
    </div>
  );
}
