# Building a Weather App That Engineers Actually Respect: Lessons in APIs, Testing, and Containers

Have you ever needed to quickly check the weather while working in your terminal — without breaking your flow to open a browser or unlock your phone? That’s exactly what inspired this project: a simple, dependable **command-line weather app** built with Python, designed as a playground for modern software-engineering practices.

This isn’t just another “fetch-and-print” tutorial. It’s a compact, production-style project that demonstrates how to design, test, and deploy API-driven software the way professionals do it — using **TDD**, **containerization**, and clean-architecture principles like **DRY** and **SOLID**.

## 💡 The Idea

The goal was simple:  
Build a command-line tool that lets users type:

```bash
weather-cli
```

and get the current temperature and conditions for any U.S. location — by **city**, **ZIP code**, or **coordinates** — straight from the **[OpenWeatherMap API](https://openweathermap.org/api)**.

It should be reliable, readable, secure, and easy to deploy anywhere — from a developer’s laptop to a cloud container.

## 🌤 Why This Project Matters

For many new developers, tutorials jump straight from “Hello World” to “Here’s a massive web app.”  
What’s missing is that middle ground — a small project that forces you to think about architecture, testability, and deployment without drowning in complexity.

The Weather CLI fills that gap. It’s a fully working example that demonstrates how to structure real software — the kind that plays well with others, survives bad input, and doesn’t collapse when the network sneezes.

It also answers a common question among early-career engineers:

> “How do I go from writing code that *works* to writing code that’s *maintainable, testable, and portable*?”

## 🧩 Designing the Application

The project is intentionally simple but built like a real product.  
It’s split into three logical layers:

### `weather_api.py` – The Data Layer
Handles all interaction with the OpenWeatherMap API, including geocoding (city, ZIP, coordinates) and fetching current weather data.  
Each response is wrapped in a `WeatherData` class that formats and displays results cleanly.

### `cli.py` – The User Interface Layer
Manages the interactive terminal menu — validating inputs, prompting the user, and preventing common errors  
(for example, it won’t let you enter a ZIP code with fewer than five digits).

### `main.py` – The Orchestrator
Wires everything together. It loads the API key, handles errors gracefully, and gives users the option to repeat or quit.

This layout follows the **Single Responsibility Principle** (the “S” in SOLID): every file has one clear purpose, and each function does one thing well.

## 🧪 Writing Code You Can Trust: TDD and Testing

Most junior developers know they *should* test — but it’s not always clear what that means in practice.  
In this project, testing isn’t an afterthought — it’s the blueprint.

Before writing each function, we wrote a test describing its expected behavior.  
For example:
- What happens if the API returns an empty response?  
- What if the user enters invalid coordinates?  
- What if the API key is missing?

By following **Test-Driven Development (TDD)**, we created a full suite of unit and integration tests using [`pytest`](https://docs.pytest.org) and [`responses`](https://github.com/getsentry/responses).  

Run all tests with:
```bash
uv run pytest
```

You’ll see a wall of green.  
The project maintains over **93% test coverage**, meaning almost every line of code is verified by automated tests.

That’s not just bragging rights — it’s peace of mind when refactoring or extending functionality.

## 🧱 Keeping It Clean: DRY and SOLID Principles

Codebases decay when logic gets duplicated and functions start doing too much.  
This app avoids that by sticking to **DRY** (Don’t Repeat Yourself) and **SOLID** design principles:

- **Single Responsibility:** Each module does one job — no mixing UI with data retrieval.  
- **Open/Closed Principle:** Adding new API endpoints or unit options requires minimal change.  
- **Dependency Injection:** The main function passes dependencies explicitly for testability.  
- **DRY:** Shared validation and error logic live in helpers, not duplicated everywhere.

For new engineers, this project makes these ideas tangible. You can literally see where separation of concerns pays off — tests run faster, debugging is easier, and the code reads like a story instead of a mystery.

## 🐳 Running Anywhere: Containerization with Podman or Docker

Every developer has hit the dreaded “works on my machine” problem.  
To eliminate that, the Weather CLI ships with a lightweight container configuration compatible with **Podman** and **Docker**.

The `Containerfile` defines a reproducible build that:
- Installs Python and dependencies via `pyproject.toml`
- Copies only the necessary code into the image
- Runs the CLI automatically when launched

Build and run the container:

```bash
podman build -t weather-cli .
podman run -it --rm -v ${PWD}/.env:/app/.env weather-cli
```

Mounting the local `.env` file at runtime keeps your API key secure and outside the image.  
Podman was chosen for its **daemonless architecture** and strong security, but Docker works just as well.

Containerization ensures this app behaves *identically* on Windows, macOS, or Linux — a huge win for reproducibility.

## ⚙️ Error Handling: Because the Internet Is Messy

APIs fail. Networks drop. Users mistype things.  

This app handles all of it gracefully.  
If a city isn’t found, it shows a friendly message instead of a stack trace.  
If the API key is missing or invalid, it exits cleanly with a clear explanation.

These improvements come from wrapping API calls in custom exceptions (`GeocodingError`, `WeatherAPIError`) and catching them at the top level.  
It’s a small touch that makes the whole experience feel professional.

## 🧭 Lessons for New Engineers

Building this project reinforced some key truths:

1. **Start small, but think big.** Even a CLI app can teach enterprise-level design habits.  
2. **Tests are your safety net.** Confidence to refactor is a superpower.  
3. **Containers are the great equalizer.** If it runs in a container, it runs anywhere.  
4. **Good architecture beats clever code.** Maintainable always beats magical.

These principles apply to every domain — data science, web apps, automation, or backend systems.  

## 🚀 What’s Next

The current version focuses on current conditions, but the same structure could easily support:
- 7-day forecasts  
- Weather alerts  
- Historical data exports  
- JSON or CSV output for automation  

Because the architecture is modular and well-tested, adding these features doesn’t require rewriting the core. That’s the payoff for building it right.

## 💭 Final Thoughts

The Weather CLI might be a small tool, but it represents a big idea:  
**Software engineering is a craft, not a checklist.**

By testing, containerizing, and structuring this app like a real product, you’re learning how to build code that other engineers trust — and that you’ll be proud to maintain.

So clone it, tweak it, break it, rebuild it — and let this be your first step from “tutorial coder” to *software engineer.*

## 🧰 References and Tools

- [OpenWeatherMap API](https://openweathermap.org/api)  
- [pytest Documentation](https://docs.pytest.org)  
- [Podman User Guide](https://podman.io)  
- [Docker Documentation](https://docs.docker.com)  
- [uv Package Manager](https://astral.sh/uv)  
- [Python 3.12 Docs](https://docs.python.org/3/)
