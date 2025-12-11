---
title: T&C / Policy v0.2
sidebar_label: T&C / Policy v0.2
sidebar_position: 12
version: "0.2"
capability: "identity"
status: "in-progress"
lark_id: "recuWWe5ypy3iu"
figma: ""
owner: ""
user_value: "Give every user one place to review Terms, Privacy, and data practices without leaving the app."
trigger: "When a user opens legal links from profile, onboarding, or reminders."
done_when: "Terms, Privacy, and consent records render natively with versioning, localization, and CMS-driven updates."
capability_label: "04. Identity"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# T&C / Policy v0.2

## Summary

<FeatureSummary />

## Narrative
T&C / Policy v0.2 brings the legal hub in-app, so Terms, Privacy, and data practices load from the CMS with effective dates, locale coverage, and short change summaries. Users acknowledge updates right inside the sheet and we log consent against their profile for compliance.

Sections stay lightweight—expandable accordions for data use, subscriptions, feedback handling—with cached copies for offline viewing and links to the change log. Support references the same content through the Info page, keeping language consistent everywhere.

## Interaction
1. User taps “Terms & Privacy” from Profile, onboarding footer, or notification prompt.
2. App requests the latest policy bundle (`terms`, `privacy`, `data_handling`) from the CMS-backed API, including effective dates and change summaries.
3. Sheet renders with quick links (Overview, Data, Payments, Feedback) and expandable sections; toggles within highlight new or updated clauses.
4. When a new version exists, the user sees an acknowledgement banner; tapping “Agree & Continue” records consent and unlocks the rest of the app.
5. User can export or share a copy via native share sheet; the app logs the action for compliance reporting.
6. If the user declines, they return to profile with clear messaging and a path to contact support.

:::caution Edge Case
If the policy request fails and the device has no cached version, the app blocks acknowledgement and shows a retry state; we never assume consent without presenting the text.
:::

:::tip Signals of Success
- ≥95 % of users view the inline summary before accepting updates.
- Consent records include version id, timestamp, and locale for every acknowledgement.
- Support tickets about “Where do I find the terms?” drop significantly.
:::

### Journey

```mermaid
%%{init: {'securityLevel': 'loose', 'flowchart': {'htmlLabels': true}}}%%
flowchart TD
    ENTRY([User opens Terms & Privacy])
    FETCH[Fetch latest policy bundle + metadata]
    CACHE{Bundle available?}
    RENDER[Render in-app legal hub]
    ACK{New version acknowledged?}
    RECORD[Store consent + version id]
    EXIT((Return to profile))
    ERROR[Show offline state + retry button]
    DONE((Compliance record<br/>updated))
    ENTRY --> FETCH --> CACHE
    CACHE -->|Yes| RENDER --> ACK
    CACHE -->|No| ERROR --> FETCH
    ACK -->|Yes| RECORD --> DONE
    ACK -->|Later| EXIT --> DONE
    click ENTRY "./profile-view-v0-2" "Entry point from Profile home"
    click FETCH "./admin-area-cms-v0-2" "CMS publishes legal content"
    click RECORD "./basic-analytics" "Analytics log acknowledgement events"
```

## Requirements
- **Acceptance criteria**
  - GIVEN a user opens the legal hub WHEN content loads THEN Terms, Privacy, and Data sections display with effective date, version, and change summary.
  - GIVEN the CMS publishes a new policy WHEN the user next opens the app THEN the acknowledgement banner blocks sensitive flows until consent is captured or the user logs out.
  - GIVEN offline access WHEN a cached version exists THEN the app shows cached text with an offline badge and requests fresh data once the network returns.
- **No-gos & risks**
  - Deep-linking to out-of-date web pages that contradict the in-app version.
  - Allowing practice starts before required legal acknowledgement after a policy change.
  - Missing locale coverage for Russian/English, which would block onboarding for some users.

## Data
- Primary metric: Policy acknowledgement rate per release within seven days of publication.
- Secondary checks: Time-to-acknowledge distribution, share/export events, and the volume of support contacts about legal content.
- Telemetry requirements: Log policy bundle version served, acknowledgement outcomes, declinations, offline fallback usage, and share/export actions.

## Open Questions
- Do we need optional email receipts summarizing policy changes for users who opt in?
- How granular should the change log be (section-level diff vs high-level summary)?
- Should we auto-open the legal hub after major updates or rely on notifications plus gated flows?
