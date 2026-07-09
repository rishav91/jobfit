---
name: jobfit
description: Analyze job listings against a resume, score fit, mitigate gaps, and draft tailored resume/cover letter artifacts after human review.
user_invocable: true
args: request
---

# JobFit Router

Interpret `{{request}}` as natural language.

## Routing

| User intent | Mode |
|---|---|
| URL, pasted JD, "analyze", "evaluate", "compare" | `analyze` |
| "generate resume", "tailor resume" | `draft-resume` |
| "cover letter" | `draft-cover-letter` |
| "review", "approve", "mark reviewed" | `review` |

## Context to Load

Always read:
- `AGENTS.md`
- `profile/resume-variants.md` if present (resolve the specific resume variant to use per mode below)
- `profile/profile.yml` if present

For analyze:
- `modes/analyze.md`

For resume drafting:
- `modes/draft-resume.md`
- latest or specified run folder

For cover letters:
- `modes/draft-cover-letter.md`
- latest or specified run folder

For review/status changes:
- `modes/review.md`

Execute the selected mode.
