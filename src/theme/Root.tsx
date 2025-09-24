import React from 'react';
import Root from '@theme-original/Root';
import {VersionProvider} from '@site/src/context/VersionContext';

export default function RootWrapper(props: React.ComponentProps<typeof Root>) {
  return (
    <VersionProvider>
      <Root {...props} />
    </VersionProvider>
  );
}
