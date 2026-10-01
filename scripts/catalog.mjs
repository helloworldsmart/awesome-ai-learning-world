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
  "language", "difficulty", "durationMinutes", "skills", "tags", "nextCohort", "units",
];
const UNIT_KEYS = [
  "title", "completionCriterion", "durationMinutes", "durationSeconds", "sourceUrl", "sourceKey", "resources",
];
const UNIT_RESOURCE_KEYS = ["title", "url", "type", "role", "provider", "creator", "language"];
const SKILL_KEYS = ["name", "description"];
const PATH_KEYS = ["title", "summary", "status", "stages", "domains", "links"];
const DOMAIN_KEYS = ["title", "color", "outline", "stages"];
const LINK_KEYS = ["from", "fromStage", "to"];
// 領域色票（app 的 --swatch-<color>，ADR-0051）。
export const WORLD_COLORS = ["green", "teal", "blue", "purple", "rose", "red", "orange", "slate", "gold", "cyan", "brown", "indigo"];
// 世界路徑去重後的主課上限 ＝ app 免費帳號的 node 額度（ADR-0049／0050）：主角要放得進免費白板。
export const WORLD_NODE_LIMIT = 35;
const STAGE_KEYS = ["title", "passCriteria", "resources", "extras"];

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

/**
 * Read the whole catalog. Returns { skills, entries, paths, problems } — never throws on
 * bad content.
 */
export function loadCatalog(root) {
  const problems = [];
  const skills = readJSON(join(root, "skills.json"), "skills.json", problems) ?? [];
  const entries = readDir(root, "resources", problems);
  const paths = readDir(root, "paths", problems);
  problems.push(...validateSkills(skills));
  problems.push(...validate(entries, skills));
  problems.push(...validatePaths(paths, entries));
  return { skills, entries, paths, problems };
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
      problems.push(...validateWorld(at, p, checkStages));
      continue;
    }
    if (p.links !== undefined) problems.push(`${at}: links are only for world paths (with domains)`);
    if (!Array.isArray(p.stages) || p.stages.length === 0) {
      problems.push(`${at}: needs at least one stage`);
      continue;
    }
    checkStages(at, p.stages);
  }
  problems.push(...validateWorldCoverage(paths));
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

/** 世界路徑的主課必須剛好是其他路徑主課的聯集（app 的 ADR-0050 決定四）。 */
function validateWorldCoverage(paths) {
  const problems = [];
  const worlds = paths.filter((p) => Array.isArray(p.domains) && p.domains.length > 0);
  if (worlds.length === 0) return problems;
  const union = new Set(
    paths.filter((p) => !worlds.includes(p)).flatMap((p) => (p.stages ?? []).flatMap((st) => st.resources ?? [])),
  );
  for (const w of worlds) {
    const mains = new Set(w.domains.flatMap((d) => (d.stages ?? []).flatMap((st) => st.resources ?? [])));
    const missing = [...union].filter((s) => !mains.has(s)).sort();
    const extra = [...mains].filter((s) => !union.has(s)).sort();
    if (missing.length) problems.push(`paths/${w.slug}: main items of other paths are missing here: ${missing.join(", ")}`);
    if (extra.length) problems.push(`paths/${w.slug}: these are not a main item of any path: ${extra.join(", ")}`);
  }
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
