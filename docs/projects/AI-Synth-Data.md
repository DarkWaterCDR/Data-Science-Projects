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
title: "AI Synthetic Data Generator: Fine-Tuned LLM for Auto Insurance Policies"
date: 2025-05-24
image: "images/AI-Synth-Data.png"
thumbnail: "images/AI-Synth-Data.png"
excerpt: "This project develops a synthetic data generation tool for auto insurance policies using fine-tuned large language models to produce structured JSON outputs adhering to a predefined schema, enabling testing and evaluation without proprietary data disclosure."
tags:
  - AI
  - Machine Learning
  - Data Generation
  - LLM Fine-Tuning
repo_url: "https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/ai-synthetic-data/AI-Synthetic-Data.md"
live_url: "https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/ai-synthetic-data/AI-Synthetic-Data.md"
order: 3
---

# **AI Synthetic Data Generator: Fine-Tuned LLM for Auto Insurance Policies**

## **Synopsis**

* **Purpose:** Deliver a synthetic data generation tool for auto insurance policies using fine-tuned large language models to produce structured JSON outputs that adhere to a predefined schema, enabling testing and evaluation of insurance policy configurations without proprietary data disclosure.
* **Methods:** Fine-tune a pre-trained GPT model on synthetic input/output pairs, then deploy a Streamlit application for interactive generation of policy data based on user-defined scenarios.
* **Scope:** Bellevue University DSC670 capstone project demonstrating LLM fine-tuning techniques, synthetic data creation for domain-specific applications, and practical deployment of AI-powered tools for insurance analytics.

---

## **Skills Demonstrated (Career-Focused)**

* **LLM Fine-Tuning & Prompt Engineering:** Custom training of GPT models on domain-specific datasets to generate structured, schema-compliant outputs for insurance policy data.
* **Synthetic Data Generation:** Creation of realistic, anonymized datasets for testing and modeling purposes, ensuring data privacy and compliance.
* **Data Schema Design & Validation:** Definition and enforcement of JSON schemas for complex, multi-entity data structures (policies, drivers, vehicles, billing).
* **Interactive Application Development:** Building user-friendly Streamlit interfaces for AI model interaction and data export.
* **API Integration & Environment Management:** Secure handling of OpenAI API keys, environment configuration, and dependency management using modern Python tools.

[Take me to the project](https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/ai-synthetic-data/AI-Synthetic-Data.md)