// Build README.md from skills.json, resources/*.json and paths/*.json.
//
//   node scripts/build-readme.mjs          write README.md
//   node scripts/build-readme.mjs --check  exit 1 if README.md is out of date (CI)
//
// README.md is generated. Edit the JSON files, then run this.

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadCatalog } from "./catalog.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const PATHS = "Learning Paths";
const FEEDS = "Staying Current";

// Courses lead each section: a course usually carries its own papers, books and docs.
const TYPE_ORDER = ["course", "book", "paper", "docs", "video", "article", "github"];

const anchor = (heading) =>
  heading.toLowerCase().replace(/[^a-z0-9 -]/g, "").trim().replace(/ /g, "-");

function hours(minutes) {
  if (!minutes) return "";
  if (minutes < 60) return `${minutes} min`;
  const h = minutes / 60;
  return `~${h < 10 ? Math.round(h * 10) / 10 : Math.round(h)} h`;
}

function byline(e) {
  const who = [e.provider, e.creator && e.creator !== e.provider ? e.creator : ""].filter(Boolean);
  return who.join(", ");
}

function line(e) {
  const facts = [e.type, e.difficulty, hours(e.durationMinutes)];
  const units = e.units ?? [];
  if (units.length > 0) facts.push(`${units.length} ${units.length === 1 ? "unit" : "units"}`);
  if (e.language && e.language !== "en") facts.push(e.language);
  const who = byline(e);
  const sentence = who && !who.endsWith(".") ? `${who}.` : who;
  let out = `- [${e.title}](${e.url})${sentence ? ` - ${sentence}` : ""} <sub>${facts.filter(Boolean).join(" · ")}</sub>`;

  // Related material that comes with the course (papers, books, docs), not the lecture videos.
  const seen = new Set();
  for (const u of units) {
    for (const r of u.resources ?? []) {
      if (r.role !== "supplementary" || r.type === "video" || seen.has(r.url)) continue;
      seen.add(r.url);
      out += `\n  - [${r.title}](${r.url}) <sub>${r.type}</sub>`;
    }
  }
  return out;
}

function sortEntries(list) {
  return [...list].sort(
    (a, b) =>
      TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type) ||
      a.title.localeCompare(b.title, "en", { sensitivity: "base" }),
  );
}

