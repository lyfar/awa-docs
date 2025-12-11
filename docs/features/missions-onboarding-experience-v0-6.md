---
title: Missions in Onboarding
sidebar_label: Missions Onboarding v0.6
sidebar_position: 13
version: "0.6"
capability: "access"
status: "planned"
lark_id: "recv15AdsZk7JP"
owner: ""
user_value: "Teach new users that Lumens can be earned and spent on missions during the first-run flow"
trigger: "During onboarding after Light Ignition preview and before profile creation"
done_when: "Onboarding explicitly states missions exist, how units power them, and invites user to continue"
capability_label: "03. Access"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# Missions in Onboarding v0.6

## Summary

<FeatureSummary />

## Narrative
Early clarity prevents confusion later. The onboarding update inserts a short card explaining that Lumens are earned through practice and can be spent on missions to digitize ancient pages. Copy and visuals preview the Missions dashboard while keeping the flow calm. CTA text (“Continue to missions-ready profile”) reinforces that nothing extra is required now—just awareness. The module also stores a flag so we can skip redundant tooltips on the first visit to the Missions tab.

## Interaction
1. After initial welcome animations, user advances to the “Energy Circles” step.
2. A missions explainer slide appears with imagery of digitized pages, unit coin icon, and short bullet list: earn → spend → see pages.
3. CTA: “Got it, continue” moves user forward; optional link opens a lightweight FAQ.
4. Completion logs `onboarding_missions_viewed=true` for analytics and to hide future nudges.

## Requirements
- **Acceptance criteria**
  - GIVEN onboarding WHEN the missions slide appears THEN copy mentions earning + spending units and references saved pages.
  - GIVEN the user dismisses the slide WHEN they return to home THEN no redundant tooltip replays unless they skipped onboarding.
- **No-gos & risks**
  - Overloading onboarding with transactions; keep it informational, not an immediate ask.
  - Skipping analytics, leaving us blind to whether users saw the guidance.

## Data
- Event: `onboarding_missions_viewed` with timestamp + locale.
- Preference flag to suppress duplicate tips.

## Open Questions
- Should we allow users to jump straight into Mission list from onboarding, or keep it informational only?
- Localization: do we need alternate imagery for markets unfamiliar with “digitization” language?
