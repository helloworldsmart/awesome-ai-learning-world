// Run: node --test scripts/
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  loadCatalog, validateQuestions, questionCoverage, MIN_PER_TIER,
  validatePage, normalizeAnswer, TOPICS, pageUsable, validateTopics, PAGE_TYPES, LOCALES, MIN_PAGE_PER_TIER, optionLengthLeaks,
} from "./catalog.mjs";

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
  assert.deepEqual(cov.find((c) => c.topic === "inference-gpu" && c.tier === "mechanism"), { topic: "inference-gpu", tier: "mechanism", count: 2, page: 0 });
  assert.equal(cov.find((c) => c.topic === "rag" && c.tier === "boss").count, 0);
  assert.equal(cov.length, 27 * 4);
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

// ---------------------------------------------------------------------------
// Page versions (questions/technical/<slug>.json "page") and topic intros.
// Task 2 in the app mirrors every case below in format_test.go under the same name.

const common = {
  prompt: "Pick one.",
  hint: "Think about what grows with the sequence.",
  why: "K and V are reused by every later token.",
  concept: { title: "KV cache", body: "Keys and values of past tokens are kept so they are not recomputed." },
};

// One minimal valid page of every type.
const PAGES = {
  choose: { type: "choose", ...common, options: ["Q", "K and V", "Logits"], answer: 1, block: "x = 1", code: false },
  multi: { type: "multi", ...common, options: ["A", "B", "C", "D"], answers: [0, 2] },
  truefalse: { type: "truefalse", ...common, statement: "The KV cache stores queries.", isTrue: false, reasons: ["Queries are not reused", "It stores logits"], reason: 0 },
  lines: { type: "lines", ...common, lines: ["x = model(x)", "loss.backward()", "opt.step()"], answer: 0 },
  fill: { type: "fill", ...common, before: "Attention divides by sqrt(", after: ")", accept: ["d_k", "dk"], show: "d_k" },
  codefill: { type: "codefill", ...common, source: ["loss = crit(out, y)", "___", "opt.step()"], accept: ["loss.backward()"], show: "loss.backward()" },
  order: { type: "order", ...common, items: ["Tokenize", "Embed", "Attend"], code: false },
  match: { type: "match", ...common, pairs: [["Q", "query"], ["K", "key"], ["V", "value"]] },
  sort: { type: "sort", ...common, buckets: ["Train", "Inference"], items: [{ text: "Backprop", bucket: 0 }, { text: "KV cache", bucket: 1 }, { text: "Dropout", bucket: 0 }] },
  table: {
    type: "table", ...common, head: ["Quantity", "Value"],
    rows: [{ label: "Layers", value: "32" }, { label: "Bytes", pre: "", post: " GB", accept: ["16", "16.0"], show: "16" }],
  },
  figure: { type: "figure", ...common, kind: "attention", tokens: ["the", "cat", "sat"], weights: [[0.1, 0.8, 0.1], [0.2, 0.2, 0.6], [0.3, 0.3, 0.4]], row: 0, answer: 1 },
};

const clone = (v) => JSON.parse(JSON.stringify(v));
// A technical question in progress carrying a page of the given type, edited by fn.
function withPage(type, fn = () => {}, over = {}) {
  const page = clone(PAGES[type]);
  fn(page);
  return q("kv", "technical", technical({ status: "in_progress", page, ...over }));
}

test("valid page of every type passes", () => {
  assert.deepEqual(Object.keys(PAGES).sort(), [...PAGE_TYPES].sort());
  for (const type of PAGE_TYPES) {
    assert.deepEqual(validateQuestions([withPage(type)], skills), [], `${type} should pass`);
    assert.deepEqual(validatePage(PAGES[type], "x"), [], `${type} should pass validatePage`);
  }
});

test("todo without page passes", () => {
  assert.deepEqual(validateQuestions([q("kv", "technical", technical({ status: "todo" }))], skills), []);
});

