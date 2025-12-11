---
title: SPEND Rewards Store (Missions)
sidebar_label: SPEND Rewards Store (Missions)
sidebar_position: 0
version: "0.5"
capability: "gamification-rewards"
status: "to-do"
lark_id: "recuVfLgw5SyjB"
figma: ""
owner: ""
user_value: "Fund manuscript preservation and see impact"
trigger: "When the user opens the Mission tab and taps Save Now or a page pack"
done_when: "AWAWAY Units are deducted, the selected number of pages is saved, and mission stats update"
capability_label: "09. Gamification & Rewards"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# SPEND Rewards Store (Missions)

## Summary

<FeatureSummary />

## Narrative
The Rewards Store transforms Lumens into tangible cultural preservation. Inside the Missions tab users can save ancient manuscript pages by choosing bundles (1, 3, or 5 pages). Copy explains the real-world impact while visuals show the community’s collective progress.

Transactions feel ceremonial: a short confirmation animation, updated statistics, and optional share link (“I just saved 3 pages of wisdom”).

## Interaction
1. User opens Missions and views current campaign (“Save a page of ancient knowledge”).
2. Interface displays bundles (1/3/5 pages) with unit costs and impact statements.
3. User selects a bundle; confirmation modal summarizes cost and new total pages saved.
4. On confirm, ledger deducts units, updates mission totals, and logs the transaction in history.
5. Confirmation screen thanks the user, shows new community progress, and offers share options.
6. Mission dashboard updates in real time for all users.
7. If ledger declines (insufficient units), UI suggests earning actions.

:::caution Edge Case
If mission stats API fails, allow the spend but queue the visualization update, showing a "Stats will refresh soon" banner to avoid double counting.
:::

:::tip Signals of Success
- Users convert stored units into mission contributions regularly.
- Community stats rise steadily with minimal manual intervention.
- Share copy spreads organically, amplifying the mission.
:::

## Journey
```mermaid
%%{init: {'securityLevel': 'loose', 'flowchart': {'htmlLabels': true}}}%%
flowchart TD
    START([User opens Missions tab])
    SELECT[Choose 1/3/5 page pack]
    CONFIRM[Review cost + impact]
    PROCESS[Deduct units + update ledger]
    STATS[Refresh mission totals]
    SHARE{Share action?}
    START --> SELECT --> CONFIRM --> PROCESS --> STATS --> END((Pages saved + stats updated))
    STATS --> SHARE --> END
    click PROCESS "./awa-units-base-controls-v0-4" "Ledger handles the deduction"
    click STATS "./awa-units-reporting-v0-4" "Reporting reflects the mission totals"
    click SHARE "./referral-program-awa-units-v0-4" "Share encourages inviting friends"
```

## Requirements
- **Acceptance criteria**
  - GIVEN a user selects a pack WHEN they confirm THEN units deduct, mission totals increment, and history logs the action with campaign metadata.
  - GIVEN ledger declines due to insufficient units WHEN the user attempts to spend THEN the UI surfaces helpful earning suggestions instead of failing silently.
  - GIVEN the mission stats endpoint is temporarily unavailable WHEN the spend succeeds THEN users still see confirmation plus a note that stats will refresh later.
- **No-gos & risks**
  - Spending without clear impact messaging will feel hollow; always show what the contribution achieved.
  - Mission progress must be tamper-proof; audit every transaction.
  - Avoid overwhelming users with too many simultaneous campaigns in 0.5.

## Data
- **Primary metric:** AWAWAY Units spent on missions per active user.
- **Secondary checks:** Average pack size, share rate, mission stat freshness, refund incidence, and stat-sync fallbacks.
- **Telemetry requirements:** Log campaign ID, pack size, pre/post unit balance, transaction status, fallback banners, and share actions.

## Open Questions
- Do we rotate missions automatically or require manual activation each cycle?
- Should missions support recurring contributions or stay single-purchase for Glow?
