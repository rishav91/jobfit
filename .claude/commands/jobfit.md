# JobFit Router

Route the user's request through JobFit.

## Usage

```text
/jobfit analyze this job: https://company.com/jobs/example
/jobfit generate a tailored resume for the latest run
/jobfit create a cover letter too
/jobfit mark the latest run as applied
```

## Instructions

1. Read `AGENTS.md`.
2. Determine intent from `$ARGUMENTS`.
3. Load the matching mode file:
   - analyze/evaluate/compare/JD/URL -> `modes/analyze.md`
   - resume/tailor CV -> `modes/draft-resume.md`
   - cover letter -> `modes/draft-cover-letter.md`
   - review/approve/reject/applied/status -> `modes/review.md`
4. Execute the mode.

If the intent is unclear, ask one concise question.

