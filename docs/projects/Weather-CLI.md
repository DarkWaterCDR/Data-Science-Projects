---
title: "Weather CLI: Building a Command-Line App with Modern Python Practices"
date: 2024-05-31
image: "images/Weather-CLI.png"
thumbnail: "images/Weather-CLI.png"
excerpt: "This project demonstrates how to build a professional-grade command-line application in Python that interacts with the OpenWeatherMap API.  It showcases Test-Driven Development (TDD), SOLID architecture, and containerization with Podman and Docker — giving junior engineers a hands-on introduction to modern software engineering principles."
tags:
  - Python
  - API Integration
  - TDD
  - Containerization
  - CLI
repo_url: "https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/weather-cli/Weather-CLI.md"
live_url: "https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/weather-cli/Weather-CLI.md"
order: 6
---

# **Weather CLI: Building a Command-Line App with Modern Python Practices**

## **Synopsis**

* **Purpose:** Develop a Python-based **command-line application** that retrieves real-time **weather data** using the **OpenWeatherMap API**, demonstrating professional software engineering principles such as **Test-Driven Development (TDD)**, **SOLID architecture**, and **containerization**.  
* **Methods:** Designed a modular system with clear separation of concerns across three layers: **API client**, **CLI interface**, and **application orchestrator**. Implemented unit and integration testing with **pytest** and **responses** to achieve **93% coverage**, and containerized the environment using **Podman** and **Docker** for cross-platform reproducibility.  
* **Scope:** Practical engineering project illustrating how small applications can integrate **third-party APIs** while maintaining **clean architecture**, **test automation**, and **deployment consistency** through containerization.  

---

## **Skills Demonstrated (Career-Focused)**

* **API Integration & Security:** Consumed the OpenWeatherMap REST API using HTTPS, applied API key management via environment variables, and implemented graceful error handling for invalid or missing responses.  
* **Software Design Principles:** Applied **SOLID** and **DRY** principles to separate concerns between user interface, data access, and orchestration layers.  
* **Test-Driven Development (TDD):** Implemented over 90 unit and integration tests with `pytest` and `responses` to validate functionality and ensure stable future extensions.  
* **Containerization:** Built reproducible environments using `Containerfile` compatible with **Podman** and **Docker**, enabling one-command setup and consistent behavior across systems.  
* **Cross-Platform Development:** Ensured that the same codebase runs identically across Windows, macOS, and Linux using containerization and dependency isolation.  
* **Error Handling & UX:** Developed clear user prompts, validation messages, and custom exception handling (`GeocodingError`, `WeatherAPIError`) to enhance reliability.  
* **Continuous Integration Readiness:** Established clear testing, linting, and static analysis tools (`ruff`, `mypy`, `bandit`) configured through `pyproject.toml`.  
* **Technical Communication:** Authored comprehensive documentation, Markdown-based articles, and clear project READMEs suitable for both academic and professional audiences.

[Explore the project on GitHub](https://github.com/DarkWaterCDR/Data-Science-Projects/blob/main/weather-cli/Weather-CLI.md)
