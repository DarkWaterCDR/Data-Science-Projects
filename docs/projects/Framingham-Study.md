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
title: "Modeling Cardiovascular Risk: Exploratory Data Analysis Using the Framingham Heart Study"
date: 2024-08-02
image: "images/Framingham-Study.png"
thumbnail: "images/Framingham-Study.png"
excerpt: "This project explores the clinical and lifestyle factors influencing ten-year coronary heart disease (CHD) risk using data from the landmark Framingham Heart Study. Through a structured exploratory data analysis (EDA), it examines how missing data, outliers, and variable relationships shape our understanding of cardiovascular risk. The analysis highlights key predictors such as age, systolic blood pressure, and glucose levels—reaffirming established medical insights while demonstrating modern analytical techniques for reproducible health research. Click the tile to explore the project artifacts."
tags:
  - Data Analysis
  - Presentation
repo_url: "https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/framingham-study/Framingham-Heart-Study.md"
live_url: "https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/framingham-study/Framingham-Heart-Study.md"
order: 5
---

# **Modeling Cardiovascular Risk: Exploratory Data Analysis Using the Framingham Heart Study**

## **Synopsis**

* **Purpose:** Examine how **clinical and lifestyle factors** influence the ten-year risk of **coronary heart disease (CHD)** using the Framingham Heart Study dataset.
* **Methods:** Conducted **exploratory data analysis (EDA)** including data cleaning, missing-value imputation, outlier handling, distribution analysis, and hypothesis testing. Employed **PMF, CDF, correlation matrices, and regression diagnostics** to identify key predictors and assess data quality.
* **Scope:** The analysis focuses on **exploration and interpretation**, not predictive modeling—serving as a foundation for future risk modeling and public-health insights.

---

## **Skills Demonstrated (Career-Focused)**

* **Data Cleaning & Imputation:** Used mean/median replacement for missing data; applied log transformations and IQR filtering for outliers.
* **EDA & Visualization:** Employed histograms, boxplots, PMFs, and CDFs to explore patterns and compare CHD vs. non-CHD groups.
* **Statistical Testing:** Implemented mean/permutation tests and regression analysis to confirm significance of predictors.
* **Multicollinearity Diagnostics:** Calculated **Variance Inflation Factors (VIFs)** to validate independence among predictors.
* **Health Data Interpretation:** Mapped clinical indicators (e.g., blood pressure, glucose, cholesterol) to cardiovascular risk outcomes.
* **Reproducible Workflow:** Fully implemented within a Jupyter Notebook for transparent, repeatable results.

[Take me to the project](https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/framingham-study/Framingham-Heart-Study.md)