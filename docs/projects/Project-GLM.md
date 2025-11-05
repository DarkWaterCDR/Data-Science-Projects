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
title: "Modeling Pure Premium in Auto Insurance Using GLMs and Python"
date: 2025-10-13
image: "images/Project-GLM.png"
thumbnail: "images/Project-GLM.png"
excerpt: "This project is an exploration of Generalized Linear Models (GLMs) for estimating Pure Premium in Auto Insurance Pricing using the French Motor TPL dataset.  We explore Frequency (Poisson) x Severity (Gamma) and Tweedie Modeling approaches, comparing model performance, calibration, and interpretability.  We use the glum library in python to implement the models.  The project contains an Exploratory Data Analysis (EDA) and a Modeling Jupyter Notebook as well as a White Paper summarizing the effort.  Click the tile to explore the project artifacts."
tags:
  - GLM
  - Pure Premium
repo_url: "https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/pure-premium-glm/Pure-Premium-GLM.md"
live_url: "https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/pure-premium-glm/Pure-Premium-GLM.md"
order: 3
---

# **Modeling Pure Premium in Auto Insurance Using GLMs and Python**

## **Synopsis**

* **Purpose:** Evaluate how generalized linear models (GLMs) can be applied to estimate **pure premium** (expected claim cost per exposure) in automobile insurance.
* **Methods:** Used the **French Motor TPL dataset (FREMTPL)** from the CASdatasets R package to compare model families—**Poisson, Negative Binomial, Gamma, and Tweedie**—across **frequency**, **severity**, and **pure premium** targets. Conducted extensive **exploratory data analysis (EDA)**, feature engineering (binning, capping), and model calibration with exposure weighting.
* **Scope:** Comparative study focused on model transparency, calibration, and interpretability under actuarial and regulatory principles.

---

## **Skills Demonstrated (Career-Focused)**

* **Data Wrangling & Feature Engineering:** Binning/capping of continuous predictors (e.g., driver age, vehicle age), exposure normalization, and collinearity checks.
* **Generalized Linear Modeling:** Implementation of Poisson, Gamma, and Tweedie GLMs using **glum** and **statsmodels**, with ElasticNet regularization and log-link transformations.
* **Model Diagnostics:** Overdispersion checks, deviance comparisons, and cross-family yardstick evaluation (Poisson deviance for all).
* **Explainability & Fairness:** Coefficient visualization, segmentation analysis, and interpretation of risk gradients.
* **Experiment Automation:** Reusable Python functions enabling configurable multi-model comparisons.
* **Technical Communication:** Integration of statistical output into APA-style reporting and actuarial documentation.

[Take me to the project](https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/pure-premium-glm/Pure-Premium-GLM.md)