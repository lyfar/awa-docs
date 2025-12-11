---
title: Home View v0.3 (Masters Announcements)
sidebar_label: Home View v0.3 (Masters)
sidebar_position: 3
version: "0.3"
capability: "identity"
status: "planned"
lark_id: "recuZRmOrfCN2U"
figma: ""
owner: ""
user_value: "Surface collective practice announcements and master updates without cluttering the calm home experience."
trigger: "When a master collective is scheduled, goes live soon, or posts a follow-up story."
done_when: "Home View shows story rings for masters, highlights unread announcements, and deep-links into practice screens or recap flows."
capability_label: "04. Identity"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# Home View v0.3 (Masters Announcements)

## Summary

<FeatureSummary />

## Narrative
Home View v0.3 borrows the familiarity of story rings to gently invite users into master-led moments. A row of up to four luminous orbs sits above the globe: "Me" (profile menu) plus up to three live announcements. When a collective is upcoming, the master’s orb glows with a soft gradient and thin halo to signal there’s fresh information. Tapping reveals a story stack that combines short copy, countdown states, and preview audio.

The row respects the home screen’s serenity—rings stay compact, scaling down to fit small devices. If more than three announcements exist, they queue and rotate after dismissal so the user never feels overwhelmed. Completed announcements desaturate, acting like Instagram’s viewed state, yet can still be reopened to read the recap. The "Me" orb doubles as entry to profile and settings while also carrying a subtle badge when personal notifications arrive.

## Interaction
1. System pulls the announcement feed (masters in the next 72 hours plus recent recaps) when Home View loads.
2. Orbs render left to right: Me, then collectives sorted by start time; unseen stories get a glowing ring.
3. User taps an orb to open the story stack—countdown card, prep tips, call-to-action to add to calendar, and final slide with "I’m ready".
4. Swiping through marks slides as viewed; if the user sets a reminder, the orb icon swaps to a checkmark overlay.
5. After the practice ends, the same orb resurfaces with recap copy and "Thank the master" CTA.
6. Stories expire 24 hours after the practice or when manually dismissed; the row then compresses gracefully.

:::caution Edge Case
Ensure the row remains accessible for screen reader users—each orb needs descriptive labels and focus order that respects the timeline.
:::

:::tip Signals of Success
- Reminder opt-ins increase when users view master story rings.
- Home View completion (globe still centre stage) remains high—rings should not distract from the primary pulse.
- Users return to recaps via the same orb instead of hunting through history.
:::

### Journey

```mermaid
%%{init: {'securityLevel': 'loose', 'flowchart': {'htmlLabels': true}}}%%
flowchart TD
    LOAD([Home View loads])
    FETCH[Fetch announcements + recaps]
    RENDER[Render rings (Me + masters)]
    TAP{Orb tapped?}
    STORY[Display story slides]
    ACTION{Reminder or thank you?}
    COMPLETE[Mark orb as viewed]
    EXPIRE[Story expires after window]
    DONE((Home stays calm + informed))
    LOAD --> FETCH --> RENDER --> TAP
    TAP -->|Yes| STORY --> ACTION --> COMPLETE --> DONE
    TAP -->|No| DONE
    COMPLETE --> EXPIRE --> DONE
    click STORY "./practice-screen-masters-v0-3" "CTA jumps into the practice screen"
    click COMPLETE "./push-inapp-masters-notifications-v0-3" "Reminder hook ties to push"
```

## Requirements
- **Acceptance criteria**
  - GIVEN a collective practice is scheduled WHEN the user opens Home View THEN the master orb appears with unread styling until viewed.
  - GIVEN the user watches the countdown story WHEN they request a reminder THEN the UI confirms and communicates with notification services.
  - GIVEN the collective completes WHEN recap data arrives THEN the orb reappears with recap copy for up to 24 hours.
- **No-gos & risks**
  - Overcrowding the top row—limit to a manageable number or provide carousel controls.
  - Ring styling that clashes with the accessibility palette or looks too similar to default state.
  - Duplicated announcements when a master hosts multiple sessions within 24 hours; group them intelligently.
## Data
- **Primary metric:** Orb view and completion rate (stories viewed ÷ impressions) plus reminder conversions.
- **Secondary checks:** Thank-you taps, snooze/dismiss actions, announcement rotation effectiveness, and return visits to recaps.
- **Telemetry requirements:** Log feed payloads, orb order, slide interactions, reminder toggles, gratitude CTAs, and expiry events.

## Open Questions
- Should we allow users to pin favourite masters so their orb appears even without an active announcement?
- Do we provide a gesture to hide announcements temporarily for distraction-free sessions?
- How do we localise story copy for multi-language collectives without overloading the UI?
