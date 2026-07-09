# JobFit Analyze

Analyze a job listing URL or pasted JD against the user's resume.

## Usage

```text
/jobfit-analyze https://company.com/jobs/example
/jobfit-analyze pasted JD text...
```

## Instructions

1. Read `AGENTS.md`.
2. Read `modes/analyze.md`.
3. Use `$ARGUMENTS` as the job URL or JD text.
4. If `$ARGUMENTS` is a URL, crawl/render it with Playwright or `scripts/crawl-job.ts`.
5. Read `profile/resume-variants.md`, propose the resume variant that best matches the JD, and wait for the user to confirm or override it.
6. Compare the extracted job against the confirmed resume variant.
7. Inspect `profile/resume-template.docx` or `profile/resume.docx` if present and call out ATS risks.
8. Write the run files under `applications/{company-slug}/{role-slug}-{YYYY-MM-DD}/`, recording the confirmed variant in `metadata.json` under `resume_variant`.
9. Stop after analysis and ask what the user wants generated.
