import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import TagsListInline from '@theme/TagsListInline';
import EditMetaRow from '@theme/EditMetaRow';

import GitLastUpdated from '@site/src/components/GitLastUpdated';

const DocItemFooter = (): JSX.Element | null => {
  const {metadata} = useDoc();
  const {editUrl, lastUpdatedAt, lastUpdatedBy, tags} = metadata;
  const docPath = metadata.source?.replace(/^@site\//, '') ?? undefined;

  const canDisplayTagsRow = tags.length > 0;
  const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);
  const hasGitInfo = true;
  const canDisplayFooter = canDisplayTagsRow || canDisplayEditMetaRow || hasGitInfo;

  if (!canDisplayFooter) {
    return null;
  }

  return (
    <footer className={clsx(ThemeClassNames.docs.docFooter, 'docusaurus-mt-lg')}>
      {canDisplayTagsRow && (
        <div
          className={clsx(
            'row margin-top--sm',
            ThemeClassNames.docs.docFooterTagsRow,
          )}
        >
          <div className="col">
            <TagsListInline tags={tags} />
          </div>
        </div>
      )}
      {canDisplayEditMetaRow && (
        <EditMetaRow
          className={clsx(
            'margin-top--sm',
            ThemeClassNames.docs.docFooterEditMetaRow,
          )}
          editUrl={editUrl}
          lastUpdatedAt={lastUpdatedAt}
          lastUpdatedBy={lastUpdatedBy}
        />
      )}
      <div className={clsx('row margin-top--sm', ThemeClassNames.docs.docFooterEditMetaRow)}>
        <div className="col">
          <small>
            Last Git update: <GitLastUpdated docPath={docPath} />
          </small>
        </div>
      </div>
    </footer>
  );
};

export default DocItemFooter;
