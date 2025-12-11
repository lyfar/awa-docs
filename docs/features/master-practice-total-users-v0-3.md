---
title: Master Practice Total Users v0.3
sidebar_label: Master Practice Total Users v0.3
sidebar_position: 7
version: "0.3"
capability: "masters-practices"
status: "planned"
lark_id: "recuZRP4EA67ZV"
figma: ""
owner: ""
user_value: "Show how many people joined a master’s collective to reinforce community presence and inform masters."
trigger: "When a collective is live, ends, or when reviewing history/analytics."
done_when: "Total participant counts update live on visualization, recap screens, master cards, and analytics exports."
capability_label: "07. Masters Practices"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# Master Practice Total Users v0.3

## Summary

<FeatureSummary />

## Narrative
Participant counts anchor the shared experience. The system tallies live attendees as they join, displaying the number in the countdown lobby, live visualization, and closing recap ("We were 247 souls"). Counts feed from the same real-time service that drives reaction telemetry; late joiners update the number immediately. After the session, the total appears on master cards and history entries so users see which collectives resonated most.

Masters receive the same totals via analytics exports, helping them understand reach by language and time. We keep the tone gentle—counts are rounded when very low to avoid awkwardness, and we never gamify attendance publicly.

## Interaction
1. When a user confirms "I’m ready," the system registers them as present and increments the live count.
2. Live visualization, mini-map, and countdown lobby display the updated number with a soft animation.
3. If a user leaves before start, the count decrements; after start, we keep them in the total to respect their participation.
4. Recap state shows final count plus AU contribution; master card updates the "Latest collective" tile with the number.
5. Analytics export summarises totals by language and reaction mix for the master follow-up email.

:::caution Edge Case
Handle duplicate sessions carefully—if someone joins on two devices, deduplicate by user ID so counts remain accurate.
:::

:::tip Signals of Success
- Live counts feel responsive (&lt;2 s update lag) and align with analytics totals post-session.
- Masters mention the recap number in follow-up conversations, proving the value of sharing it.
- Users feel part of a crowd without feeling judged—counts appear supportive, not competitive.
:::

### Journey

```mermaid
%%{init: {'securityLevel': 'loose', 'flowchart': {'htmlLabels': true}}}%%
flowchart TD
    READY([User taps "I'm ready"]) 
    REGISTER[Register attendance]
    DISPLAY[Update live count]
    SESSION[Practice runs]
    RECAP[Show final total]
    ANALYTICS[Sync to Master Analytics]
    DONE((Community impact recorded))
    READY --> REGISTER --> DISPLAY --> SESSION --> RECAP --> ANALYTICS --> DONE
    click DISPLAY "./practice-screen-masters-v0-3" "Live screen shows the count"
    click RECAP "./practice-history-reactions-v0-3" "History stores the total"
    click ANALYTICS "./master-analytics-v0-3" "Analytics export uses totals"
```

## Requirements
- **Acceptance criteria**
  - GIVEN users join the lobby WHEN they tap "I’m ready" THEN the live participant count increments within two seconds.
  - GIVEN a user leaves before the session starts WHEN they exit THEN the count decrements so the lobby stays accurate.
  - GIVEN the session ends WHEN recap data is generated THEN the exact final count displays on recap screens and saves to analytics.
- **No-gos & risks**
  - Counting duplicate device joins, inflating the sense of community.
  - Showing very low counts without sensitivity; consider "A small circle gathered" copy below a threshold.
  - Sync issues between live numbers and stored totals creating mistrust.
## Data
- **Primary metric:** Unique attendees per collective (live count vs final stored total).
- **Secondary checks:** Join/leave churn before start, recap view rate, AU contribution correlation, and deduplication adjustments.
- **Telemetry requirements:** Log ready taps, leave events, dedupe resolutions, recap payloads, and analytics exports referencing the total.

## Open Questions
- Should we display a range (e.g., "200+ souls") once attendance crosses a threshold for calm presentation?
- Do we capture peak concurrent vs total unique attendees for future analytics?
- How do we treat drop-ins who join after the midpoint—count as full participants or partial? 
