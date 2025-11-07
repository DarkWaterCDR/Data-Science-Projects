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
title: "Estimating Fuel Efficiency Using Regression Models in Python"
date: 2025-10-19
image: "images/Fuel-Efficiency.png"
thumbnail: "images/Fuel-Efficiency.png"
excerpt: "This project provides a comparative analysis between different methods of estimating fuel efficiency from vehicle characteristics.  The project seeks to explore the effectiveness of various regression techniques in predicting miles per gallon (MPG) based on features such as engine size, weight, and horsepower.  We will use comparative metrics and model pipelines to explore the efficiency and explanability of linear regression, decision trees, random forest, and gradient boosting methods.  Click the tile to explore the project artifacts."
tags:
  - Regression
  - Fuel Efficiency
repo_url: "https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/estimating-mpg/Estimating-MPG.md"
live_url: "https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/estimating-mpg/Estimating-MPG.md"
order: 4
---

# **Estimating Fuel Efficiency Using Regression Models in Python**

## **Synopsis**

* **Purpose:** Estimate **miles per gallon (MPG)** using vehicle characteristics to evaluate the predictive performance of **linear** and **ensemble** regression approaches.
* **Methods:** Utilized the **UCI Auto MPG dataset** (1970–1982, 398 samples). After thorough data cleaning (handling missing values, data type correction, encoding categorical variables), multiple regression models were trained: **Linear Regression**, **Decision Tree**, **Random Forest**, and **Gradient Boosting**. Each model was evaluated using consistent **train/test splits** and **5-fold cross-validation**.
* **Scope:** Comparative machine-learning experiment balancing **accuracy, interpretability, and computational efficiency**.

---

## **Skills Demonstrated (Career-Focused)**

* **Data Preparation & Cleaning:** Coercing data types, imputing missing values, encoding categorical variables, and feature scaling.
* **Machine Learning Implementation:** Building and tuning regression models using scikit-learn.
* **Evaluation & Metrics:** Applied **R²**, **RMSE**, **MAE**, and fit/predict timing metrics to measure both accuracy and efficiency.
* **Explainability & Interpretation:** Used **feature importance**, **residual plots**, and **SHAP analysis** to interpret feature impact.
* **Experimental Design:** Standardized comparisons of bias-variance trade-offs through reproducible pipelines.
* **Technical Communication:** Clear documentation and visualization of workflow and findings.

[Take me to the project](https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/estimating-mpg/Estimating-MPG.md)