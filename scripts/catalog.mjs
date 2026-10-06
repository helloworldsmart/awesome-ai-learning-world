// Load and validate skills.json, resources/*.json and paths/*.json.
//
// These rules mirror the app's importer (backend/internal/catalog/format.go in the
// AI Learning World app). The app re-validates everything before it syncs, so a file
// that passes here but fails there is a bug in one of the two: change them together.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const TYPES = ["video", "course", "article", "book", "paper", "docs", "github"];
// "" means unknown: the official page does not state a level, so we do not guess.
export const DIFFICULTIES = ["", "beginner", "intermediate", "advanced"];
export const STATUSES = ["todo", "in_progress", "done", "proposed_removal"];
export const KINDS = ["resource", "feed"];
export const ROLES = ["primary", "supplementary"];
// Each resource teaches 1–3 skills. XP is split evenly across them in the app, so a
// resource tagged with six gives each one almost nothing (ADR-0044 in the app repo).
export const MAX_SKILLS = 3;
// Labels for the maintainer's catalog board, on top of skills. Optional, fixed list:
// intro = no-code introduction, classic = the classic technical methods.
export const TAGS = ["intro", "classic"];

const ENTRY_KEYS = [
  "title", "url", "kind", "status", "type", "provider", "creator",
  "language", "difficulty", "durationMinutes", "skills", "tags", "nextCohort", "links", "note", "units",
];
const UNIT_KEYS = [
  "title", "completionCriterion", "durationMinutes", "durationSeconds", "sourceUrl", "sourceKey", "resources",
];
const UNIT_RESOURCE_KEYS = ["title", "url", "type", "role", "provider", "creator", "language"];
const SKILL_KEYS = ["name", "description"];
const PATH_KEYS = ["title", "summary", "status", "color", "stages", "domains", "links"];
const DOMAIN_KEYS = ["title", "color", "outline", "stages"];
const LINK_KEYS = ["from", "fromStage", "to"];
const COMPANY_KEYS = new Set(["name", "status", "careersUrl", "asks", "postings", "ownResources", "interview"]);
const POSTING_KEYS = new Set(["title", "url", "location", "postedOn", "checkedOn", "paths"]);
const INTERVIEW_KEYS = new Set(["valuesUrl", "values", "prepUrl", "questions"]);
const VALUE_KEYS = new Set(["name", "description"]);
const DATE = /^\d{4}-\d{2}-\d{2}$/;
// 領域色票（app 的 --swatch-<color>，ADR-0051）。
export const WORLD_COLORS = ["green", "teal", "blue", "purple", "rose", "red", "orange", "slate", "gold", "cyan", "brown", "indigo"];
// 世界路徑去重後的主課上限 ＝ app 免費帳號的 node 額度（ADR-0049／0050）：主角要放得進免費白板。
export const WORLD_NODE_LIMIT = 35;
const STAGE_KEYS = ["title", "passCriteria", "resources", "extras"];

// questions/technical/*.json and questions/behavioral/*.json: interview questions (app spec
// 2026-10-05-interview-and-challenge-design.md §4.3). Same lists as the app's format.go.
export const QUESTION_KINDS = ["technical", "behavioral", "situational"];
export const TOPICS = [
  "llm-internals", "inference-gpu", "rag", "agents", "fine-tuning",
  "evaluation", "safety", "multimodal", "system-design", "ml-fundamentals",
];
export const TIERS = ["concept", "mechanism", "trade-off", "boss"];
export const THEMES = ["conflict", "failure", "ownership", "ambiguity", "fast-learning", "influence"];
// Amazon's 16 Leadership Principles, spelled exactly as in companies/amazon.json.
export const LEADERSHIP_PRINCIPLES = [
  "Customer Obsession", "Ownership", "Invent and Simplify", "Are Right, A Lot", "Learn and Be Curious",
  "Hire and Develop the Best", "Insist on the Highest Standards", "Think Big", "Bias for Action", "Frugality",
  "Earn Trust", "Dive Deep", "Have Backbone; Disagree and Commit", "Deliver Results",
  "Strive to be Earth’s Best Employer", "Success and Scale Bring Broad Responsibility",
];
// A Challenge tier needs at least this many questions so a retry can draw a new one.
// Fewer is a warning, not an error: the app just doesn't open that topic yet.
export const MIN_PER_TIER = 3;
const TECHNICAL_KEYS = new Set(["kind", "topic", "tier", "prompt", "keyPoints", "levels", "skills", "source", "status", "page"]);
const BEHAVIORAL_KEYS = new Set(["kind", "theme", "leadershipPrinciples", "prompt", "levels", "source", "status"]);
const LEVEL_KEYS = ["weak", "adequate", "strong"];
const SOURCE_KEYS = new Set(["label", "url"]);

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const isURL = (u) => typeof u === "string" && /^https?:\/\//.test(u);
const blank = (s) => typeof s !== "string" || s.trim() === "";

function readJSON(path, where, problems) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (err) {
    problems.push(`${where}: not valid JSON (${err.message})`);
    return undefined;
  }
}

function readDir(root, name, problems) {
  const dir = join(root, name);
  if (!existsSync(dir)) return [];
  const out = [];
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
    const data = readJSON(join(dir, file), `${name}/${file}`, problems);
    if (data !== undefined) out.push({ slug: file.slice(0, -".json".length), ...data });
  }
  return out;
}

