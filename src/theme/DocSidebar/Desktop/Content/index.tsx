import React from 'react';
import {useLocation} from '@docusaurus/router';
import OriginalDocSidebarDesktopContent from '@theme-original/DocSidebar/Desktop/Content';

import VersionFilter from '@site/src/components/VersionFilter';
import SidebarVersionOrb from '@site/src/components/SidebarVersionOrb';

export default function DocSidebarDesktopContentWrapper(props: React.ComponentProps<typeof OriginalDocSidebarDesktopContent>) {
  const {pathname} = useLocation();
  const hideVersionFilter = pathname.includes('/product-templates/');

  return (
    <>
      {!hideVersionFilter && <VersionFilter />}
      <OriginalDocSidebarDesktopContent {...props} />
      {!hideVersionFilter && <SidebarVersionOrb />}
    </>
  );
}
