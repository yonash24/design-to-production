# Hybrid decision policy

## Allowed without separate product approval (within approved migration scope)
- Rearrange presentational hierarchy, extract reusable components, replace CSS or Tailwind styling, update local visual assets, tweak purely presentational UI state.
- Adapt chart appearance, animation, labels, legends and display formatting without changing the underlying metric or computation contract.
- Replace UI-only library components if dependency addition is already permissible per repo guidance; otherwise ask before adding new dependencies.
- Relocate existing controls to preserve discoverability and function; retain accessibility and analytics hooks.

## Requires explicit approval
- Dropping an existing capability, even if absent from HTML.
- New business actions, changed validation or permission behavior, new backend routes, queries that change data semantics, new tables/migrations, changing auth/roles, new external vendors, modifying cross-page navigation semantics.
- New chart metrics requiring unverified definitions (e.g., conversion rate denominator, timezone grouping, cohort population).
- Potentially costly or breaking stack/library changes.

## Resolve conflicts in this order
1. Safety/security and existing access restrictions.
2. Existing business correctness and contractual behavior.
3. Accessibility and functioning interaction.
4. Visual fidelity to reference.
5. Code reuse and maintainability.

## Blocking question pattern
"Reference uses [X]; app currently provides [Y]. I recommend [Z] because [reason]. This would [impact]. Approve [specific product change], or retain current behavior?"
Ask only when implementation cannot proceed safely without the decision. Work on independent portions in the meantime when possible.

## Examples
- Reference revenue chart, app tracks applications: retain its visual styling, show truthful application metrics with verified aggregation. Do not label application counts as revenue.
- Reference lacks a delete action, existing app supports it: preserve access in a menu or ask before removing.
- Reference suggests AI insight panel, no existing AI output: do not hallucinate. Omit, use labeled unavailable/empty state when appropriate, or request approval for actual feature work.
- Reference has decorative hover, existing app requires keyboard access: provide matching hover plus focus-visible and key handling.
