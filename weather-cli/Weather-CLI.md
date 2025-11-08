# **Weather CLI: A Python Command-Line Application for Real-Time Weather Data**

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

---

## **Key Features**

* Multi-method search: query by city/state, ZIP code, or GPS coordinates.  
* Flexible temperature units (Celsius, Fahrenheit, Kelvin).  
* User-friendly CLI with interactive menus and data validation.  
* Exception handling for API errors, timeouts, and invalid input.  
* Container-ready environment for rapid deployment and demonstration.  
* Comprehensive test coverage ensuring robust and maintainable code.  

---

## **Tools & Environment**

* **Language:** Python 3.12  
* **Core Libraries:** `requests`, `python-dotenv`, `pytest`, `responses`, `ruff`, `mypy`  
* **Containerization:** Podman / Docker  
* **Development Tools:** `uv` package manager, pre-commit hooks for linting and security checks  
* **Testing Framework:** `pytest` with mocked API responses and coverage reporting  

---

## **Paper and Presentation:**<br/>
📓 [Weather CLI Article](./weather-cli-article.md)

---

## **How To Run**

> **Disclaimer:**  
> The following instructions are for **Windows PowerShell**.  
> Commands may need to be adjusted for macOS or Linux terminals.

1. **Clone the repository**

   ```powershell
   git clone https://github.com/DarkWaterCDR/Data-Science-Projects.git
   cd Data-Science-Projects\weather-cli
   ```

2. **Create and activate a virtual environment**

   ```powershell
   python -m venv .wenv
   .\.wenv\Scripts\Activate.ps1
   ```

3. **Install dependencies**

   ```powershell
   python -m pip install --upgrade pip uv
   uv pip install -e .[dev]
   ```

4. **Add your OpenWeatherMap API key**

   ```text
   OPENWEATHER_API_KEY=your_api_key_here
   ```

   Save this line inside a `.env` file located in the project root directory.

5. **Run the application**

   ```powershell
   uv run weather-cli
   ```

6. **Run tests**

   ```powershell
   uv run pytest
   ```

7. **Run inside a container (optional)**

   ```powershell
   podman build -f Containerfile -t weather-cli .
   podman run -it --rm -v ${PWD}/.env:/app/.env weather-cli
   ```

---

## **Planned Extensions**

* Add **forecast retrieval** (3-day, 7-day) and **weather alerts** via additional OpenWeatherMap endpoints.  
* Integrate **historical weather data** to demonstrate time-series analysis.  
* Extend CLI to export data as JSON or CSV for use in data pipelines.  
* Add **continuous integration (CI)** workflow with automated tests and container builds.  

---

## **References**

* [OpenWeatherMap API Documentation](https://openweathermap.org/api)  
* [pytest Documentation](https://docs.pytest.org)  
* [Podman User Guide](https://podman.io)  
* [Docker Documentation](https://docs.docker.com)  
* [uv Package Manager](https://astral.sh/uv)  
* [Python 3.12 Official Documentation](https://docs.python.org/3/)
