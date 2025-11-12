# Agent Onboarding
 
This repository ships with extensive API documentation under the `docs/` directory.
Before working on the application UI, make sure you understand the API surface that
the UI needs to expose.
 
## How to self-orient
- Start with `docs/01-introduction.md` for the platform overview.
- Read `docs/03-authentication.md` to confirm access requirements and baseline flows.
- Dive into the endpoint guides in `docs/api-*.md`, where each file name matches the action it documents.
- Keep notes on required parameters, error handling, authentication, and any rate limits the UI must respect.
- When adding or updating UI features, cross-check that every API interaction traces back to the documented behavior.
 
## Working guidelines
- Treat the Markdown docs as the source of truth—ask the user only when documentation is unclear or incomplete.
- Surface undocumented gaps or inconsistencies you discover while implementing features.
- Align component naming, user-facing labels, and validation messages with terminology used in the docs.
- **Crucially, you must maintain `project-manager/tasks.md` on every single run.** This file is your central project log. Update it to reflect the work you just completed by moving tasks to the "Done" section. Detail the work you are about to start in the "On Progress" section, and outline future steps in the "Planned" section. Use Markdown checkboxes (`- [x]` for done, `- [ ]` for pending).
- Read `project-manager/general-objectives.md` before planning work to keep feature decisions aligned with the product goals.
- Follow the conventions in `project-manager/styling-guide.md` so Tailwind and Lucide usage stays consistent across the UI.
- Add follow-up documentation updates whenever UI changes require API documentation adjustments.
