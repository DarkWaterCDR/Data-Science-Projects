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

---

## **Key Findings**

* **Three primary clusters** emerged:

  * **Cluster 1:** Low exercise + poor sleep → predominantly “Poor” moods.
  * **Cluster 2:** Moderate hydration and rest → balanced “Neutral” moods.
  * **Cluster 3:** High exercise duration + consistent sleep → “Good” moods.
* **Sleep duration** and **exercise minutes** were the most predictive mood indicators.
* The analysis showed meaningful grouping even with a small dataset, supporting the use of clustering for lifestyle and well-being insights.

---

## **Tools & Environment**

* Python 3.12
* pandas, NumPy, scikit-learn, matplotlib, seaborn
* Jupyter Lab for reproducible analysis and visualization

---

## **Paper and Presentation:**<br/>
📓 [Jupyter Notebook](./notebooks/kmeans-mood.ipynb)<br/>
📘 [Research White Paper](./supporting-docs/kmeans-mood-whitepaper.pdf)<br/>
🎞 [Research Presentation Slides](./supporting-docs/kmeans-mood-presentation.pdf)

---

## **How To Run**

> **Disclaimer:** Commands are written for **Windows PowerShell**. You may need to adapt them for macOS or Linux.

1. **Clone the repository**

   ```bash
   git clone https://github.com/DarkWaterCDR/Data-Science-Projects.git
   ```
2. **Navigate to the project folder**

   ```bash
   cd kmeans-mood
   ```
3. **Create a virtual environment**

   ```bash
   python -m venv .kvenv
   ```
4. **Activate the environment**

   ```bash
   .kenv\Scripts\Activate.ps1
   ```
5. **Upgrade pip and install UV**

   ```bash
   python -m pip install --upgrade pip uv
   ```
6. **Install dependencies**

   ```bash
   uv pip install -r requirements.txt
   ```
7. **Launch Jupyter Lab**

   ```bash
   jupyter lab --ip=0.0.0.0 --port=8888 --no-browser --allow-root
   ```
8. **Run the notebook**
   Open and execute:
   `notebooks\kmeans-mood.ipynb`

---

## **Dataset Reference**

Dataset synthetically generated from similar examples representing lifestyle behaviors and perceived moods.
Sample schema includes:
`Date`, `WaterIntakeMl`, `ExerciseDuration`, `SleepDuration`, `Meetings`, `Breaks`, `Mood`.

For public exploration, similar datasets are available at:

* Kaggle: [Daily Habits and Mood Dataset](https://www.kaggle.com/datasets) *(search: “daily habits mood”)*