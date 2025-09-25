---
sidebar_position: 5
---

# 05. Practice

The core of the launch experience. Practitioners explore daily modalities, receive short master-led rituals, and log personal sessions while AWAsoul accompanies every step.

## Overview

For release 0.1 the Practice capability delivers the experience types defined in the [Practices catalogue](/docs/wiki/practices/). The wiki is the single source of truth for availability, duration behaviour, pop-up content, and follow-up logic. Product specs, design assets, and services consume that data directly so we can evolve practices without rewriting requirements. Use the [Practice capability wiki entry](/docs/wiki/capabilities/Practice) for quick reference and narrative context.

## Components

- **Practice Catalogue**: Lists the practice entries defined in the wiki (currently Light Practice, Guided Meditation, Sound Meditation, My Practice, Special Practice). See the [wiki index](/docs/wiki/practices/) for the authoritative table.
- **Pop-Up Information Cards**: Detail each practice before launch, mirroring the "Pop-Up Card Content" defined on the wiki pages.
- **Playback & Timers**: Streams audio for guided types, provides countdown timers for My Practice, and respects duration selectors where required.
- **AWAsoul Companion Layer**: Maintains play/pause/finish/mute controls and visual states aligned with the selected practice.
- **Post-Practice Reactions & Rewards**: Captures emotions, animates AWAunits, maintains streak logic, and offers master follow/download actions per practice rules.
- **Content Operations Hooks**: Handles daily rotations, expiry windows, downloads, and journal entries exactly as described in the wiki.

## Practice Types (v0.1)

:::info Canonical Reference
All launch practices live in the [Practices catalogue](/docs/wiki/practices/). Engineering services read directly from that dataset; update the wiki entry first whenever availability, durations, or CTAs change. Specs should link to the relevant page (e.g., [Light Practice](/docs/wiki/practices/light-practice), [Guided Meditation](/docs/wiki/practices/guided-meditation)) instead of duplicating tables here.
:::

## User Flow

1. **Before practice**
   - Practice Screen requests the current catalogue payload (practice ids, order, availability states, and pop-up fields) from the service that mirrors the wiki.
   - Selecting a card opens its pop-up information sheet populated from those fields so copy stays linked to the wiki entry.
2. **During practice**
   - AWAsoul exposes play, pause, finish, and mute controls across all practice types.
   - Timer mode, duration options, grace rules, and audio assets are read from the practice metadata; no local constants.
   - Optional Do Not Disturb prompt appears before playback begins when the metadata flag is set.
3. **After practice**
   - Reactions dashboard offers seven emotion icons; selections persist to analytics.
   - Award AWAunits with animation and trigger streak visuals when criteria are met.
   - Offer Follow Master and download actions when the metadata allows.
   - Log completion details using the shared schema (practice id, target duration, actual duration, reaction, follow/download actions, modality when present).

## Requirements

- **Catalogue integrity**
  - GIVEN the Practice Screen WHEN it loads THEN it renders the practice order, availability state, and labels provided by the catalogue API (sourced from the wiki) without hardcoded fallbacks.
  - GIVEN a practice reaches its retirement date WHEN the catalogue refreshes THEN retired cards disappear automatically using the start/end timestamps stored against the wiki entry.
- **Pop-up information cards**
  - GIVEN the user opens a practice card WHEN the pop-up renders THEN the copy, master details, selectors, and CTAs match the fields returned from the wiki entry.
  - GIVEN a practice entry toggles a new field (e.g., download disabled) WHEN the pop-up renders THEN the UI reflects that change without code modification.
- **Playback & timers**
  - GIVEN a practice with audio WHEN playback starts THEN the timer and AWAsoul visuals use the metadata attributes from the wiki entry (duration type, asset ids, skin references).
  - GIVEN My Practice WHEN the wiki-defined grace window changes THEN countdown validation respects the new threshold automatically.
- **Post-practice outcomes**
  - GIVEN a practice completes within its valid window WHEN the results screen appears THEN follow/download/feedback CTAs honour the flags on the wiki entry.
  - GIVEN analytics run WHEN session data is stored THEN payloads include the practice id and dynamic fields (selected duration, modality) defined in the wiki schema.
- **Data & telemetry**
  - Log practice id, selected duration, actual duration, reaction, download status, follow status, and completion outcome for every session.
  - Archive expired Special Practices with metadata (event name, schedule, master) for compliance and storytelling.

## Technical Requirements

- Audio streaming pipeline for mp3 assets with offline eligibility flags per practice.
- Timer engine supporting fixed, selectable preset, and manual durations with grace logic.
- AWAsoul state machine tied to practice metadata for visuals and controls.
- Rotation scheduler that publishes/archives Light, Guided, and Sound practices according to wiki cadences.
- Journal logging service for My Practice entries and analytics instrumentation for all practice events.

## Implementation Notes

- Source practice metadata from the wiki-backed store so UI and backend share the same schema (practice id, availability window, download rules, master data).
- Automate expiry jobs for rotation and special-event practices to avoid manual clean-up.
- Coordinate with localization to ensure pop-up descriptions and master bios stay in sync across languages as we expand beyond English/Russian.
- Keep follow, download, and reaction events idempotent; retries should not duplicate analytics entries.
- Reference the [Capability catalogue](/docs/wiki/capabilities/) when drafting new requirements so capability names and numbering stay aligned.

## Related Features

- [Practices List](/docs/features/practices-list)
- [Practice Screen](/docs/features/practice-screen)
- [Light Ignition](/docs/features/light-ignition)
- [Push Notifications](/docs/features/push-notifications) — for practice reminders aligned with availability windows
- [Admin Area v0.1](/docs/features/admin-area-cms) — manages practice entries and rotations
