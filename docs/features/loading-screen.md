---
title: Loading Screen
sidebar_label: Loading Screen
sidebar_position: 1
version: "0.1"
capability: "access"
status: "to-do"
lark_id: "recuWnqTRoqeRD"
figma: "https://www.figma.com/design/CBoSOj4JkiZkWdINOzzFE7/Awaterra-App-UIUX?node-id=48-10"
owner: ""
user_value: "Reduce anxiety by showing a calm, purposeful progress experience while the app loads"
trigger: "When the app launches or a feature needs to prefetch data"
done_when: "Loading sequence completes smoothly and the destination feature is fully ready"
capability_label: "03. Access"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# Loading Screen

## One-Glance Summary

<FeatureSummary />

## Narrative
The Loading Screen offers a grounded welcome before AWATERRA comes to life. Rather than a passive spinner, the sequence introduces the brand voice—“We felt you’d come. Welcome home.”—and sets expectations about the light-filled community the user is joining. Calm animations keep energy steady while background tasks prepare content.

Because first impressions matter, the experience must be performant and intentional: uplifting copy, gentle sound, and subtle progress cues reassure users that the platform is readying their next moment of practice.

## Interaction Blueprint
1. Detect launch or feature transitions that require prefetching and initialize the loading state.
2. Display the first screen with pulsing light animation and the welcoming message.
3. Transition to the second screen reinforcing belonging and hinting at the community ahead.
4. Monitor data readiness and update progress indicators or copy if additional time is needed.
5. Fade out the loading sequence once prerequisites complete and transition into the destination experience.
6. Record whether the sequence has been shown before to avoid repetition when unnecessary.

- Edge case: Slow network extends load time; surface calming loops with honest messaging instead of freezing the visual.

- Signals of success:
  - New users experience a welcoming sequence without perceivable stutter.
  - Repeat users see the screen only when necessary; otherwise navigation remains snappy.
  - Support tickets referencing “blank screen on launch” trend downward.

### Mermaid Journey IN MERMAID FORMAT

```mermaid
flowchart TD
    START([Trigger loading state])
    INTRO[Show welcome animation]
    STORY[Reinforce community message]
    READY{Content ready?}
    TRANSITION[Fade into destination]
    START --> INTRO --> STORY --> READY
    READY -->|Yes| TRANSITION --> END((Experience begins))
    READY -->|No| LOOP[Continue calming loop]
    LOOP --> READY
```

## Requirements & Guardrails
- **Acceptance criteria**
  - GIVEN a cold app start WHEN assets load THEN the welcome animation plays smoothly and transitions automatically once ready.
  - GIVEN a returning user WHEN cached data is sufficient THEN the loading screen is skipped, preventing unnecessary delay.
  - GIVEN accessibility settings WHEN reduced motion is enabled THEN the animation simplifies without removing essential messaging.
- **No-gos & risks**
  - Long unbroken waits without context increase churn; copy must set expectations.
  - Flashy or high-contrast visuals conflict with the calming tone.
  - Playing audio without consent could surprise users in quiet environments.

## Data & Measurement
- Primary metric: Percentage of sessions where loading completes under the target threshold while the animation plays uninterrupted.
- Secondary checks: Average time spent on the loading sequence, opt-out/rage taps, and crash-free rate during initialization.
- Telemetry requirements: Log triggers, durations, fallback messaging usage, and whether the screen was shown or skipped.

## Open Questions
- Should we adapt messaging based on guest vs. registered state during v0.1?
- What is the minimum content required before transitioning to ensure screens never load partially?
