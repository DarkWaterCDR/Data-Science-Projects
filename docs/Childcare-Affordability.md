# **Childcare Affordability in America: A Data-Driven Perspective**

## **Synopsis**

* **Purpose:** Explore the **affordability of childcare** in the United States using data from the **National Database of Childcare Prices (NDCP)** and related socioeconomic indicators. The analysis examines how childcare costs relate to **household income**, **urbanization**, **labor participation**, and **race/ethnicity** to understand the drivers and disparities of childcare affordability.
* **Methods:** Combined NDCP data with **Census** and **Bureau of Labor Statistics (BLS)** datasets, normalized prices to **constant 2018 dollars**, and analyzed correlations and patterns across geographic and demographic dimensions. Key visualizations include **time trends**, **urbanization cost gradients**, **labor participation heatmaps**, and **race/ethnicity correlations**.
* **Scope:** A descriptive, data-driven exploration supporting evidence-based policy discussions on childcare access and affordability.

---

## **Skills Demonstrated (Career-Focused)**

* **Data Integration & Cleaning:** Merging heterogeneous national datasets, handling missing values, and normalizing monetary data for inflation.
* **Exploratory Data Analysis (EDA):** Trend visualization, comparative segmentation by geography and demographics, and statistical summaries.
* **Policy Analytics:** Linking affordability measures to labor market outcomes and highlighting potential policy implications.
* **Data Visualization:** Developed clear, story-driven charts for cost trends, affordability ratios, and demographic heatmaps.
* **Reproducible Research:** Structured notebook flow consistent with academic and professional communication standards.
* **Technical Writing:** Synthesized analysis results into a cohesive narrative aligning with an academic article and presentation.

---

## **Key Findings**

* **Childcare costs have risen faster than household incomes** between 2009–2018, widening the affordability gap.
* **Urbanization drives higher costs** — large metro areas (1M+ population) exhibit nearly **2×** the prices of rural communities.
* **Labor participation, especially among mothers, declines** as childcare costs rise, suggesting affordability barriers to employment.
* **Racial and ethnic disparities exist:** Asian and multiracial families show the highest cost correlations, while White families show lower correlations—indicating possible differences in access or care type preferences.
* **Policy Implication:** Data limitations hinder causal inference; enhanced data collection is critical to inform equitable policy.

---

## **Tools & Environment**

* Python 3.12
* pandas, NumPy, matplotlib, seaborn, plotly, scikit-learn
* Jupyter Lab for reproducible analysis and visualization
* NDCP, U.S. Census Bureau, and BLS data sources

---

**Paper and Presentation:**<br/>
📓 [Jupyter Notebook - Analysis & Visualizations](./notebooks/childcare-affordability.ipynb)<br/>
📘 [Research Article](./supporting-docs/Childcare-Affordability-Article.pdf)<br/>
🎞 [Presentation Slides](./supporting-docs/Childcare-Affordability-Presentation.pdf)

---

## **How To Run**

> **Disclaimer:** Commands are written for **Windows PowerShell**. Adapt as needed for macOS or Linux.

1. **Clone the repository**

   ```bash
   git clone https://github.com/DarkWaterCDR/Data-Science-Projects.git
   ```

2. **Navigate to the project folder**

   ```bash
   cd childcare-affordability
   ```

3. **Create a virtual environment**

   ```bash
   python -m venv .caenv
   ```

4. **Activate the environment**

   ```bash
   .caenv\Scripts\Activate.ps1
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
   `notebooks\childcare-affordability.ipynb`

---

## **Dataset References**

U.S. Department of Labor, Women’s Bureau. (2023). *National Database of Childcare Prices (NDCP)*.
[https://www.dol.gov/agencies/wb/topics/featured-childcare](https://www.dol.gov/agencies/wb/topics/featured-childcare)

U.S. Census Bureau. (2023). *American Community Survey (ACS) Income and Demographics*.
[https://www.census.gov/programs-surveys/acs](https://www.census.gov/programs-surveys/acs)

Bureau of Labor Statistics. (2023). *Labor Force Participation and Unemployment Data*.
[https://www.bls.gov](https://www.bls.gov)