/** companies/<slug>.json: Explore page company profiles (ADR-0059 decision 4). */
export function validateCompanies(companies, entries, paths) {
  const problems = [];
  const bySlug = new Map(entries.map((e) => [e.slug, e]));
  const pathSlugs = new Set(paths.map((p) => p.slug));
  const isDate = (s) => {
    if (!DATE.test(s)) return false;
    const [y, m, d] = s.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
  };
  const extra = (obj, keys, at) => {
    for (const k of Object.keys(obj ?? {})) if (!keys.has(k)) problems.push(`${at}: unknown key "${k}"`);
  };
  for (const c of companies) {
    const at = `companies/${c.slug}`;
    if (!SLUG.test(c.slug)) problems.push(`${at}: file name must be lowercase letters, digits and -`);
    const { slug: _slug, ...rest } = c;
    extra(rest, COMPANY_KEYS, at);
    if (blank(c.name)) problems.push(`${at}: name is empty`);
    if (!["todo", "in_progress", "done", "proposed_removal"].includes(c.status)) problems.push(`${at}: status must be todo, in_progress, done or proposed_removal`);
    if (!isURL(c.careersUrl)) problems.push(`${at}: careersUrl must be a URL`);
    const asks = Array.isArray(c.asks) ? c.asks : [];
    if (asks.length < 1 || asks.length > 5) problems.push(`${at}: asks must have 1 to 5 items`);
    if (asks.some(blank) || new Set(asks).size !== asks.length) problems.push(`${at}: asks must be non-empty and unique`);
    const postings = Array.isArray(c.postings) ? c.postings : [];
    if (postings.length === 0) problems.push(`${at}: needs at least one posting`);
    postings.forEach((p, i) => {
      const pat = `${at} posting ${i + 1}`;
      extra(p, POSTING_KEYS, pat);
      if (blank(p.title)) problems.push(`${pat}: title is empty`);
      if (!isURL(p.url)) problems.push(`${pat}: url must be a URL`);
      if (!isDate(p.checkedOn ?? "")) problems.push(`${pat}: checkedOn must be YYYY-MM-DD`);
      if (p.postedOn !== "" && p.postedOn !== undefined && !isDate(p.postedOn)) problems.push(`${pat}: postedOn must be YYYY-MM-DD`);
      for (const s of p.paths ?? []) if (!pathSlugs.has(s)) problems.push(`${pat}: no path "${s}"`);
    });
    for (const s of c.ownResources ?? []) {
      const e = bySlug.get(s);
      if (!e) problems.push(`${at}: no resource "${s}"`);
      else if (e.kind !== "resource") problems.push(`${at}: "${s}" is a feed`);
      else if (e.status === "proposed_removal") problems.push(`${at}: "${s}" is proposed for removal`);
    }
    const iv = c.interview ?? {};
    extra(iv, INTERVIEW_KEYS, `${at} interview`);
    if (!isURL(iv.valuesUrl)) problems.push(`${at}: interview.valuesUrl must be a URL`);
    const values = Array.isArray(iv.values) ? iv.values : [];
    if (values.length === 0) problems.push(`${at}: interview.values needs at least one value`);
    values.forEach((v, i) => {
      extra(v, VALUE_KEYS, `${at} value ${i + 1}`);
      if (blank(v.name)) problems.push(`${at} value ${i + 1}: name is empty`);
    });
    if (iv.prepUrl && typeof iv.prepUrl === "string" && !isURL(iv.prepUrl)) problems.push(`${at}: interview.prepUrl must be a URL`);
    if (iv.questions !== undefined && !(Array.isArray(iv.questions) && iv.questions.every((q) => typeof q === "string"))) {
      problems.push(`${at}: interview.questions must be a list of strings`);
    }
  }
  return problems;
}

// Own loop instead of readDir: the slug comes from the file name only, so a "slug" or
// "dir" key inside the file is a problem, never an override.
function readQuestionDir(root, dir, problems) {
  const folder = join(root, "questions", dir);
  if (!existsSync(folder)) return [];
  const out = [];
  for (const file of readdirSync(folder).filter((f) => f.endsWith(".json")).sort()) {
    const slug = file.slice(0, -".json".length);
    const data = readJSON(join(folder, file), `questions/${dir}/${file}`, problems);
    if (data === undefined) continue;
    if (typeof data === "object" && data !== null && !Array.isArray(data)) {
      for (const k of ["slug", "dir"]) {
        if (Object.hasOwn(data, k)) problems.push(`questions/${dir}/${slug}: unknown field(s) ${k}`);
      }
      const { slug: _s, dir: _d, ...rest } = data;
      out.push({ ...rest, slug, dir });
    } else {
      out.push({ slug, dir });
    }
  }
  return out;
}

/** questions/<dir>/<slug>.json: interview questions. Rules mirror the app's ValidateQuestions. */
export function validateQuestions(questions, skills) {
  const problems = [];
  const skillNames = new Set(skills.map((s) => s.name));
  const seen = new Map();
  for (const q of questions) {
    const { slug, dir, ...data } = q;
    const at = `questions/${dir}/${slug}`;
    if (!SLUG.test(slug)) problems.push(`${at}: file name must be lowercase letters, digits and -`);
    if (seen.has(slug)) problems.push(`${at}: slug "${slug}" is also used by questions/${seen.get(slug)}/${slug}`);
    seen.set(slug, dir);
    if (!QUESTION_KINDS.includes(data.kind)) {
      problems.push(`${at}: kind must be one of ${QUESTION_KINDS.join(", ")}`);
      continue;
    }
    const technical = data.kind === "technical";
    if (technical !== (dir === "technical")) problems.push(`${at}: ${data.kind} questions go in questions/${technical ? "technical" : "behavioral"}/`);
    const allowed = technical ? TECHNICAL_KEYS : BEHAVIORAL_KEYS;
    const extra = Object.keys(data).filter((k) => !allowed.has(k) && !(k === "page" && !technical));
    if (extra.length) problems.push(`${at}: unknown field(s) ${extra.join(", ")}`);
    if (!technical && Object.hasOwn(data, "page")) problems.push(`${at}: page is only for technical questions`);
    if (blank(data.prompt)) problems.push(`${at}: prompt must not be blank`);
    const levels = data.levels;
    if (typeof levels !== "object" || levels === null || Array.isArray(levels)) {
      problems.push(`${at}: levels must have weak, adequate and strong`);
    } else {
      for (const k of LEVEL_KEYS) if (blank(levels[k])) problems.push(`${at}: levels.${k} must not be blank`);
      const extraLevels = Object.keys(levels).filter((k) => !LEVEL_KEYS.includes(k));
      if (extraLevels.length) problems.push(`${at}: unknown level(s) ${extraLevels.join(", ")}`);
    }
    const src = data.source;
    if (typeof src !== "object" || src === null || blank(src.label) || !isURL(src.url)) {
      problems.push(`${at}: source needs a label and an http(s) url`);
    } else {
      const extraSrc = Object.keys(src).filter((k) => !SOURCE_KEYS.has(k));
      if (extraSrc.length) problems.push(`${at}: unknown source field(s) ${extraSrc.join(", ")}`);
    }
    if (!STATUSES.includes(data.status)) problems.push(`${at}: status must be one of ${STATUSES.join(", ")}`);
    if (technical) {
      if (!TOPICS.includes(data.topic)) problems.push(`${at}: topic must be one of ${TOPICS.join(", ")}`);
      if (!TIERS.includes(data.tier)) problems.push(`${at}: tier must be one of ${TIERS.join(", ")}`);
      if (!Array.isArray(data.keyPoints) || data.keyPoints.length === 0 || data.keyPoints.some(blank)) {
        problems.push(`${at}: keyPoints needs at least one non-blank item`);
      }
      if (!Array.isArray(data.skills) || data.skills.length < 1 || data.skills.length > MAX_SKILLS) {
        problems.push(`${at}: skills needs 1 to ${MAX_SKILLS} items`);
      } else {
        for (const s of data.skills) if (!skillNames.has(s)) problems.push(`${at}: "${s}" is not in skills.json`);
        if (new Set(data.skills).size !== data.skills.length) problems.push(`${at}: skills must not repeat`);
      }
      // The app serves in_progress and done questions, so they need their page; todo is still a draft.
      if (Object.hasOwn(data, "page")) problems.push(...validatePage(data.page, at));
      else if (SERVED.includes(data.status)) problems.push(`${at}: ${data.status} questions need a page`);
    } else {
      if (!THEMES.includes(data.theme)) problems.push(`${at}: theme must be one of ${THEMES.join(", ")}`);
      const lps = data.leadershipPrinciples;
      if (!Array.isArray(lps)) problems.push(`${at}: leadershipPrinciples must be a list (can be empty)`);
      else for (const lp of lps) if (!LEADERSHIP_PRINCIPLES.includes(lp)) problems.push(`${at}: "${lp}" is not one of Amazon's Leadership Principles`);
    }
  }
  return problems;
}

