# Visual and interaction verification

## Prepare comparable baselines
- Render original HTML locally with its local assets, *without blindly executing unknown remote scripts*. Prefer an isolated browser context if the source is untrusted.
- Render the application route with authorized dev/test data; avoid production mutations. Ensure the same viewport, device scale factor, zoom, theme, fonts, locale/RTL direction, and representative content lengths.
- Use deterministic animations: freeze or wait for completion for screenshots, but test real motion separately; respect reduced-motion preferences.
- Collect desktop (~1440 px) and mobile (~390 px) screenshots, plus ~320 px when the affected layout can be stressed there and a tablet breakpoint if significant. Use actual breakpoints from the reference if defined.

## Verify motion and interactions
- Review local CSS/JS and asset dependencies before rendering an untrusted reference. In an isolated local browser context, exercise safe reference interactions to observe behavior; do not load unknown remote scripts or credentials merely to inspect an effect.
- For each inventoried animation, reproduce its trigger in the reference and migrated page. Capture initial, intermediate and settled frames or a short recording at matched elapsed times. Compare transform/opacity/size/path, duration, delay, easing, order, and repeat behavior. A settled-state screenshot alone does not verify motion.
- Exercise load, scroll, hover, keyboard focus, press/click, open/close, chart/filter changes, loading and error transitions, and viewport changes where the reference uses them. Check desktop and mobile, including touch alternatives to hover.
- Check `prefers-reduced-motion` on the migrated page. Keep content and controls available when motion is reduced. If source motion cannot be observed because an asset or script is unavailable, record the gap and avoid claiming a faithful match.

## Compare in priority order
1. Global geometry, layout hierarchy, sidebars, column widths, responsive stacking.
2. Typography (font family/weight/size/line heights), spacing, sizing, alignments.
3. Colors, borders, radius, shadows, icons, assets.
4. Chart rendering including axes, tooltip, legends, tick formatting, data semantics, empty state.
5. Hover, focus, active, disabled, modal, loading/error/empty and transitions.
6. Overflow, RTL, contrast, reduced motion, keyboard navigation.

Use Playwright's screenshots or screenshot assertions *if installed and configured*; never claim tooling or visual evidence that was not actually run. Pixel diffs can be misleading if font engines or sample data differ. Investigate substantive discrepancies manually and explain unavoidable differences.

## Functional regression matrix
- All pre-existing buttons, links, submissions and validations.
- Search/filter/sort/pagination and URL state.
- Authz/permission-specific visibility and prevention, where test environment permits.
- API failure and retry, slow loading, empty data, long/truncated data.
- Responsive and keyboard accessibility.
- Data provenance: no faux numbers, bogus charts, or mock datasets in production UI.

## Reporting
List commands executed, test results, evidence screenshot paths if present, environments and viewport dimensions, visually verified differences and items not tested. A passing compile is not sufficient evidence of fidelity.
