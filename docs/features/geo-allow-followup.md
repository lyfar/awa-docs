---
title: Geo Allow Follow-up
sidebar_label: Geo Allow (Re-Prompt)
sidebar_position: 8
version: "0.1"
capability: "identity"
status: ""
lark_id: "recuXvf6djWlyR"
figma: ""
owner: ""
user_value: "Offer a respectful way to enable location after an initial refusal"
trigger: "When a user who previously declined location requests visits relevant experiences"
done_when: "Users understand the benefit, can enable permissions, or dismiss without friction"
capability_label: "04. Identity"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# Geo Allow Follow-up

## One-Glance Summary

<FeatureSummary />

## Narrative
Geo Allow Follow-up reintroduces location sharing to users who previously said no. Instead of repeated system prompts, we present contextual education—showing how the globe personalizes when location is enabled—and offer one-click access to OS settings. The tone is invitational, never coercive.

## Interaction Blueprint
1. Detect experiences (Light Map, localized missions) where location adds value for users who have declined permissions.
2. Present a lightweight banner or modal with copy explaining the benefit and privacy measures.
3. Offer actions: “Enable location” (launch OS settings) and “Not now”.
4. Record the response; if re-enabled, refresh the globe view immediately.
5. Respect cooldown periods to avoid nagging users repeatedly.
6. Provide alternate experiences (e.g., global view) when location remains disabled.

- Edge case: Device restrictions prevent direct navigation to settings; provide manual instructions and support link.

- Signals of success:
  - Conversion rate from follow-up prompt to enabled permission without driving opt-outs.
  - Decrease in confusion about why the globe appears generic with location off.
  - Minimal reports of users feeling pressured or annoyed.

### Mermaid Journey IN MERMAID FORMAT

```mermaid
flowchart TD
    START([User enters location-enhanced area])
    CHECK{Location disabled?}
    EDUCATE[Show benefit reminder]
    ACTION{Enable now?}
    SETTINGS[Open OS settings]
    REFRESH[Refresh experience]
    DEFER[Respect choice & set cooldown]
    START --> CHECK
    CHECK -->|Yes| EDUCATE --> ACTION
    CHECK -->|No| END((No prompt needed))
    ACTION -->|Yes| SETTINGS --> REFRESH --> END((Location enabled))
    ACTION -->|No| DEFER --> END((Choice respected))
```

## Requirements & Guardrails
- **Acceptance criteria**
  - GIVEN location is disabled WHEN the user lands on the globe THEN the follow-up prompt appears only after they interact, not immediately.
  - GIVEN a user selects Enable WHEN OS settings open THEN copy explains how to toggle and the app listens for changes to refresh automatically.
  - GIVEN repeated deferrals WHEN cooldown expiry hits THEN the prompt reappears with updated context, not sooner.
- **No-gos & risks**
  - Triggering the system permission dialog repeatedly without user action.
  - Using alarmist language that pressures compliance.
  - Forgetting to update the interface after permissions change, leaving users uncertain.

## Data & Measurement
- Primary metric: Successful enablement rate following the follow-up prompt.
- Secondary checks: Cooldown adherence, dismiss rates, and qualitative perception of helpfulness.
- Telemetry requirements: Log prompt impressions, user choices, setting change detection, and cooldown resets.

## Open Questions
- What cooldown window best balances helpful reminders with user autonomy (e.g., 7 days)?
- Should we tailor messaging based on why the user declined originally if known?
