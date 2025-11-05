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
title: "Clustering Daily Habits and Mood Using K-Means in Python"
date: 2025-10-13
image: "images/Healthy-Habits-Clustering.png"
thumbnail: "images/Healthy-Habits-Clustering.png"
excerpt: "This project explores which daily habits (exercise duration, sleep hours, meeting count, and a time proxy) naturally group into meaningful improvements in perceived end-of-day mood.  Using K-Means clustering implemented in python and a synthetic dataset, we identify patterns in healthy habits that correlate with better moods.  The purpose of this project is to increase understanding of how K-Means clustering can be applied to lifestyle data for health insights.  Click the tile to explore the project artifacts."
tags:
  - K-Means
  - Clustering
repo_url: "https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/healthy-habits/Healthy-Habits.md"
live_url: "https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/healthy-habits/Healthy-Habits.md"
order: 1
---

# **Clustering Daily Habits and Mood Using K-Means in Python**

## **Synopsis**

* **Purpose:** Explore how **daily habits** such as water intake, exercise, sleep, and work patterns relate to perceived **end-of-day mood**.
* **Methods:** Using a small time-series dataset of daily activity logs, we applied **K-Means clustering** to identify groups of behavior patterns. The project demonstrates unsupervised learning and data exploration skills through **feature scaling, cluster evaluation, and visualization**.
* **Scope:** Introductory data-science project focusing on clustering, interpretability, and feature-mood relationships.

---

## **Skills Demonstrated (Career-Focused)**

* **Data Preparation:** Cleaning daily records, handling missing values, encoding categorical variables (e.g., exercise type), and normalizing numerical features.
* **Unsupervised Learning:** Implementing and tuning **K-Means** to identify optimal cluster structures using inertia and silhouette scores.
* **Data Visualization:** Generating 2D and 3D scatter plots, cluster centroids, and heatmaps for interpretability.
* **Feature Interpretation:** Analyzing clusters for relationships between health habits and mood (e.g., high hydration and good sleep linked to positive mood).
* **Statistical Analysis:** Evaluating within-cluster variance and dominant feature correlations.
* **Technical Communication:** Translating analytical results into clear visual insights and actionable commentary.

[Take me to the project](https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/healthy-habits/Healthy-Habits.md)