// ---------------------------------------------------------------------------
// Page versions: the fixed-answer form of a technical question that Challenge grades
// on the page. Same rules as the app's format.go (validatePage / NormalizeAnswer) —
// change both together, and keep the test case names identical.

export const PAGE_TYPES = ["choose", "multi", "truefalse", "lines", "fill", "codefill", "order", "match", "sort", "table", "figure"];
export const LOCALES = ["zh-Hant", "ja"];
// One Challenge page round is 5 questions, so a topic × tier needs 5 page-usable ones.
export const MIN_PAGE_PER_TIER = 5;
// Statuses whose questions (and topic intros) the app serves. A technical question in one of
// these must carry a page.
const SERVED = ["in_progress", "done"];
const PAGE_COMMON_KEYS = ["type", "prompt", "hint", "why", "concept", "i18n"];
const PAGE_TYPE_KEYS = {
  choose: ["options", "answer", "block", "code"],
  multi: ["options", "answers"],
  truefalse: ["statement", "isTrue", "reasons", "reason"],
  lines: ["lines", "answer"],
  fill: ["before", "after", "accept", "show"],
  codefill: ["source", "accept", "show"],
  order: ["items", "code"],
  match: ["pairs"],
  sort: ["buckets", "items"],
  table: ["head", "rows"],
  figure: ["kind", "tokens", "weights", "row", "answer"],
};
const CONCEPT_KEYS = ["title", "body"];
const SORT_ITEM_KEYS = ["text", "bucket"];
const TABLE_FIXED_KEYS = ["label", "value"];
const TABLE_FILL_KEYS = ["label", "pre", "post", "accept", "show"];
// Fields a translation may override, per type. Code, lines and figures are never translated.
const I18N_COMMON = ["prompt", "hint", "why", "concept"];
const I18N_TYPE_KEYS = {
  choose: ["options"],
  multi: ["options"],
  truefalse: ["statement", "reasons"],
  fill: ["before", "after"],
  order: ["items"], // not when code: true
  sort: ["buckets", "items"],
  match: ["pairs"],
  table: ["head", "rows"],
};
const BLANK_MARK = "___";

const isObject = (v) => typeof v === "object" && v !== null && !Array.isArray(v);

/**
 * The form a typed answer is compared in (fill, codefill and table cells): Unicode NFKC,
 * lower case, every whitespace character removed (\s, which includes the full-width space),
 * then one trailing ";" removed. Nothing else changes — "_", "," and "√" stay, so every accepted
 * spelling is listed in accept. The app's NormalizeAnswer is the same function.
 */
export function normalizeAnswer(s) {
  // Lowercase per code point so there is no final-sigma context (AΣ -> aσ, same as Go). The
  // removed whitespace set is JS's \s (it includes U+FEFF, not U+0085); Go lists the same set.
  // Known gap: "İ" (U+0130) lowercases to "i̇" here but "i" in Go; do not put it in an answer.
  const out = Array.from(String(s).normalize("NFKC"), (c) => c.toLowerCase()).join("").replace(/\s/gu, "");
  return out.endsWith(";") ? out.slice(0, -1) : out;
}

/** A technical question the app can serve as a page: in progress or done, with a page. */
export function pageUsable(q) {
  return q.kind === "technical" && SERVED.includes(q.status) && isObject(q.page);
}

