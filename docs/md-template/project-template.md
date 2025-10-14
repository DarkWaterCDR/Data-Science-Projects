---
# Recommended front-matter fields for the coverflow
#
# - title: (string) Human-friendly project title. Also include a top-level H1 in the body for compatibility with simple extractors.
# - date: (ISO date) Optional - used for ordering or display.
# - image: (string) Relative or absolute URL to a main image used by the coverflow. Prefer a path accessible from the `temp/` folder when previewing locally (e.g. `../images/my-image.jpg`).
# - thumbnail: (string) Optional smaller image for thumbnails.
# - excerpt: (string) Short one-sentence summary used as the small caption under the coverflow title.
# - tags: (array) Category tags for filtering or badges.
# - repo_url: (string) Link to the source repository.
# - live_url: (string) Optional live/demo URL.
# - order: (integer) Optional numeric ordering if you want custom ordering.
title: "Project Title"
date: 2025-10-13
image: "../images/my-image.jpg"
thumbnail: "../images/my-thumb.jpg"
excerpt: "One-line summary that will display under the project title in the coverflow. Keep it short (1-2 sentences)."
tags:
  - ExampleTag
repo_url: "https://github.com/yourname/your-project"
live_url: "https://your-live-url.example.com"
order: 1
---

# Project Title

![Project main image](../images/my-image.jpg)

Synopsis

This paragraph is the human-readable project synopsis. The generator will use the first non-heading paragraph (if it doesn't find front-matter/excerpt) as an excerpt. Keep the first paragraph short and focused — one or two sentences is ideal.

Details

- Bulleted list of highlights
- Key skills: Python, pandas, scikit-learn

Usage notes

- Place images referenced in `image`/`thumbnail` under `temp/images/` for local previews, or host them on a public URL and use absolute paths.
- If you use YAML front-matter, extend the `scripts/generate_projects_json.py` to parse it (the current generator uses a simple heuristic). I can add front-matter parsing support on request.

Example front-matter only (minimal):

```
---
title: "Minimal Project"
image: "../images/minimal.jpg"
excerpt: "Short one-liner"
---

# Minimal Project

Short description...
```

That's it — duplicate this file as a starting point for each new project markdown in `projects/`, or copy the front-matter into your existing markdown files.
