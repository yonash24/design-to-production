# Design to Production

A reusable Agent Skill for migrating an existing React or Next.js page to an HTML/CSS/JS design reference. The reference defines the visual design and interactions; the application remains the source of truth for data, behavior, routes, and permissions.

The skill first inventories the current page and the reference, maps every significant component and animation, and presents a migration plan. It changes application code only after you approve that plan. Implementation then reconnects real data and actions and verifies desktop, mobile, RTL, accessibility, and motion against the reference.

## Install

Clone this repository, then copy the skill into the project where you will use it:

```bash
git clone https://github.com/yonash24/design-to-production.git
cd your-app
mkdir -p .agents/skills/design-to-production .claude/skills/design-to-production
cp ../design-to-production/SKILL.md .agents/skills/design-to-production/
cp -R ../design-to-production/references ../design-to-production/scripts ../design-to-production/agents .agents/skills/design-to-production/
cp -R .agents/skills/design-to-production/. .claude/skills/design-to-production/
```

Adjust the source path if the clone is elsewhere. For a personal installation across projects, copy the skill files to `~/.codex/skills/design-to-production` for Codex and `~/.claude/skills/design-to-production` for Claude Code. You can use directory symlinks instead of copies to keep both installations on one version. Restart a running agent session if the new skill does not appear.

## Use

Attach an HTML design with its local CSS, JavaScript, fonts, images, and other assets, or give their paths. In the target application repository, invoke:

- Codex: `$design-to-production`
- Claude Code: `/design-to-production`

The skill tries to identify the target page from the request, reference, and repository. If several pages match, provide the route or component. Review and approve the component-to-functionality mapping before implementation begins. You can also request `analyze` or `verify` mode explicitly.

## What it preserves and checks

- Existing data sources, business rules, actions, navigation, authentication, authorization, and integrations.
- Layout, typography, assets, responsive composition, interaction states, and observable animations from the HTML reference.
- Loading, empty, error, keyboard, RTL, and reduced-motion states.
- Visual comparison at approximately 1440px desktop and 390px mobile, with 320px checked where relevant.

Unavailable external assets or scripts are recorded as fidelity gaps. The skill does not claim pixel-perfect fidelity or complete motion coverage without actual comparison.

## Repository contents

- `SKILL.md` — shared instructions for Codex and Claude Code.
- `references/` — mapping, decision, and visual verification guidance.
- `scripts/check_skill.py` — dependency-free packaging check.
- `agents/openai.yaml` — optional Codex display metadata.

Run `python3 scripts/check_skill.py` before contributing a change. Contributions that improve the migration workflow or verification guidance are welcome.
