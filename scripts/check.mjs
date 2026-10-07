// Validate skills.json and every file under resources/, paths/, companies/ and questions/.
// Run before every commit; CI runs it on every PR.
//
//   node scripts/check.mjs

import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadCatalog, questionCoverage, MIN_PER_TIER, MIN_PAGE_PER_TIER, optionLengthLeaks } from "./catalog.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { skills, entries, paths, companies, questions, topics, problems } = loadCatalog(root);

if (problems.length > 0) {
  console.error(`${problems.length} problem(s):\n  - ${problems.join("\n  - ")}`);
  process.exit(1);
}

const count = (status) => entries.filter((e) => e.status === status).length;
const technical = questions.filter((q) => q.kind === "technical").length;
console.log(
  `OK: ${entries.length} resources (todo ${count("todo")} · in progress ${count("in_progress")} · done ${count("done")} · proposed removal ${count("proposed_removal")}) · ${skills.length} skills · ${paths.length} paths · ${companies.length} companies · ${questions.length} questions (${technical} technical) · ${topics.length} topic intros`,
);

// Not errors: the app simply doesn't open a topic × tier until it has enough questions.
// This first list is for the AI Mock interview (any non-removed question counts).
const coverage = questionCoverage(questions);
const thin = coverage.filter((c) => c.count < MIN_PER_TIER);
if (technical > 0 && thin.length > 0) {
  console.log(`Note: ${thin.length} topic × tier pair(s) have fewer than ${MIN_PER_TIER} questions:`);
  for (const c of thin) console.log(`  - ${c.topic} / ${c.tier}: ${c.count}`);
}

// The Challenge page round draws MIN_PAGE_PER_TIER page-usable questions (in_progress or done, with a page).
const noPage = coverage.filter((c) => c.page < MIN_PAGE_PER_TIER);
if (technical > 0 && noPage.length > 0) {
  console.log(
    `Challenge 頁面場先不開放 (Challenge page round not open yet): ${noPage.length} topic × tier pair(s) have fewer than ${MIN_PAGE_PER_TIER} page-usable questions:`,
  );
  for (const c of noPage) console.log(`  - ${c.topic} / ${c.tier}: ${c.page}`);
}

// Not an error: a correct option noticeably longer than the distractors lets a learner pick it by length alone.
for (const { slug, locale, kind } of optionLengthLeaks(questions)) {
  const what = kind === "shortest" ? "correct option noticeably shorter" : "correct option noticeably longer";
  console.warn(`WARNING: 選項長度可能洩答案 (${what}): ${slug} [${locale}]`);
}
