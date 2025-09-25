import React from 'react';

import DocsAccessGate from '@site/src/components/DocsAccessGate';

type RootProps = {
  children: React.ReactNode;
};

const Root: React.FC<RootProps> = ({children}) => {
  return <DocsAccessGate>{children}</DocsAccessGate>;
};

export default Root;
