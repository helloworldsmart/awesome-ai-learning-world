# Contributing

Thanks for helping. One resource is one JSON file under `resources/`; the README is generated from them.

## Inclusion criteria

A resource is listed only if it meets **all** of these:

1. **Official source.** The link goes to the resource's own official page — the university, the author, the publisher, the official docs, the author's own channel. No reposts, summaries, aggregators or affiliate pages.
2. **Verifiable author.** The author or instructor does research, builds products or teaches in this field, and you can link to their work.
3. **Free, or free to audit.** Paid resources only when they are widely recognized classics (for example a standard textbook), and marked as paid.
4. **Still relevant.** Maintained, or foundational material that is still the standard reference. Classic papers and textbooks are exempt from age; tool tutorials are not — two years without updates while the tool changed a lot is out.
5. **Concepts, not clicks.** It teaches ideas and methods, not just where to click in a tool. No income promises, no fear marketing.
6. **Resource or feed.** Something with a clear end — a course, a book, a paper, a doc set — is `"kind": "resource"`. An ongoing source — a newsletter, a paper feed, a blog — is welcome too, as `"kind": "feed"`; it goes under *Staying Current*. Feeds still have to meet 1–5.

## Adding a resource

1. Create `resources/<slug>.json`. The slug is the title in lowercase ASCII words joined by `-` (for example `cs231n-deep-learning-for-computer-vision`).
2. Fill it in:

```json
{
  "title": "CS231n: Deep Learning for Computer Vision",
  "url": "https://cs231n.stanford.edu/",
  "kind": "resource",
  "status": "todo",
  "type": "course",
  "provider": "Stanford University",
  "creator": "Stanford Vision Lab",
  "language": "en",
  "difficulty": "advanced",
  "durationMinutes": 0,
  "skills": ["Deep Learning", "Computer Vision"]
}
```

| Field | Values |
|---|---|
| `kind` | `resource` · `feed` |
| `status` | always `todo` in a pull request — maintainers move it along |
| `type` | `course` · `book` · `paper` · `docs` · `video` · `article` · `github` |
| `difficulty` | `beginner` · `intermediate` · `advanced`, only if the official page states a level; otherwise `""` (unknown). **Never estimate.** |
| `durationMinutes` | only if the official page states it; otherwise `0` (unknown). **Never estimate.** |
| `skills` | what it teaches: 1–3 names from [`skills.json`](skills.json), e.g. `Deep Learning`. Skills are topics, not tools — a PyTorch tutorial is `Deep Learning`. Need a skill that isn't listed? Propose it in the pull request. |
| `tags` | optional labels: `intro` (a no-code introduction) · `classic` (the classic technical methods). Leave it out if neither fits. |
| `links` | optional: other official links besides `url`, for example the GitHub repo when `url` is the course website. Full URLs, up to 8. Shown next to the homepage link on AI Learning World. |
| `nextCohort` | optional, for courses that run in cohorts: the next start date as `YYYY-MM-DD`, from the official page. Leave it out when unknown. AI Learning World reminds learners before it starts. |
| `units` | courses only: the lectures, each with its `resources` (the video, the paper that goes with it…) |

3. Run the checks and regenerate the README:

```sh
node scripts/check.mjs
node scripts/build-readme.mjs
```

4. Open a pull request with both the JSON file and the updated `README.md`.

## Learning paths

A path is a ready-made route through the catalog: `paths/<slug>.json`, a list of stages, each with the resources to study in order.

```json
{
  "title": "Machine Learning Foundations",
  "summary": "From programming and math to training your first neural network.",
  "status": "todo",
  "color": "slate",
  "stages": [
    {
      "title": "Math",
      "passCriteria": "You can explain vectors, matrices, derivatives and probability in your own words.",
      "resources": ["essence-of-linear-algebra", "essence-of-calculus"]
    }
  ]
}
```

`resources` are file names from `resources/` without `.json`. Only `"kind": "resource"` entries can be on a path. `passCriteria` is optional. `color` is optional: one of `green`, `teal`, `blue`, `purple`, `rose`, `red`, `orange`, `slate`, `gold`, `cyan`, `brown`, `indigo` (leave it out for neutral gray). On AI Learning World each stage becomes a group on the board, laid out left to right.