test("in_progress with page passes", () => {
  assert.deepEqual(validateQuestions([withPage("choose")], skills), []);
});

test("fill without prompt passes", () => {
  assert.deepEqual(validateQuestions([withPage("fill", (p) => delete p.prompt)], skills), []);
});

const PAGE_CASES = {
  "in_progress without page": q("kv", "technical", technical({ status: "in_progress" })),
  "page on behavioral": q("m", "behavioral", behavioral({ page: clone(PAGES.choose) })),
  "unknown page type": withPage("choose", (p) => (p.type = "essay")),
  "unknown page key": withPage("choose", (p) => (p.items = ["a", "b", "c"])),
  "blank hint": withPage("choose", (p) => (p.hint = " ")),
  "blank why": withPage("choose", (p) => (p.why = "")),
  "concept missing body": withPage("choose", (p) => delete p.concept.body),
  "choose blank prompt": withPage("choose", (p) => (p.prompt = " ")),
  "missing answer index": withPage("choose", (p) => delete p.answer),
  "answer out of range": withPage("choose", (p) => (p.answer = 3)),
  "choose one option": withPage("choose", (p) => { p.options = ["only"]; p.answer = 0; }),
  "choose repeated option": withPage("choose", (p) => (p.options = ["A", "A", "B"])),
  "multi answers all options": withPage("multi", (p) => (p.answers = [0, 1, 2, 3])),
  "multi repeated answer": withPage("multi", (p) => (p.answers = [1, 1])),
  "truefalse missing isTrue": withPage("truefalse", (p) => delete p.isTrue),
  "truefalse reason out of range": withPage("truefalse", (p) => (p.reason = 2)),
  "lines one line": withPage("lines", (p) => { p.lines = ["x = 1"]; p.answer = 0; }),
  "codefill no blank": withPage("codefill", (p) => (p.source = ["a = 1", "b = 2"])),
  "codefill two blanks": withPage("codefill", (p) => (p.source = ["a = ___", "b = ___"])),
  "order two items": withPage("order", (p) => (p.items = ["A", "B"])),
  "order repeated item": withPage("order", (p) => (p.items = ["A", "B", "A"])),
  "match repeated right": withPage("match", (p) => (p.pairs[2][1] = "query")),
  "sort empty bucket": withPage("sort", (p) => p.items.forEach((it) => (it.bucket = 0))),
  "sort bucket out of range": withPage("sort", (p) => (p.items[0].bucket = 2)),
  "table no fill row": withPage("table", (p) => (p.rows = [{ label: "A", value: "1" }, { label: "B", value: "2" }])),
  "table row with value and accept": withPage("table", (p) => (p.rows[1].value = "16")),
  "figure weights not square": withPage("figure", (p) => p.weights.pop()),
  "figure answer not the max": withPage("figure", (p) => (p.answer = 0)),
  "figure answer ties": withPage("figure", (p) => (p.weights[0] = [0.4, 0.4, 0.2])),
  "show not in accept": withPage("fill", (p) => (p.show = "d_model")),
  "accept repeats after normalizing": withPage("fill", (p) => (p.accept = ["d_k", " D_K "])),
  "blank accept": withPage("codefill", (p) => (p.accept = ["loss.backward()", " "])),
  "unknown locale": withPage("choose", (p) => (p.i18n = { fr: { prompt: "Choisissez." } })),
  "i18n key not translatable for type": withPage("lines", (p) => (p.i18n = { "zh-Hant": { lines: ["a", "b", "c"] } })),
  "i18n options length differs": withPage("choose", (p) => (p.i18n = { ja: { options: ["Q", "K と V"] } })),
  "i18n blank string": withPage("choose", (p) => (p.i18n = { "zh-Hant": { hint: " " } })),
  "i18n items on code order": withPage("order", (p) => { p.code = true; p.i18n = { ja: { items: ["a", "b", "c"] } }; }),
  "i18n fill both sides empty": withPage("fill", (p) => (p.i18n = { ja: { before: "", after: "" } })),
  "i18n fill side not a string": withPage("fill", (p) => (p.i18n = { ja: { before: 3 } })),
};

