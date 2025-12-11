---
title: Practices Reactions Analytics
sidebar_label: Practices Reactions Analytics
sidebar_position: 4
version: "0.2"
capability: "product-analytics"
status: "in-progress"
lark_id: "recuZ6D3jraAKm"
figma: ""
owner: ""
user_value: "Give product, masters, and ops a dashboard of how practices make people feel."
trigger: "When analytics pipelines receive reaction events or stakeholders open dashboards."
done_when: "Reaction events stream into the warehouse with dashboards for user, practice, and master insights."
capability_label: "10. Product Analytics"
---

import FeatureSummary from '@site/src/components/FeatureSummary';

# Practices Reactions Analytics

## Summary

<FeatureSummary />

## Narrative
Practices Reactions Analytics turns every reaction event into dashboards for product, masters, and ops. Streams from Practices Reactions Base feed raw tables, hourly aggregates, and Looker/Metabase views that show top states per practice, cohort shifts, and master impact.

The pipeline enforces terminology, cascades delete requests, and triggers alerts when capture rates or state mixes look off. Dashboards reuse the [Reactions Taxonomy](/docs/wiki/reactions/), so copy aligns perfectly with in-app feelings.

## Interaction
1. Reaction event fires from Practice Reaction; ingestion service appends metadata (user cohort, practice category) and publishes to analytics stream.
2. Streaming job writes to raw table; hourly batch job aggregates by practice, master, day, and reaction state.
3. Dashboards pull aggregated tables to show charts: top states per practice, weekly shifts, retention vs reaction combos.
4. Email/Slack alerts trigger if metrics breach thresholds (e.g., capture rate &lt;85%, specific state spike).
5. Analysts can filter dashboards by cohort (new vs returning), locale, or release version to understand changes.
6. GDPR/CCPA compliance processes remove or anonymize user-level records on request, propagating downstream.

:::caution Edge Case
If the stream lags or drops messages, the system queues them for replay and marks dashboard tiles as “Freshness degraded” to prevent decisions on stale data.
:::

:::tip Signals of Success
- Dashboards refresh on schedule (≤1 hour latency) with no sampling gaps.
- Product partners use insights to adjust catalogue—tracked via annotation logs.
- Alerting catches anomalies before users report issues.
:::

### Journey

```mermaid
%%{init: {'securityLevel': 'loose', 'flowchart': {'htmlLabels': true}}}%%
flowchart TD
    EVENT([Reaction event])
    STREAM[Ingest + enrich metadata]
    RAW[Write to raw warehouse tables]
    AGG[Hourly aggregation jobs]
    DASHBOARD[Dashboards + alerts]
    ACTION[Team actions (catalog updates, coaching)]
    DONE((Insights applied))
    EVENT --> STREAM --> RAW --> AGG --> DASHBOARD --> ACTION --> DONE
    click EVENT "./practice-reaction" "Captured via Practice Reaction"
    click STREAM "./practices-reactions-base" "Stream originates from Reactions Base"
    click DASHBOARD "./basic-analytics" "Dashboards live alongside core analytics"
    click ACTION "./admin-area-cms-v0-2" "CMS updates often follow insights"
```

## Requirements
- **Acceptance criteria**
  - GIVEN a reaction event WHEN the pipeline processes it THEN the record appears in raw tables within five minutes and in aggregated tables within one hour.
  - GIVEN dashboards WHEN stakeholders filter by practice or state THEN charts update quickly and match backend counts (±1%).
  - GIVEN an anomaly (capture rate drop) WHEN alert thresholds trigger THEN Slack/email alerts fire with context, linking to relevant dashboards.
  - GIVEN a user deletion request WHEN privacy tooling runs THEN all associated reaction records are anonymized and removed from aggregates within SLA.
- **No-gos & risks**
  - Sampling or rolling up data in a way that hides minority experiences.
  - Assuming notes are safe to surface—only aggregated metrics should leave the warehouse.
  - Relying on manual CSV exports; automation keeps the pipeline trustworthy.

## Data
- Primary metric: Reaction capture rate (captured ÷ completed sessions) plus 7-state distribution trends.
- Secondary checks: Dashboard load times, alert fidelity, data freshness, and privacy request completion rate.
- Telemetry requirements: Log stream throughput, aggregation job success/failures, dashboard query performance, and alert firings.

## Open Questions
- Do we need practitioner-facing dashboards or keep analytics internal for now?
- Should we run cohort experiments (e.g., show different copy per state) and instrument results in this pipeline?
- How do we surface long-term trends (90-day) without overwhelming daily operators?
