import fs from "node:fs";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  TabStopType,
  TabStopPosition,
  BorderStyle,
} from "docx";

const [markdownPath, outPath] = process.argv.slice(2);

if (!markdownPath || !outPath) {
  console.error("Usage: npm run create-docx -- <input.md> <output.docx>");
  process.exit(1);
}

const markdown = fs.readFileSync(markdownPath, "utf8");
const lines = markdown.split("\n");

const FONT = "Calibri";
// Sizes in half-points: 22 = 11pt, 20 = 10pt, 24 = 12pt, 36 = 18pt
const SIZE_BODY = 22;
const SIZE_CONTACT = 18;
const SIZE_SKILLS = 20;
const SIZE_NAME = 36;
const SIZE_SECTION = 24;

const SECTION_HEADINGS = new Set([
  "SKILLS", "EXPERIENCE", "EARLY CAREER", "AI PROJECT", "PROJECTS",
  "EDUCATION", "CERTIFICATIONS", "SUMMARY", "AWARDS",
]);

type Token = { text: string; bold?: boolean; italics?: boolean };

function stripLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

function parseInline(raw: string): Token[] {
  const text = stripLinks(raw).replace(/\s{2,}/g, " ").trim();
  const tokens: Token[] = [];
  // Split on **bold** and *italic* markers
  for (const part of text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/)) {
    if (!part) continue;
    if (part.startsWith("**") && part.endsWith("**")) {
      tokens.push({ text: part.slice(2, -2), bold: true });
    } else if (part.startsWith("*") && part.endsWith("*")) {
      tokens.push({ text: part.slice(1, -1), italics: true });
    } else {
      tokens.push({ text: part });
    }
  }
  return tokens;
}

function toRuns(tokens: Token[], size: number): TextRun[] {
  return tokens.map(t => new TextRun({ text: t.text, bold: t.bold, italics: t.italics, size, font: FONT }));
}

function isNameLine(line: string): boolean {
  const inner = line.replace(/^\*\*|\*\*$/g, "").trim();
  return /^\*\*[A-Z][A-Z\s.'-]+\*\*$/.test(line) && !SECTION_HEADINGS.has(inner);
}

function isSectionHeading(line: string): boolean {
  const inner = line.replace(/^\*\*|\*\*$/g, "").trim();
  return /^\*\*[A-Z][A-Z\s]+\*\*$/.test(line) && SECTION_HEADINGS.has(inner);
}

function isContactLine(line: string): boolean {
  return line.includes("|") && (line.includes("@") || line.includes("http") || /\d{7,}/.test(line));
}

function isSkillSeparator(line: string): boolean {
  return /^\|[\s:|:-]+\|/.test(line);
}

function isSkillRow(line: string): boolean {
  return line.startsWith("|") && line.includes("|", 1) && !isSkillSeparator(line);
}

function isBullet(line: string): boolean {
  return line.startsWith("* ") || line.startsWith("- ");
}

// Job/entry header: starts with **bold**, has · or ends with *date*
function isEntryHeader(line: string): boolean {
  return (
    /^\*\*[^*]+\*\*/.test(line) &&
    !isSectionHeading(line) &&
    !isNameLine(line) &&
    (line.includes("·") || /\*[^*]+\*$/.test(line))
  );
}

const paragraphs: Paragraph[] = [];

for (const rawLine of lines) {
  const line = rawLine.trim();
  if (!line) continue;

  if (isNameLine(line)) {
    const name = line.replace(/^\*\*|\*\*$/g, "").trim();
    paragraphs.push(new Paragraph({
      children: [new TextRun({ text: name, bold: true, size: SIZE_NAME, font: FONT })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
    }));
    continue;
  }

  if (isContactLine(line)) {
    const parts = line.split("|").map(p => stripLinks(p).trim()).filter(Boolean);
    paragraphs.push(new Paragraph({
      children: [new TextRun({ text: parts.join("  |  "), size: SIZE_CONTACT, font: FONT })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
    }));
    continue;
  }

  if (isSectionHeading(line)) {
    const heading = line.replace(/^\*\*|\*\*$/g, "").trim();
    paragraphs.push(new Paragraph({
      children: [new TextRun({ text: heading, bold: true, size: SIZE_SECTION, font: FONT })],
      spacing: { before: 220, after: 80 },
      border: { bottom: { color: "auto", space: 1, style: BorderStyle.SINGLE, size: 6 } },
    }));
    continue;
  }

  if (isSkillSeparator(line)) continue;

  if (isSkillRow(line)) {
    const cells = line.split("|").map(c => c.trim()).filter(Boolean);
    if (cells.length >= 2) {
      const label = cells[0].replace(/^\*\*|\*\*$/g, "").trim();
      const value = cells.slice(1).join(" ").trim();
      paragraphs.push(new Paragraph({
        children: [
          new TextRun({ text: label + ":  ", bold: true, size: SIZE_SKILLS, font: FONT }),
          new TextRun({ text: value, size: SIZE_SKILLS, font: FONT }),
        ],
        spacing: { after: 60 },
      }));
    }
    continue;
  }

  if (isBullet(line)) {
    const text = line.slice(2).trim();
    paragraphs.push(new Paragraph({
      children: toRuns(parseInline(text), SIZE_BODY),
      bullet: { level: 0 },
      spacing: { after: 60 },
    }));
    continue;
  }

  if (isEntryHeader(line)) {
    // Extract trailing *date* if present
    const dateMatch = line.match(/\*([^*]+)\*$/);
    const dateText = dateMatch ? dateMatch[1] : "";
    const withoutDate = dateMatch ? line.slice(0, -dateMatch[0].length).trim() : line;
    // Strip trailing · separator if left over
    const cleanLine = withoutDate.replace(/[·•]\s*$/, "").trim();

    const children = toRuns(parseInline(cleanLine), SIZE_BODY);
    if (dateText) {
      children.push(new TextRun({ text: "\t" + dateText, italics: true, size: SIZE_BODY, font: FONT }));
    }

    paragraphs.push(new Paragraph({
      children,
      tabStops: dateText ? [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }] : [],
      spacing: { before: 180, after: 60 },
    }));
    continue;
  }

  // Default: body paragraph
  paragraphs.push(new Paragraph({
    children: toRuns(parseInline(line), SIZE_BODY),
    spacing: { after: 80 },
  }));
}

const doc = new Document({
  sections: [{
    properties: {
      page: {
        margin: {
          top: 720,    // 0.5in
          bottom: 720,
          left: 1008,  // 0.7in
          right: 1008,
        },
      },
    },
    children: paragraphs,
  }],
});

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(outPath, buffer);
console.log(outPath);
