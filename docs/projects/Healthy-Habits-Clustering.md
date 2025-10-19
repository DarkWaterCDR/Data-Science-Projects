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
title: "Healthy Habits Clustering"
date: 2025-10-13
image: "images/Healthy-Habits-Clustering.png"
thumbnail: "images/Healthy-Habits-Clustering.png"
excerpt: "This project explores which daily habits (exercise duration, sleep hours, meeting count, and a time proxy) naturally group into meaningful improvements in perceived end-of-day mood.  Using K-Means clustering implemented in python and a synthetic dataset, we identify patterns in healthy habits that correlate with better moods.  The purpose of this project is to increase understanding of how K-Means clustering can be applied to lifestyle data for health insights.  Click the tile to explore the project artifacts."
tags:
  - K-Means
  - Clustering
repo_url: "https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/docs/projects/Healthy-Habits-Clustering.md"
live_url: "https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/docs/projects/Healthy-Habits-Clustering.md"
order: 1
---

# Draft README 1 — K-Means Clustering of Healthy Habits

## Synopsis
- Purpose: Explore which daily habits (exercise duration, sleep hours, meeting count, and a time proxy) naturally group into meaningful improvements in perceived end-of-day mood.
- Methods: Cleaned and encoded fields (mood label mapping; date → epoch seconds), standardized features, used the elbow method (k=1..10) to select k=3, trained K-Means, appended cluster labels, and visualized pairwise relationships colored by cluster.
- Scope: Descriptive, exploratory clustering and visualization only (no prediction or causal inference).

## Skills demonstrated (career-focused)
- Data wrangling and feature preparation (type conversion, categorical encoding, scaling)
- Unsupervised learning with K-Means and heuristic model selection (elbow/SSE)
- Exploratory visualization and pattern interpretation for stakeholder communication
- Reproducible Python workflow with pandas, scikit-learn, seaborn, and matplotlib