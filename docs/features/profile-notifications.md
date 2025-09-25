---
title: Profile Notifications
sidebar_label: Profile Notifications
sidebar_position: 6
version: "0.1"
capability: "identity"
status: "done"
lark_id: "recuWWpFxfmHNE"
figma: "https://www.figma.com/design/CBoSOj4JkiZkWdINOzzFE7/Awaterra-App-UIUX?node-id=48-20"
owner: ""
user_value: "Keep users informed about activity tied to their profile"
trigger: "When profile-related events occur (mentions, achievements, practice reminders)"
done_when: "Notifications deliver successfully and deeplink to the relevant profile view"
capability_label: "04. Identity"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# Profile Notifications

## Summary

<FeatureSummary />

## Narrative
Profile Notifications close the loop on personal milestones. Reactions, mission unlocks, and AWAunit drops arrive in a gentle tone that follows the user’s preferences.

Each message includes helpful context and respects quiet hours so motivation stays steady without pressure.

## Interaction
1. Listen for profile events from engagement services (mentions, achievements, invitations).
2. Package notifications with concise copy, mindful tone, and helpful metadata.
3. Respect category preferences and quiet hours before scheduling delivery.
4. Deliver via push or in-app inbox, handling offline scenarios gracefully.
5. Deeplink to the appropriate section (profile summary, notifications hub) when tapped.
6. Track dismissals and follow-up actions to refine relevance.

:::caution Edge Case
High event volume overwhelms the user. Batch similar notifications or summarize to prevent fatigue.
:::

:::tip Signals of Success
- Open rates stay high with matching in-app actions such as checking profile updates.
- Opt-outs attributed to profile notifications remain low.
- Deeplinks land users on the expected screen.
:::

### Journey

```mermaid
flowchart TD
    START([Detect profile event])
    FILTER[Check user preferences]
    COMPOSE[Compose mindful message]
    DELIVER[Send notification]
    TAP{User opens?}
    DEEPLINK[Open relevant profile view]
    START --> FILTER --> COMPOSE --> DELIVER --> TAP
    TAP -->|Yes| DEEPLINK --> END((User engaged))
    TAP -->|No| END((Notification stored/dismissed))
```

## Requirements
- **Acceptance criteria**
  - GIVEN a qualifying event WHEN preferences allow THEN a notification sends within the defined latency.
  - GIVEN a user taps the notification WHEN the app opens THEN it navigates directly to the related content.
  - GIVEN the user silences a category WHEN the next event fires THEN no message is sent.
- **No-gos & risks**
  - Generic copy that fails to convey context or gratitude.
  - Over-notifying for minor events leading to fatigue.
  - Links that open to dead ends or require additional navigation.

## Data
- Primary metric: Notification open rate for profile-related messages.
- Secondary checks: Opt-out rate, follow-up actions taken, and negative feedback submissions.
- Telemetry requirements: Log event trigger, send outcome, delivery receipts, and deeplink success.

## Open Questions
- Should we introduce a digest option for users who prefer fewer notifications?
- How do we sequence profile notifications alongside Pulse or practice reminders to avoid overlap?
