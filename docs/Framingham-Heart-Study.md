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

---

## **Key Findings**

* **Age**, **systolic blood pressure**, and **glucose** emerged as the strongest predictors of CHD risk.
* Elevated **BMI**, **smoking**, and **diabetes** were associated with increased ten-year risk.
* PMF/CDF plots confirmed clear separation between CHD and non-CHD populations on these metrics.
* Multicollinearity was minimal (VIF < 5 across predictors), indicating stable estimates.
* Despite modest R² values, results aligned with established cardiovascular literature.

---

## **Tools & Environment**

* Python 3.12
* pandas, NumPy, matplotlib, seaborn, statsmodels, scikit-learn
* Jupyter Lab for exploratory analysis and visualization

---

**Paper and Presentation:**

📓 [Jupyter Notebook](./notebooks/framingham-study.ipynb) <br/>
📘 [Research White Paper](./supporting-docs/framingham-study-white-paper.pdf)

## **How To Run**

> **Disclaimer:** Commands are shown for **Windows PowerShell**. Adapt as needed for macOS or Linux.

1. **Clone the repository**

   ```bash
   git clone https://github.com/DarkWaterCDR/Data-Science-Projects.git
   ```
2. **Navigate to the project folder**

   ```bash
   cd framingham-study
   ```
3. **Create a virtual environment**

   ```bash
   python -m venv .fenv
   ```
4. **Activate the environment**

   ```bash
   .fenv\Scripts\Activate.ps1
   ```
5. **Upgrade pip and install UV**

   ```bash
   python -m pip install --upgrade pip uv
   ```
6. **Install dependencies**

   ```bash
   uv pip install -r requirements.txt -r requirements-dev.txt
   ```
7. **Launch Jupyter Lab**

   ```bash
   jupyter lab --ip=0.0.0.0 --port=8888 --no-browser --allow-root
   ```
8. **Run the notebook**
   Open and execute:
   `notebooks\framingham-study.ipynb`

---

## **Dataset Reference**

Aasheesh. (2022). *Framingham Heart Study Dataset* [Data set]. Kaggle.
[https://www.kaggle.com/datasets/aasheesh200/framingham-heart-study-dataset](https://www.kaggle.com/datasets/aasheesh200/framingham-heart-study-dataset)

---

## **References**

* Downey, A. B. (2014). *Think Stats: Exploratory Data Analysis in Python* (2nd ed.). O’Reilly Media.