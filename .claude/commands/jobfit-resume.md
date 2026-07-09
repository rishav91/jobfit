# JobFit Resume

Draft a tailored resume for the latest or specified run.

## Usage

```text
/jobfit-resume latest
/jobfit-resume applications/company/role-date
```

## Instructions

1. Read `AGENTS.md`.
2. Read `modes/draft-resume.md`.
3. Use `$ARGUMENTS` to identify the run folder. If omitted or `latest`, use the latest run under `applications/`.
4. Read the run's `analysis/match-report.md`, `analysis/tailoring-plan.md`, and `analysis/score.json`.
5. Read `resume_variant` from the run's `metadata.json`. If missing, read `profile/resume-variants.md`, propose the closest variant, confirm with the user, and write it back to `metadata.json`.
6. Read the confirmed resume variant file and inspect `profile/resume-template.docx` or `profile/resume.docx` when present.
7. Write `drafts/tailored-resume.md` and, when feasible, `drafts/tailored-resume.docx`.
