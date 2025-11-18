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

---

## **Key Findings**

* Action figure pricing strongly correlated with:

  * **Character popularity** (appearance frequency across films/series)
  * **Rarity and exclusivity tiers**
  * **Media exposure** during key release years
* **Stacking Regressor** delivered the best results, outperforming standalone models in MAE and RMSE.
* Data limitations (missing production volume, incomplete price history, inconsistent condition data) introduce noise — future scraping or partnership data would improve accuracy.
* Ensemble methods effectively captured the complex interactions between character attributes and collector-market pricing trends.

---

## **Tools & Environment**

* Python 3.12
* pandas, NumPy
* scikit-learn, XGBoost, LightGBM, CatBoost
* BeautifulSoup, Requests
* matplotlib, seaborn
* Jupyter Lab

---

## **Paper and Notebook** <br/>
📓 [Jupyter Notebook](./notebooks/galactic-figures.ipynb)<br/>
📘 [Research White Paper](./supporting-docs/Galactic-Figures-WhitePaper.pdf)

---

## **How To Run**

> **Disclaimer:** Example commands use **Windows PowerShell**. Adjust as needed for macOS/Linux.

1. **Clone the repository**

   ```bash
   git clone https://github.com/DarkWaterCDR/Data-Science-Projects.git
   ```

2. **Navigate to the project folder**

   ```bash
   cd galactic-figures
   ```

3. **Create a virtual environment**

   ```bash
   python -m venv .gfenv
   ```

4. **Activate the environment**

   ```bash
   .swenv\Scripts\Activate.ps1
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
   `notebooks\galactic-figures.ipynb`

---

## **Data References**

* Star Wars Action Figure Pricing – ActionFigure411
  [https://www.actionfigure411.com/star-wars/kenner-vintage-collection-price-guide.php](https://www.actionfigure411.com/star-wars/kenner-vintage-collection-price-guide.php)
* Star Wars Databank – Character & Lore Information
  [https://starwars-databank.vercel.app/](https://starwars-databank.vercel.app/)
* SWAPI — Star Wars API
  [https://swapi.dev/](https://swapi.dev/)

---