/** Validate a question's page object. `at` names the file; every problem starts with it. */
export function validatePage(page, at) {
  const problems = [];
  const bad = (msg) => problems.push(`${at}: page${msg}`);
  if (!isObject(page)) {
    bad(" must be an object");
    return problems;
  }
  const type = page.type;
  const known = PAGE_TYPES.includes(type);
  if (!known) bad(`.type must be one of ${PAGE_TYPES.join(", ")}`);
  else {
    const allowed = [...PAGE_COMMON_KEYS, ...PAGE_TYPE_KEYS[type]];
    const extra = Object.keys(page).filter((k) => !allowed.includes(k));
    if (extra.length) bad(`: unknown field(s) ${extra.join(", ")}`);
  }

  // Common fields.
  if (type === "fill" && !Object.hasOwn(page, "prompt")) {
    // A fill question's sentence can be the whole prompt.
  } else if (blank(page.prompt)) bad(".prompt must not be blank");
  if (blank(page.hint)) bad(".hint must not be blank");
  if (blank(page.why)) bad(".why must not be blank");
  if (!isObject(page.concept)) bad(".concept needs a title and a body");
  else {
    keysIn(page.concept, CONCEPT_KEYS, ".concept", bad);
    for (const k of CONCEPT_KEYS) if (blank(page.concept[k])) bad(`.concept.${k} must not be blank`);
  }
  if (!known) return problems;

  const list = (key, min, max, { unique = true, nonBlank = true } = {}) => strings(page[key], `.${key}`, min, max, bad, { unique, nonBlank });
  const index = (key, n, where = page, name = `.${key}`) => checkIndex(where, key, n, name, bad);
  const optionalBool = (key) => {
    if (Object.hasOwn(page, key) && typeof page[key] !== "boolean") bad(`.${key} must be true or false`);
  };

  switch (type) {
    case "choose": {
      const n = list("options", 2, 6);
      index("answer", n);
      if (Object.hasOwn(page, "block") && blank(page.block)) bad(".block must not be blank when present");
      optionalBool("code");
      break;
    }
    case "multi": {
      const n = list("options", 3, 8);
      const answers = page.answers;
      if (!Array.isArray(answers) || answers.length === 0) bad(".answers needs at least one index");
      else {
        if (n !== undefined && answers.length >= n) bad(".answers must leave at least one option unpicked");
        if (new Set(answers).size !== answers.length) bad(".answers must not repeat");
        for (const a of answers) if (!validIndex(a, n)) bad(`.answers: ${JSON.stringify(a)} is not an option index`);
      }
      break;
    }
    case "truefalse": {
      if (blank(page.statement)) bad(".statement must not be blank");
      if (!Object.hasOwn(page, "isTrue")) bad(".isTrue is missing");
      else if (typeof page.isTrue !== "boolean") bad(".isTrue must be true or false");
      const n = list("reasons", 2, 5);
      index("reason", n);
      break;
    }
    case "lines": {
      const n = list("lines", 2, 12, { unique: false });
      index("answer", n);
      break;
    }
    case "fill": {
      for (const k of ["before", "after"]) {
        if (Object.hasOwn(page, k) && typeof page[k] !== "string") bad(`.${k} must be a string`);
      }
      if (blank(page.before) && blank(page.after)) bad(".before or .after must not be blank");
      checkAnswers(page, "", bad);
      break;
    }
    case "codefill": {
      const n = list("source", 2, 15, { unique: false, nonBlank: false });
      if (n !== undefined) {
        const marked = page.source.filter((line) => line.includes(BLANK_MARK));
        if (marked.length !== 1 || marked[0].split(BLANK_MARK).length !== 2) {
          bad(`.source must have exactly one ${BLANK_MARK}, on one line`);
        }
      }
      checkAnswers(page, "", bad);
      break;
    }
    case "order":
      list("items", 3, 7);
      optionalBool("code");
      break;
    case "match": {
      const pairs = page.pairs;
      if (!Array.isArray(pairs) || pairs.length < 3 || pairs.length > 6) bad(".pairs must have 3 to 6 pairs");
      else if (!pairs.every((p) => Array.isArray(p) && p.length === 2 && p.every((s) => !blank(s)))) {
        bad(".pairs must each be two non-blank strings");
      } else {
        if (new Set(pairs.map((p) => p[0])).size !== pairs.length) bad(".pairs: left side must not repeat");
        if (new Set(pairs.map((p) => p[1])).size !== pairs.length) bad(".pairs: right side must not repeat");
      }
      break;
    }
    case "sort": {
      const n = list("buckets", 2, 4);
      const items = page.items;
      if (!Array.isArray(items) || items.length < 3 || items.length > 8) {
        bad(".items must have 3 to 8 items");
        break;
      }
      const used = new Set();
      items.forEach((it, i) => {
        const where = `.items[${i}]`;
        if (!isObject(it)) {
          bad(`${where} must be {text, bucket}`);
          return;
        }
        keysIn(it, SORT_ITEM_KEYS, where, bad);
        if (blank(it.text)) bad(`${where}.text must not be blank`);
        if (checkIndex(it, "bucket", n, `${where}.bucket`, bad)) used.add(it.bucket);
      });
      const texts = items.filter(isObject).map((it) => it.text);
      if (new Set(texts).size !== texts.length) bad(".items: text must not repeat");
      if (n !== undefined) for (let b = 0; b < n; b++) if (!used.has(b)) bad(`.buckets: "${page.buckets[b]}" has no item`);
      break;
    }
    case "table": {
      if (!Array.isArray(page.head) || page.head.length !== 2 || page.head.some(blank)) bad(".head must be two non-blank strings");
      const rows = page.rows;
      if (!Array.isArray(rows) || rows.length < 2 || rows.length > 6) {
        bad(".rows must have 2 to 6 rows");
        break;
      }
      let fills = 0;
      rows.forEach((row, i) => {
        const where = `.rows[${i}]`;
        if (!isObject(row)) {
          bad(`${where} must be an object`);
          return;
        }
        if (blank(row.label)) bad(`${where}.label must not be blank`);
        const fixed = Object.hasOwn(row, "value");
        const fill = ["pre", "post", "accept", "show"].some((k) => Object.hasOwn(row, k));
        if (fixed && fill) {
          bad(`${where} is either a fixed cell (value) or a cell to fill (pre, post, accept, show), not both`);
          return;
        }
        if (!fixed && !fill) {
          bad(`${where} needs a value or accept and show`);
          return;
        }
        if (fixed) {
          keysIn(row, TABLE_FIXED_KEYS, where, bad);
          if (blank(row.value)) bad(`${where}.value must not be blank`);
          return;
        }
        fills++;
        keysIn(row, TABLE_FILL_KEYS, where, bad);
        for (const k of ["pre", "post"]) {
          if (Object.hasOwn(row, k) && typeof row[k] !== "string") bad(`${where}.${k} must be a string`);
        }
        checkAnswers(row, where, bad);
      });
      if (fills === 0) bad(".rows needs at least one cell to fill");
      break;
    }
    case "figure": {
      if (page.kind !== "attention") bad('.kind must be "attention"');
      const n = list("tokens", 2, 10, { unique: false });
      const w = page.weights;
      const square =
        n !== undefined &&
        Array.isArray(w) &&
        w.length === n &&
        w.every((r) => Array.isArray(r) && r.length === n);
      if (!square) bad(".weights must be n × n, n = the number of tokens");
      else if (!w.every((r) => r.every((x) => typeof x === "number" && Number.isFinite(x) && x >= 0 && x <= 1))) {
        bad(".weights must each be a number from 0 to 1");
      }
      const rowOK = index("row", n);
      const answerOK = index("answer", n);
      if (square && rowOK && answerOK) {
        const r = w[page.row];
        const max = Math.max(...r);
        if (r[page.answer] !== max || r.filter((x) => x === max).length !== 1) {
          bad(".answer must be the single largest weight in weights[row]");
        }
      }
      break;
    }
  }

  if (Object.hasOwn(page, "i18n")) checkPageI18n(page, bad);
  return problems;
}

function keysIn(obj, allowed, where, bad) {
  const extra = Object.keys(obj).filter((k) => !allowed.includes(k));
  if (extra.length) bad(`${where}: unknown field(s) ${extra.join(", ")}`);
}