for (const [name, input] of Object.entries(PAGE_CASES)) {
  test(name, () => {
    const problems = validateQuestions([input], skills);
    assert.ok(problems.length > 0, `${name} should be a problem`);
    const path = `questions/${input.dir}/${input.slug}`;
    for (const p of problems) assert.ok(p.startsWith(`${path}:`), `"${p}" should name ${path}`);
  });
}

test("valid i18n of every translatable field passes", () => {
  const pages = [
    withPage("choose", (p) => (p.i18n = { "zh-Hant": { prompt: "選一個", hint: "想想", why: "因為", concept: { title: "KV 快取" }, options: ["Q", "K 和 V", "Logits"] }, ja: {} })),
    withPage("truefalse", (p) => (p.i18n = { ja: { statement: "文", reasons: ["a", "b"] } })),
    withPage("fill", (p) => (p.i18n = { ja: { before: "前", after: "後" } })),
    withPage("order", (p) => (p.i18n = { ja: { items: ["a", "b", "c"] } })),
    withPage("match", (p) => (p.i18n = { ja: { pairs: [["Q", "クエリ"], ["K", "キー"], ["V", "バリュー"]] } })),
    withPage("sort", (p) => (p.i18n = { ja: { buckets: ["学習", "推論"], items: ["a", "b", "c"] } })),
    withPage("table", (p) => (p.i18n = { ja: { head: ["量", "値"], rows: ["層", "バイト"] } })),
  ];
  assert.deepEqual(LOCALES, ["zh-Hant", "ja"]);
  for (const page of pages) assert.deepEqual(validateQuestions([page], skills), [], page.page.type);
});

test("i18n empty fill side allowed", () => {
  // SOV languages put the blank first: the translated before (or after) may be "".
  const pages = [
    withPage("fill", (p) => (p.i18n = { ja: { before: "", after: "で割る。" } })),
    withPage("fill", (p) => (p.i18n = { "zh-Hant": { before: "除以", after: "" } })),
  ];
  for (const page of pages) assert.deepEqual(validateQuestions([page], skills), []);
});

test("normalizeAnswer", () => {
  assert.equal(normalizeAnswer(" D_K "), "d_k");
  assert.equal(normalizeAnswer("loss.backward();"), "loss.backward()");
  assert.equal(normalizeAnswer("１０２４"), "1024");
  assert.equal(normalizeAnswer("a　b"), "ab");
  assert.equal(normalizeAnswer("1,050,624"), "1,050,624");
  assert.equal(normalizeAnswer("a\uFEFFb"), "ab"); // U+FEFF is removed
  assert.equal(normalizeAnswer("a\u0085b"), "a\u0085b"); // U+0085 is kept
  assert.equal(normalizeAnswer("A\u03A3"), "a\u03C3"); // no final sigma
});

test("pageUsable is a technical in_progress or done question with a page", () => {
  assert.equal(pageUsable(withPage("choose")), true);
  assert.equal(pageUsable(withPage("choose", () => {}, { status: "done" })), true);
  assert.equal(pageUsable(withPage("choose", () => {}, { status: "todo" })), false);
  assert.equal(pageUsable(withPage("choose", () => {}, { status: "proposed_removal" })), false);
  assert.equal(pageUsable(q("kv", "technical", technical({ status: "in_progress" }))), false);
});

