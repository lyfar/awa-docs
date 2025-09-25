import React from 'react';
import {useLocation} from '@docusaurus/router';
import OriginalDocSidebarDesktopContent from '@theme-original/DocSidebar/Desktop/Content';

import SidebarVersionOrb from '@site/src/components/SidebarVersionOrb';

export default function DocSidebarDesktopContentWrapper(props: React.ComponentProps<typeof OriginalDocSidebarDesktopContent>) {
  const {pathname} = useLocation();
  const hideVersionExtras = pathname.includes('/wiki/');

  return (
    <>
      <OriginalDocSidebarDesktopContent {...props} />
      {!hideVersionExtras && <SidebarVersionOrb />}
    </>
  );
}