## Interview questions

Questions for the app's Mock interview and Challenge live in two folders: `questions/technical/<slug>.json` and `questions/behavioral/<slug>.json`. A file name is unique across both folders.

Where questions come from: 375 technical prompts come from [pallavi-shekhar/ai-engineering-interview-questions-company-wise](https://github.com/pallavi-shekhar/ai-engineering-interview-questions-company-wise) (Apache-2.0). Take only the prompt; write `keyPoints` and `levels` yourself and never copy answers. Always fill `source` with where the prompt came from. The README's "Question sources & licenses" section states this, so update `scripts/build-readme.mjs` if the sources change.

Technical:

```json
{
  "kind": "technical",
  "topic": "inference-gpu",
  "tier": "mechanism",
  "prompt": "What is the KV cache, and what are its memory implications at scale?",
  "keyPoints": [
    "Caches K and V per layer",
    "Memory grows with sequence length and batch"
  ],
  "levels": {
    "weak": "Names it only.",
    "adequate": "Explains what is cached.",
    "strong": "Derives the formula."
  },
  "skills": ["LLMs"],
  "source": {
    "label": "Publicly reported interview experiences",
    "url": "https://github.com/pallavi-shekhar/ai-engineering-interview-questions-company-wise"
  },
  "status": "todo"
}
```

Behavioral:

```json
{
  "kind": "behavioral",
  "theme": "failure",
  "leadershipPrinciples": ["Ownership"],
  "prompt": "Tell me about a time you made a mistake.",
  "levels": {
    "weak": "A disguised success.",
    "adequate": "Says what went wrong and the fix.",
    "strong": "Shows what changed afterwards, with evidence."
  },
  "source": {
    "label": "Tech Interview Handbook",
    "url": "https://www.techinterviewhandbook.org/behavioral-interview-questions/"
  },
  "status": "todo"
}
```

| Field | Meaning |
| --- | --- |
| `kind` | `technical` or `behavioral` (`situational` is also allowed, in `behavioral/`). Must match the folder. |
| `topic` | Technical only. One of `llm-internals`, `inference-gpu`, `rag`, `agents`, `fine-tuning`, `evaluation`, `safety`, `multimodal`, `system-design`, `ml-fundamentals`. |
| `tier` | Technical only. One of `concept`, `mechanism`, `trade-off`, `boss`. Each topic × tier needs at least 3 questions before the app opens it (fewer is a warning). |
| `theme` | Behavioral only. One of `conflict`, `failure`, `ownership`, `ambiguity`, `fast-learning`, `influence`. |
| `leadershipPrinciples` | Behavioral only. A list (can be empty) of Amazon's Leadership Principles, spelled as in `companies/amazon.json`. |
| `prompt` | The question as asked. Not blank. |
| `keyPoints` | Technical only. At least one point a good answer covers, written in your own words. |
| `levels` | `weak`, `adequate` and `strong`: what each kind of answer looks like. All three are required. |
| `skills` | Technical only. 1–3 names from `skills.json`, no repeats. |
| `source` | `label` and an `http(s)` `url` for where the question was seen. |
| `status` | `todo`, `in_progress`, `done` or `proposed_removal`, same rules as resources. `in_progress` and `done` technical questions need a `page`. |
| `page` | Technical only. The fixed-answer version for Challenge, see [Page version](#page-version). |

What we don't take:

- No coding questions.
- No company-specific questions.
- No copied answers: write `keyPoints` and `levels` yourself.

### Page version

Challenge grades on the page, with fixed answers, so a technical question can carry a `page`: the same idea asked as something you click or type. Behavioral questions never have one.

- `todo` questions may leave `page` out (it is still being drafted).
- `in_progress` and `done` technical questions **must** have a `page`. The app serves both and scores them the same, so an `in_progress` question goes live on release.
- A question is *page-usable* when it is technical, `in_progress` or `done`, and has a `page`. A topic × tier opens its Challenge page round once it has at least 5 page-usable questions (one round is 5); `node scripts/check.mjs` lists the pairs that don't yet.

Every page has these fields, plus the fields of its `type` — any other key is an error:

| Field | Rule |
| --- | --- |
| `type` | `choose`, `multi`, `truefalse`, `lines`, `fill`, `codefill`, `order`, `match`, `sort`, `table` or `figure`. |
| `prompt` | Not blank. A `fill` page may leave it out. |
| `hint` | Not blank. Points the way without giving the answer. |
| `why` | Not blank. One line on why the answer is right, shown after answering. |
| `concept` | `{ "title", "body" }`, both not blank: the "Show me why" card. |
| `i18n` | Optional translations, see below. |

Indexes (`answer`, `answers`, `reason`, `row`, a sort item's `bucket`) count from 0 and must always be written — `0` is a real answer, so a missing index is an error, never "the first one".

| Type | Fields | Rules |
| --- | --- | --- |
| `choose` | `options`, `answer`, `block` (optional), `code` (optional) | 2–6 options, not blank, no repeats; `answer` is an option index. `block` is a snippet shown above the options (not blank if present); `code: true` shows options as code. |
| `multi` | `options`, `answers` | 3–8 options, not blank, no repeats; at least one answer, fewer answers than options, no repeats, all valid indexes. |
| `truefalse` | `statement`, `isTrue`, `reasons`, `reason` | `statement` not blank; `isTrue` is `true` or `false`; 2–5 reasons, not blank, no repeats; `reason` is the index of the right reason. |
| `lines` | `lines`, `answer` | Spot the bug: 2–12 lines, not blank; `answer` is the index of the wrong line. |
| `fill` | `before`, `after`, `accept`, `show` | At least one of `before` / `after` not blank; answers as below. |
| `codefill` | `source`, `accept`, `show` | 2–15 code lines; exactly one line contains `___`, once. Answers as below. |
| `order` | `items`, `code` (optional) | 3–7 items, not blank, no repeats. **The order in the file is the right order**; the app shuffles. |
| `match` | `pairs` | 3–6 `[left, right]` pairs, not blank; no left repeats, no right repeats. |
| `sort` | `buckets`, `items` | 2–4 buckets, not blank, no repeats; 3–8 items `{ "text", "bucket" }`, text not blank and no repeats, `bucket` a bucket index; every bucket gets at least one item. |
| `table` | `head`, `rows` | `head` is two column titles. 2–6 rows, each with a non-blank `label` and **either** `value` (a fixed cell, not blank) **or** `pre` / `post` (may be empty) with `accept` and `show` (a cell to fill). At least one row is a cell to fill. |
| `figure` | `kind`, `tokens`, `weights`, `row`, `answer` | `kind` is `"attention"`; 2–10 tokens; `weights` is n × n (n = number of tokens), each from 0 to 1; `row` and `answer` are token indexes, and `answer` must be the single largest weight in `weights[row]`. |

**Typed answers** (`fill`, `codefill`, a `table` cell to fill): `accept` lists at least one answer, none blank, and no two the same once normalized; `show` (the answer displayed afterwards) is not blank and, normalized, equals one of `accept`. Normalizing is: Unicode NFKC, lower case, remove all whitespace (including the full-width space), remove one trailing `;`. Nothing else changes, so list every accepted spelling: `["1050624", "1,050,624"]`.

Minimal examples (common fields shortened to `…`):

```json
{ "type": "choose", "prompt": "…", "hint": "…", "why": "…", "concept": { "title": "…", "body": "…" },
  "options": ["Q", "K and V", "Logits"], "answer": 1 }
{ "type": "multi", "…": "…", "options": ["A", "B", "C", "D"], "answers": [0, 2] }
{ "type": "truefalse", "…": "…", "statement": "The KV cache stores queries.", "isTrue": false,
  "reasons": ["Queries are never reused", "It stores logits"], "reason": 0 }
{ "type": "lines", "…": "…", "lines": ["out = model(x)", "opt.step()", "loss.backward()"], "answer": 1 }
{ "type": "fill", "…": "…", "before": "Attention divides by sqrt(", "after": ")", "accept": ["d_k", "dk"], "show": "d_k" }
{ "type": "codefill", "…": "…", "source": ["loss = crit(out, y)", "___", "opt.step()"],
  "accept": ["loss.backward()"], "show": "loss.backward()" }
{ "type": "order", "…": "…", "items": ["Tokenize", "Embed", "Attend"] }
{ "type": "match", "…": "…", "pairs": [["Q", "query"], ["K", "key"], ["V", "value"]] }
{ "type": "sort", "…": "…", "buckets": ["Training", "Inference"],
  "items": [{ "text": "Backprop", "bucket": 0 }, { "text": "KV cache", "bucket": 1 }, { "text": "Dropout", "bucket": 0 }] }
{ "type": "table", "…": "…", "head": ["Quantity", "Value"],
  "rows": [{ "label": "Layers", "value": "32" }, { "label": "Weights", "pre": "", "post": " GB", "accept": ["16"], "show": "16" }] }
{ "type": "figure", "…": "…", "kind": "attention", "tokens": ["the", "cat", "sat"],
  "weights": [[0.1, 0.8, 0.1], [0.2, 0.2, 0.6], [0.3, 0.3, 0.4]], "row": 0, "answer": 1 }
```

(`"…": "…"` stands for the common fields; it is not a real key.)

**Translations.** `page.i18n` is `{ "zh-Hant": { … }, "ja": { … } }` — only those two locales. Each locale may override only the translatable fields of its type; anything missing falls back to English. Strings are not blank, and translated lists have exactly as many entries as the English (otherwise a translated option would point at the wrong answer). Technical terms stay in English.

| Field | Types | Shape |
| --- | --- | --- |
| `prompt`, `hint`, `why` | all | string |
| `concept` | all | `{ "title", "body" }` (either may be left out) |
| `options` | choose, multi | string list |
| `statement`, `reasons` | truefalse | string, string list |
| `before`, `after` | fill | string |
| `items` | order (not when `code: true`), sort (the texts) | string list |
| `pairs` | match | list of `[left, right]` |
| `buckets` | sort | string list |
| `head`, `rows` | table (`rows` translates the labels) | two strings, string list |

`lines`, `codefill`, `block` and `figure` are code or pictures and are never translated.

### Topic intros

`questions/topics/<topic>.json` holds the "New idea" card shown before a topic's first question at each tier. The file name is one of the topics above.

```json
{
  "status": "todo",
  "intros": {
    "concept":   { "title": "…", "body": "…" },
    "mechanism": { "title": "…", "body": "…" },
    "trade-off": { "title": "…", "body": "…" },
    "boss":      { "title": "…", "body": "…" }
  },
  "i18n": { "zh-Hant": { "concept": { "title": "…", "body": "…" } }, "ja": {} }
}
```

- Only `status`, `intros` and `i18n` (optional). All four tiers are required, each with a non-blank `title` and `body`.
- `i18n` uses the same two locales; under each, only tier names, each `{ "title", "body" }` (either may be left out, neither blank).
- Status rules are the same as questions. The app shows an intro only when it is `in_progress` or `done`; a topic without one simply skips the card.

## Status

Every resource and path moves through **To Do → In Progress → Done**:

- `todo` — not reviewed yet.
- `in_progress` — being cleaned up.
- `done` — a maintainer checked every field against the official page.

Off to the side there is one more:

- `proposed_removal` — someone thinks it should leave the catalog (the reason goes in the pull request). It stays listed until a maintainer decides; only a maintainer deletes the file.

**Changes to a `done` resource or path need a maintainer's explicit OK.** A bot labels pull requests that touch one (`touches-done`) so they are never merged by accident. The status is our workflow, not a quality badge — everything listed meets the criteria.

## Accuracy rules

- Every fact must come from the official page. If the page doesn't say it, leave it unknown.
- Don't copy descriptions from other lists. Facts (titles, links) are fine; someone else's prose is theirs.