test("coverage counts page-usable questions per topic and tier", () => {
  const cov = questionCoverage([
    withPage("choose"),
    withPage("choose", () => {}, { status: "done" }),
    withPage("choose", () => {}, { status: "todo" }),
    withPage("choose", () => {}, { status: "proposed_removal" }),
  ]);
  const row = cov.find((c) => c.topic === "inference-gpu" && c.tier === "mechanism");
  assert.deepEqual(row, { topic: "inference-gpu", tier: "mechanism", count: 3, page: 2 });
  assert.equal(MIN_PAGE_PER_TIER, 5);
});

// Topic intros: questions/topics/<topic>.json.
function topicFile(over = {}) {
  return {
    topic: "rag",
    status: "todo",
    intros: {
      concept: { title: "Retrieval", body: "Fetch passages, then answer from them." },
      mechanism: { title: "Chunks", body: "Documents are split and embedded." },
      "trade-off": { title: "Recall vs. noise", body: "More passages help recall but add noise." },
      boss: { title: "End to end", body: "Design and evaluate a full pipeline." },
    },
    i18n: { "zh-Hant": { concept: { title: "檢索" } }, ja: {} },
    ...over,
  };
}

test("valid topic file passes", () => {
  assert.deepEqual(validateTopics([topicFile()]), []);
  const { i18n: _i, ...noI18n } = topicFile();
  assert.deepEqual(validateTopics([noI18n]), []);
});

const TOPIC_CASES = {
  "topic file name not a topic": topicFile({ topic: "coding" }),
  "intros missing tier": topicFile({ intros: { ...topicFile().intros, boss: undefined } }),
  "intro blank title": topicFile({ intros: { ...topicFile().intros, concept: { title: " ", body: "x" } } }),
  "unknown topic key": topicFile({ order: 1 }),
  "topic i18n unknown tier": topicFile({ i18n: { ja: { easy: { title: "x" } } } }),
};

for (const [name, input] of Object.entries(TOPIC_CASES)) {
  test(name, () => {
    const clean = JSON.parse(JSON.stringify(input));
    const problems = validateTopics([clean]);
    assert.ok(problems.length > 0, `${name} should be a problem`);
    for (const p of problems) assert.ok(p.startsWith(`questions/topics/${clean.topic}:`), `"${p}" should name the file`);
  });
}

test("loadCatalog reads topic intros and tolerates a catalog without them", () => {
  const root = mkdtempSync(join(tmpdir(), "catalog-"));
  const write = (rel, v) => {
    mkdirSync(join(root, rel, ".."), { recursive: true });
    writeFileSync(join(root, rel), JSON.stringify(v));
  };
  write("skills.json", skills);
  let cat = loadCatalog(root);
  assert.deepEqual(cat.topics, []);

  const { topic: _t, ...rag } = topicFile();
  write("questions/topics/rag.json", rag);
  write("questions/topics/cooking.json", rag);
  write("questions/topics/agents.json", { ...rag, topic: "rag" });
  cat = loadCatalog(root);
  assert.deepEqual(cat.topics.map((t) => t.topic), ["agents", "cooking", "rag"]);
  assert.deepEqual(cat.topics.find((t) => t.topic === "rag").intros, rag.intros);
  assert.ok(cat.problems.some((p) => p.startsWith("questions/topics/cooking:")));
  assert.ok(cat.problems.some((p) => p.startsWith("questions/topics/agents:") && p.includes("topic")));
  assert.ok(!cat.problems.some((p) => p.startsWith("questions/topics/rag:")));
});

test("optionLengthLeaks flags a correct option noticeably longer than every distractor", () => {
  const long = "K and V of every past token, kept so they are not recomputed";
  const flagged = [
    withPage("choose", (p) => { p.options[1] = long; }, {}),
    withPage("multi", (p) => { p.options[0] = long; }),
    withPage("truefalse", (p) => { p.reasons[0] = long; }),
  ].map((x, i) => ({ ...x, slug: `leak-${i}` }));
  assert.deepEqual(optionLengthLeaks(flagged).map((l) => `${l.slug}:${l.locale}:${l.kind}`), ["leak-0:en:longest", "leak-1:en:longest", "leak-2:en:longest"]);

  // Exactly 1.2× is fine; a long distractor is fine; other page types and pageless questions are skipped.
  const ok = [
    withPage("choose", (p) => { p.options = ["aaaaaaaaaa", "bbbbbbbbbbbb"]; p.answer = 1; }),
    withPage("choose", (p) => { p.options[0] = long; }),
    withPage("order"),
    q("kv", "technical", technical()),
  ];
  assert.deepEqual(optionLengthLeaks(ok), []);
});