// A list of strings with min..max items. Returns its length when valid, undefined otherwise,
// so index checks against it are skipped rather than reported twice.
function strings(v, name, min, max, bad, { unique = true, nonBlank = true } = {}) {
  if (!Array.isArray(v) || v.length < min || v.length > max) {
    bad(`${name} must have ${min} to ${max} items`);
    return undefined;
  }
  if (v.some((s) => typeof s !== "string")) {
    bad(`${name} must be strings`);
    return undefined;
  }
  let ok = true;
  if (nonBlank && v.some(blank)) {
    bad(`${name} must not have blank items`);
    ok = false;
  }
  if (unique && new Set(v).size !== v.length) {
    bad(`${name} must not repeat`);
    ok = false;
  }
  return ok ? v.length : undefined;
}

const validIndex = (i, n) => Number.isInteger(i) && i >= 0 && (n === undefined || i < n);

// An index must be written out: 0 is a real answer, so a missing key is never read as 0.
function checkIndex(obj, key, n, name, bad) {
  if (!Object.hasOwn(obj, key)) {
    bad(`${name} is missing`);
    return false;
  }
  if (!validIndex(obj[key], n)) {
    bad(`${name} must be an index into the list`);
    return false;
  }
  return n !== undefined;
}

// accept and show of a fill, codefill or table cell.
function checkAnswers(obj, where, bad) {
  const accept = obj.accept;
  if (!Array.isArray(accept) || accept.length === 0) {
    bad(`${where}.accept needs at least one answer`);
    return;
  }
  if (accept.some(blank)) {
    bad(`${where}.accept must not have blank answers`);
    return;
  }
  const normalized = accept.map(normalizeAnswer);
  if (new Set(normalized).size !== normalized.length) bad(`${where}.accept repeats an answer once normalized`);
  if (blank(obj.show)) bad(`${where}.show must not be blank`);
  else if (!normalized.includes(normalizeAnswer(obj.show))) bad(`${where}.show must be one of accept once normalized`);
}

