---
title: Admin Area v0.1 (CRM/CMS)
sidebar_label: Admin Area v0.1 (CRM/CMS)
sidebar_position: 5
version: "0.1"
capability: "app-infrastructure"
status: "to-do"
lark_id: "recuWRmlxI3SIx"
figma: ""
owner: ""
user_value: "Simplifies content management for the first wave of practices."
trigger: "When an admin logs into the dashboard."
done_when: "Admins can access and modify practices with full CRUD."
capability_label: "01. App Infrastructure"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# Admin Area v0.1 (CRM/CMS)

## One-Glance Summary

<FeatureSummary />

## Narrative
The Admin Area v0.1 gives stewards of AWATERRA a trusted workspace to curate practices without touching production databases. With secure sign-in, clear views of the catalog, and simple form-driven editing, the team can keep guidance fresh as the offering evolves.

This first release focuses on the essentials: manage practice metadata, publish or retire entries, and confirm that every change synchronizes with the public experience. Guardrails like role checks and audit logging keep the environment safe even while we move quickly.

## Interaction Blueprint
1. Admin authenticates with elevated credentials and reaches the dashboard home.
2. Dashboard lists existing practices with status badges, search, and quick filters.
3. Admin chooses an item to edit or selects "Create practice" to open the guided form.
4. Changes are saved via secure APIs, validated, and reflected in preview state.
5. Admin confirms updates, publishes, or reverts as needed; audit trail stores the action.
6. System syncs updates to the live catalog and notifies relevant stakeholders.

- Edge case: Form validation fails because required fields are missing; the dashboard blocks submission, highlights the fields, and prevents publishing until resolved.

- Signals of success:
  - Practice CRUD operations complete without manual database access.
  - Admin workflows average under five minutes from edit to publish.
  - Audit logs capture 100 percent of create, update, and delete events.

### Mermaid Journey IN MERMAID FORMAT

```mermaid
flowchart TD
    START([Admin logs into dashboard])
    LIST[View practice catalog]
    ACTION{Create or edit?}
    START --> LIST --> ACTION
    ACTION -->|Create| CREATE[Complete new practice form]
    ACTION -->|Edit| EDIT[Update existing practice fields]
    CREATE --> VALIDATE{Pass validation?}
    EDIT --> VALIDATE
    VALIDATE -->|Yes| REVIEW[Review changes & confirm]
    VALIDATE -->|No| FIX[Highlight issues & request fixes]
    FIX --> ACTION
    REVIEW --> SAVE[Persist changes via APIs]
    SAVE --> SYNC[Sync to live catalog & log action]
    SYNC --> END((Practices updated successfully))
```

## Requirements & Guardrails
- **Acceptance criteria**
  - GIVEN an authenticated admin WHEN they open the practice catalog THEN they see a searchable list with status, owner, and last-updated metadata.
  - GIVEN the admin submits a fully populated practice form WHEN the change is confirmed THEN the record is created or updated and visible in both dashboard and client app within a refresh cycle.
  - GIVEN the admin deletes a practice WHEN the action is confirmed THEN the item is marked inactive, logged, and removed from user-facing entry points.
- **No-gos & risks**
  - Never expose admin tools without MFA and role-based access control.
  - Avoid silent failures that overwrite content without alerting the editor.
  - Prevent destructive actions from bypassing audit logging or version history.

## Data & Measurement
- Primary metric: Admin task completion rate (create/update/delete) without engineering intervention (target ≥ 95 percent).
- Secondary checks: Median dashboard load under 2 seconds, number of validation errors per session, count of audit gaps.
- Telemetry requirements: Log every CRUD action with actor, timestamp, diff snapshot, and outcome; instrument dashboard performance and error events.

## Open Questions
- Do we need draft states and preview links before publishing in v0.1?
- How will we handle bulk updates or imports if the catalog scales beyond a few dozen practices?
- Which admins require approval workflows before destructive actions?
