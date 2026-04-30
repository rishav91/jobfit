import fs from "node:fs";
import mammoth from "mammoth";

const [docxPathArg] = process.argv.slice(2);
const docxPath = docxPathArg
  ?? (fs.existsSync("profile/resume-template.docx")
    ? "profile/resume-template.docx"
    : "profile/resume.docx");

if (!fs.existsSync(docxPath)) {
  console.error(`Missing DOCX: ${docxPath}`);
  process.exit(1);
}

const result = await mammoth.convertToHtml({ path: docxPath });
const warnings: string[] = [];

if (result.value.includes("<table")) warnings.push("Contains tables; may parse poorly in some ATS systems.");
if (result.value.match(/<img\b/i)) warnings.push("Contains images; ensure no critical text is image-only.");

console.log(JSON.stringify({
  docxPath,
  messages: result.messages,
  atsWarnings: warnings,
  htmlPreview: result.value.slice(0, 2000)
}, null, 2));
