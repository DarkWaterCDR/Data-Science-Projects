# **Galactic Data Collector: Data Sourcing, Wrangling & Feature Engineering of Star Wars Action Figures**

## **Synopsis**

* **Purpose:** Build a **scalable data-collection and cleaning workflow** that simulates gathering information from multiple star systems and consolidating it into a unified, analysis-ready database.
* **Methods:** Implemented **data generation, feature engineering, outlier handling, dataset merging, transformation pipelines**, and automated quality checks using Python. The notebook demonstrates reproducible data-processing patterns suitable for real-world ETL and analytics workflows.
* **Scope:** This project focuses on **data collection, cleaning, integration, and exploratory inspection** across file, web, and api data sources. It does *not* include modeling — the goal is to showcase foundational data-engineering and preprocessing skills.

---

## **Skills Demonstrated (Career-Focused)**

* **Programmatic Data Collection:** Multi-source ingestion from APIs, files, and web scraping data producers.
* **Data Cleaning & Validation:** Applied missing-value checks, field-type normalization, range constraints, and integrity rules.
* **Feature Engineering:** Created calculated attributes (e.g., travel distance, energy signatures, environment class).
* **Merging & Joining:** Consolidated system-level, planet-level, and observation-level data into tidy, analytics-ready tables.
* **Reusable Pipelines:** Built modular functions to generate, transform, and validate datasets using DRY coding principles.
* **Exploratory Visualization:** Used histograms, line charts, heatmaps, and descriptive statistics to inspect the synthetic galaxy.
* **Reproducible Notebook Workflow:** Fully implemented in a Jupyter Notebook for transparent, easy-to-modify execution.

---

## **Key Findings**

* **Popularity Drives Pricing:** Characters with more appearances across Star Wars media tended to have higher action-figure prices. The merged dataset showed a clear relationship between visibility within the franchise and collector-market value.

* **Character Attributes Influence Value:** Species, gender, and other character attributes were associated with differences in average action-figure pricing. Less common or unique species typically carried higher price points, suggesting stronger collector interest.

* **High Variability in Action-Figure Prices:** The combined data revealed significant spread in pricing. Characters featured in multiple movies, series, or timelines generally had higher price ranges due to broader recognition and demand.

* **Name Standardization Was Critical:** Variations in character naming across CSVs, scraped tables, and API responses were a major obstacle. Fuzzy matching allowed datasets to be joined successfully, but results required manual checks to avoid false matches.

* **Data Cleaning Improved Consistency but Introduced Trade-offs:** Handling missing values, inconsistent fields, and type mismatches was necessary to unify the data. However, these transformations also highlighted risks of incorrect assumptions — especially when inferring relationships between similarly named characters.

* **Pipeline Robustness Improved Through Error Handling:** API retrieval and scraping steps included safeguards for unavailable endpoints and formatting differences. These mitigations prevented pipeline failures and ensured a complete integrated dataset for the final analysis.

* **Final Visualizations Provided Actionable Insights:** After loading all cleaned datasets into SQLite and performing SQL-based joins, the resulting visualizations helped surface collector trends, attribute-based price differences, and data-quality limitations that shaped the overall analysis.

---

## **Tools & Environment**

* Python 3.12
* pandas, NumPy
* matplotlib, seaborn
* SciPy for random generation
* Jupyter Lab / Notebook environment

---

## **Notebook & Supporting Files**<br/>
📓 [Jupyter Notebook](./notebooks/galactic-data-collector.ipynb)

---

## **How To Run**

> **Disclaimer:** These steps use **Windows PowerShell**. Adjust as needed for macOS or Linux.

1. **Clone the repository**

   ```bash
   git clone https://github.com/DarkWaterCDR/Data-Science-Projects.git
   ```

2. **Navigate to the project folder**

   ```bash
   cd galactic-data-collector
   ```

3. **Create a virtual environment**

   ```bash
   python -m venv .gdcenv
   ```

4. **Activate the environment**

   ```bash
   .gdcenv\Scripts\Activate.ps1
   ```

5. **Upgrade pip and install UV**

   ```bash
   python -m pip install --upgrade pip uv
   ```

6. **Install project dependencies**

   ```bash
   uv pip install -r requirements.txt -r requirements-dev.txt
   ```

7. **Launch Jupyter Lab**

   ```bash
   jupyter lab --ip=0.0.0.0 --port=8888 --no-browser --allow-root
   ```

8. **Run the notebook**

   Open and execute
   `notebooks\galactic-data-collector.ipynb`

---

## **Dataset Reference**

* SWAPI. (n.d.). *Star Wars API*. [https://swapi.dev/](https://swapi.dev/)

* ActionFigure411. (n.d.). *Kenner Star Wars Vintage Collection Price Guide*. [https://www.actionfigure411.com/star-wars/kenner-vintage-collection-price-guide.php](https://www.actionfigure411.com/star-wars/kenner-vintage-collection-price-guide.php)

* Star Wars Databank. (n.d.). *Star Wars Databank API (fan-maintained)*. [https://starwars-databank.vercel.app/](https://starwars-databank.vercel.app/)

---

## **References**

* VanderPlas, J. (2016). *Python Data Science Handbook*. O’Reilly Media.
* McKinney, W. (2022). *Python for Data Analysis* (3rd ed.). O’Reilly Media.
* Downey, A. B. (2014). *Think Stats* (2nd ed.). O’Reilly Media.

