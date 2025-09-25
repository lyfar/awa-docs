---
title: Practice Screen
sidebar_label: Practice Screen
sidebar_position: 2
version: "0.1"
capability: "practice"
status: "to-do"
lark_id: "recuVeJKizxyQb"
figma: "https://www.figma.com/design/CBoSOj4JkiZkWdINOzzFE7/Awaterra-App-UIUX?node-id=48-25"
owner: ""
user_value: "Provide a calm, guided environment to start, pause, and complete a practice"
trigger: "When a user selects a practice from the list or CTA"
done_when: "Session runs smoothly, logs completion, and transitions to the celebration flow"
capability_label: "05. Practice"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# Practice Screen

## Summary

<FeatureSummary />

## Narrative
The Practice Screen executes the flows defined in the [practice wiki](/docs/wiki/practices/) once a user confirms launch from the pop-up. AWAsoul anchors the visuals and controls, adapting its state to whatever modality the catalogue payload specifies while keeping capability ownership anchored to the [Capability catalogue](/docs/wiki/capabilities/).

Timers, grace logic, audio assets, and follow/download behaviour all reference metadata pulled from the wiki entry. That keeps the screen dynamic—changing a value in the wiki (for example, a new duration preset or download rule) propagates automatically without code edits.

## Interaction
1. Receive practice id, selected duration/modality, and metadata from the pop-up confirmation.
2. Load required assets (audio file if applicable, AWAsoul skin, master portrait, reaction payload) and surface the optional do-not-disturb prompt.
3. Present a pre-start state that reflects the practice type, including countdown-to-unlock for Special Practice when needed.
4. On start, launch the timer logic: fixed timer, selected preset, or manual countdown with grace tracking for My Practice; begin audio playback for guided types.
5. Maintain controls for pause/resume, mute, and finish while AWAsoul visuals sync with the current modality.
6. On completion or manual finish, capture reaction input, award AWAunits, check streak status, and surface follow/download actions when allowed.
7. Persist the session record (practice id, target duration, actual duration, modality, reaction, follow/download actions) and route to the celebration or summary view.

:::caution Edge Case
User receives an interruption such as a call or notification. Save the session state and make it easy to resume.
:::

:::tip Signals of Success
- Completion rate stays high without technical glitches or audio dropouts.
- Users understand controls instantly and report a calm, focused experience.
- Session telemetry records time-on-task and outcomes reliably.
:::

### Journey

```mermaid
flowchart TD
    START([Practice selected])
    PREP[Show pre-start state]
    BEGIN{User starts?}
    RUN[Play audio & timer]
    PAUSE{Pause needed?}
    RESUME[Resume session]
    FINISH[Complete practice]
    COMPLETE[Save session & continue]
    START --> PREP --> BEGIN
    BEGIN -->|Yes| RUN --> PAUSE
    PAUSE -->|Yes| RESUME --> RUN
    PAUSE -->|No| FINISH --> COMPLETE --> END((Practice recorded))
```

## Requirements
- **Acceptance criteria**
  - GIVEN a practice entry with audio WHEN playback starts THEN the timer and AWAsoul visuals align with the duration type, presets, and skin defined in that entry's metadata.
  - GIVEN a practice that exposes selectable presets WHEN the user confirms start THEN the chosen value persists through the session and writes back to analytics on completion.
  - GIVEN a practice that defines a grace window (e.g., My Practice) WHEN the countdown exceeds the allowed threshold THEN the result view marks the session as incomplete and explains the outcome.
  - GIVEN a practice flagged with follow/download actions WHEN the result screen appears THEN those CTAs surface and log interactions; practices without the flag never show them.
- **No-gos & risks**
  - Diverging from the wiki rule set (e.g., offering downloads for My Practice or mis-timing Special Practice unlocks).
  - Dropping session state after interruptions, causing inaccurate duration or streak logging.
  - Ignoring accessibility (e.g., AWAsoul colours, timer contrast, captions for guided narration).

## Data
- Primary metric: Practice completion rate vs. starts, split by practice type.
- Secondary checks: Pause/resume frequency, grace-window overruns for My Practice, follow/download conversions.
- Telemetry requirements: Log session start/finish timestamps, selected duration, actual duration, reaction choice, follow/download actions, streak outcomes, audio errors, and interruption recovery events.

## Open Questions
- Should we preload multiple audio tracks to reduce gaps when users switch practices mid-session?
- How do we extend the wiki to cover future modalities (e.g., breathwork intensives) without breaking 0.1 flows?
