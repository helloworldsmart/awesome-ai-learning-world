// Validate skills.json and every file under resources/, paths/, companies/ and questions/.
// Run before every commit; CI runs it on every PR.
//
//   node scripts/check.mjs

import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadCatalog, questionCoverage, MIN_PER_TIER } from "./catalog.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { skills, entries, paths, companies, questions, problems } = loadCatalog(root);

if (problems.length > 0) {
  console.error(`${problems.length} problem(s):\n  - ${problems.join("\n  - ")}`);
  process.exit(1);
}

const count = (status) => entries.filter((e) => e.status === status).length;
const technical = questions.filter((q) => q.kind === "technical").length;
console.log(
  `OK: ${entries.length} resources (todo ${count("todo")} · in progress ${count("in_progress")} · done ${count("done")} · proposed removal ${count("proposed_removal")}) · ${skills.length} skills · ${paths.length} paths · ${companies.length} companies · ${questions.length} questions (${technical} technical)`,
);

// Not an error: the app simply doesn't open a Challenge topic until every tier has enough questions.
const thin = questionCoverage(questions).filter((c) => c.count < MIN_PER_TIER);
if (technical > 0 && thin.length > 0) {
  console.log(`Note: ${thin.length} topic × tier pair(s) have fewer than ${MIN_PER_TIER} questions:`);
  for (const c of thin) console.log(`  - ${c.topic} / ${c.tier}: ${c.count}`);
}
