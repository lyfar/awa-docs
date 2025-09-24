---
title: Capability Documentation Template
sidebar_label: Capability Template
sidebar_position: 1
description: Standard outline for documenting AWATERRA product capabilities from charter to owned features.
---

# Capability Documentation Template

Use this template when you introduce or refine a capability area within the AWATERRA product platform. A capability groups the practices, data, and systems that deliver a cohesive value stream.

## Capability Identity

- **Capability Name** — Distinct, action-oriented label that the team can rally around.
- **Primary Owner** — Product, design, or engineering lead accountable for outcomes.
- **Supporting Teams** — Cross-functional partners and dependencies.
- **Lifecycle Stage** — Idea · Discovery · Definition · Delivery · Live · Iterate.

## Purpose & Strategic Fit

### Problem Statement
What user, business, or operational pain-point does this capability resolve?

### Strategic Objectives
Describe how this capability supports the current roadmap themes and the AWATERRA brand promise.

### Experience Pillars
Capture the experience principles that must remain true across every feature in this capability (e.g., "gentle guidance", "inclusive access").

## Success Signals

| Metric | Target | Measurement Cadence | Notes |
| --- | --- | --- | --- |
| Engagement depth | _e.g., 25% of weekly active users complete 3+ sessions_ | Weekly | | 
| Operational health | | Monthly | | 
| Quality signal | | Release + 30 days | |

> Track a mix of leading (behavioral) and lagging (business) indicators so each iteration can be evaluated quickly.

## Scope & Boundaries

- **In Scope** — Core flows, user segments, platforms, geography.
- **Out of Scope** — Deferred ideas or experiments that are explicitly excluded for this release.
- **Dependencies** — APIs, data sets, or other capabilities this work depends on.

## Feature Inventory

List every feature that currently lives in this capability, including roadmap stage.

```md
- [Feature Name](/docs/features/feature-slug) — Live · Version 1.0 Ignition
- [Future Feature](/docs/features/future-feature-slug) — Discovery · Version 1.1 Aurora
```

## Operational Guidelines

- **Runbooks** — Links to incident response, content governance, or moderation playbooks.
- **Content Sources** — Who supplies the data, meditations, or visuals that make this capability useful?
- **Tooling** — CMS dashboards, analytics boards, and automation surfaces.

## Implementation Notes

Provide technical framing so engineering can estimate effectively:

- High-level system diagram or Mermaid architecture snippet.
- Core services / repositories touched.
- Data models and contracts.
- Security or compliance considerations.

## Evolution Roadmap

| Version | Theme | Key Changes | Confidence |
| --- | --- | --- | --- |
| 1.0 Ignition | Launch foundation | _Capitalize on…_ | High |
| 1.1 Aurora | Expansion | _Introduce…_ | Medium |
| 1.2 Radiance | Optimization | _Automate…_ | Low |

Keep this table to a rolling 3-release horizon so prioritization stays sharp.

---

*Template last updated: December 2024*
