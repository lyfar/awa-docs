---
title: Prototype 3D Map with FPS Stats
sidebar_label: Prototype 3D Map (FPS)
sidebar_position: 5
version: "0.1"
capability: "visualization-map-layer"
status: "done"
lark_id: "recuVvR66MnYyR"
figma: ""
owner: ""
user_value: "Visualize the practice journey while monitoring real-time performance"
trigger: "When a user opens the prototype 3D map feature"
done_when: "Map renders with interactive controls and FPS counter updates continuously"
capability_label: "02. Visualization & Map Layer"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# Prototype 3D Map with FPS Stats

## One-Glance Summary

<FeatureSummary />

## Narrative
The Prototype 3D Map with FPS Stats is our sandbox for validating rendering, controls, and telemetry before the full Light Map launch. It exposes core interactions—navigation, zoom, and overlays—while surfacing performance metrics so engineering can tune shaders and pipelines.

Although positioned for internal use, the experience still mirrors the final vision: an interactive map that responds smoothly, communicates orientation, and helps stakeholders feel the spatial storytelling we plan to ship.

## Interaction Blueprint
1. Load prototype assets and initialize the 3D scene with target shaders and lighting.
2. Render the practice plane and attach navigation controls (pan, zoom, rotate) tuned for device input.
3. Instrument frame timing and overlay FPS along with key resource stats.
4. Stream user inputs and environment data to validate crash-free stability over extended sessions.
5. Capture recordings or screenshots for stakeholder review and documentation.
6. Export performance logs and summarize findings to inform optimization backlog.

- Edge case: Low-end devices might dip below target FPS; provide quality toggles or simplified rendering paths to continue the evaluation.

- Signals of success:
  - Consistent frame rate within target thresholds during interaction loops.
  - No crashes or graphical glitches during extended test sessions.
  - Actionable performance insights captured for the production roadmap.

### Mermaid Journey IN MERMAID FORMAT

```mermaid
flowchart TD
    START([Launch prototype scene])
    INIT[Initialize 3D environment]
    CONTROLS[Attach user controls]
    OVERLAY[Display FPS & stats]
    TEST[Run interaction scenarios]
    REVIEW[Log metrics & findings]
    START --> INIT --> CONTROLS --> OVERLAY --> TEST --> REVIEW --> END((Insights captured))
```

## Requirements & Guardrails
- **Acceptance criteria**
  - GIVEN the prototype loads WHEN a tester interacts THEN FPS counter and controls respond without stutter.
  - GIVEN extended usage WHEN logs are captured THEN memory usage stays within safe thresholds and no crashes occur.
  - GIVEN stakeholders request evidence WHEN playback assets are generated THEN recordings illustrate both visuals and performance.
- **No-gos & risks**
  - Ignoring thermal or battery impact could mislead production expectations.
  - Using placeholder assets that differ greatly from planned fidelity undermines the exercise.
  - Failing to document findings slows optimization cycles.

## Data & Measurement
- Primary metric: Median FPS during scripted interaction scenarios (rotate, zoom, data overlay).
- Secondary checks: Crash-free rate over 24h burn-in, GPU/CPU utilization, and memory headroom.
- Telemetry requirements: Log per-frame timing, resource usage, camera path events, and any runtime warnings.

## Open Questions
- Do we keep the FPS overlay in production for debugging or remove before public release?
- Which rendering optimizations deliver the greatest benefit without compromising visual storytelling?
