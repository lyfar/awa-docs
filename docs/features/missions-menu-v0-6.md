---
title: Missions Menu
sidebar_label: Missions Menu v0.6
sidebar_position: 14
version: "0.6"
capability: "access"
status: "planned"
lark_id: "recv15zKY8YK7b"
owner: ""
user_value: "Let users reach active missions quickly from the home surface"
trigger: "When the user taps the Missions button in the main menu or drawer"
done_when: "Menu opens, shows available missions, and links to detail views without leaving the home context"
capability_label: "03. Access"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# Missions Menu v0.6

## Summary

<FeatureSummary />

## Narrative
The Missions Menu acts like a control center: users tap the Missions icon in the left rail or profile drawer and a panel slides up showing featured missions, progress snippets, and badges for new drops. From here they can preview mission stats, open details, or jump to the full dashboard. The interaction mirrors the profile drawer so the experience feels cohesive.

## Interaction
1. User taps Missions in the nav rail or drawer.
2. Overlay animates up, dimming the home surface but preserving context.
3. Menu lists: featured mission card, “Continue missions” list, and shortcut to the full dashboard.
4. Selecting a mission opens the detailed mission screen; closing the overlay returns to home.

## Requirements
- Show badge counts for new missions (`new_mission_count`) next to the menu label.
- Provide quick access to saved missions/ongoing contributions.
- Maintain keyboard/screen-reader focus order when the overlay opens.

## Open Questions
- Do we allow inline contributions from the menu, or require navigating to the detail screen?
