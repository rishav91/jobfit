# JobFit

JobFit is a lightweight, agent-native job application workflow.

You talk to Codex/Claude in normal language:

```text
Analyze this job: https://company.com/jobs/example
```

The agent crawls the listing, compares it with your resume, scores fit, explains matches and gaps, then waits for your review before drafting a tailored resume or cover letter.

Claude Code can also use slash commands:

```text
/jobfit analyze this job: https://company.com/jobs/example
/jobfit-analyze https://company.com/jobs/example
/jobfit-resume latest
/jobfit-cover-letter latest
/jobfit-review mark latest as applied
```

## Project Shape

```text
jobfit/
  AGENTS.md
  CLAUDE.md
  .claude/commands/
  skills/jobfit/SKILL.md
  modes/
  scripts/
  profile/
  applications/
  data/
```

## First Setup

1. Put your factual resume in `profile/resume.md`.
2. Export your Google Docs/Word resume as `profile/resume-template.docx` or `profile/resume.docx`.
3. Fill `profile/profile.yml`.
4. Run `npm install` when ready to execute helper scripts.

The main interface is conversational. The scripts are helper tools the agent calls.
