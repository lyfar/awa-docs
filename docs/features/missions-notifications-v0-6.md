---
title: New Mission Notifications
sidebar_label: Mission Notifications v0.6
sidebar_position: 16
version: "0.6"
capability: "engagement-notifications"
status: "planned"
lark_id: "recv15AxWK1q8A"
owner: ""
user_value: "Alert users when fresh missions launch so they can contribute right away"
trigger: "When a mission transitions to live status in the CMS"
done_when: "User sees an in-app notification banner, can view mission details, and optionally opt into reminders"
capability_label: "06. Engagement & Notifications"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# New Mission Notifications v0.6

## Summary

<FeatureSummary />

## Narrative
New missions should feel exciting, not hidden. When CMS publishes a launch, the client surfaces a badge on the Missions menu plus a contextual banner on home (“New mission: Preserve the Golden Manuscript”). Tapping opens the mission detail with a CTA to contribute. Notifications respect user settings and dismiss gracefully once viewed.

## Interaction
1. Backend pushes mission launch event → client caches it.
2. Home shows a banner + counter on Missions menu.
3. User taps banner, reads mission summary, and chooses to contribute or dismiss.
4. Analytics record impression + action.

## Requirements
- Badge counts persist until the user opens the mission detail.
- Notifications respect Do Not Disturb and localization.
- Provide a “Remind me later” option that snoozes the banner.

## Open Questions
- Do we need push notifications outside the app for mission launches at v0.6?
