// Run: node --test scripts/
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadCatalog, validateQuestions, questionCoverage, MIN_PER_TIER } from "./catalog.mjs";

const skills = [{ name: "LLMs", description: "Large language models." }];

function technical(over = {}) {
  return {
    kind: "technical",
    topic: "inference-gpu",
    tier: "mechanism",
    prompt: "What is the KV cache, and what are its memory implications at scale?",
    keyPoints: ["Caches K and V per layer", "Memory grows with sequence length and batch"],
    levels: { weak: "Names it only.", adequate: "Explains what is cached.", strong: "Derives the formula." },
    skills: ["LLMs"],
    source: { label: "Publicly reported interview experiences", url: "https://github.com/pallavi-shekhar/ai-engineering-interview-questions-company-wise" },
    status: "todo",
    ...over,
  };
}

function behavioral(over = {}) {
  return {
    kind: "behavioral",
    theme: "failure",
    leadershipPrinciples: ["Ownership"],
    prompt: "Tell me about a time you made a mistake.",
    levels: { weak: "A disguised success.", adequate: "Says what went wrong and the fix.", strong: "Shows what changed afterwards, with evidence." },
    source: { label: "Tech Interview Handbook", url: "https://www.techinterviewhandbook.org/behavioral-interview-questions/" },
    status: "todo",
    ...over,
  };
}

const q = (slug, dir, data) => ({ slug, dir, ...data });

test("valid technical and behavioral questions pass", () => {
  assert.deepEqual(validateQuestions([q("kv-cache", "technical", technical()), q("a-mistake", "behavioral", behavioral())], skills), []);
});

test("every technical rule is enforced", () => {
  const cases = {
    "bad slug": [q("KV_cache", "technical", technical())],
    "wrong folder": [q("kv", "behavioral", technical())],
    "unknown topic": [q("kv", "technical", technical({ topic: "coding" }))],
    "unknown tier": [q("kv", "technical", technical({ tier: "easy" }))],
    "blank prompt": [q("kv", "technical", technical({ prompt: " " }))],
    "no key points": [q("kv", "technical", technical({ keyPoints: [] }))],
    "blank key point": [q("kv", "technical", technical({ keyPoints: ["ok", " "] }))],
    "missing level": [q("kv", "technical", technical({ levels: { weak: "a", adequate: "b" } }))],
    "no skills": [q("kv", "technical", technical({ skills: [] }))],
    "unknown skill": [q("kv", "technical", technical({ skills: ["Cooking"] }))],
    "too many skills": [q("kv", "technical", technical({ skills: ["LLMs", "LLMs", "LLMs", "LLMs"] }))],
    "theme on technical": [q("kv", "technical", technical({ theme: "failure" }))],
    "bad source url": [q("kv", "technical", technical({ source: { label: "x", url: "github.com" } }))],
    "blank source label": [q("kv", "technical", technical({ source: { label: "", url: "https://example.com" } }))],
    "bad status": [q("kv", "technical", technical({ status: "ready" }))],
    "unknown key": [q("kv", "technical", technical({ askedAt: ["OpenAI"] }))],
    "unknown kind": [q("kv", "technical", technical({ kind: "coding" }))],
    "repeated skill": [q("kv", "technical", technical({ skills: ["LLMs", "LLMs"] }))],
  };
  for (const [name, input] of Object.entries(cases)) {
    assert.ok(validateQuestions(input, skills).length > 0, `${name} should be a problem`);
  }
});

test("every behavioral rule is enforced", () => {
  const cases = {
    "unknown theme": [q("m", "behavioral", behavioral({ theme: "teamwork" }))],
    "unknown principle": [q("m", "behavioral", behavioral({ leadershipPrinciples: ["Be Nice"] }))],
    "topic on behavioral": [q("m", "behavioral", behavioral({ topic: "rag" }))],
    "key points on behavioral": [q("m", "behavioral", behavioral({ keyPoints: ["x"] }))],
    "tier on behavioral": [q("m", "behavioral", behavioral({ tier: "boss" }))],
    "skills on behavioral": [q("m", "behavioral", behavioral({ skills: ["LLMs"] }))],
    "situational in technical folder": [q("m", "technical", behavioral({ kind: "situational" }))],
  };
  for (const [name, input] of Object.entries(cases)) {
    assert.ok(validateQuestions(input, skills).length > 0, `${name} should be a problem`);
  }
  assert.deepEqual(validateQuestions([q("m", "behavioral", behavioral({ kind: "situational", leadershipPrinciples: [] }))], skills), []);
});

test("a slug or dir key inside a question file is a problem, and the file name wins", () => {
  const dir = mkdtempSync(join(tmpdir(), "cat-"));
  mkdirSync(join(dir, "questions/technical"), { recursive: true });
  writeFileSync(join(dir, "questions/technical/real.json"), JSON.stringify(technical({ slug: "other" })));
  writeFileSync(join(dir, "questions/technical/real2.json"), JSON.stringify(technical({ dir: "behavioral" })));
  const cat = loadCatalog(dir);
  assert.ok(cat.problems.some((p) => p.includes("questions/technical/real") && p.includes("slug")));
  assert.ok(cat.problems.some((p) => p.includes("questions/technical/real2") && p.includes("dir")));
  assert.deepEqual(cat.questions.map((x) => x.slug), ["real", "real2"]);
});

test("a slug can't be used in both folders", () => {
  const p = validateQuestions([q("same", "technical", technical()), q("same", "behavioral", behavioral())], skills);
  assert.ok(p.some((s) => s.includes("same")));
});

test("coverage counts technical questions per topic and tier, ignoring proposed removals", () => {
  const cov = questionCoverage([
    q("a", "technical", technical()),
    q("b", "technical", technical()),
    q("c", "technical", technical({ status: "proposed_removal" })),
    q("d", "behavioral", behavioral()),
  ]);
  assert.deepEqual(cov.find((c) => c.topic === "inference-gpu" && c.tier === "mechanism"), { topic: "inference-gpu", tier: "mechanism", count: 2 });
  assert.equal(cov.find((c) => c.topic === "rag" && c.tier === "boss").count, 0);
  assert.equal(cov.length, 10 * 4);
  assert.equal(MIN_PER_TIER, 3);
});

test("loadCatalog reads questions and tolerates a catalog without them", () => {
  const root = mkdtempSync(join(tmpdir(), "catalog-"));
  const write = (rel, v) => {
    mkdirSync(join(root, rel, ".."), { recursive: true });
    writeFileSync(join(root, rel), JSON.stringify(v));
  };
  write("skills.json", skills);
  write("resources/r.json", {
    title: "R", url: "https://example.com/r", kind: "resource", status: "todo", type: "article",
    provider: "X", creator: "", language: "en", difficulty: "", durationMinutes: 0, skills: ["LLMs"],
  });
  let cat = loadCatalog(root);
  assert.deepEqual(cat.questions, []);
  assert.deepEqual(cat.problems, []);

  write("questions/technical/kv-cache.json", technical());
  write("questions/behavioral/a-mistake.json", behavioral());
  cat = loadCatalog(root);
  assert.deepEqual(cat.problems, []);
  assert.deepEqual(cat.questions.map((x) => [x.dir, x.slug]), [["technical", "kv-cache"], ["behavioral", "a-mistake"]]);
});