function checkPageI18n(page, bad) {
  const i18n = page.i18n;
  if (!isObject(i18n)) {
    bad(".i18n must be an object of locales");
    return;
  }
  const type = page.type;
  const translatable = [...I18N_COMMON, ...(I18N_TYPE_KEYS[type] ?? [])].filter(
    (k) => !(type === "order" && k === "items" && page.code === true),
  );
  // English list each translated list must line up with.
  const english = {
    options: page.options,
    reasons: page.reasons,
    items: page.items, // order: the strings; sort: one text per item
    buckets: page.buckets,
    pairs: page.pairs,
    rows: page.rows,
  };
  for (const [locale, t] of Object.entries(i18n)) {
    const at = `.i18n.${locale}`;
    if (!LOCALES.includes(locale)) {
      bad(`.i18n: unknown locale "${locale}" (use ${LOCALES.join(", ")})`);
      continue;
    }
    if (!isObject(t)) {
      bad(`${at} must be an object`);
      continue;
    }
    if (type === "fill" && (Object.hasOwn(t, "before") || Object.hasOwn(t, "after"))) {
      const side = (k) => (Object.hasOwn(t, k) ? t[k] : page[k]);
      if (blank(side("before")) && blank(side("after"))) bad(`${at}: .before or .after must not be blank`);
    }
    for (const [k, v] of Object.entries(t)) {
      const fat = `${at}.${k}`;
      if (!translatable.includes(k)) {
        bad(`${at}: "${k}" is not translatable for type ${type}${type === "order" && k === "items" ? " with code: true" : ""}`);
        continue;
      }
      switch (k) {
        case "prompt": case "hint": case "why": case "statement":
          if (blank(v)) bad(`${fat} must not be blank`);
          break;
        case "before": case "after":
          // May be "": SOV languages put the blank first (or last). Not both, though.
          if (typeof v !== "string") bad(`${fat} must be a string`);
          break;
        case "concept":
          if (!isObject(v)) bad(`${fat} must be {title, body}`);
          else {
            keysIn(v, CONCEPT_KEYS, fat, bad);
            for (const ck of CONCEPT_KEYS) if (Object.hasOwn(v, ck) && blank(v[ck])) bad(`${fat}.${ck} must not be blank`);
          }
          break;
        case "head":
          if (!Array.isArray(v) || v.length !== 2 || v.some(blank)) bad(`${fat} must be two non-blank strings`);
          break;
        case "pairs":
          if (!Array.isArray(v) || !Array.isArray(english.pairs) || v.length !== english.pairs.length) bad(`${fat} must have as many pairs as the English`);
          else if (!v.every((p) => Array.isArray(p) && p.length === 2 && p.every((s) => !blank(s)))) bad(`${fat} must each be two non-blank strings`);
          break;
        default: // options, reasons, items, buckets, rows: one string per English entry
          if (!Array.isArray(v) || !Array.isArray(english[k]) || v.length !== english[k].length) bad(`${fat} must have as many items as the English`);
          else if (v.some(blank)) bad(`${fat} must not have blank items`);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Topic intros: questions/topics/<topic>.json, the "New idea" card for each tier.

const TOPIC_KEYS = ["status", "intros", "i18n"];

/** Validate topic intro files, each { topic (from the file name), status, intros, i18n? }. */
export function validateTopics(topics) {
  const problems = [];
  for (const t of topics) {
    const { topic, ...data } = t;
    const at = `questions/topics/${topic}`;
    const bad = (msg) => problems.push(`${at}: ${msg}`);
    if (!TOPICS.includes(topic)) bad(`file name must be one of ${TOPICS.join(", ")}`);
    const extra = Object.keys(data).filter((k) => !TOPIC_KEYS.includes(k));
    if (extra.length) bad(`unknown field(s) ${extra.join(", ")}`);
    if (!STATUSES.includes(data.status)) bad(`status must be one of ${STATUSES.join(", ")}`);
    if (!isObject(data.intros)) bad(`intros needs ${TIERS.join(", ")}`);
    else {
      for (const tier of TIERS) {
        const intro = data.intros[tier];
        if (!isObject(intro)) {
          bad(`intros.${tier} is missing`);
          continue;
        }
        const ex = Object.keys(intro).filter((k) => !CONCEPT_KEYS.includes(k));
        if (ex.length) bad(`intros.${tier}: unknown field(s) ${ex.join(", ")}`);
        for (const k of CONCEPT_KEYS) if (blank(intro[k])) bad(`intros.${tier}.${k} must not be blank`);
      }
      const exTiers = Object.keys(data.intros).filter((k) => !TIERS.includes(k));
      if (exTiers.length) bad(`intros: unknown tier(s) ${exTiers.join(", ")}`);
    }
    if (Object.hasOwn(data, "i18n")) {
      if (!isObject(data.i18n)) bad("i18n must be an object of locales");
      else {
        for (const [locale, tr] of Object.entries(data.i18n)) {
          if (!LOCALES.includes(locale)) {
            bad(`i18n: unknown locale "${locale}" (use ${LOCALES.join(", ")})`);
            continue;
          }
          if (!isObject(tr)) {
            bad(`i18n.${locale} must be an object`);
            continue;
          }
          for (const [tier, v] of Object.entries(tr)) {
            const fat = `i18n.${locale}.${tier}`;
            if (!TIERS.includes(tier)) {
              bad(`i18n.${locale}: unknown tier "${tier}"`);
              continue;
            }
            if (!isObject(v)) {
              bad(`${fat} must be {title, body}`);
              continue;
            }
            const ex = Object.keys(v).filter((k) => !CONCEPT_KEYS.includes(k));
            if (ex.length) bad(`${fat}: unknown field(s) ${ex.join(", ")}`);
            for (const k of CONCEPT_KEYS) if (Object.hasOwn(v, k) && blank(v[k])) bad(`${fat}.${k} must not be blank`);
          }
        }
      }
    }
  }
  return problems;
}

// The topic comes from the file name only; a "topic" key inside the file is a problem.
function readTopicDir(root, problems) {
  const folder = join(root, "questions", "topics");
  if (!existsSync(folder)) return [];
  const out = [];
  for (const file of readdirSync(folder).filter((f) => f.endsWith(".json")).sort()) {
    const topic = file.slice(0, -".json".length);
    const data = readJSON(join(folder, file), `questions/topics/${file}`, problems);
    if (data === undefined) continue;
    if (isObject(data)) {
      if (Object.hasOwn(data, "topic")) problems.push(`questions/topics/${topic}: unknown field(s) topic`);
      const { topic: _t, ...rest } = data;
      out.push({ topic, ...rest });
    } else {
      problems.push(`questions/topics/${topic}: must be an object`);
    }
  }
  return out;
}

/**
 * How many usable technical questions each topic × tier has. Every pair is listed, zero included.
 * count: questions for the AI Mock interview (anything but proposed_removal); page: page-usable ones
 * for the Challenge page round.
 */
export function questionCoverage(questions) {
  const out = [];
  for (const topic of TOPICS) {
    for (const tier of TIERS) {
      const count = questions.filter(
        (q) => q.kind === "technical" && q.topic === topic && q.tier === tier && q.status !== "proposed_removal",
      ).length;
      const page = questions.filter((q) => pageUsable(q) && q.topic === topic && q.tier === tier).length;
      out.push({ topic, tier, count, page });
    }
  }
  return out;
}

/** A correct option longer than this many times the longest distractor can give the answer away. */
export const OPTION_LENGTH_RATIO = 1.2;

/**
 * Slugs of questions whose page has a correct option (English) noticeably longer than every distractor:
 * choose and multi options, truefalse reasons. A warning, not an error — the app does not check it.
 */
export function optionLengthLeaks(questions) {
  const leaks = [];
  for (const q of questions) {
    const p = q.page;
    if (!p || typeof p !== "object") continue;
    let options, correct;
    if (p.type === "choose") [options, correct] = [p.options, [p.answer]];
    else if (p.type === "multi") [options, correct] = [p.options, p.answers];
    else if (p.type === "truefalse") [options, correct] = [p.reasons, [p.reason]];
    else continue;
    if (!Array.isArray(options) || !Array.isArray(correct)) continue;
    const len = (i) => String(options[i] ?? "").length;
    const others = options.map((_, i) => i).filter((i) => !correct.includes(i));
    if (others.length === 0) continue;
    const longest = Math.max(...others.map(len));
    if (correct.some((i) => len(i) > OPTION_LENGTH_RATIO * longest)) leaks.push(q.slug);
  }
  return leaks;
}

/**
 * Read the whole catalog. Returns { skills, entries, paths, companies, questions, topics, problems } — never throws on
 * bad content.
 */
export function loadCatalog(root) {
  const problems = [];
  const skills = readJSON(join(root, "skills.json"), "skills.json", problems) ?? [];
  const entries = readDir(root, "resources", problems);
  const paths = readDir(root, "paths", problems);
  const unordered = readDir(root, "companies", problems);
  const questions = [...readQuestionDir(root, "technical", problems), ...readQuestionDir(root, "behavioral", problems)];
  const topics = readTopicDir(root, problems);
  problems.push(...validateSkills(skills));
  problems.push(...validate(entries, skills));
  problems.push(...validatePaths(paths, entries));
  problems.push(...validateCompanies(unordered, entries, paths));
  problems.push(...validateQuestions(questions, skills));
  problems.push(...validateTopics(topics));
  const orderPath = join(root, COMPANY_ORDER_FILE);
  const order = existsSync(orderPath) ? readJSON(orderPath, COMPANY_ORDER_FILE, problems) : undefined;
  const { companies, problems: orderProblems } = orderCompanies(unordered, order);
  problems.push(...orderProblems);
  return { skills, entries, paths, companies, questions, topics, problems };
}

export const MAX_NOTE_LEN = 160;
function validNote(n) {
  return typeof n === "string" && n !== "" && n.trim() === n && !/[\r\n]/.test(n) && [...n].length <= MAX_NOTE_LEN;
}

/** company-order.json: the order of the Companies row on the Explore page (one slug per company). */
export const COMPANY_ORDER_FILE = "company-order.json";

/**
 * Sort companies by company-order.json. Without the file, keep file-name order.
 * With it, every company must be listed exactly once. Same rules as the app's Go OrderCompanies.
 */
export function orderCompanies(companies, order) {
  if (order === undefined) return { companies, problems: [] };
  if (!Array.isArray(order) || order.some((s) => typeof s !== "string")) {
    return { companies, problems: [`${COMPANY_ORDER_FILE}: must be a list of company slugs`] };
  }
  const problems = [];
  const bySlug = new Map(companies.map((c) => [c.slug, c]));
  const seen = new Set();
  const out = [];
  for (const slug of order) {
    if (seen.has(slug)) problems.push(`${COMPANY_ORDER_FILE}: "${slug}" is listed twice`);
    else if (!bySlug.has(slug)) problems.push(`${COMPANY_ORDER_FILE}: no companies/${slug}.json`);
    else out.push(bySlug.get(slug));
    seen.add(slug);
  }
  for (const c of companies) if (!seen.has(c.slug)) problems.push(`${COMPANY_ORDER_FILE}: "${c.slug}" is missing`);
  return problems.length ? { companies, problems } : { companies: out, problems };
}

/** skills.json: the fixed list every resource picks its skills from. */
export function validateSkills(skills) {
  const problems = [];
  if (!Array.isArray(skills)) return ["skills.json: must be a list"];
  const seen = new Set();
  skills.forEach((s, i) => {
    const at = `skills.json #${i + 1}`;
    unknownKeys(s, SKILL_KEYS, at, problems);
    if (blank(s.name)) problems.push(`${at}: name is required`);
    else if (seen.has(s.name.toLowerCase())) problems.push(`${at}: "${s.name}" is listed twice`);
    else seen.add(s.name.toLowerCase());
    if (typeof s.description !== "string") problems.push(`${at}: description must be a string`);
  });
  return problems;
}

/** paths/*.json: an ordered list of stages, each a list of resource slugs. */
export function validatePaths(paths, entries) {
  const problems = [];
  const bySlug = new Map(entries.map((e) => [e.slug, e]));
  for (const p of paths) {
    const at = `paths/${p.slug}`;
    unknownKeys(p, PATH_KEYS, at, problems);
    if (!SLUG.test(p.slug)) problems.push(`${at}: file name must be lowercase letters, digits and -`);
    if (blank(p.title)) problems.push(`${at}: title is required`);
    if (typeof p.summary !== "string") problems.push(`${at}: summary must be a string`);
    if (!STATUSES.includes(p.status)) problems.push(`${at}: status must be one of ${STATUSES.join(", ")}`);
    const used = new Set();
    const checkStages = (where, stages) => {
      stages.forEach((st, i) => {
        const sat = `${where} stage ${i + 1}`;
        unknownKeys(st, STAGE_KEYS, sat, problems);
        if (blank(st.title)) problems.push(`${sat}: title is required`);
        if (st.passCriteria !== undefined && typeof st.passCriteria !== "string")
          problems.push(`${sat}: passCriteria must be a string`);
        if (!Array.isArray(st.resources) || st.resources.length === 0) {
          problems.push(`${sat}: needs at least one resource`);
          return;
        }
        if (st.extras !== undefined && !Array.isArray(st.extras)) problems.push(`${sat}: extras must be a list`);
        // extras（補充）：想深入再上，不放上白板（app 的 ADR-0047）。跟主課一樣要存在、不能是 feed、不能重複。
        for (const slug of [...st.resources, ...(Array.isArray(st.extras) ? st.extras : [])]) {
          const e = bySlug.get(slug);
          if (!e) problems.push(`${sat}: no resource "${slug}"`);
          else if (e.kind !== "resource") problems.push(`${sat}: "${slug}" is a feed — feeds never finish, so they can't be on a path`);
          if (used.has(slug)) problems.push(`${sat}: "${slug}" is already on this path`);
          used.add(slug);
        }
      });
    };
    if (Array.isArray(p.domains) && p.domains.length > 0) {
      if (Array.isArray(p.stages) && p.stages.length > 0) problems.push(`${at}: use either stages or domains, not both`);
      if (p.color !== undefined) problems.push(`${at}: color is per domain in a world path — put it on each domain`);
      problems.push(...validateWorld(at, p, checkStages));
      continue;
    }
    // 一般路徑的顏色：外框與段落框用同一色（app 的 ADR-0052）。省略＝中性灰。
    if (p.color !== undefined && !WORLD_COLORS.includes(p.color))
      problems.push(`${at}: color must be one of ${WORLD_COLORS.join(", ")}`);
    if (p.links !== undefined) problems.push(`${at}: links are only for world paths (with domains)`);
    if (!Array.isArray(p.stages) || p.stages.length === 0) {
      problems.push(`${at}: needs at least one stage`);
      continue;
    }
    checkStages(at, p.stages);
  }
  return problems;
}

/**
 * 世界路徑（app 的 ADR-0050）：好幾個領域，每個領域自己有段落；領域之間有先後線。
 * 領域名不重複、顏色在色票裡、線的兩端指得到、fromStage 是那個領域的段落、不成環、
 * 去重後的主課不超過免費額度。跟 app 的 internal/catalog/format.go validateWorld 一致。
 */
function validateWorld(at, p, checkStages) {
  const problems = [];
  const stagesOf = new Map();
  p.domains.forEach((d, i) => {
    const dat = `${at} domain "${d.title}"`;
    unknownKeys(d, DOMAIN_KEYS, dat, problems);
    if (blank(d.title)) problems.push(`${at} domain ${i + 1}: title is required`);
    if (stagesOf.has(d.title)) problems.push(`${dat}: duplicate domain title`);
    if (!WORLD_COLORS.includes(d.color)) problems.push(`${dat}: color must be one of ${WORLD_COLORS.join(", ")}`);
    if (d.outline !== undefined && typeof d.outline !== "boolean") problems.push(`${dat}: outline must be true or false`);
    if (!Array.isArray(d.stages) || d.stages.length === 0) {
      problems.push(`${dat}: needs at least one stage`);
      stagesOf.set(d.title, new Set());
      return;
    }
    stagesOf.set(d.title, new Set(d.stages.map((st) => st.title)));
    checkStages(dat, d.stages);
  });
  const next = new Map();
  (Array.isArray(p.links) ? p.links : []).forEach((lk, i) => {
    const lat = `${at} link ${i + 1}`;
    unknownKeys(lk, LINK_KEYS, lat, problems);
    if (!stagesOf.has(lk.from)) problems.push(`${lat}: no domain "${lk.from}"`);
    else if (lk.fromStage !== undefined && !stagesOf.get(lk.from).has(lk.fromStage))
      problems.push(`${lat}: domain "${lk.from}" has no stage "${lk.fromStage}"`);
    if (!stagesOf.has(lk.to)) problems.push(`${lat}: no domain "${lk.to}"`);
    if (lk.from === lk.to) problems.push(`${lat}: can't link a domain to itself`);
    next.set(lk.from, [...(next.get(lk.from) ?? []), lk.to]);
  });
  const state = new Map(); // 1 visiting, 2 done
  const visit = (d) => {
    if (state.get(d) === 1) return true;
    if (state.get(d) === 2) return false;
    state.set(d, 1);
    for (const n of next.get(d) ?? []) if (visit(n)) return true;
    state.set(d, 2);
    return false;
  };
  if (p.domains.some((d) => visit(d.title))) problems.push(`${at}: the links between domains form a cycle`);
  const mains = new Set(p.domains.flatMap((d) => (d.stages ?? []).flatMap((st) => st.resources ?? [])));
  if (mains.size > WORLD_NODE_LIMIT)
    problems.push(`${at}: ${mains.size} main items, over the free limit of ${WORLD_NODE_LIMIT} nodes — the flagship must fit a free board`);
  return problems;
}

// YYYY-MM-DD，而且是真的有那一天（2027-02-30 不行 —— Date.parse 會默默進位到 3 月，app 那邊會拒絕）。
function isDate(s) {
  if (typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

function unknownKeys(obj, allowed, where, problems) {
  for (const k of Object.keys(obj)) {
    if (k !== "slug" && !allowed.includes(k)) problems.push(`${where}: unknown field "${k}"`);
  }
}

export function validate(entries, skills = []) {
  const problems = [];
  const vocabulary = new Map(skills.filter((s) => !blank(s.name)).map((s) => [s.name.toLowerCase(), s.name]));
  const urls = new Map();
  const claim = (url, owner) => {
    const prev = urls.get(url);
    if (prev && prev !== owner) problems.push(`${owner}: url ${url} is already used by ${prev}`);
    else urls.set(url, owner);
  };

  for (const e of entries) {
    const at = e.slug;
    unknownKeys(e, ENTRY_KEYS, at, problems);
    if (!SLUG.test(e.slug)) problems.push(`${at}: file name must be lowercase letters, digits and -`);
    if (blank(e.title)) problems.push(`${at}: title is required`);
    if (!isURL(e.url)) problems.push(`${at}: url must be an http(s) URL`);
    else claim(e.url, at);
    if (!KINDS.includes(e.kind)) problems.push(`${at}: kind must be one of ${KINDS.join(", ")}`);
    if (!STATUSES.includes(e.status)) problems.push(`${at}: status must be one of ${STATUSES.join(", ")}`);
    if (!TYPES.includes(e.type)) problems.push(`${at}: type must be one of ${TYPES.join(", ")}`);
    if (!DIFFICULTIES.includes(e.difficulty))
      problems.push(`${at}: difficulty must be one of ${DIFFICULTIES.map((d) => JSON.stringify(d)).join(", ")}`);
    if (!Number.isInteger(e.durationMinutes) || e.durationMinutes < 0)
      problems.push(`${at}: durationMinutes must be a whole number ≥ 0 (0 = unknown)`);
    for (const k of ["provider", "creator", "language"]) {
      if (typeof e[k] !== "string") problems.push(`${at}: ${k} must be a string (can be empty)`);
    }
    if (!Array.isArray(e.skills) || e.skills.some(blank)) problems.push(`${at}: skills must be a list of names`);
    else {
      if (e.skills.length === 0 || e.skills.length > MAX_SKILLS)
        problems.push(`${at}: needs 1–${MAX_SKILLS} skills (has ${e.skills.length})`);
      const seen = new Set();
      for (const name of e.skills) {
        const canonical = vocabulary.get(name.toLowerCase());
        if (!canonical) problems.push(`${at}: skill "${name}" is not in skills.json`);
        else if (canonical !== name) problems.push(`${at}: write "${canonical}", not "${name}"`);
        if (seen.has(name.toLowerCase())) problems.push(`${at}: skill "${name}" is listed twice`);
        seen.add(name.toLowerCase());
      }
    }

    if (e.tags !== undefined) {
      if (!Array.isArray(e.tags)) problems.push(`${at}: tags must be a list`);
      else {
        for (const t of e.tags) if (!TAGS.includes(t)) problems.push(`${at}: tag "${t}" must be one of ${TAGS.join(", ")}`);
        if (new Set(e.tags).size !== e.tags.length) problems.push(`${at}: a tag is listed twice`);
      }
    }

    // nextCohort：梯次制的課下一梯開課日（YYYY-MM-DD），照官方頁面寫；查不到就不寫。
    if (e.nextCohort !== undefined && !isDate(e.nextCohort))
      problems.push(`${at}: nextCohort must be a date like 2027-01-12`);
    // note: a one-line reminder for learners (e.g. lab compute may cost money). Same rule as the app's Go validNote.
    if (e.note !== undefined && !validNote(e.note))
      problems.push(`${at}: note must be one line, no leading/trailing spaces, at most ${MAX_NOTE_LEN} characters`);
    // links：url（首頁）之外的其他官方連結，例如 GitHub repo。跟 app 的 validLinks 同一個規則。
    if (e.links !== undefined && !validLinks(e.url, e.links))
      problems.push(`${at}: links must be up to 8 full http(s) URLs, no duplicates, none equal to url`);
    const units = e.units ?? [];
    if (units.length > 0 && e.type !== "course") problems.push(`${at}: only type "course" can have units`);
    units.forEach((u, i) => {
      const uat = `${at} unit ${i + 1}`;
      unknownKeys(u, UNIT_KEYS, uat, problems);
      if (blank(u.title)) problems.push(`${uat}: title is required`);
      if (Boolean(u.sourceUrl) !== Boolean(u.sourceKey))
        problems.push(`${uat}: sourceUrl and sourceKey go together`);
      let primaries = 0;
      for (const r of u.resources ?? []) {
        unknownKeys(r, UNIT_RESOURCE_KEYS, uat, problems);
        if (!isURL(r.url)) problems.push(`${uat}: resource url must be an http(s) URL`);
        else claim(r.url, at);
        if (blank(r.title)) problems.push(`${uat}: resource title is required`);
        if (!TYPES.includes(r.type)) problems.push(`${uat}: resource type must be one of ${TYPES.join(", ")}`);
        if (!ROLES.includes(r.role)) problems.push(`${uat}: resource role must be one of ${ROLES.join(", ")}`);
        if (r.role === "primary") primaries++;
      }
      if (primaries > 1) problems.push(`${uat}: at most one primary resource`);
    });
  }
  return problems;
}

function validLinks(primary, links) {
  if (!Array.isArray(links) || links.length > 8) return false;
  const seen = new Set(primary ? [primary] : []);
  for (const l of links) {
    if (typeof l !== "string" || !/^https?:\/\//.test(l) || l.trim() !== l || seen.has(l)) return false;
    seen.add(l);
  }
  return true;
}
