// Load and validate resources/*.json.
//
// These rules mirror the app's importer (backend/internal/catalog/format.go in the
// AI Learning World app). The app re-validates everything before it syncs, so a file
// that passes here but fails there is a bug in one of the two: change them together.

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const TYPES = ["video", "course", "article", "book", "paper", "docs", "github"];
// "" means unknown: the official page does not state a level, so we do not guess.
export const DIFFICULTIES = ["", "beginner", "intermediate", "advanced"];
export const STATUSES = ["todo", "in_progress", "done"];
export const KINDS = ["resource", "feed"];
export const ROLES = ["primary", "supplementary"];

const ENTRY_KEYS = [
  "title", "url", "kind", "status", "type", "provider", "creator",
  "language", "difficulty", "durationMinutes", "skills", "units",
];
const UNIT_KEYS = [
  "title", "completionCriterion", "durationMinutes", "durationSeconds", "sourceUrl", "sourceKey", "resources",
];
const UNIT_RESOURCE_KEYS = ["title", "url", "type", "role", "provider", "creator", "language"];

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const isURL = (u) => typeof u === "string" && /^https?:\/\//.test(u);
const blank = (s) => typeof s !== "string" || s.trim() === "";

/** Read every resource file. Returns { entries, problems } — never throws on bad content. */
export function loadCatalog(root) {
  const dir = join(root, "resources");
  const files = readdirSync(dir).filter((f) => f.endsWith(".json")).sort();
  const entries = [];
  const problems = [];
  for (const file of files) {
    const slug = file.slice(0, -".json".length);
    let data;
    try {
      data = JSON.parse(readFileSync(join(dir, file), "utf8"));
    } catch (err) {
      problems.push(`${file}: not valid JSON (${err.message})`);
      continue;
    }
    entries.push({ slug, ...data });
  }
  problems.push(...validate(entries));
  return { entries, problems };
}

function unknownKeys(obj, allowed, where, problems) {
  for (const k of Object.keys(obj)) {
    if (k !== "slug" && !allowed.includes(k)) problems.push(`${where}: unknown field "${k}"`);
  }
}

export function validate(entries) {
  const problems = [];
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
