# **AI Synthetic Data Generator: Fine-Tuned LLM for Auto Insurance Policies**

## **Synopsis**

* **Purpose:** Deliver a synthetic data generation tool for auto insurance policies using fine-tuned large language models to produce structured JSON outputs that adhere to a predefined schema, enabling testing and evaluation of insurance policy configurations without proprietary data disclosure.
* **Methods:** Fine-tune a pre-trained GPT model on synthetic input/output pairs, then deploy a Streamlit application for interactive generation of policy data based on user-defined scenarios.
* **Scope:** Demonstrate LLM fine-tuning techniques, synthetic data creation for domain-specific applications, and practical deployment of AI-powered tools for insurance analytics.

---

## **Skills Demonstrated (Career-Focused)**

* **LLM Fine-Tuning & Prompt Engineering:** Custom training of GPT models on domain-specific datasets to generate structured, schema-compliant outputs for insurance policy data.
* **Synthetic Data Generation:** Creation of realistic, anonymized datasets for testing and modeling purposes, ensuring data privacy and compliance.
* **Data Schema Design & Validation:** Definition and enforcement of JSON schemas for complex, multi-entity data structures (policies, drivers, vehicles, billing).
* **Interactive Application Development:** Building user-friendly Streamlit interfaces for AI model interaction and data export.
* **API Integration & Environment Management:** Secure handling of OpenAI API keys, environment configuration, and dependency management using modern Python tools.

---

## **Key Features**

* **Schema-Driven Generation:** Produces JSON data strictly conforming to a detailed auto insurance policy schema, including nested entities for drivers, vehicles, and billing information.
* **Fine-Tuned Model Performance:** Custom-trained model achieves high accuracy in generating realistic policy scenarios with proper data types and relationships.
* **Interactive Scenario Input:** Users can describe specific policy scenarios (e.g., driver age, accident history) to generate tailored synthetic datasets.
* **Batch Generation & Export:** Generate multiple policies at once and download results as JSON files for further analysis or integration.
* **Secure & Configurable:** Environment-based API key management with validation and error handling for robust operation.

---

## **Tools & Environment**

* Python 3.13+
* openai, streamlit, dotenv, tiktoken
* Jupyter Lab for training workflows
* OpenAI API for LLM access

---

**Paper and Presentation:**<br/>
📓 [Jupyter Notebook - Training & Evaluation](./milestone3/ai-synth-data-trainer-notebook.ipynb)<br/>
📓 [Jupyter Notebook - App Overview](./milestone4/ai-synth-data-app-notebook.ipynb)<br/>
📓 [Streamlit App - Data Generation](./milestone4/ai-synth-data-app.py)<br/>
📘 [Research Proposal and Discussion](./milestone4/ai-synth-data-app.pdf)<br/>
🎞  [Walkthrough Video](./milestone4/ai-synth-data-app-video-walkthrough.pdf)

---

## **How To Run**

> **Disclaimer:** Commands are written for **Windows PowerShell**. Adapt as needed for macOS or Linux.<br/><br/>
> **COST DISCLOSURE:** <br/>* There is a **cost associated** with fine-tuning and using OpenAI models. <br/>* Ensure you monitor your usage to **avoid unexpected charges**.<br/> * Costs for fine-tuning and API calls can be found on the [OpenAI Pricing Page](https://platform.openai.com/docs/pricing?latest-pricing=priority). Check the model's Fine-Tuning section for specific details.

1. **Clone the repository**

   ```bash
   git clone https://github.com/DarkWaterCDR/Data-Science-Projects.git
   ```

2. **Navigate to the project folder**

   ```bash
   cd ai-synthetic-data
   ```

3. **Create a virtual environment**

   ```bash
   python -m venv .aienv
   ```

4. **Activate the environment**

   ```bash
   .aienv\Scripts\Activate.ps1
   ```

5. **Upgrade pip**

   ```bash
   python -m pip install --upgrade pip
   ```

6. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

7. **Copy the example environment file and set your OpenAI API key**

   ```bash
   copy .env.example .env
   ```

   Then, edit the `.env` file to add your OpenAI API key:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   BASE_MODEL_NAME=gpt-4o-mini-2024-07-18
   MODEL_SUFFIX=darkwave-synthetic-data-v1
   STREAMLIT_SERVER_HEADLESS=true

   # Update after fine-tuning your model
   OPENAI_MODEL_NAME=your_fine_tuned_model_name_here
   ```

7. **Launch Jupyter Lab**

   ```bash
   jupyter lab --ip=0.0.0.0 --port=8888 --no-browser --allow-root
   ```

8. **Run the notebook**<br/>
   Open and execute training notebook:<br/>
   `./milestone3/ai-synth-data-trainer-notebook.ipynb`

   After training, open and execute:<br/>
   `./milestone4/ai-synth-data-app-notebook.ipynb`
   
**Alternatively, to run the Streamlit app directly:**

7. **Run the Streamlit application**

   ```bash
   streamlit run milestone4/ai-synth-data-app.py
   ```

   Open your browser to http://localhost:8501

---

## **Dataset References**

OpenAI. (2024). *OpenAI API Documentation*.
[https://platform.openai.com/docs](https://platform.openai.com/docs)

JSON Schema. (2023). *JSON Schema Specification*.
[https://json-schema.org/](https://json-schema.org/)

Tiktoken. (2024). *Tiktoken Library for Tokenization*.
[https://github.com/openai/tiktoken](https://github.com/openai/tiktoken)