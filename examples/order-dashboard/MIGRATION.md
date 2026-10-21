# Worked migration example

This is a **constructed demonstration**, not a customer migration or a recorded autonomous skill run. The names, orders, amounts, and workspace are invented local sample data. The files show the inputs and outputs a real migration should make reviewable.

## Inputs and approval checkpoint

- Target: the React orders page in `src/App.jsx`, shown with `?view=before`.
- Visual reference: `reference.html` and `reference.css`.
- Existing behavior: `src/data.js` and the shared state and handlers in `src/App.jsx`.
- Approval question in a real run: “Approve the orders page as the target, the Northstar HTML as the sole visual reference, and a presentation-only migration preserving search, status filtering, fulfillment, and live counts?”
- This demonstration was authored as a package and does not claim that an agent obtained that approval.

## Functionality inventory and mapping

| Reference region | Existing behavior and sample source | Migration decision | Evidence |
| --- | --- | --- | --- |
| Four summary cards | Derived from the shared `initialOrders` array and current React state | Adapt presentation; keep live counts and order value | Mark an order fulfilled and watch Pending and Fulfilled change |
| Search field | Matches order ID, customer, and item in `visibleOrders` | Reuse handler | Search for `Maya`: one row remains |
| Status selector | Filters the same order collection | Reuse handler | Select Pending: two rows remain |
| Order rows and statuses | Rendered from the shared collection | Adapt markup and styling | The six IDs and values match both views |
| Fulfillment button | Updates only local React state | Reuse action | Fulfill NS-1048: it leaves Pending and appears in Fulfilled |
| Navigation and workspace shell | Orders page only in the example | New visual shell | Before and after screenshots |
| Narrow viewport | Before page used horizontal table scrolling; reference collapses columns | Adapt responsive presentation | 390px screenshots and overflow check |

The HTML reference contains a *static* search field, selector, and buttons as visual examples. The React after view connects the corresponding controls to the existing shared behavior. It makes no backend request and stores no production data.

## Visual and functional verification

Run `npm run dev -- --port 4173` and, in another terminal, `npm run capture` from this directory. The capture script opens the HTML reference and both React views at 1440×900 and 390×844, saves full-page screenshots in `evidence/`, checks for horizontal overflow, then exercises search, status filtering, and fulfillment in each React view. `npm run build` checks that the example builds.

The migrated layout reproduces the reference's shell, typography, summary cards, table, spacing, colors, and mobile composition. The reference and migrated page use separate CSS files containing the same visual rules so the example is easy to inspect. This makes the example illustrative; it is not independent evidence that the skill will reproduce an arbitrary uploaded design. Google Fonts are optional external font assets; fallback fonts may alter screenshots when offline.

## Boundaries

The example has no authentication, API, database, error state, or loading state, so it does not demonstrate preservation of those concerns. A real migration must inventory and verify them when they exist. This example is not a benchmark of pixel-perfect performance across projects.
