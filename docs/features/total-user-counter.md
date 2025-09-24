---
title: Total User Counter
sidebar_label: Total User Counter
sidebar_position: 6
version: "0.1"
capability: "visualization-map-layer"
status: "to-do"
lark_id: "recuXvi4F0VoKa"
figma: ""
owner: ""
user_value: "Show community scale and reinforce belonging"
trigger: "When a user opens the home scene or Pulse widget"
done_when: "Counter displays total connected users with smooth animation and accurate data"
capability_label: "02. Visualization & Map Layer"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# Total User Counter

## One-Glance Summary

<FeatureSummary />

## Narrative
Total User Counter is a simple way to show the living community. It aggregates live participation and animates gently on the home Light Map and Pulse surfaces.

Updates stay accurate, calm, and clear so users trust what the number represents every time they glance at it.

## Interaction Blueprint
1. Aggregate total connected and active user counts across relevant services.
2. Stream the value to clients with sensible caching to prevent flicker.
3. Animate the counter for increases and decreases with mindful easing.
4. Surface contextual copy that describes the moment (e.g., "Practicing now").
5. Provide hover or tap affordances for deeper stats when available.
6. Log synchronization and delta timing to monitor accuracy.

:::caution Edge Case
Sudden drops appear because of data lag. Hold the previous value and show a syncing state rather than oscillating wildly.
:::

:::tip Signals of Success
- Counter updates within expected latency and mirrors backend telemetry.
- Users reference the number in feedback as a reason to stay engaged.
- Animations remain smooth across devices and respect reduced-motion preferences.
:::

### Journey

```mermaid
flowchart TD
    START([Fetch user totals])
    VERIFY[Validate data freshness]
    UPDATE[Animate counter change]
    CONTEXT[Show supporting copy]
    MONITOR[Log sync and deltas]
    START --> VERIFY --> UPDATE --> CONTEXT --> MONITOR --> END((Community scale reinforced))
```

## Requirements & Guardrails
- **Acceptance criteria**
  - GIVEN new telemetry WHEN the counter updates THEN the value animates within 1 second without jitter.
  - GIVEN data delays WHEN freshness drops below SLA THEN display a syncing state instead of misleading numbers.
  - GIVEN accessibility preferences WHEN reduced motion is enabled THEN transitions swap to crossfades or step changes.
- **No-gos & risks**
  - Misreporting totals undermines confidence in the broader analytics story.
  - Overly flashy animations conflict with the calm tone of the experience.
  - Pulling raw identifiable data rather than aggregated counts could violate privacy commitments.

## Data & Measurement
- Primary metric: Accuracy rate comparing displayed totals vs. backend truth at sample intervals.
- Secondary checks: Update latency, user interactions with the counter, and qualitative sentiment.
- Telemetry requirements: Log timestamp of each update, delta magnitude, and fallback states triggered.

## Open Questions
- Should we segment the counter (global vs. local) for v0.1 or keep to a single global number?
- How often should we poll or stream to balance freshness with network efficiency?
