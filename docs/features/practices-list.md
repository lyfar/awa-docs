---
title: Practices List
sidebar_label: Practices List
sidebar_position: 1
version: "0.1"
capability: "practice"
status: "to-do"
lark_id: "recuVvQFIRPfUz"
figma: "https://www.figma.com/design/CBoSOj4JkiZkWdINOzzFE7/Awaterra-App-UIUX?node-id=48-24"
owner: ""
user_value: "Show all available practices so users can choose the path that fits"
trigger: 'When a user opens the Practices tab or "Ignite Your Light" CTA'
done_when: "Practice catalog loads quickly, previews are clear, and selections lead to the correct practice screen"
capability_label: "05. Practice"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# Practices List

## One-Glance Summary

<FeatureSummary />

## Narrative
Practices List curates the launch set of seven guided sessions plus “My Practice.” Cards highlight duration, modality, and community reactions, inviting exploration without overwhelming. The list honors the mindful tone—calm visuals, gentle microinteractions, and explicit benefits.

Selecting a practice reveals detailed previews or launches the experience directly depending on user familiarity. “My Practice” provides a customizable entry point with icons for meditation, breathing, mantras, sound healing, movement, and more.

## Interaction Blueprint
1. Fetch practice catalog and user-specific metadata (likes, availability) on load.
2. Render cards with artwork, duration, reaction counts, and badges for featured or new practices.
3. Support search or filters for modalities when the list grows beyond the initial set.
4. Preview cards reveal descriptions, audio cues, and preparation guidance.
5. Selecting a practice transitions to the Practice Screen with saved preferences applied.
6. Log selection and engagement metrics to inform future curation.

- Edge case: Network latency delays content; show placeholders and allow offline cached practices where possible.

- Signals of success:
  - Catalog loads within target time and drives practice starts.
  - Users engage with “My Practice” customization without confusion.
  - Reaction counts and favorites encourage social proof without pressuring.

### Mermaid Journey IN MERMAID FORMAT

```mermaid
flowchart TD
    START([Open Practices])
    LOAD[Load catalog & metadata]
    DISPLAY[Show practice cards]
    CHOOSE{Practice selected?}
    PREVIEW[Show preview / details]
    LAUNCH[Open Practice Screen]
    START --> LOAD --> DISPLAY --> CHOOSE
    CHOOSE -->|Yes| PREVIEW --> LAUNCH --> END((Practice begins))
    CHOOSE -->|No| END((User explores list))
```

## Requirements & Guardrails
- **Acceptance criteria**
  - GIVEN the list loads WHEN data is available THEN cards display accurate metadata and gracefully handle missing assets.
  - GIVEN a user selects a practice WHEN the preview appears THEN play/pause controls and description render clearly.
  - GIVEN offline mode WHEN cached practices exist THEN they still appear with appropriate indicators.
- **No-gos & risks**
  - Overloading the initial release with too many options causing decision fatigue.
  - Inconsistent naming or categorization that confuses new practitioners.
  - Neglecting accessibility (contrast, focus states) on cards and filters.

## Data & Measurement
- Primary metric: Practice start rate per session from the list view.
- Secondary checks: Engagement with “My Practice,” reaction tap-throughs, and abandonment before start.
- Telemetry requirements: Log list load success, card impressions, selections, preview interactions, and fallback states.

## Open Questions
- Should we schedule rotating featured practices for launch or rely on manual curation?
- How might we incorporate audio previews or instructor snippets without slowing the list?
