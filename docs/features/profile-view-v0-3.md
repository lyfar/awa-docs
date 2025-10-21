---
title: Profile View v0.3 (Masters & Reactions)
sidebar_label: Profile View v0.3
sidebar_position: 4
version: "0.3"
capability: "identity"
status: "planned"
lark_id: "recuZRTv5PyjsW"
figma: ""
owner: ""
user_value: "Blend reaction insights with master guidance so users know who to follow and which collective to join next."
trigger: "When the user lands back on profile after finishing a practice, opening the app, or following a master."
done_when: "Profile surfaces reaction wheel, master carousel, and actionable shortcuts that respect calm design and sync with Home View announcements."
capability_label: "04. Identity"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# Profile View v0.3 (Masters & Reactions)

## Summary

<FeatureSummary />

## Narrative
Profile View v0.3 keeps the serene hero yet now contextualises masters alongside reactions. The top still greets the user with their dominant state and glow, but directly beneath sits a "Guided by masters" carousel that prioritises collectives aligned with the user’s current feelings. If the reaction wheel shows "Grounded" trending, the first tile suggests the upcoming collective designed to deepen that calm; if "Release" is dominant, a balancing practice surfaces.

Favourite masters occupy breathable cards that show portrait, next session countdown, language tags, and follow status. Reaction history gains a "Shared moments" filter to isolate collective practices the user joined, showing how they felt before and after. Quick actions update accordingly: "Thank Anna" appears after a collective, while "Explore new guides" shows when no follow-ups exist. The view leans on familiar colour taxonomy and only expands modules on demand so the home retains its calm.

## Interaction
1. User lands on Profile View; app fetches reaction summaries, followed masters, and upcoming collective metadata.
2. Reaction wheel renders with weekly trend sparkline; tapping enters the detail drawer.
3. Master carousel displays followed masters first, then recommended ones sorted by upcoming start times and language preference.
4. Each card includes "Set reminder," "Add to calendar," and "Thank" actions when relevant.
5. "Shared moments" filter toggles the history list to show only collective entries with reaction deltas.
6. If the user unfollows a master, the card fades out and the carousel snaps to the next recommendation gracefully.

:::caution Edge Case
When no collectives are scheduled, replace the carousel with a calm placeholder rather than leaving empty space—invite the user to explore the catalogue instead.
:::

:::tip Signals of Success
- Reaction-aware recommendations drive attendance to aligned collectives.
- Users consistently use the "Shared moments" filter to reflect on how master sessions felt.
- Follow/unfollow interactions sync across Home View and Practice List without lag.
:::

### Journey

```mermaid
%%{init: {'securityLevel': 'loose', 'flowchart': {'htmlLabels': true}}}%%
flowchart TD
    LAND([Arrive on Profile View])
    FETCH[Fetch reactions + master data]
    RENDER[Render reaction wheel + carousel]
    SELECT{Tap master card?}
    DETAIL[Open master card drawer]
    ACTION{Set reminder / thank / follow?}
    HISTORY{View shared moments?}
    DONE((Guided next step found))
    LAND --> FETCH --> RENDER
    RENDER --> SELECT --> DETAIL --> ACTION --> DONE
    RENDER --> HISTORY --> DONE
    click DETAIL "./master-card-bio-v0-3" "Drawer shows full master bio"
    click HISTORY "./practice-history-reactions-v0-3" "History filter shows collectives"
```

## Requirements
- **Acceptance criteria**
  - GIVEN reaction data WHEN the user opens profile THEN the carousel prioritises masters whose sessions match or balance the current dominant state.
  - GIVEN the user sets a reminder or follows a master WHEN the action completes THEN badges update instantly and Home View rings reflect the change.
  - GIVEN collective history exists WHEN "Shared moments" is toggled THEN entries show pre/post reaction info and link to practice replays.
- **No-gos & risks**
  - Overcrowding the hero with too many modules; maintain breathing room and respect calm tone.
  - Recommendation logic that ignores language preferences or upcoming availability.
  - State mismatches between profile and home announcements creating confusion.
- **Data**
  - Track carousel click-throughs, reminder conversions, thank-you sends, and usage of the shared moments filter.

## Open Questions
- Should we allow manual pinning of masters to keep them at the front of the carousel regardless of recommendations?
- Do we show master-specific streaks (e.g., how many times practiced with Anna) in v0.3 or save for later analytics?
- How do we support accessibility for the carousel (e.g., voiceover descriptions per card)?
