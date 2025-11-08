---
title: "Weather CLI: Building a Command-Line App with Modern Python Practices"
date: 2025-11-08
image: "images/Project-WeatherCLI.png"
thumbnail: "images/Project-WeatherCLI.png"
excerpt: "This project demonstrates how to build a professional-grade command-line application in Python that interacts with the OpenWeatherMap API.  It showcases Test-Driven Development (TDD), SOLID architecture, and containerization with Podman and Docker — giving junior engineers a hands-on introduction to modern software engineering principles."
tags:
  - Python
  - API Integration
  - TDD
  - Containerization
  - CLI
repo_url: "https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/weather-cli/Weather-CLI.md"
live_url: "https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/weather-cli/Weather-CLI.md""
order: 5
---

# **Weather CLI: Building a Command-Line App with Modern Python Practices**

## **Synopsis**

* **Purpose:**  Demonstrate how to build a real-world Python application that interacts with a third-party REST API while following modern software engineering practices.

* **Methods:**  Implemented using a modular, maintainable architecture with clear separation of concerns:  
  - `weather_api.py` handles API requests, geocoding, and data validation.  
  - `cli.py` manages user input, menu navigation, and error-proof interaction.  
  - `main.py` coordinates user choices, API responses, and formatted terminal output.  
* Secure environment management was achieved with `.env` configuration files and environment variables to protect API keys.  
* The application was developed with **TDD**, using `pytest` and `responses` to mock API calls and achieve over **93% test coverage**.  
* A **Containerfile** supports deployment through **Podman** or **Docker**, ensuring consistent runtime environments and reproducibility across Windows, Linux, and macOS systems.

* **Scope:**  The Weather CLI provides a complete example of a containerized, testable, and maintainable command-line tool that interacts with a live web service.  While the current version focuses on **current weather conditions** in U.S. locations, the architecture supports expansion into **forecasts**, **historical weather**, and **alert systems**.  Beyond its functional goals, the project serves as a **learning framework** for students and junior developers to explore professional software practices in a small-scale, approachable environment.

---

## **Skills Demonstrated (Career-Focused)**

* **API Integration & Security:** Interfacing with OpenWeatherMap’s REST API, handling authentication, and protecting keys via `.env` environment configuration.  
* **Software Design Principles:** Applying SOLID and DRY concepts to structure reusable and maintainable code modules.  
* **Testing & Automation:** Implementing unit and integration tests with `pytest` and `responses` to achieve 93% test coverage, validating both normal and failure paths.  
* **Containerization:** Building and running reproducible environments using `Containerfile` compatible with both Podman and Docker, promoting DevOps readiness.  
* **Error Handling & UX Design:** Creating a robust CLI experience with clear prompts, validation, and custom exception handling for user-friendly error recovery.  
* **Cross-Platform Deployment:** Demonstrating portability through containerization and dependency management via `uv` and `pyproject.toml`.  
* **Technical Documentation:** Writing clear setup guides, architecture explanations, and Markdown-based publication materials for GitHub and Medium.

[Explore the project on GitHub](https://github.com/DarkWaterCDR/Data-Science-Projects/tree/main/weather-cli)
