---
title: Mission Detail Screen
sidebar_label: Mission Detail v0.6
sidebar_position: 18
version: "0.6"
capability: "gamification-rewards"
status: "planned"
lark_id: "recv15AVebm9SQ"
owner: ""
user_value: "Show mission storytelling, allow spending Lumens, and guide users to acquire more if needed"
trigger: "When user selects a mission from menu or dashboard"
done_when: "Detail screen displays mission content, handles spend, and regenerates shareable certificates"
capability_label: "09. Gamification & Rewards"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# Mission Detail Screen v0.6

## Summary

<FeatureSummary />

## Narrative
Each mission deserves a rich storytelling space: hero imagery, manuscript description, tiers that define units → pages saved, and a contribute CTA. If balance is low, the screen explains how to earn more units (practice, missions, purchases). After a successful spend, the screen regenerates/updates the certificate with new page counts for sharing.

## Interaction
1. User opens mission detail.
2. Hero section shows mission art, impact metrics, progress bar.
3. User selects contribution amount (preset tiers or custom) and taps “Support mission”.
4. If balance < cost, inline guidance links to Units screen.
5. On success, show confirmation module + updated certificate downloads.

## Requirements
- Include localization-ready strings and asset references.
- Display both remaining supply and user’s personal total for this mission.
- Provide share/save buttons for regenerated certificate.

## Open Questions
- Do we allow partial contributions (e.g., half page) or round to 1+ pages?
