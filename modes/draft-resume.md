# Mode: Draft Resume

Generate a tailored resume draft only after the user asks.

## Inputs

- `profile/resume.md`
- `profile/resume-template.docx` or `profile/resume.docx`
- run folder analysis files
- user's choice of version: styled, ATS-compliant, or both (collected at analyze stop point)

## Rules

- Never invent facts.
- Preserve the user's DOCX style where feasible.
- Use employer vocabulary only where it truthfully maps to existing experience.
- Always keep `tailored-resume.md` as the human-readable source of truth for both variants.

## Version Selection

If the analyze step found ATS warnings (tables, text boxes, multi-column, images-as-text, header/footer content), the user will have chosen one of:

### Option A — Styled (default)
Matches the user's existing DOCX format. Use `profile/resume-template.docx` or `profile/resume.docx` as the style reference. Note any ATS risks in `drafts/notes.md`.

**Output:** `drafts/tailored-resume.docx`

### Option B — ATS-Compliant
Flat, single-column layout with no tables, no text boxes, no images, no headers/footers for key content. Use `tailored-resume.md` as the source and generate a clean DOCX with:
- All sections as plain paragraphs or simple bullet lists
- Skills as a comma-separated line or plain-text list (not a table)
- Contact info in the body, not in a Word header
- Section headers as bold paragraph text, not styled boxes

**Output:** `drafts/tailored-resume-ats.docx`

### Option C — Both
Generate both. Label them clearly. Add a `drafts/notes.md` entry explaining the difference and when to use each.

## Outputs

Always write:
- `drafts/tailored-resume.md` — human-readable source, used for both DOCX variants

Then based on user choice:
- `drafts/tailored-resume.docx` — styled variant (Option A or C)
- `drafts/tailored-resume-ats.docx` — ATS-compliant variant (Option B or C)
- `drafts/notes.md` — when ATS warnings exist: list the warnings, which variant addresses them, and when to use each
