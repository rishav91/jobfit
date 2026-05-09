# Mode: Analyze Job

Analyze a job listing or pasted JD against the user's resume.

## Step 1 — Acquire the Job Description

Determine which path applies based on what the user provided:

### 1a — No URL (user has no link)

If the user says they don't have a link, or haven't mentioned a URL at all, skip crawling entirely. Go straight to the **Manual Input Interview** below.

### 1b — URL provided

Run `scripts/crawl-job.ts` and check `crawl-result.json`.

**If `success: true`**: use `job-page.txt` as the raw source. Continue to Step 2.

**If `success: false`**: do NOT retry or attempt alternative crawl methods. Tell the user:

> "I wasn't able to crawl that page — it's likely JS-rendered, behind a login, or actively blocking bots. I'll ask you a few questions instead so you can paste the details."

Then run the **Manual Input Interview** below.

### 1c — Pasted text (no URL, full JD already provided)

If the user pastes the full JD directly with no URL, skip crawling and the interview. Save the pasted text to `source/job-description.md` and continue to Step 2. Still ask for company name, role, and location if they weren't included in the paste.

---

## Manual Input Interview

Ask the following questions **one at a time**, waiting for the user's response before asking the next.

Do not ask all at once. Do not skip questions. Accept "skip" or "not listed" for optional fields.

1. **Company name** — "What's the company name?"
2. **Job title** — "What's the exact job title or role?"
3. **Location / remote policy** — "Where is the role based, and is it remote, hybrid, or on-site?"
4. **Job description** — "Please paste the full job description — responsibilities and everything listed."
5. **Required qualifications** — "Are required qualifications listed separately? If so, paste them. Otherwise say skip."
6. **Preferred qualifications** — "Same for preferred qualifications — paste or skip."
7. **Compensation / level** — "Is a salary range or level (e.g. L5, Senior) mentioned? Paste it or skip."
8. **Application URL** — "What's the original job URL, for reference?"

After collecting all responses, synthesize them into `source/job-description.md` and `source/extracted-job.json`, then continue to Step 2.

---

## Step 2 — Create the Run Folder

Once company and role are known, run `scripts/create-run.ts <company> <role>` to create the folder scaffold. Save all source files there.

## Step 3 — Extract Structured Job Data

From the job description (crawled or pasted), extract:
- company
- role title
- location / remote policy
- responsibilities
- required qualifications
- preferred qualifications
- skills and tools
- domain / product context
- compensation / level (if present)

Save as `source/extracted-job.json`.

## Step 4 — Compare Against Resume

Read `profile/resume.md`. Inspect `profile/resume-template.docx` or `profile/resume.docx` if present and call out ATS risks:
- tables used for layout
- text boxes
- icons or images used as text
- key info in headers/footers
- multi-column layouts

## Step 5 — Generate Outputs

Write to the run folder:
- `source/job-description.md`
- `source/extracted-job.json`
- `analysis/match-report.md`
- `analysis/tailoring-plan.md`
- `analysis/score.json`

## Scoring

Score from 1.0 to 5.0 across:
- must-have requirements fit
- preferred requirements fit
- skills / tools fit
- domain / context fit
- seniority fit
- location / work authorization fit
- risk / gap severity

Recommendation thresholds:
- 4.5+ strong apply
- 4.0–4.4 apply if interested
- 3.5–3.9 selective / only with clear reason
- below 3.5 do not apply unless strategic

## Gap Mitigation

For every important gap:
- label: hard blocker or nice-to-have
- cite adjacent resume evidence if available
- suggest ethical positioning language
- explicitly state what not to claim

## Stop Point

After analysis, stop and present what was found, then ask two questions:

**1. What to generate?**
- Resume only
- Cover letter only
- Both
- Neither (analysis only)

**2. If ATS warnings were found in the DOCX (tables, text boxes, multi-column layout, images-as-text, header/footer content) — ask:**
> "Your resume DOCX has ATS risks: [list warnings]. Which version should I generate?
> - **Styled** — matches your current DOCX format (may lose content in some ATS parsers)
> - **ATS-compliant** — flat single-column layout, no tables, plain text throughout
> - **Both** — one of each"

Skip the ATS version question if no warnings were found.
