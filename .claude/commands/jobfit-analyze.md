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
5. Compare the extracted job against `profile/resume.md`.
6. Inspect `profile/resume-template.docx` or `profile/resume.docx` if present and call out ATS risks.
7. Write the run files under `applications/{company-slug}/{role-slug}-{YYYY-MM-DD}/`.
8. Stop after analysis and ask what the user wants generated.
