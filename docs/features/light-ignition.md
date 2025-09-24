---
title: Light Ignition
sidebar_label: Light Ignition
sidebar_position: 1
version: "0.1"
capability: "visualization-map-layer"
status: "in-progress"
lark_id: "recuVfJKWNB4vz"
figma: "https://www.figma.com/design/CBoSOj4JkiZkWdINOzzFE7/Awaterra-App-UIUX?node-id=48-23"
owner: ""
user_value: "Morning focus, visual map flash, Pulse lift, and AWAunits rewards reinforce daily practice"
trigger: "When a user completes the 10-minute morning practice"
done_when: "Session is saved, globe updates, Pulse increases, rewards are applied, and favorite slots respect limits"
capability_label: "02. Visualization & Map Layer"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# Light Ignition

## One-Glance Summary

<FeatureSummary />

## Narrative
Light Ignition turns each completed practice into a celebratory spectacle. The globe flashes, the Pulse climbs, and AWAunits cascade into the user’s wallet to make progress tangible. For registered members the moment also unlocks deeper rewards, while guests still feel the resonance of contributing to a living community.

The experience balances awe with clarity: the animation communicates impact, while UI elements recap streaks, wallet additions, and favorites. Guardrails ensure we never overwhelm the user—effects are soothing, timing is deliberate, and accessibility cues keep the flow inclusive.

## Interaction Blueprint
1. Detect completion of the guided 10-minute morning practice.
2. Trigger Light Vision animation on the globe and overlay celebratory effects.
3. Increment AWA Pulse and surface momentary metrics that show the community uplift.
4. Credit AWAunits for registered users and prompt guests to create a profile to retain rewards.
5. Offer options to favorite the session and respect tier limits (3 for Free, unlimited for Journey).
6. Persist the session summary, update streak counters, and reset the interface for the next action.

- Edge case: Simultaneous completions could overwhelm the pulse animation; throttle visual intensity while still logging each contribution.

- Signals of success:
  - Every session produces a reliable visual flash and Pulse update.
  - Wallet balances reflect credited AWAunits within seconds for registered members.
  - Favorites honor tier limits without blocking joyful completion.

### Mermaid Journey IN MERMAID FORMAT

```mermaid
flowchart TD
    START([Practice completes])
    EFFECTS[Play Light Ignition effects]
    PULSE[Increase AWA Pulse]
    REWARDS{User registered?}
    WALLET[Credit AWAunits]
    PROMPT[Invite profile creation]
    FAVORITES[Offer save to favorites]
    SUMMARY[Persist session summary]
    START --> EFFECTS --> PULSE --> REWARDS
    REWARDS -->|Yes| WALLET --> FAVORITES
    REWARDS -->|No| PROMPT --> FAVORITES
    FAVORITES --> SUMMARY --> END((Celebration complete))
```

## Requirements & Guardrails
- **Acceptance criteria**
  - GIVEN a completed practice WHEN Light Ignition fires THEN globe animations, Pulse uplift, and session summary appear within 1 second.
  - GIVEN a registered user WHEN rewards credit THEN wallet and streak values update before the user leaves the screen.
  - GIVEN a guest user WHEN the reward modal appears THEN the copy clearly explains what is forfeited without pressure.
- **No-gos & risks**
  - Overwhelming audio/visual stimuli that contradict the mindful tone.
  - Inconsistent reward accounting that erodes trust in the system.
  - Accessibility regressions (flashes, color contrast) that exclude sensitive users.

## Data & Measurement
- Primary metric: Percentage of completed practices that successfully trigger Light Ignition events.
- Secondary checks: Reward settlement latency, favorite conversion rate, and Pulse uplift per session.
- Telemetry requirements: Log practice completion triggers, reward distribution outcomes, and animation timing.

## Open Questions
- Should we vary Light Ignition effects by practice type or keep a single motif for v0.1?
- How long should celebratory elements remain on screen before gracefully fading?
