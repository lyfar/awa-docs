---
title: Product Version Playbook Template
sidebar_label: Version Template
sidebar_position: 3
description: Structure for documenting an AWATERRA release wave from intent through measurement.
---

# Product Version Playbook Template

Use this template to publish each roadmap milestone (Ignition, Aurora, Radiance, etc.). Keep the narrative focused on why the release matters and how teams will work together to deliver it.

## Overview

Open with a short paragraph that frames the release for product, design, and engineering peers. Touch on the user promise, the business intent, and any notable guardrails.

### Snapshot
| Attribute | Detail |
| --- | --- |
| Version Name | _e.g., 1.1 Aurora_
| Release Window | _Month / Quarter_
| Theme | _Headline narrative for the release_
| Primary Goal | _Desired behavioral or business outcome_
| Status | Concept · Committed · In Delivery · Launching · Shipped |

### Elevator Pitch
One paragraph that helps any teammate explain the release to stakeholders.

### Success Statement
A succinct “If we succeed…” sentence that is easy to rally around.

## Capabilities & Features

Surface the capability-led story right after the overview so teams immediately see what is in scope. Reference the auto-generated feature list component or list items manually when needed.

```mdx
<VersionFeatureList version="1.1" />
```

If manual, keep the hierarchy tight:

```md
- **05. Practice** — Guided Journeys v2 (In Delivery)
- **08. AWAY Streaks** — Cosmic Calendar Gamification (Discovery)
```

## Strategic Pillars

Describe 2–4 pillars that organise the work. Each pillar should map to capabilities and features.

```md
1. Guided Onboarding — Make first 7 days feel magical.
2. Social Resonance — Encourage community formations.
```

## Release Scope

| Pillar | Feature / Capability | Status | Notes |
| --- | --- | --- | --- |
| Guided Onboarding | [Feature Name](/docs/features/feature-slug) | In delivery | Blocked by… |
| Social Resonance | [Capability](/docs/capabilities/05-Practice/index) | Discovery | Needs research |

Call out explicit descopes so expectations remain tight.

## Dependencies & Risks

- **Cross-team dependencies** — Marketing launch, data pipelines, content production.
- **Technical risks** — Migrations, performance, security, scalability.
- **Decision checkpoints** — Gate reviews, leadership approvals.
## Go-To-Market Alignment

- Launch narrative and messaging pillars.
- Channels and owned content pieces.
- Internal enablement (Support, Community, Partnerships).

## Success Metrics

Align on the outcomes you expect from this release. Keep the table lightweight so it is easy to scan in stand-ups and release reviews.

| Metric | Target | Instrumentation | Owner |
| --- | --- | --- | --- |
| Weekly guidance completion | 35% | Mixpanel dashboard "AWATERRA Guidance" | Product Analytics |
| Subscription uplift | +8% | Revenue tracker | Finance |

## Post-Launch Review

- Launch recap (wins, misses, surprises).
- Follow-up actions and backlog adjustments.
- Links to retrospectives, recordings, and dashboards.

---

*Template last updated: December 2024*
