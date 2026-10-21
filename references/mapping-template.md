# Analysis and migration decision record

Use this reporting shape, condensed if the target is simple.

## Inputs and repository state
- Target route / owner component (explicit or inferred, with evidence)
- Reference HTML and local asset paths (or missing input)
- Existing framework, styling libraries, chart/motion dependencies
- Git branch and uncommitted changes; repository guidance

## Existing functionality inventory
List the visible controls and page flows, plus components, state, data query/hook, API, relevant database relationships, permissions, loading, error, empty state, navigation, validation, and tests. Mark verified versus inferred.

## Reference design inventory
Group reference regions into navigation, header, summary cards, charts, tables, filters, modals, forms, banners, footers and responsive adaptations where present. Describe typography, tokens, spacing, motion, and dependency needs.

Add a motion and interaction inventory for each animated region: trigger; initial, intermediate and final states; duration/delay/easing; sequence/repeat; desktop/mobile variation; reduced-motion behavior; and whether observation was possible. Include CSS, JavaScript, SVG/canvas, chart, scroll, hover, focus, click, loading, and exit effects when present. Mark unavailable remote assets or scripts as fidelity gaps rather than silently omitting them.

## Mapping matrix
| Reference element | Intended semantics | Existing feature and real data source | Existing action/permission | Category | UI approach | Test | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Example chart | Applications by month | Existing applications query; verify dates | Existing period filter | adapt | Typed aggregation + matching visuals | Verify bars and tooltips | Confirm periods only if ambiguous |

Category = reuse / adapt / new-visual-only / requires-approval / preserve-not-in-reference.
If a feature exists only in the original product, define its new discoverable placement, or request permission for removal. If the reference has new domain features, specify whether they can be powered by existing data and actions without changing contracts.

## Proposed implementation
- File changes with brief responsibility
- Component tree and state/data flow
- External asset or license constraints
- What can be done immediately versus what is gated
- Visual checkpoints and functionality tests

## Decision queue
Ask a small numbered set of *blocking* questions with recommendation and consequence. Do not ask questions the repository already answers. Approvals must be explicit; silence is not consent.

## Completion report
- Modified files
- Covered existing features and regression results
- Visual evidence at specified widths and states
- Tests actually run, including failures and limitations
- Remaining differences; unapproved changes not performed
