import fs from "node:fs";
import path from "node:path";
import slugify from "slugify";

const [companyArg, roleArg] = process.argv.slice(2);

if (!companyArg || !roleArg) {
  console.error("Usage: npm run create-run -- <company> <role>");
  process.exit(1);
}

const date = new Date().toISOString().slice(0, 10);
const company = slugify(companyArg, { lower: true, strict: true });
const role = slugify(roleArg, { lower: true, strict: true });
const runPath = path.resolve("applications", company, `${role}-${date}`);

for (const dir of ["source", "analysis", "drafts"]) {
  fs.mkdirSync(path.join(runPath, dir), { recursive: true });
}

const metadata = {
  company: companyArg,
  role: roleArg,
  created_at: new Date().toISOString(),
  status: "created",
  resume_variant: null
};

fs.writeFileSync(path.join(runPath, "metadata.json"), JSON.stringify(metadata, null, 2) + "\n");
console.log(runPath);
