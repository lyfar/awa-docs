---
title: Mission Spend Feedback
sidebar_label: Mission Feedback v0.6
sidebar_position: 15
version: "0.6"
capability: "engagement-notifications"
status: "planned"
lark_id: "recuWRncTLJXI4"
owner: ""
user_value: "Reward users instantly after contributing Lumens so they feel impact and trust the deduction"
trigger: "Immediately after the user confirms spending Lumens on a mission"
done_when: "User sees confirmation animation/message, unit balance updates, and optional next-step suggestion"
capability_label: "06. Engagement & Notifications"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# Mission Spend Feedback v0.6

## Summary

<FeatureSummary />

## Narrative
Every contribution deserves a celebration. After the user spends Units on a mission, we fire a confirmation toast with the mission crest, updated balance, and a short line describing the saved pages. A secondary CTA nudges them to explore related missions or view the Saved Page gallery. This feedback also logs to analytics so we can correlate satisfaction with spend volume.

## Interaction
1. User hits “Contribute” on mission detail.
2. Backend confirms deduction → client receives success payload with updated balance + impact summary.
3. UI shows modal/pulse animation, displays “You funded 3 pages of X manuscript,” and updates Units chip.
4. Banner suggests “View saved pages” or “Support another mission.”

## Requirements
- Show updated balance without requiring manual refresh.
- Provide localized copy referencing mission title and pages saved.
- Offer error state if spend fails (insufficient units) with link to Units screen.

## Open Questions
- Should the feedback animation reuse Light Ignition visuals or a unique motif?
- Do we queue multiple contributions or show one toast per transaction?
