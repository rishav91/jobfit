# Mode: Analyze Job

Analyze a job listing or pasted JD against the user's resume.

## Steps

1. If the input is a URL, use Playwright or `scripts/crawl-job.ts` to render and extract the page.
2. If the input is pasted JD text, save it directly.
3. Create a run folder with `scripts/create-run.ts` once company and role are known.
4. Extract structured job data:
   - company
   - role title
   - location / remote policy
   - responsibilities
   - required qualifications
   - preferred qualifications
   - skills and tools
   - domain/product context
5. Compare against `profile/resume.md`.
6. Inspect `profile/resume-template.docx` or `profile/resume.docx` if present and call out ATS risks:
   - tables
   - columns
   - text boxes
   - icons
   - images used as text
   - key info in headers/footers
7. Generate:
   - `source/job-description.md`
   - `source/extracted-job.json`
   - `analysis/match-report.md`
   - `analysis/tailoring-plan.md`
   - `analysis/score.json`

## Scoring

Score from 1.0 to 5.0:
- must-have requirements fit
- preferred requirements fit
- skills/tools fit
- domain/context fit
- seniority fit
- location/work authorization fit
- risk/gap severity

Recommend:
- 4.5+ strong apply
- 4.0-4.4 apply if interested
- 3.5-3.9 selective / only with reason
- below 3.5 do not apply unless strategic

## Gap Mitigation

For every gap:
- label hard blocker or nice-to-have
- cite adjacent resume evidence if available
- suggest ethical wording
- explicitly list what not to claim

## Stop Point

After analysis, stop and ask what to generate:
- resume only
- cover letter only
- both
- neither
