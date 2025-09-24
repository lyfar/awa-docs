import React from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

import styles from './FeatureSummary.module.css';

type FeatureFrontMatter = {
  user_value?: string;
  trigger?: string;
  done_when?: string;
  capability_label?: string;
  capability?: string;
  version?: string;
  lark_id?: string;
  figma?: string;
};

const defaultValue = 'TBD';

const FeatureSummary: React.FC = () => {
  const {metadata} = useDoc();
  const frontMatter = metadata.frontMatter as FeatureFrontMatter;

  const {
    user_value,
    trigger,
    done_when,
    capability_label,
    capability,
    version,
    lark_id,
    figma,
  } = frontMatter;

  const capabilityDisplay = capability_label ?? capability ?? defaultValue;
  const figmaDisplay = figma && figma.trim().length > 0 ? (
    <a href={figma} className={styles.link} target="_blank" rel="noreferrer">
      View prototype
    </a>
  ) : (
    'Not yet linked'
  );

  const rows: Array<{label: string; value: React.ReactNode}> = [
    {label: 'User value', value: user_value ?? defaultValue},
    {label: 'Trigger', value: trigger ?? defaultValue},
    {label: 'Done when', value: done_when ?? defaultValue},
    {label: 'Capability', value: capabilityDisplay},
    {label: 'Version target', value: version ?? defaultValue},
    {
      label: 'Lark feature ID',
      value: lark_id ? <code className={styles.code}>{lark_id}</code> : defaultValue,
    },
    {label: 'Figma', value: figmaDisplay},
  ];

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td className={styles.cellLabel}>{row.label}</td>
              <td className={styles.cellValue}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeatureSummary;
