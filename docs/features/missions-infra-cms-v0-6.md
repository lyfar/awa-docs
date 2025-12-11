---
title: Missions Infrastructure & CMS
sidebar_label: Missions Infra & CMS v0.6
sidebar_position: 12
version: "0.6"
capability: "app-infrastructure"
status: "planned"
lark_id: "recv15zEEUEOlK"
figma: ""
owner: ""
user_value: "Enable users to spend Lumens on digitization missions backed by reliable data and admin tooling"
trigger: "Whenever missions are created, updated, or completed across the app"
done_when: "CMS stores mission metadata, clients can fetch it, process contributions, and balances sync reliably"
capability_label: "01. App Infrastructure"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# Missions Infrastructure & CMS v0.6

## Summary

<FeatureSummary />

## Narrative
Contributing to manuscript digitization hinges on trusted rails. Missions Infra v0.6 delivers the scaffolding: CMS models to author missions, contribution tiers, and visual assets; APIs to stream missions into onboarding, the drawer, and dashboards; and transactions that deduct Lumens, log receipts, and update balances in real time. Admins can pause missions, adjust supply, or upload new digitized pages while clients stay in sync via versioned payloads. Without this base layer, none of the mission UX flows (menus, dashboards, saved pages) can operate safely.

## Interaction
1. Admin authors or updates a mission in CMS (title, description, unit price, impact metrics, assets).
2. The infra service publishes mission payloads with version + availability windows.
3. Clients fetch `/missions` on boot or when user opens Missions screens; payload includes contribution tiers and localization keys.
4. User contributes Lumens → client calls `/missions/{id}/contribute` with amount; backend validates balance, records transaction, returns updated balances + certificate metadata.
5. Contribution receipts sync to Units history and History/Reactions modules; mission inventory updates for dashboards.
6. CMS supports asset uploads (digitized pages) so Saved Page View can fetch authorized images post-purchase.

## Requirements
- **Acceptance criteria**
  - GIVEN CMS data WHEN new mission publishes THEN clients receive structured payload (id, price, copy keys, assets, availability) via API within SLA.
  - GIVEN a contribution request WHEN backend validates balance THEN Units are deducted, transaction logged, and mission stats incremented atomically.
  - GIVEN digitized assets WHEN user earns access THEN signed URLs or inline images return with the contribution receipt.
- **No-gos & risks**
  - Hard-coding mission copy or prices in clients.
  - Allowing contributions without transactional logs, leading to balance mismatch.
  - Serving assets without access control.

## Data
- Mission payload: `{id, version, title_key, description_key, unit_price, tiers[], impact_metrics, assets[], status}`.
- Transaction log: `{mission_id, user_id, units_spent, timestamp, receipt_id}`.
- CMS change log to audit edits and rollbacks.

## Open Questions
- Do we cache missions offline? If so, how do we invalidate stale pricing?
- What is the SLA for asset upload → client availability?
- Should receipts be exportable as certificates immediately or batched?
