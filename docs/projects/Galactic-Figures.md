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
title: "Predicting Star Wars Action Figure Pricing: Data Mining & Machine Learning Analysis"
date: 2024-11-15
image: "images/Galactic-Figures.png"
thumbnail: "images/Galactic-Figures.png"
excerpt: "This project explores the challenges of integrating Star Wars–related data from multiple public sources, including CSV files, web-scraped tables, and APIs. The analysis highlights the complexities of inconsistent naming conventions, missing values, and structural differences across datasets—issues that required thoughtful cleaning, fuzzy matching, and error-resilient data pipelines. The final integrated dataset supports visualizations that reveal patterns in character attributes, media appearances, and action-figure pricing. Click the tile to explore the project artifacts."
tags:
  - Data Analysis
  - Presentation
repo_url: "https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/galactic-figures/Galactic-Figures.md"
live_url: "https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/galactic-figures/Galactic-Figures.md"
order: 2
---

# **Predicting Star Wars Action Figure Pricing: Data Mining & Machine Learning Analysis**

## **Synopsis**

* **Purpose:** Build a data-driven understanding of **what drives the pricing of Star Wars action figures**, and develop machine-learning models that predict MSRP and resale value based on character attributes, media appearances, rarity, and production details.
* **Methods:** Conducted **web scraping**, **feature engineering**, **data cleaning**, and trained multiple machine-learning models including **Linear Regression**, **Gradient Boosting**, **XGBoost**, **LightGBM**, and **Stacked Ensembles**.
* **Scope:** This project emphasizes **exploration, feature preparation, and model evaluation** — demonstrating how integrated datasets can describe and predict pricing trends across the collectibles market.

---

## **Skills Demonstrated (Career-Focused)**

* **Web Scraping & Data Integration:** Combined datasets from ActionFigure411, the Star Wars Databank, and auction platforms to create a rich, multi-source analytical dataset.
* **Feature Engineering:** Encoded high-cardinality character features, handled missing data, created media-appearance features, and capped extreme outliers to stabilize model training.
* **ML Modeling & Evaluation:** Implemented multiple regression algorithms, tuned hyperparameters, and compared models using MAE, RMSE, and R².
* **Ensemble Learning:** Built **Voting** and **Stacking** regressors to improve predictive power by combining model strengths.
* **Visualization & Insight Extraction:** Created feature-importance plots, distribution charts, and model comparison tables to communicate pricing drivers.
* **Research Communication:** Summarized findings, limitations, and recommendations using a structured data-science workflow.

[Take me to the project](https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/galactic-figures/Galactic-Figures.md)