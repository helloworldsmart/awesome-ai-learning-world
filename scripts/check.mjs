// Validate every file under resources/. Run before every commit; CI runs it on every PR.
//
//   node scripts/check.mjs

import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadCatalog } from "./catalog.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { entries, problems } = loadCatalog(root);

if (problems.length > 0) {
  console.error(`${problems.length} problem(s):\n  - ${problems.join("\n  - ")}`);
  process.exit(1);
}

const count = (status) => entries.filter((e) => e.status === status).length;
console.log(
  `OK: ${entries.length} resources (todo ${count("todo")} · in progress ${count("in_progress")} · done ${count("done")})`,
);
