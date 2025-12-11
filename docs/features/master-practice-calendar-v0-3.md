---
title: Add Master Practice to Calendar v0.3
sidebar_label: Master Practice Calendar v0.3
sidebar_position: 6
version: "0.3"
capability: "masters-practices"
status: "planned"
lark_id: "recuXdKsN9aUeb"
figma: ""
owner: ""
user_value: "Let practitioners block time for collectives on their device calendar with accurate timezone support."
trigger: "When a user views a master collective in Practice List, Home story, or master card."
done_when: "Calendar button creates an event with master details, reminders, language info, and deep link back to the practice screen."
capability_label: "07. Masters Practices"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# Add Master Practice to Calendar v0.3

## Summary

<FeatureSummary />

## Narrative
Calendar integration helps users honour the scheduled nature of collectives. Every master session card now includes "Add to calendar"—tapping surfaces native calendar sheets (iOS EventKit / Android Intents) prefilled with title ("Collective practice with Master Anna"), start/end times adjusted to the user’s timezone, description summarising the affirmation, and link back to the AWA app. If the user selected a language track, it’s noted in the event notes so they remember which audio to expect.

We create two default reminders: one at 30 minutes (matching push) and one at five minutes. Users can edit them before saving. If the session reschedules, the app sends an update prompt that guides them to adjust the calendar entry manually while we explore automated updates later.

## Interaction
1. User taps "Add to calendar" from Practice List, Home story, or master card.
2. App requests calendar permission if not already granted; explains why calmly and links to settings.
3. Native calendar sheet opens with prefilled fields (title, start/end, timezone, location linking to app, notes with master + language + affirmation).
4. User confirms; event saves to preferred calendar.
5. Confirmation toast appears and the reminder toggle reflects success.
6. If the session is cancelled/rescheduled, the app notifies the user with instructions to update or delete the calendar event.

:::caution Edge Case
Handle timezone shifts—if the user travels, the calendar event should adjust automatically, so store UTC timestamps and rely on OS conversions.
:::

:::tip Signals of Success
- High retention of scheduled events (few last-minute misses) compared to users without calendar entries.
- Minimal support tickets about wrong times; timezone bugs should be extremely rare.
- Users who add to calendar are more likely to attend, validating the feature’s impact.
:::

### Journey

```mermaid
%%{init: {'securityLevel': 'loose', 'flowchart': {'htmlLabels': true}}}%%
flowchart TD
    VIEW([View collective])
    TAP[Tap "Add to calendar"]
    PERM{Calendar permission granted?}
    REQUEST[Request permission + explain]
    SHEET[Open native calendar sheet]
    SAVE{User saves event?}
    CONFIRM[Show confirmation + update reminder toggle]
    UPDATE[Notify on reschedule]
    DONE((Calendar synced))
    VIEW --> TAP --> PERM
    PERM -->|No| REQUEST --> SHEET
    PERM -->|Yes| SHEET --> SAVE
    SAVE -->|Yes| CONFIRM --> DONE
    SAVE -->|No| DONE
    CONFIRM --> UPDATE --> DONE
    click VIEW "./practices-list-v0-3" "Entry point from catalogue"
    click UPDATE "./push-inapp-masters-notifications-v0-3" "Push informs about schedule change"
```

## Requirements
- **Acceptance criteria**
  - GIVEN calendar permission WHEN the user taps add-to-calendar THEN the event is prefilled with start/end in the user’s timezone, master info, language, and deep link.
  - GIVEN permission is denied WHEN the user taps THEN the app explains why access is needed and offers settings shortcut.
  - GIVEN the session reschedules WHEN we send the user a notification THEN the message includes the new time and prompts to update the calendar event.
- **No-gos & risks**
  - Creating duplicate events if the user taps multiple times—detect existing entries via unique IDs in notes.
  - Incorrect timezone handling causing missed sessions.
  - Saving reminders without user consent or overriding their defaults.
## Data
- **Primary metric:** Calendar add rate per collective (events created ÷ unique viewers).
- **Secondary checks:** Permission grant/denial rates, edits/removals, reminder conversions, and attendance uplift for calendar users.
- **Telemetry requirements:** Log permission prompts, event creation success/failure, calendar IDs (hashed), reminder toggle sync, and reschedule notifications.

## Open Questions
- Should we implement automatic calendar updates via ICS feeds in later versions?
- Do we allow users to choose which calendar (work/personal) receives the event, or default to OS default only?
- How do we surface instructions if the calendar add fails (e.g., corporate restrictions)?
