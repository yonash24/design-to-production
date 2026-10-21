# Launch kit

These drafts describe the **constructed Northstar example** accurately. They are ready to adapt for a public post after the example and images are published on GitHub. Do not describe the example as a customer migration or an autonomous benchmark run.

## Repository profile

- Description: `Migrate React/Next.js pages from HTML designs while preserving real data and behavior. Codex + Claude Code skill.`
- Suggested topics: `agent-skills`, `codex`, `claude-code`, `react`, `nextjs`, `design-to-code`, `frontend`.
- Social preview: upload [`../examples/order-dashboard/evidence/social-preview.png`](../examples/order-dashboard/evidence/social-preview.png) in GitHub repository **Settings → General → Social preview**.
- Add the example's before/after image pair to posts. The repository README already embeds them.

The repository description and seven topics were applied on October 21, 2026. GitHub's connected tool does not expose the social-preview setting, and no browser session was available here. Upload the prepared image in GitHub Settings after reviewing the draft PR.

## Short post

I built **Design to Production**, an open-source Agent Skill for Codex and Claude Code.

Give it an existing React/Next.js page and an HTML design. It maps the design to the page's real data and actions, shows the conflicts, and waits for your approval before changing code. After implementation it checks responsive views and reports what it could and couldn't verify.

The repository includes a runnable React example with a static HTML reference, before/after screenshots, the mapping, and an interaction check. The example uses invented local data; it is a walkthrough, not a claim of universal pixel-perfect migration.

Try it: https://github.com/yonash24/design-to-production

If it helps your workflow, a GitHub star helps others find it. I'd also welcome an issue with a design or interaction the skill misses.

## Developer community post

**Title:** I made a Codex + Claude Code skill for migrating React pages from HTML without losing behavior

When I ask an agent to “make this page look like the HTML,” the first pass often focuses on visible markup and misses a filter, permission, empty state, or data source. I turned the migration into a reusable skill with a required analysis and approval stage.

The skill inventories the existing page and the HTML reference, maps each data-bearing element to a real source and action, then stops for approval. Only after that does it change presentation code and compare the result at desktop and mobile widths. It reports unverified effects instead of claiming a perfect match.

There is a small runnable example in the repo: one React orders page before and after a visual migration, driven by the same local sample data and handlers. The HTML reference, mapping, screenshots, and capture script are all included. It is a constructed walkthrough rather than a production case study.

Repository: https://github.com/yonash24/design-to-production

I would value feedback on where the workflow still loses detail, especially animation, responsive states, and design-to-data mapping. If you use it and find it helpful, consider starring the repo.

## Sharing sequence

1. Review and merge the draft PR, then upload the prepared social preview image.
2. Share the short post with the before/after image where you already participate. Adapt wording to each community's rules.
3. Share the developer post in a relevant React, Next.js, Codex, Claude Code, or Agent Skills discussion where project showcases are welcome.
4. Respond to concrete feedback with issues or follow-up examples. Track visits to the example, installation questions, issue reports, and stars; do not treat stars alone as a measure of migration quality.
