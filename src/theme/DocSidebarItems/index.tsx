import React from 'react';
import OriginalDocSidebarItems from '@theme-original/DocSidebarItems';

import {useFilteredSidebarItems} from '@site/src/hooks/useFilteredSidebarItems';

type Props = React.ComponentProps<typeof OriginalDocSidebarItems>;

export default function DocSidebarItems(props: Props) {
  const filteredItems = useFilteredSidebarItems(props.items);

  return <OriginalDocSidebarItems {...props} items={filteredItems} />;
}
