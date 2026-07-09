# Resume Variants

Each variant is a full resume built from the same underlying facts (experience, education, projects) — only framing, section order, and skill emphasis differ per target role focus.

| Variant | File | Best for |
|---|---|---|
| Backend Architecture | `profile/resume-backend.md` | Backend/distributed-systems, Staff/Principal Engineer, Tech Lead roles emphasizing scale, reliability, and architecture |
| Applied AI | `profile/resume-applied-ai.md` | Applied AI/GenAI, Agentic AI, LLM/RAG, ML/AI engineering roles |

## Default

If a job description doesn't clearly lean toward one variant, default to `profile/resume-backend.md`.

## Selection Rule (used by `modes/analyze.md`)

During job analysis, match the JD's emphasis against the "Best for" column and propose the closest variant. Always wait for the user to confirm (or override) the choice before comparing against it or generating any draft — never silently pick one.

Once confirmed for a run, record the chosen file path in that run's `metadata.json` under `resume_variant` so `draft-resume` and `draft-cover-letter` reuse the same choice without re-asking.

## Adding a new variant

1. Add `profile/resume-<slug>.md` with the same factual content, reframed for the new focus.
2. Add a row to the table above describing what it's best for.
