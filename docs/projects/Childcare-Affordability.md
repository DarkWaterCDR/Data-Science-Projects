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
title: "Childcare In Americal (A Review of NDCP Data)"
date: 2025-10-13
image: "images/Childcare-Affordability.png"
thumbnail: "images/Childcare-Affordability.png"
excerpt: "A call to action for data collection."
tags:
  - Data Analysis
  - Presentation
repo_url: "projects/Childcare-Affordability.md"
live_url: "projects/Childcare-Affordability.md"
order: 2
---
# Draft README 2 — Childcare in America (A Review of NDCP Data)

## Synopsis
- Purpose: Assess the affordability of child care in the U.S. using the National Database of Child Care Prices, highlighting differences by state and segment (e.g., age groups) to inform policy and family decision-making.
- Methods: Cleaned and aligned state-level tables; engineered affordability metrics (e.g., child care cost as a share of median family income); aggregated and compared results across states/segments; visualized distributions and rankings; summarized insights in a concise narrative.
- Scope: Exploratory analysis and communication artifacts focused on affordability patterns and implications.

## Skills demonstrated (career-focused)
- Data wrangling and documentation alignment with a public dataset
- Feature engineering for affordability metrics and geographic/segment aggregation
- Exploratory analysis and stakeholder-ready visualization (rankings, distributions; map if applicable)
- Insight synthesis and storytelling with assumptions/limitations and actionable recommendations
- Reproducible workflow in Python notebooks (pandas, seaborn/matplotlib) and/or BI tooling (e.g., Tableau)