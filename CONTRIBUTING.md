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
| `difficulty` | `beginner` · `intermediate` · `advanced` |
| `durationMinutes` | only if the official page states it; otherwise `0` (unknown). **Never estimate.** |
| `skills` | what it teaches, e.g. `Deep Learning`, `PyTorch`. A resource can have several. |
| `units` | courses only: the lectures, each with its `resources` (the video, the paper that goes with it…) |

3. Run the checks and regenerate the README:

```sh
node scripts/check.mjs
node scripts/build-readme.mjs
```

4. Open a pull request with both the JSON file and the updated `README.md`.

## Status

Every resource moves through **To Do → In Progress → Done**:

- `todo` — not reviewed yet.
- `in_progress` — being cleaned up.
- `done` — a maintainer checked every field against the official page.

**Changes to a `done` resource need a maintainer's explicit OK.** A bot labels pull requests that touch one (`touches-done`) so they are never merged by accident. The status is our workflow, not a quality badge — everything listed meets the criteria.

## Accuracy rules

- Every fact must come from the official page. If the page doesn't say it, leave it unknown.
- Don't copy descriptions from other lists. Facts (titles, links) are fine; someone else's prose is theirs.