test("optionLengthLeaks checks every locale and the shortest-answer tell", () => {
  const zh = withPage("choose", (p) => {
    p.options = ["aaaaaaaaaa", "bbbbbbbbbb", "cccccccccc"]; p.answer = 1;
    p.i18n = { "zh-Hant": { options: ["甲乙丙丁", "這個正確答案寫得特別特別長長長長", "丙丁戊己"] } };
  });
  assert.deepEqual(optionLengthLeaks([{ ...zh, slug: "zh" }]), [{ slug: "zh", locale: "zh-Hant", kind: "longest" }]);

  // Characters, not bytes: 4 CJK chars (12 bytes) vs 4-char distractors is not a leak.
  const bytes = withPage("choose", (p) => {
    p.options = ["aaaa", "bbbb", "cccc"]; p.answer = 1;
    p.i18n = { ja: { options: ["あいうえ", "あいうえ", "かきくけ"] } };
  });
  assert.deepEqual(optionLengthLeaks([bytes]), []);

  const ja = withPage("choose", (p) => {
    p.options = ["aaaaaaaaaa", "bbbbbbbbbb", "cccccccccc"]; p.answer = 1;
    p.i18n = { ja: { options: ["あいうえおかきくけこ", "あいう", "さしすせそたちつてと"] } };
  });
  assert.deepEqual(optionLengthLeaks([{ ...ja, slug: "ja" }]), [{ slug: "ja", locale: "ja", kind: "shortest" }]);

  const clean = withPage("multi", (p) => {
    p.options = ["aaaaaaaaaa", "bbbbbbbbbb", "cccccccccc", "dddddddddd"]; p.answers = [0, 2];
    p.i18n = { "zh-Hant": { options: ["甲乙丙丁戊己", "甲乙丙丁戊", "甲乙丙丁戊己庚", "甲乙丙丁戊己庚辛"] }, ja: { options: ["あいうえお", "あいうえおか", "あいうえお", "あいうえおかき"] } };
  });
  assert.deepEqual(optionLengthLeaks([clean]), []);
});

// The 27 curriculum topics. The app repo keeps a byte-identical testdata/curriculum-topics.json and its
// Go tests use the same case names; neither repo reads the other's source.
const CURRICULUM = JSON.parse(readFileSync(new URL("./testdata/curriculum-topics.json", import.meta.url), "utf8")).topics;

test("every curriculum topic is a valid question topic and intro file name", () => {
  assert.equal(CURRICULUM.length, 27);
  assert.deepEqual(TOPICS, CURRICULUM);
  const questions = CURRICULUM.map((topic) => q(`q-${topic}`, "technical", technical({ topic })));
  assert.deepEqual(validateQuestions(questions, skills), []);
  assert.deepEqual(validateTopics(CURRICULUM.map((topic) => topicFile({ topic }))), []);
});

for (const topic of ["python-numpy", "pytorch-basics"]) {
  test(`codefill page in ${topic} is rejected`, () => {
    const problems = validateQuestions([withPage("codefill", () => {}, { topic })], skills);
    assert.ok(problems.some((p) => p.includes("no codefill")), `got ${problems}`);
  });
}

test("codefill page in linear-algebra passes", () => {
  assert.deepEqual(validateQuestions([withPage("codefill", () => {}, { topic: "linear-algebra" })], skills), []);
});
