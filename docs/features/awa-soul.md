---
title: AWA Soul
sidebar_label: AWA Soul
sidebar_position: 2
version: "0.1"
capability: "visualization-map-layer"
status: "in-progress"
lark_id: "recuVfKxHQ1Vl1"
figma: "https://www.figma.com/design/CBoSOj4JkiZkWdINOzzFE7/Awaterra-App-UIUX?node-id=48-4"
owner: ""
user_value: "Inspiring onboarding guide that introduces users to the global light community"
trigger: "When a user opens the app for the first time and during early guided practices"
done_when: "Users experience AWA Soul’s greeting, guidance, and wrap into the globe, establishing the community connection"
capability_label: "02. Visualization & Map Layer"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# AWA Soul

## One-Glance Summary

<FeatureSummary />

## Narrative
AWA Soul is the ambassador that welcomes every newcomer. A living sphere of light breathes, guides the user through onboarding, and reminds them they join a global community.

The character gives clear directions, sets expectations, and encourages commitment in plain words. When onboarding ends, the sphere wraps into the globe so users see how their light joins the whole.

## Interaction Blueprint
1. Detect first-launch or guided practice scenarios that require the AWA Soul introduction.
2. Render the pulsing light sphere with breathing motion and adaptive brightness.
3. Deliver scripted narration (voice or text) coordinated with particle emphasis and formations.
4. Transition from onboarding steps into the Light Map, animating AWA Soul as it envelops the globe.
5. Respond to user interactions (tap, swipe, dwell) with subtle animation changes that reinforce presence.
6. Persist the user’s onboarding completion so subsequent sessions start in the standard home experience.

:::caution Edge Case
Device performance limits particle effects. Degrade gracefully to fewer points while keeping breathing and narration.
:::

:::tip Signals of Success
- New users finish onboarding and understand AWATERRA’s mission.
- Interaction logs show engagement with AWA Soul’s prompts instead of skips.
- Visual transitions run smoothly on target hardware.
:::

### Journey

```mermaid
flowchart TD
    START([First app launch])
    INTRO[Render AWA Soul sphere]
    GUIDE[Deliver guided narration]
    TRANSITION[Animate wrap into globe]
    CHECK{Onboarding complete?}
    HOME[Land on Light Map]
    START --> INTRO --> GUIDE --> TRANSITION --> CHECK
    CHECK -->|Yes| HOME --> END((User feels welcomed))
    CHECK -->|No| LOOP[Offer gentle reminders]
    LOOP --> GUIDE
```

## Requirements & Guardrails
- **Acceptance criteria**
  - GIVEN a new user WHEN the app opens THEN AWA Soul greets them with narration and responsive animation.
  - GIVEN animation playback WHEN the user interacts THEN feedback (point clustering, brightness shifts) reflects that attention.
  - GIVEN onboarding completion WHEN the user returns THEN AWA Soul resumes in-context guidance rather than repeating the full sequence.
- **No-gos & risks**
  - Overly intense visuals or audio that overwhelm sensitive users.
  - Long load times that break immersion before the greeting begins.
  - Localization gaps that make guidance inaccessible in the user’s language.

## Data & Measurement
- Primary metric: Onboarding completion rate driven by AWA Soul’s guided flow.
- Secondary checks: Average dwell time with the character, skip rates, and drop-off points per narration step.
- Telemetry requirements: Log scene transitions, interaction events with the sphere, and animation performance metrics.

## Open Questions
- Should AWA Soul’s script adapt based on user-selected intent or language preferences in v0.1?
- How do we maintain narrative freshness for returning users who revisit the guidance flow?
