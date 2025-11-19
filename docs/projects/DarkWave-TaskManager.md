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
title: "DarkWave Task Manager: AI-Powered Todoist Assistant"
date: 2025-11-18
image: "images/DarkWave-TaskManager.png"
thumbnail: "images/DarkWave-TaskManager.png"
excerpt: "This project explores the integration of a large language model into a task-management application using Google’s Gemini API and the Todoist platform. The implementation focuses on the challenges of connecting probabilistic LLM outputs with deterministic system requirements through careful validation, modular software architecture, and containerized deployment. The analysis highlights how modern Python tooling, structured prompts, and error-resilient design patterns support reliable task creation and retrieval through natural language. The project serves as a practical demonstration of AI-assisted workflow automation and the engineering considerations required to make these systems trustworthy. Click the tile to explore the project artifacts."
tags:
  - LLM
  - Todoist
  - Streamlit
  - Containerization
  - DevOps
repo_url: "https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/darkwave-taskmanager/DarkWave-TaskManager.md"
live_url: "https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/darkwave-taskmanager/DarkWave-TaskManager.md"
order: 2
---

# **DarkWave Task Manager: AI-Powered Todoist Assistant**

## **Synopsis**

* **Purpose:** Deliver a natural-language interface for Todoist that uses Google Gemini and Streamlit to create, preview, and retrieve tasks without manual form-filling.
* **Methods:** Routes user input through three conversation modes—Chat, Retrieve, and Create—using pattern-based detection and structured prompts so the LLM can extract priorities, due dates, and labels before calling the Todoist API.
* **Scope:** Bellevue University capstone demonstrating LLM-powered productivity tooling with secure API key handling and container-ready deployment paths.

---

## **Skills Demonstrated (Career-Focused)**

* **LLM Integration & Prompt Design:** Gemini-powered parsing of free-form text into structured task payloads, including priority and labeling logic.
* **Conversational UX:** Streamlit chat-style UI with deterministic responses for greetings/help and AI-driven task flows.
* **API Client Development:** Robust Todoist client with validation, previews, and error handling for authentication and creation flows.
* **Testing Strategy:** 83 unit tests (including 24 mode-detection cases) plus Playwright UI suites to verify chat ↔ retrieve ↔ create transitions.
* **Containerization & DevOps:** Podman/Docker builds, environment-based configuration, and Streamlit theming via `.streamlit/config.toml`.


[Take me to the project](https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/darkwave-taskmanager/DarkWave-TaskManager.md)