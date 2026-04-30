# JobFit Review

Update review or application status for a run.

## Usage

```text
/jobfit-review approve latest
/jobfit-review reject applications/company/role-date
/jobfit-review mark latest as applied
```

## Instructions

1. Read `AGENTS.md`.
2. Read `modes/review.md`.
3. Use `$ARGUMENTS` to identify the status change and run folder.
4. Update the run's `metadata.json`.
5. If SQLite is initialized, update `data/jobfit.sqlite`.
6. Never mark a run as applied unless the user explicitly says they submitted the application.

