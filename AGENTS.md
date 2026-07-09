# JobFit Agent Instructions

JobFit is a lightweight, agent-native job application workflow.

The user interacts in natural language, not primarily through CLI commands. Helper scripts exist for deterministic work: crawling, run creation, SQLite persistence, DOCX inspection, and DOCX generation.

## Core Workflow

1. Accept a job listing URL or pasted JD.
2. Crawl/render the listing with Playwright when a URL is provided.
3. Extract company, role, location, responsibilities, requirements, skills, tools, and context.
4. Propose a resume variant from `profile/resume-variants.md` based on the JD's emphasis, and wait for the user to confirm or override it before comparing.
5. Compare the extracted job against the confirmed resume variant.
6. Inspect `profile/resume-template.docx` or `profile/resume.docx` when available for style and ATS risks.
7. Save the run under `applications/{company-slug}/{role-slug}-{YYYY-MM-DD}/`.
8. Persist run metadata in `data/jobfit.sqlite`, including the confirmed `resume_variant`.
9. Produce a match report, score, and tailoring plan.
10. Stop for human review before generating final application artifacts.
11. Generate resume and/or cover letter only after the user explicitly asks.

## Non-Negotiable Rules

- Draft, never submit.
- Do not invent skills, employers, metrics, tools, degrees, certifications, or responsibilities.
- Use ATS keyword injection only by rewriting true experience using the employer's vocabulary.
- For every important mismatch, provide gap mitigation:
  - hard blocker vs nice-to-have
  - adjacent evidence from the resume
  - ethical positioning language
  - "do not claim" warning where needed
- Preserve the supplied DOCX style where feasible.
- If the DOCX layout is not ATS-friendly, clearly call that out before generation.
- Ask before creating a cover letter.
- Save artifacts in the run folder.

## User Inputs

- `profile/resume-variants.md`: registry of available resume variants (e.g. Backend Architecture, Applied AI) and which to propose for a given JD.
- `profile/resume-*.md` (e.g. `resume-backend.md`, `resume-applied-ai.md`): source of truth for factual resume content, one file per variant. All variants share the same underlying facts — only framing and emphasis differ.
- `profile/resume-template.docx` or `profile/resume.docx`: style reference for generated DOCX files.
- `profile/profile.yml`: name, contact, target roles, preferences.

## Useful Natural-Language Commands

- "Analyze this job: {url}"
- "Compare this JD against my resume."
- "Generate a tailored resume only."
- "Generate a cover letter too."
- "Show me the gaps from my last 10 jobs."
- "Mark this run as reviewed."
- "Do not generate documents yet, just analyze fit."
