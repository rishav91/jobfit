# JobFit -- Claude Code Instructions

JobFit is a lightweight, agent-native job application workflow. The user should be able to issue commands in plain English, and Claude Code should route those requests through the mode files in `modes/`.

## How To Use This Repo

Read `AGENTS.md` first. It contains the shared rules for Codex, Claude Code, and other agent runtimes.

When the user asks to analyze a job, tailor a resume, create a cover letter, review a run, or inspect application history:

1. Determine the intent from natural language.
2. Load the relevant mode file from `modes/`.
3. Use helper scripts in `scripts/` for deterministic work.
4. Save outputs under the relevant run folder in `applications/`.
5. Persist metadata in `data/jobfit.sqlite` when the database is initialized.

## Intent Routing

| User asks... | Load |
|---|---|
| Analyze/evaluate/compare a job URL or pasted JD | `modes/analyze.md` |
| Generate/tailor a resume | `modes/draft-resume.md` |
| Generate a cover letter | `modes/draft-cover-letter.md` |
| Review/approve/reject/mark applied | `modes/review.md` |

## Commands

Claude Code slash commands are defined in `.claude/commands/`.

Available commands:

- `/jobfit` -- route any natural-language JobFit request.
- `/jobfit-analyze` -- analyze a URL or pasted JD.
- `/jobfit-resume` -- draft a tailored resume for the latest or specified run.
- `/jobfit-cover-letter` -- draft a cover letter after confirmation.
- `/jobfit-review` -- update review/application status.

The user does not need to use slash commands. Plain English is preferred and should work.

## Hard Rules

- Draft, never submit.
- Never invent facts.
- Preserve truthful resume content.
- Use ATS keywords only when they map to real experience.
- Always include gap mitigation for important mismatches.
- Call out DOCX template ATS risks.
- Ask before creating a cover letter.
- Stop for human review before final application artifacts.
