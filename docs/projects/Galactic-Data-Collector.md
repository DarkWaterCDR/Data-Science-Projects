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
title: "Galactic Data Collector: Data Sourcing, Wrangling & Feature Engineering of Star Wars Action Figures"
date: 2024-11-15
image: "images/Galactic-Data-Collector.png"
thumbnail: "images/Galactic-Data-Collector.png"
excerpt: "This project explores the challenges of integrating Star Wars–related data from multiple public sources, including CSV files, web-scraped tables, and APIs. The analysis highlights the complexities of inconsistent naming conventions, missing values, and structural differences across datasets—issues that required thoughtful cleaning, fuzzy matching, and error-resilient data pipelines. The final integrated dataset supports visualizations that reveal patterns in character attributes, media appearances, and action-figure pricing. Click the tile to explore the project artifacts."
tags:
  - Data Analysis
  - Presentation
repo_url: "https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/galactic-data-collector/Galactic-Data-Collector.md"
live_url: "https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/galactic-data-collector/Galactic-Data-Collector.md"
order: 2
---

# **Galactic Data Collector: Data Sourcing, Wrangling & Feature Engineering of Star Wars Action Figures**

## **Synopsis**

* **Purpose:** Build a **scalable data-collection and cleaning workflow** that simulates gathering information from multiple star systems and consolidating it into a unified, analysis-ready database.
* **Methods:** Implemented **data generation, feature engineering, outlier handling, dataset merging, transformation pipelines**, and automated quality checks using Python. The notebook demonstrates reproducible data-processing patterns suitable for real-world ETL and analytics workflows.
* **Scope:** This project focuses on **data collection, cleaning, integration, and exploratory inspection** across file, web, and api data sources. It does *not* include modeling — the goal is to showcase foundational data-engineering and preprocessing skills.

---

## **Skills Demonstrated (Career-Focused)**

* **Programmatic Data Collection:** Multi-source ingestion from APIs, files, and web scraping data producers.
* **Data Cleaning & Validation:** Applied missing-value checks, field-type normalization, range constraints, and integrity rules.
* **Feature Engineering:** Created calculated attributes (e.g., travel distance, energy signatures, environment class).
* **Merging & Joining:** Consolidated system-level, planet-level, and observation-level data into tidy, analytics-ready tables.
* **Reusable Pipelines:** Built modular functions to generate, transform, and validate datasets using DRY coding principles.
* **Exploratory Visualization:** Used histograms, line charts, heatmaps, and descriptive statistics to inspect the synthetic galaxy.
* **Reproducible Notebook Workflow:** Fully implemented in a Jupyter Notebook for transparent, easy-to-modify execution.

[Take me to the project](https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/galactic-data-collector/Galactic-Data-Collector.md)