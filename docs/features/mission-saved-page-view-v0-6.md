---
title: Mission Saved Page View
sidebar_label: Saved Page View v0.6
sidebar_position: 19
version: "0.6"
capability: "gamification-rewards"
status: "planned"
lark_id: "recv15CjendQ4f"
owner: ""
user_value: "Let supporters view the digitized manuscript pages they unlocked"
trigger: "After completing a mission contribution or from history"
done_when: "User can open the gallery, swipe through pages, and download/share"
capability_label: "09. Gamification & Rewards"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# Mission Saved Page View v0.6

## Summary

<FeatureSummary />

## Narrative
Contributors should immediately see the result of their support. The Saved Page View presents high-res imagery of digitized manuscripts once payment clears. It includes page metadata, a subtle watermark, and share/download controls. Access ties to the receipt so users can revisit pages from history without paying again.

## Interaction
1. After spend success, a CTA “View saved pages” opens the gallery.
2. Gallery displays pages with pinch-to-zoom, metadata (page number, origin), and a gratitude note.
3. Users can download, share, or return to missions.

## Requirements
- Use signed URLs with expiry; refresh tokens silently when user browses multiple pages.
- Provide accessibility text describing each page.
- Respect light/dark mode even with imagery.

## Open Questions
- Do we prefetch pages or stream as user swipes?
- Should we allow favorites within the gallery?
