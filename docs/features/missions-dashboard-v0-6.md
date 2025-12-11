---
title: Missions Dashboard
sidebar_label: Missions Dashboard v0.6
sidebar_position: 17
version: "0.6"
capability: "gamification-rewards"
status: "planned"
lark_id: "recv15ADAhZGbh"
owner: ""
user_value: "Give users an overview of total and personal mission impact with leaderboards"
trigger: "When the user opens the all-missions dashboard"
done_when: "Dashboard shows total pages digitized, user contribution stats, and a ranked list updated regularly"
capability_label: "09. Gamification & Rewards"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# Missions Dashboard v0.6

## Summary

<FeatureSummary />

## Narrative
The dashboard spotlights collective progress. It aggregates total pages digitized, highlights the user’s contributions, and ranks top supporters. Leaderboards motivate gentle competition, while charts show how many pages remain. Filters let users switch between global and circle views. Data refreshes whenever a mission transaction posts.

## Interaction
1. User opens Missions Dashboard from menu or CTA.
2. KPI tiles animate in: total pages digitized, user pages, units spent, remaining goal.
3. Leaderboard lists top contributors with avatar initials and pages count; user’s rank stays visible.
4. User scrolls to see mission list with progress bars.

## Requirements
- Provide accessible colours/labels for charts.
- Allow pull-to-refresh to fetch latest stats.
- Ensure leaderboard respects privacy (opt-out flag hides names).

## Open Questions
- Do we show weekly vs all-time stats toggle?
- Should we display expected completion dates per mission?
