# JobFit Agent Instructions

JobFit is a lightweight, agent-native job application workflow.

The user interacts in natural language, not primarily through CLI commands. Helper scripts exist for deterministic work: crawling, run creation, SQLite persistence, DOCX inspection, and DOCX generation.

## Core Workflow

1. Accept a job listing URL or pasted JD.
2. Crawl/render the listing with Playwright when a URL is provided.
3. Extract company, role, location, responsibilities, requirements, skills, tools, and context.
4. Compare the extracted job against `profile/resume.md`.
5. Inspect `profile/resume-template.docx` or `profile/resume.docx` when available for style and ATS risks.
6. Save the run under `applications/{company-slug}/{role-slug}-{YYYY-MM-DD}/`.
7. Persist run metadata in `data/jobfit.sqlite`.
8. Produce a match report, score, and tailoring plan.
9. Stop for human review before generating final application artifacts.
10. Generate resume and/or cover letter only after the user explicitly asks.

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

- `profile/resume.md`: source of truth for factual resume content.
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
