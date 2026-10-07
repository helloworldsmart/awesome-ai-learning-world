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
| `topic` | Technical only. One of the 26 slugs in [Topics](#topics) below. |
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

**Translations.** `page.i18n` is `{ "zh-Hant": { … }, "ja": { … } }` — only those two locales. Each locale may override only the translatable fields of its type; anything missing falls back to English. Strings are not blank (except a translated `fill` `before` / `after`, below), and translated lists have exactly as many entries as the English (otherwise a translated option would point at the wrong answer). Technical terms stay in English.

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

**Fill translations.** A translated `before` or `after` may be `""`: languages that put the verb last (Japanese) often need the blank at the start of the sentence. Both empty is still an error. `accept` and `show` are never translated, so the blank must hold something language-neutral — a technical term, a number, a symbol or code. Don't put spaces next to the blank; the input has its own margin.

```json
"before": "During decoding, the", "after": "keeps the keys and values of earlier tokens so they aren't recomputed.",
"accept": ["KV cache", "kv-cache", "key-value cache"], "show": "KV cache",
"i18n": { "ja": { "before": "", "after": "は、decode 中に過去の token の K と V を保持して再計算を省きます。" } }
```

The full glossary of terms that stay in English, and how they sit in a Chinese or Japanese sentence, is in the app repo's `docs/i18n-tone-guide.md` ("題庫與 Challenge").

#### Good and bad pages, per tier

What each tier asks:

| Tier | Asks | Fits |
| --- | --- | --- |
| `concept` | What is it, and why does it exist? | `choose`, `truefalse`, `match`, `multi` |
| `mechanism` | How does it work: steps, shapes, numbers. | `fill`, `table`, `order`, `codefill`, `figure` |
| `trade-off` | In this situation, which one, and what does it cost? | `choose` with a scenario, `sort` comparing options, `multi` |
| `boss` | Combine it all: find the bug, find the root cause, plan the investigation. | `lines`, `choose` with a `block`, `order` of investigation steps |

Four things make a page bad, and each tier below shows one of them:

- **The prompt can't be recognized on its own.** The result screen lists missed questions by `prompt` (by `statement` for `truefalse`). "Which one is correct?" or "Put these in order." tells the player nothing there — write "Put the RAG pipeline steps in order."
- **The hint gives the answer away.** A hint points at where to look; if reading it is enough to answer, it is the answer.
- **The distractors are implausible.** Every wrong option should be a mistake a real candidate makes. If three of four options can be dismissed without knowing the topic, the page tests reading, not understanding.
  Length is a tell too: keep the right option about as long as the wrong ones, by giving the distractors the same detail rather than cutting the answer. `node scripts/check.mjs` warns when a correct option is more than 1.2× the longest distractor.
- **The answer is ambiguous.** Someone who knows the topic must agree on one answer. If a strong engineer could argue for two options, add the evidence that rules one out, or change the question.

**Concept — good.** The wrong options are real misconceptions (the "sums to 1" one is softmax's job, not the scaling's).

```json
{
  "type": "choose",
  "prompt": "Why does scaled dot-product attention divide QK^T by sqrt(d_k)?",
  "options": [
    "To keep dot products from growing with d_k and saturating the softmax",
    "To make each row of attention weights sum to 1",
    "To reduce the memory needed to store QK^T",
    "To make attention independent of token order"
  ],
  "answer": 0,
  "hint": "Think about the variance of a dot product between two random d_k-dimensional vectors.",
  "why": "With unit-variance entries, q·k has variance d_k; dividing by sqrt(d_k) brings it back to 1, so softmax doesn't collapse onto one token.",
  "concept": {
    "title": "Softmax saturation",
    "body": "Softmax turns scores into weights, but large scores push almost all the weight onto one position. Gradients through a saturated softmax are close to zero, so training stalls. Scaling keeps the scores in a range where softmax stays soft."
  }
}
```

**Concept — bad: the prompt can't be recognized on its own.** On the result screen this shows up as "Which one is correct?" — the player can't tell which question to go back to.

```json
{
  "type": "choose",
  "prompt": "Which one is correct?",
  "options": ["Embeddings are learned", "Embeddings are one-hot", "Embeddings are random", "Embeddings are fixed"],
  "answer": 0,
  "…": "…"
}
```

Fix: put the question in the prompt — "How does a transformer get its token embeddings?"

**Mechanism — good.** A number the player computes; the method is in `why`, and `accept` lists the spellings.

```json
{
  "type": "fill",
  "prompt": "Llama 2 7B has 32 layers and 32 KV heads of dimension 128, and keeps its KV cache in FP16. How many bytes of KV cache does one token take?",
  "before": "One token takes",
  "after": "bytes of KV cache.",
  "accept": ["524288", "524,288"],
  "show": "524,288",
  "hint": "Both K and V are cached, in every layer and every head.",
  "why": "2 (K and V) × 32 layers × 32 heads × 128 dims × 2 bytes = 524,288 bytes, or 512 KiB per token.",
  "concept": {
    "title": "KV cache grows with every token",
    "body": "Each generated token adds one K and one V vector per head per layer. Multiply by sequence length and batch size and the cache, not the weights, becomes what limits how many requests fit on a GPU."
  }
}
```

**Mechanism — bad: the hint gives the answer away.**

```json
{
  "type": "fill",
  "prompt": "What does scaled dot-product attention divide QK^T by?",
  "before": "sqrt(",
  "after": ")",
  "accept": ["d_k", "dk"],
  "show": "d_k",
  "hint": "It's the dimension of the keys, d_k.",
  "…": "…"
}
```

Fix: point at the reason instead — "The scale keeps the variance of the scores near 1."

**Trade-off — good.** A concrete situation with constraints, and each wrong option is something teams actually try.

```json
{
  "type": "choose",
  "prompt": "A support bot must answer from 20,000 internal policy pages that change every week, and must cite the page it used. Which approach fits?",
  "options": [
    "RAG over the policy pages, citing the retrieved page",
    "Fine-tune the model on the policy pages every week",
    "Put all the policy pages in the system prompt",
    "Train a classifier that maps each question to one policy page"
  ],
  "answer": 0,
  "hint": "Two constraints: the pages change weekly, and every answer needs a source.",
  "why": "Retrieval picks up a changed page as soon as it is re-indexed and hands back the exact page to cite; fine-tuning is slow to update and can't point to a source.",
  "concept": {
    "title": "Knowledge in the prompt vs. in the weights",
    "body": "Fine-tuning changes how a model behaves; it is a poor way to store facts that change, and it can't say where a fact came from. Retrieval keeps facts outside the model, so updating them is re-indexing, and the source travels with the answer."
  }
}
```

**Trade-off — bad: implausible distractors.** Only one option is an engineering choice, so the page is answered by elimination.

```json
{
  "type": "choose",
  "prompt": "A support bot must answer from 20,000 policy pages that change weekly. Which approach fits?",
  "options": ["RAG over the policy pages", "Delete the old pages", "Ask users to read the pages", "Use a bigger font"],
  "answer": 0,
  "…": "…"
}
```

**Boss — good.** The `block` holds the evidence, and it rules out every wrong option: the 2025 page *was* retrieved (so not `top_k`), its chunk still carries the 14-day sentence (so not chunking), and the answer matches a retrieved page (so not hallucination).

```json
{
  "type": "choose",
  "prompt": "A RAG bot quotes a superseded refund policy. From this trace, what is the root cause?",
  "block": "query: What is the refund window?\nretrieved[0]: refund-policy-2023.md  score 0.91  \"Refunds within 30 days.\"\nretrieved[1]: refund-policy-2025.md  score 0.90  \"Refunds within 14 days.\"\nanswer: Refunds are accepted within 30 days.",
  "options": [
    "Both versions are in the index and nothing filters or ranks by date",
    "The model hallucinated the 30-day window",
    "top_k is too small to retrieve the 2025 policy",
    "Chunking cut the 14-day sentence out of the 2025 page"
  ],
  "answer": 0,
  "hint": "Check which pages came back, and where the answer's number came from.",
  "why": "The old page outranks the new one by 0.01 and the answer copies it; the fix is to remove superseded pages or filter by effective date.",
  "concept": {
    "title": "Stale documents win on similarity",
    "body": "Similarity search ranks by meaning, not by date, so two versions of a policy score almost the same. Ingestion has to delete or mark superseded documents, or retrieval has to filter by metadata such as an effective date."
  }
}
```

**Boss — bad: the answer is ambiguous.** With no evidence, every option is a plausible cause; a strong engineer could defend any of them.

```json
{
  "type": "choose",
  "prompt": "p99 latency of an LLM service doubled after the last deploy. What is the cause?",
  "options": ["A larger batch size", "Longer prompts", "The KV cache was disabled", "A slower GPU type"],
  "answer": 2,
  "…": "…"
}
```

Fix: add a `block` (a metric diff, a config diff) that rules three of them out, or turn it into an `order` page: "Put the steps for investigating a p99 latency regression in order."

### Topics

The `topic` of a technical question, and the file name under `questions/topics/`, is one of these 26 slugs (this is the curriculum order: stage, then left to right).

| Slug | Name | Scope |
| --- | --- | --- |
| `math-notation` | Math notation & algebra | Reading the formulas in papers and CS231n in plain words, and the algebra rules that derivations use. |
| `python-numpy` | Python & NumPy | The Python core, NumPy arrays, vectorisation and numerical stability that ML code needs; pandas only at the most basic level. |
| `linear-algebra` | Linear algebra | Vectors, matrix multiplication and shapes, projection, rank, eigendecomposition and SVD intuition; hand calculation stays at 2×2 or 3-D vectors. |
| `calculus` | Calculus | Derivatives, partial derivatives, gradients, the chain rule and one step of gradient descent; no integration tricks, no long proofs. |
| `probability-statistics` | Probability & statistics | Conditional probability and Bayes, expectation and variance, common distributions, entropy / cross-entropy / KL, sampling and the intuition of hypothesis tests. |
| `ml-fundamentals` | ML fundamentals | The classical model families and the basic moves of training. |
| `data-generalization` | Data & generalization | Splits, overfitting, leakage, distribution shift, imbalance and metrics, calibration: the evaluation basics of classical ML. |
| `pytorch-basics` | PyTorch basics | Tensors, autograd, train / eval, no_grad, devices and the five steps of a training loop. Questions must not assume NumPy. No `codefill`. |
| `system-design-basics` | System design I | Building blocks that need no ML: caching, sharding, replication, queues, idempotency, tail latency, rate limiting, consistency, capacity estimates, and the classic design problems those alone can solve. |
| `deep-learning` | Deep learning & CNN | MLP and backprop, activations, initialisation, BatchNorm / LayerNorm, dropout, residuals, CNN and convolution shapes, optimizers, training diagnosis. |
| `embeddings` | Embeddings | Representation itself: one-hot vs dense, lookup, the distributional hypothesis, contrastive learning, similarity, pooling, transfer learning. |
| `sequence-models` | Sequence models | The relay of language models: N-gram, feed-forward LM, RNN, LSTM / GRU, seq2seq, and where attention comes from (stops at why attention is needed). |
| `computer-vision` | Computer vision | Images as tensors, convolution as filtering, then the vision tasks: classification, detection, segmentation, ViT vs CNN, self-supervision. |
| `classical-vision` | Classical vision | Traditional computer vision: image formation, filtering, features, geometric reconstruction, motion. A hidden topic (see below). |
| `llm-internals` | LLM internals | How a Transformer language model works inside, from attention to decoding, and how it is pretrained (corpus filtering and dedup, loss spikes). |
| `fine-tuning` | Post-training | Adapting a pretrained model: fine-tuning and the post-training methods built on it. Not pretraining and not distributed-training infrastructure. |
| `inference-gpu` | Inference & GPU I | Serving one model on one GPU: prefill / decode, KV cache memory, batching, latency metrics such as TTFT, the basic gains of quantization, latency budgets, single-machine diagnosis. |
| `inference-gpu-advanced` | Inference & GPU II | Multi-GPU and special hardware: TP / PP / EP and distributed training, MoE serving, disaggregated prefill / decode, SRAM-only chips, quantization engineering (PTQ / QAT, FP8 training), compilers (TensorRT-LLM), large-scale cost and scheduler design. |
| `multimodal` | Multimodal | Models that combine modalities: speech, vision-language models, robotics and autonomous driving. |
| `generative-models` | Generative models | What generative models learn (the data distribution), autoencoders and VAE, GAN, diffusion, latent diffusion, conditional generation and its evaluation. No ELBO derivations; text generation is in LLM internals. |
| `rag` | RAG | Retrieval-augmented generation: retrieval, chunking, and answering from retrieved passages. |
| `agents` | Agents | LLMs that call tools and act over several steps. |
| `evaluation` | Evaluation | Measuring LLM systems. |
| `safety` | Safety | Keeping LLM systems from misbehaving or being misused. |
| `ai-system-design` | System design II | Architecture of LLM / AI products: gateways, multi-model routing, execution environments (sandboxes) for AI editors and agents, enterprise search, LLM-assisted data pipelines. |
| `system-design` | System design III | Classic ML system case studies: recommendation, search, ranking, ads, fraud, ETA, marketplace pricing, the self-driving data engine. The slug is older than the name, so it is not `system-design-iii`. |

- `python-numpy` and `pytorch-basics` do not use `codefill` pages: the code is the topic itself, so a blank either leaks the answer or tests syntax. `node scripts/check.mjs` reports a `codefill` page in either as an error.
- `classical-vision` is a *hidden* topic in the app (it only appears on the map once a user has answered one of its questions), but in this repo it is a topic like any other: same file format, same checks.

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
