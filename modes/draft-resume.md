# Mode: Draft Resume

Generate a tailored resume draft only after the user asks.

## Inputs

- `profile/resume.md`
- `profile/resume-template.docx` or `profile/resume.docx`
- run folder analysis files

## Rules

- Never invent facts.
- Preserve the user's DOCX style where feasible.
- If style conflicts with ATS readability, state the risk in the run notes.
- Use employer vocabulary only where it truthfully maps to existing experience.
- Keep a `tailored-resume.md` draft as the human-readable source.
- Generate `tailored-resume.docx` from the template/style reference when possible.

## Outputs

Write to `drafts/` in the run folder:
- `tailored-resume.md`
- `tailored-resume.docx`
