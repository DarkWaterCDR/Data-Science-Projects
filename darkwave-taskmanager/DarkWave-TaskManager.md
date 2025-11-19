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

---

## **Key Features**

* **AI-Powered Parsing:** Gemini interprets natural language, extracts intent, and maps it to Todoist-ready tasks with priorities, due dates, and labels.
* **Conversational Interface:** Users can greet, ask capability questions, or request tasks with friendly, template-driven responses for common phrases.
* **Smart Retrieval:** Query active tasks with flexible phrasings like “what tasks do I have?” or “show tasks due today.”
* **Task Preview & Safety:** Parsed tasks are previewed before creation to confirm details and reduce mistakes.​
* **Secure & Configurable:** All secrets stay in environment variables, with validation for required keys and optional tuning for model/temperature and logging level.

---

## **Tools & Environment**

* **Python 3.13+** with **Streamlit** UI, structlog logging, and uv for dependency management.
* **Google Gemini** for LLM parsing and **Todoist API** for task storage/retrieval.
* **Podman/Docker** Containerfile for reproducible builds and non-root runtime.
* **Playwright + Pytest** for UI and unit test coverage across mode detection and workflows.

---

## **Paper and Presentation:**

📓 [GitHub Repository](https://github.com/DarkWaterCDR/DarkWave-TaskManager)<br/>
📘 [Research Article](./supporting-docs/DarkWave-TaskManager.pdf)<br/>
🎞 [Presentation Slides](./supporting-docs/DarkWave-TaskManager-Presentation.pdf)

---

## **How To Run**

### 1. Clone and Setup

```powershell
git clone git@github.com:DarkWaterCDR/DarkWave-TaskManager.git
```

```powershell
cd DarkWave-TaskManager
```

### 2. Install uv (recommended)

```powershell
# Install uv if not already installed
# See https://docs.astral.sh/uv/getting-started/installation/
```

### 3. Configure Environment Variables

Copy the example environment file and add your API keys:

```powershell
cp .env.example .env
```

Edit `.env` and add:
```
TODOIST_API_TOKEN=your_todoist_api_token_here
GOOGLE_API_KEY=your_google_api_key_here
GEMINI_MODEL=gemini-2.5-flash
GEMINI_TEMPERATURE=0.3
LOG_LEVEL=INFO
```

**Getting API Keys:**
- **Todoist**: https://todoist.com/app/settings/integrations/developer
- **Google AI**: https://ai.google.dev/

### 4. Run Locally

Install dependencies with uv:
```powershell
uv sync --all-extras
```

Run the application:
```powershell
uv run streamlit run app/main.py
```

Or use traditional pip (not recommended):
```powershell
pip install -e ".[dev]"
streamlit run app/main.py
```

Open your browser to http://localhost:8501

### 5. Run with Container

Build the container image:
```powershell
podman build -t darkwave-taskmgr .
```

Run the container with environment file:
```powershell
podman run -p 8501:8501 --env-file .env darkwave-taskmgr
```

Or pass environment variables directly:
```powershell
podman run -p 8501:8501 `
  -e TODOIST_API_TOKEN=your_token `
  -e GOOGLE_API_KEY=your_key `
  darkwave-taskmgr
```

Access the application at http://localhost:8501

---

## API & Configuration References

* [Todoist Developer Portal](https://todoist.com/app/settings/integrations/developer)
* [Google AI (Gemini)](https://ai.google.dev/gemini-api)
* [Streamlit](https://streamlit.io/)
* [LangChain](https://docs.langchain.com/oss/python/langchain/overview)