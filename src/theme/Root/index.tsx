import React from 'react';

import DocsAccessGate from '@site/src/components/DocsAccessGate';
import {VersionProvider} from '@site/src/context/VersionContext';

type RootProps = {
  children: React.ReactNode;
};

const Root: React.FC<RootProps> = ({children}) => {
  return (
    <VersionProvider>
      <DocsAccessGate>{children}</DocsAccessGate>
    </VersionProvider>
  );
};

export default Root;
