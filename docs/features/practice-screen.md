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

## One-Glance Summary

<FeatureSummary />

## Narrative
Practice Screen delivers the core AWATERRA experience. It ushers users into a focused state with gradient visuals, AWA Soul breathing animations, and ambient audio. Controls remain minimal—start, pause, mute, finish—keeping attention on inner work. For guests, the flow still records a session while previewing the benefits of creating an account.

## Interaction Blueprint
1. Load practice assets (audio, visuals, guidance text) and prepare do-not-disturb prompt.
2. Display a calming pre-start state with session description and start CTA.
3. On start, trigger countdown timer, audio playback, optionally haptic breathing cues.
4. Allow pause/resume with confirmation to prevent accidental stops.
5. On completion, surface finish CTA, gratitude prompt, and optional reaction/feedback.
6. Persist session data, then route to Profile View or Light Ignition celebration.

- Edge case: User receives interruption (call, notification); ensure resume state is saved and easy to re-enter.

- Signals of success:
  - High completion rate without technical glitches or audio dropouts.
  - Users understand controls instantly and report calm, focused experience.
  - Session telemetry records time-on-task and outcomes reliably.

### Mermaid Journey IN MERMAID FORMAT

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

## Requirements & Guardrails
- **Acceptance criteria**
  - GIVEN a user starts a session WHEN countdown ends THEN audio and visuals play synchronously until completion or pause.
  - GIVEN the user finishes WHEN they tap “Finish practice” THEN data logs and the celebration flow triggers within one second.
  - GIVEN the user is a guest WHEN they complete THEN a gentle prompt offers profile creation without blocking exit.
- **No-gos & risks**
  - Busy UI or aggressive animations that distract from mindfulness.
  - Losing session progress after app backgrounding.
  - Failing to respect user settings (mute, vibration, dark mode).

## Data & Measurement
- Primary metric: Practice completion rate vs. starts.
- Secondary checks: Average session duration variance, pause frequency, and feedback submissions.
- Telemetry requirements: Log session start/stop timestamps, control interactions, audio errors, and completion outcomes.

## Open Questions
- Should we preload multiple audio tracks to reduce gaps when users switch practices mid-session?
- How do we integrate adaptive guidance (e.g., shorter practices for busy moments) in future releases?
