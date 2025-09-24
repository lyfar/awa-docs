import React from 'react';
import {useColorMode} from '@docusaurus/theme-common';

import {useVersionContext} from '@site/src/context/VersionContext';

import DitheringShader from './DitheringShader';
import styles from './SidebarVersionOrb.module.css';

interface SidebarVersionOrbProps {
  variant?: 'desktop' | 'mobile';
  className?: string;
}

const SidebarVersionOrb: React.FC<SidebarVersionOrbProps> = ({variant = 'desktop', className}) => {
  const {currentVersion, versionByValue} = useVersionContext();
  const {colorMode} = useColorMode();
  const versionInfo = versionByValue[currentVersion] ?? null;
  const versionValue = versionInfo?.value ?? currentVersion;
  const versionLabel = versionInfo?.label ?? `Version ${versionValue}`;

  const wrapperClass = [styles.wrapper, variant === 'mobile' ? styles.compact : '', className]
    .filter(Boolean)
    .join(' ');

  const shaderSize = variant === 'mobile' ? 130 : 160;
  const shaderBack = colorMode === 'dark' ? 'rgba(20, 17, 31, 0.85)' : 'rgba(255, 255, 255, 0.82)';
  const shaderFront = colorMode === 'dark' ? '#b6a9ff' : '#6d5ae6';

  return (
    <div className={wrapperClass}>
      <div className={styles.shaderShell}>
        <DitheringShader
          width={shaderSize}
          height={shaderSize}
          shape="sphere"
          type="random"
          pxSize={2.2}
          speed={1.2}
          colorBack={shaderBack}
          colorFront={shaderFront}
        />
        <span className={styles.value}>v{versionValue}</span>
      </div>
      <div className={styles.caption}>{versionLabel}</div>
      <div className={styles.label}>Current Release</div>
    </div>
  );
};

export default SidebarVersionOrb;
