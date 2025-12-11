---
title: Master Visualization Screen v0.3
sidebar_label: Master Visualization Screen v0.3
sidebar_position: 8
version: "0.3"
capability: "visualization-map-layer"
status: "planned"
lark_id: "recuZROF1FenVa"
figma: ""
owner: ""
user_value: "Immerse users in a calm, master-branded space that builds anticipation and connection before and during a collective practice."
trigger: "When a user selects a master-led practice or enters the collective pre-session lobby."
done_when: "Visualization screen renders the master planet, countdown, participant map, and reaction bursts with smooth transitions across the pre, live, and closing states."
capability_label: "02. Visualization & Map Layer"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# Master Visualization Screen v0.3

## Summary

<FeatureSummary />

## Narrative
This screen is the immersive lobby for master collectives: CMS-provided palettes render the master planet, countdown arc, and participant shimmer while keeping the copy aligned with the master affirmation. The visuals mirror the halo states in [AWA Pulse](/docs/features/awa-pulse-master-collective-v0-3.md) so the journey feels continuous.

During playback the reaction timeline from [Reactions v0.3](/docs/features/reactions-masters-v0-3.md) overlays gentle markers; post-session the planet collapses into recap stats with “Thank the master” CTA before routing home.

## Interaction
1. User selects a master practice; the visualization loads the master profile payload (colors, glyph, affirmation).
2. Pre-session state shows countdown, master avatar/planet, participants entering, and optional "Add to calendar" if early.
3. At T-5m the screen introduces "I’m ready" CTA and shows participant growth via glowing orbit rings.
4. Session auto-starts with audio; visualization synchronises to track markers (e.g., breath cues, reaction prompts).
5. Reactions left by participants appear as markers on the session timeline, with the visualization subtly pulsing to acknowledge the collective energy.
6. Post-session, the screen transitions to recap stats and calls to thank/follow the master before returning to home.

:::caution Edge Case
Handle late joins gracefully—if someone arrives after start, skip the countdown and land them into the live visualization without disorienting flashes.
:::

:::tip Signals of Success
- Users stay on the screen during countdowns instead of navigating away (sharp drop in bounce rate compared to neutral lobbies).
- Reaction animations feel alive yet orderly, with cooldowns preventing particle spam.
- Post-session recaps drive follow/favourite taps for the highlighted master.
:::

### Journey

```mermaid
%%{init: {'securityLevel': 'loose', 'flowchart': {'htmlLabels': true}}}%%
flowchart TD
    CHOOSE([Select master practice])
    LOAD[Load master visualization payload]
    COUNTDOWN[Countdown + participant arrival]
    READY{User taps "I'm ready"?}
    LIVE[Session auto-starts + synced visuals]
    REACT["Reactions appear on timeline"]
    CLOSE[Session ends]
    RECAP[Show totals + thank CTA]
    EXIT((Return to Home View))
    CHOOSE --> LOAD --> COUNTDOWN --> LIVE --> REACT --> CLOSE --> RECAP --> EXIT
    COUNTDOWN --> READY --> LIVE
    click CHOOSE "./practices-list-v0-3" "Selection begins in Practices List"
    click LIVE "./practice-screen-masters-v0-3" "Practice Screen controls playback"
    click RECAP "./home-view-v0-3-masters" "Recap surfaces on Home View"
```

## Requirements
- **Acceptance criteria**
  - GIVEN a master practice is opened WHEN the visualization loads THEN it displays the correct colours, glyphs, and master info defined in the CMS.
  - GIVEN the session reaches T-5 minutes WHEN users are present THEN the screen reveals "I’m ready" and participant count updates smoothly.
  - GIVEN reactions are shared during the session WHEN the timeline is visible THEN markers appear calmly, reflecting the collective emotional state.
- **No-gos & risks**
  - Overstimulating visuals that break the calm brand tone.
  - Jittery transitions when switching from countdown to live state.
  - Missing accessibility support (e.g., no captions for audio cues, poor contrast for text overlays).
## Data
- **Primary metric:** Dwell time and “I’m ready” tap rate in the countdown lobby.
- **Secondary checks:** Live reaction density, recap CTA usage (follow/thank), and exit rates during each state.
- **Telemetry requirements:** Log state transitions, ready taps, participant counts, reaction markers, recap actions, and any fallback messaging triggered.

## Open Questions
- Should late joiners see a truncated countdown or jump directly into live audio with a subtle cue?
- Do we expose advanced settings (e.g., disable particles for sensitive users) in v0.3 or defer?
- How do we coordinate animation markers with masters who submit varying audio pacing?
