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

---

## **Key Findings**

* Manual binning of **driver** and **vehicle age** improved stability and interpretability over automated binning approaches.
* **Tweedie GLM (p ≈ 1.7–1.9)** yielded slightly better overall calibration than two-part (frequency × severity) models, but with reduced transparency.
* All GLM models achieved a **3–5% reduction in test deviance** relative to the null model—showing modest but consistent improvement.
* Dataset age (~20 years) and limited feature scope constrained predictive performance, underscoring the need for richer rating variables.

---

## **Tools & Environment**

* Python 3.12
* pandas, NumPy, scikit-learn, glum, statsmodels, matplotlib, seaborn
* Jupyter Notebook for reproducible workflow and visual exploration

---

## **Paper and Presentation**<br/>
📘 [Research White Paper](./supporting-docs/Pure-Premium-GLM-WhitePaper.pdf)<br/>
🎞 [Research Presentation Slides](./supporting-docs/Pure-Premium-GLM-Presentation.pdf)

---

## **How To Run**

> **Disclaimer:** The following instructions are written for **Windows PowerShell**. You may need to adapt commands for macOS or Linux.

1. **Clone the repository**

   ```bash
   git clone https://github.com/DarkWaterCDR/Data-Science-Projects.git
   ```
2. **Navigate to the project folder**

   ```bash
   cd pure-premium-glm
   ```
3. **Create a virtual environment**

   ```bash
   python -m venv .ppenv
   ```
4. **Activate the environment**

   ```bash
   .ppenv\Scripts\Activate.ps1
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
8. **Run the Exploratory Data Analysis notebook**:<br/>
   `notebooks\project-glm-eda-submission.ipynb`
9. **Run the Modeling notebook**: <br/>**Note:** Tweedie GLM is computationally intensive and may take `5-10 minutes` to run on systems with `16GB of RAM`.  This is because we are running two models with 4 combinations of Tweedie Power.  You can decrease in complexity by reducing the number of models or powers evaluated.<br/>
   `notebooks\project-glm-model-submission-simplified.ipynb`

---

## **Dataset Reference**

Dutang, C. (2025). *CASdatasets: Insurance Data for Actuarial Science.* GitHub Repository. [https://github.com/dutangc/CASdatasets](https://github.com/dutangc/CASdatasets)

Sarpal, K. (2020). *FREMTPL – French Motor TPL Insurance Claims Data.* Kaggle. [https://www.kaggle.com/datasets/karansarpal/fremtpl-french-motor-tpl-insurance-claims](https://www.kaggle.com/datasets/karansarpal/fremtpl-french-motor-tpl-insurance-claims)

---

## **References**

* Goldburd, M., Khare, A., & Tevet, D. (2025). *Generalized Linear Models for Insurance Rating* (2nd Ed.). Casualty Actuarial Society.
* Frees, E. W., Derrig, R. A., & Meyers, G. G. (2021). *Predictive Modeling Applications in Actuarial Science: Vol. 1.* Cambridge University Press.
* Quantco. (2024). *glum Documentation.* [https://glum.readthedocs.io](https://glum.readthedocs.io)