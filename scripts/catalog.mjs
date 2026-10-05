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
const TECHNICAL_KEYS = new Set(["kind", "topic", "tier", "prompt", "keyPoints", "levels", "skills", "source", "status"]);
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
    const extra = Object.keys(data).filter((k) => !allowed.has(k));
    if (extra.length) problems.push(`${at}: unknown field(s) ${extra.join(", ")}`);
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
    } else {
      if (!THEMES.includes(data.theme)) problems.push(`${at}: theme must be one of ${THEMES.join(", ")}`);
      const lps = data.leadershipPrinciples;
      if (!Array.isArray(lps)) problems.push(`${at}: leadershipPrinciples must be a list (can be empty)`);
      else for (const lp of lps) if (!LEADERSHIP_PRINCIPLES.includes(lp)) problems.push(`${at}: "${lp}" is not one of Amazon's Leadership Principles`);
    }
  }
  return problems;
}

/** How many usable technical questions each topic × tier has. Every pair is listed, zero included. */
export function questionCoverage(questions) {
  const out = [];
  for (const topic of TOPICS) {
    for (const tier of TIERS) {
      const count = questions.filter(
        (q) => q.kind === "technical" && q.topic === topic && q.tier === tier && q.status !== "proposed_removal",
      ).length;
      out.push({ topic, tier, count });
    }
  }
  return out;
}

/**
 * Read the whole catalog. Returns { skills, entries, paths, companies, questions, problems } — never throws on
 * bad content.
 */
export function loadCatalog(root) {
  const problems = [];
  const skills = readJSON(join(root, "skills.json"), "skills.json", problems) ?? [];
  const entries = readDir(root, "resources", problems);
  const paths = readDir(root, "paths", problems);
  const unordered = readDir(root, "companies", problems);
  const questions = [...readQuestionDir(root, "technical", problems), ...readQuestionDir(root, "behavioral", problems)];
  problems.push(...validateSkills(skills));
  problems.push(...validate(entries, skills));
  problems.push(...validatePaths(paths, entries));
  problems.push(...validateCompanies(unordered, entries, paths));
  problems.push(...validateQuestions(questions, skills));
  const orderPath = join(root, COMPANY_ORDER_FILE);
  const order = existsSync(orderPath) ? readJSON(orderPath, COMPANY_ORDER_FILE, problems) : undefined;
  const { companies, problems: orderProblems } = orderCompanies(unordered, order);
  problems.push(...orderProblems);
  return { skills, entries, paths, companies, questions, problems };
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