export function buildReadme({ skills, entries, paths = [] }) {
  const resources = entries.filter((e) => e.kind === "resource");
  const feeds = entries.filter((e) => e.kind === "feed");
  const bySlug = new Map(entries.map((e) => [e.slug, e]));

  // A resource with several skills appears in each of them: skills have no "main" one.
  // Sections follow skills.json, which is ordered from foundations outwards.
  const bySkill = new Map(skills.map((s) => [s.name, []]));
  for (const e of resources) for (const s of e.skills) bySkill.get(s)?.push(e);
  const skillSections = skills.filter((s) => bySkill.get(s.name).length > 0);

  const sections = [];
  if (paths.length > 0) sections.push(PATHS);
  sections.push(...skillSections.map((s) => s.name));
  if (feeds.length > 0) sections.push(FEEDS);

  const out = [];
  out.push("# Awesome AI Learning World [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)");
  out.push("");
  out.push(
    "> A curated catalog of AI learning resources — courses and the papers, books and docs that go with them — grouped by skill.",
  );
  out.push("");
  out.push(
    "Every resource here meets the [inclusion criteria](CONTRIBUTING.md#inclusion-criteria): official source, a verifiable author, free or free to audit, still relevant, and teaching concepts rather than button clicks. " +
      "The same catalog powers [AI Learning World](https://ailearnworld.com), where you can drop any of these onto your own learning board and track your progress.",
  );
  out.push("");
  out.push("## Contents");
  out.push("");
  for (const s of sections) out.push(`- [${s}](#${anchor(s)})`);
  out.push("");

  if (paths.length > 0) {
    out.push(`## ${PATHS}`);
    out.push("");
    out.push("Ready-made routes through the catalog, stage by stage. On [AI Learning World](https://ailearnworld.com) you can start your board from one of them.");
    out.push("");
    // 世界路徑（app 的 ADR-0050）是主角，排在最前面；它的段落分屬各領域，每個領域一個小標。
    const isWorld = (p) => Array.isArray(p.domains) && p.domains.length > 0;
    const sorted = [...paths].sort(
      (a, b) => Number(isWorld(b)) - Number(isWorld(a)) || a.title.localeCompare(b.title, "en", { sensitivity: "base" }),
    );
    for (const p of sorted) {
      out.push(`### ${p.title}`);
      out.push("");
      if (p.summary) out.push(`${p.summary}`, "");
      if (isWorld(p)) {
        for (const d of p.domains) {
          out.push(`**${d.title}**`, "");
          d.stages.forEach((st, i) => {
            out.push(`${i + 1}. **${st.title}**${st.passCriteria ? ` — ${st.passCriteria}` : ""}`);
            for (const slug of st.resources) {
              const e = bySlug.get(slug);
              out.push(`   - [${e.title}](${e.url})`);
            }
          });
          out.push("");
        }
        continue;
      }
      p.stages.forEach((st, i) => {
        out.push(`${i + 1}. **${st.title}**${st.passCriteria ? ` — ${st.passCriteria}` : ""}`);
        for (const slug of st.resources) {
          const e = bySlug.get(slug);
          out.push(`   - [${e.title}](${e.url})`);
        }
        // 補充：想深入再上，一行列完，跟主課分得出來。
        if (st.extras?.length) {
          const links = st.extras.map((slug) => {
            const e = bySlug.get(slug);
            return `[${e.title}](${e.url})`;
          });
          out.push(`   - *Go deeper:* ${links.join(" · ")}`);
        }
      });
      out.push("");
    }
  }

  for (const s of skillSections) {
    out.push(`## ${s.name}`);
    out.push("");
    if (s.description) out.push(s.description, "");
    for (const e of sortEntries(bySkill.get(s.name))) out.push(line(e));
    out.push("");
  }

  if (feeds.length > 0) {
    out.push(`## ${FEEDS}`);
    out.push("");
    out.push("Ongoing sources to follow. They never finish, so they are not courses — read an issue, keep what matters.");
    out.push("");
    for (const e of sortEntries(feeds)) out.push(line(e));
    out.push("");
  }

  out.push("## Contributing");
  out.push("");
  out.push("Found something that meets the criteria? See [CONTRIBUTING.md](CONTRIBUTING.md). Open a pull request that adds one JSON file under `resources/` — this README is generated from those files.");
  out.push("");
  out.push("## Acknowledgements");
  out.push("");
  out.push("The selection criteria were inspired by [The No-Hype AI Learning Guide](https://github.com/h9-tec/Awesome_ai_learning) by h9-tec.");
  out.push("");
  out.push("## Question sources & licenses");
  out.push("");
  out.push("The interview questions in `questions/` are original work except for one borrowed input: 375 of the technical question prompts come from [ai-engineering-interview-questions-company-wise](https://github.com/pallavi-shekhar/ai-engineering-interview-questions-company-wise) by pallavi-shekhar, which is licensed under [Apache-2.0](https://github.com/pallavi-shekhar/ai-engineering-interview-questions-company-wise/blob/main/LICENSE). Only the question prompts were taken. The key points and answer levels are written independently, and no answers were copied. The upstream repository has no NOTICE file. Behavioral questions cite their own sources in each file.");
  out.push("");
  out.push("## License");
  out.push("");
  out.push("[![CC BY 4.0](https://licensebuttons.net/l/by/4.0/88x31.png)](https://creativecommons.org/licenses/by/4.0/)");
  out.push("");
  out.push("This list is licensed under [CC BY 4.0](LICENSE). Reuse it freely — just credit **AI Learning World** and link back to this repository.");
  out.push("");
  out.push("<!-- Generated by scripts/build-readme.mjs from resources/*.json. Do not edit by hand. -->");
  out.push("");
  return out.join("\n");
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const catalog = loadCatalog(root);
  const { entries, problems } = catalog;
  if (problems.length > 0) {
    console.error(`Fix these first (node scripts/check.mjs):\n  - ${problems.join("\n  - ")}`);
    process.exit(1);
  }
  const readme = buildReadme(catalog);
  const path = join(root, "README.md");
  if (process.argv.includes("--check")) {
    let current = "";
    try {
      current = readFileSync(path, "utf8");
    } catch {
      // missing README counts as out of date
    }
    if (current !== readme) {
      console.error("README.md is out of date. Run: node scripts/build-readme.mjs");
      process.exit(1);
    }
    console.log("README.md is up to date.");
  } else {
    writeFileSync(path, readme);
    console.log(`README.md written (${entries.length} resources).`);
  }
}
