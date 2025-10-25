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

---

## **Key Findings**

* **Random Forest** achieved the highest generalization accuracy (Test R² ≈ **0.91**).
* **Gradient Boosting** demonstrated slightly lower accuracy but faster fit time.
* **Weight**, **displacement**, and **horsepower** were the top predictors of MPG.
* **Linear Regression** provided valuable interpretability but failed to capture nonlinear effects fully.

---

## **Tools & Environment**

* Python 3.12
* pandas, NumPy, scikit-learn, matplotlib, seaborn, statsmodels
* Jupyter Lab for reproducible workflow

---

**Paper and Presentation:**<br/>
📘 [Research White Paper](../supporting-docs/Estimating-MPG-WhitePaper.pdf) <br/>
🎞 **WORK IN PROGRESS - Dead Link**[Research Presentation Slides](../supporting-docs/Estimating-MPG-Presentation.pdf)

---

## **How To Run**

> **Disclaimer:** Commands are written for **Windows PowerShell**. Adapt as needed for macOS or Linux.

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   ```
2. **Navigate to the project folder**

   ```bash
   cd estimating-mpg
   ```
3. **Create a virtual environment**

   ```bash
   python -m venv .mpgvenv
   ```
4. **Activate the environment**

   ```bash
   .mpgvenv\Scripts\Activate.ps1
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
   `notebooks\estimating-mpg.ipynb`

---

## **Dataset Reference**

Dua, D., & Graff, C. (2019). *UCI Machine Learning Repository: Auto MPG Dataset.* University of California, Irvine.
[https://archive.ics.uci.edu/ml/datasets/auto+mpg](https://archive.ics.uci.edu/ml/datasets/auto+mpg)