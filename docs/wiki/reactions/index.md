---
title: Reactions Taxonomy
sidebar_label: Reactions
sidebar_position: 3
description: Canonical library of the seven emotional states surfaced across practice flows, analytics, and communications.
---

# Reactions Taxonomy

The Reactions Taxonomy keeps the entire product speaking the same emotional language. Every surface that asks a user “How do you feel?” must pull from this table so visuals, copy, analytics, and localization remain aligned. The taxonomy is managed through the CMS described in [Admin Area v0.2](/docs/features/admin-area-cms-v0-2) and enforced at runtime by [Practices Reactions Base](/docs/features/practices-reactions-base).

## Core States

| Key | Display name | Core description | Color token | Typical usage |
| --- | --- | --- | --- | --- |
| `grounded` | Grounded | “I feel rooted, steady, and supported.” | `reaction-grounded` | When practice leaves the user centered or stabilized. |
| `joy` | Joy | “I feel light, expansive, and delighted.” | `reaction-joy` | Celebratory states after uplifting collectives or pulse spikes. |
| `energy` | Energy | “I feel activated, buzzing, and ready to move.” | `reaction-energy` | High-tempo practices, breathwork completions. |
| `peace` | Peace | “I feel calm, soft, and rested.” | `reaction-peace` | Restorative or evening practices, sleep prep. |
| `release` | Release | “I let go of weight, tension, or worry.” | `reaction-release` | Shadow work, expressive movement, cathartic sessions. |
| `insight` | Insight | “I gained clarity or a new perspective.” | `reaction-insight` | Masters’ teachings, journaling integrations, reflective flows. |
| `unity` | Unity | “I feel deeply connected to others and the whole.” | `reaction-unity` | Collective meditations, map events, community rituals. |

**Guidance**
- Display names and descriptions localize through the CMS; clients must never hard-code strings.
- Color tokens map to the design system for consistency with Light Ignition, profile wheels, and notification chips.
- Order is intentional (grounded → unity) and should remain consistent across UI components.

## Data & Instrumentation

- Clients request `GET /reactions/taxonomy` during boot and cache the version + etag. Stale versions must re-request before allowing submissions.
- Reaction submissions include `{practice_id, user_id, state_key, intensity?, note?}`. Optional fields stay disabled by default until product approves the expansion.
- Analytics relies on immutable state keys. If a label changes (e.g., “Happy” → “Joy”), keep the same key and update only the CMS strings.

## Copywriting & Localization

- Strings should favor short, sensory language that feels calm. Avoid medical labels or judgemental phrasing.
- Each locale receives custom micro-copy for the completion prompt (“How are you feeling now?”) and the optional tooltip text per state.
- When referencing reactions in marketing or push copy, use the localized display name capitalized (e.g., “Feel more Peace tonight”).

## Governance & Change Control

1. Product or research requests a taxonomy change (rename, recolor, add/remove state) with rationale and impact analysis.
2. Content design drafts updated copy and translations; Brand validates color updates with accessibility checks.
3. CMS publishes a new taxonomy version; Practices Reactions Base propagates it via the taxonomy endpoint.
4. Clients log the version they consume. If they cannot update immediately, the backend preserves compatibility but warns through analytics.

:::caution
Never introduce ad-hoc reaction states on a single screen. Doing so breaks analytics, dimishes the shared language, and risks confusing users who expect the seven-icon set everywhere.
:::

## Related Documentation

- [Practice Reaction](/docs/features/practice-reaction) - UI moment where users select a state.
- [Practices Reactions Base](/docs/features/practices-reactions-base) - APIs and storage for this taxonomy.
- [Reactions v0.3 (Masters)](/docs/features/reactions-masters-v0-3) - Timeline reactions for collective practices.
