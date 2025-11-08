# Weather CLI

A simple, powerful command-line weather application that provides real-time weather information from anywhere in the United States using the OpenWeatherMap API.

## Features

- 🌍 **Multiple Search Methods**
  - Search by city and state (e.g., "Seattle, WA")
  - Search by US zip code (e.g., "98101")
  - Search by latitude and longitude coordinates

- 🌡️ **Flexible Temperature Units**
  - Celsius
  - Fahrenheit
  - Kelvin

- 💻 **User-Friendly Interface**
  - Interactive menu-driven navigation
  - Clear, formatted weather displays
  - Helpful error messages and validation

- 🔒 **Reliable & Secure**
  - Custom error handling for API failures
  - Environment-based API key management
  - Comprehensive test coverage (93% on core functionality)

## Project Scope

This application demonstrates:

- **Professional API Integration**: Secure communication with OpenWeatherMap's geocoding and weather services
- **Clean Code Architecture**: SOLID principles with modular, maintainable design
- **Modern Python Development**: Type hints, pytest testing, containerization support
- **Real-World Usability**: Handles edge cases, network errors, and invalid inputs gracefully

## Benefits

- **Quick Weather Checks**: Get instant weather updates without opening a browser
- **Multiple Locations**: Easily switch between different cities or coordinates
- **Offline Friendly**: Minimal dependencies, works in restricted environments
- **Developer-Friendly**: Well-documented code with comprehensive test suite
- **Cross-Platform**: Runs on Windows, Linux, and macOS (instructions for Windows PowerShell below)

## Prerequisites

- **Python 3.8 or higher** - [Download Python](https://www.python.org/downloads/)
- **uv package manager** - Fast, modern Python package installer
- **OpenWeatherMap API key** - Free tier available
- *Optional*: **Podman** for containerized deployment

## Quick Start (Windows PowerShell)

### Step 1: Install Python

1. Download Python 3.8 or higher from [python.org](https://www.python.org/downloads/)
2. During installation, **check "Add Python to PATH"**
3. Verify installation:

```powershell
python --version
```

### Step 2: Install uv Package Manager

Open PowerShell and run:

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

Close and reopen PowerShell after installation.

### Step 3: Download the Project

**Option A: Using Git**

```powershell
cd D:\Developer
git clone https://github.com/DarkWaterCDR/Data-Science-Projects.git
cd Data-Science-Projects\weather-cli
```

**Option B: Manual Download**

1. Download the project as a ZIP file from GitHub
2. Extract to your desired location (e.g., `D:\Developer\weather-cli`)
3. Open PowerShell and navigate to the folder:

```powershell
cd D:\Developer\weather-cli
```

### Step 4: Get Your Free API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account
3. Navigate to "API Keys" in your dashboard
4. Copy your API key

### Step 5: Configure API Key

1. Open the `.env` file in the project folder with any text editor
2. Replace `your_api_key_here` with your actual API key:

```text
OPENWEATHER_API_KEY=abc123your_actual_key_here
```

3. Save and close the file

### Step 6: Install and Run

```powershell
# Install the application
uv pip install -e .

# Run the weather CLI
uv run weather-cli
```

That's it! The interactive menu will guide you through getting weather information.

## Using the Application

## Using the Application

Once running, you'll see a menu with options:

1. **Select Temperature Units**: Choose Celsius, Fahrenheit, or Kelvin
2. **Choose Search Method**:
   - Search by City and State (e.g., "Seattle, WA")
   - Search by ZIP Code (e.g., "98101")
   - Search by Coordinates (latitude and longitude)
3. **Enter Location Details**: Follow the prompts for your chosen search method
4. **View Weather**: Get current temperature, conditions, and location details

### Example Session

```text
=== Weather Information CLI ===

Select temperature units:
1. Celsius
2. Fahrenheit
3. Kelvin
Enter your choice (1-3): 2

Search Options:
1. Search by City/State
2. Search by Zip Code
3. Search by Coordinates
4. Quit
Enter your choice (1-4): 1

Enter city name: Seattle
Enter state (e.g., WA): WA

Weather Information for Seattle, WA:
Temperature: 54°F
Conditions: Partly cloudy
Coordinates: 47.6062, -122.3321
```

## Advanced Options

### Running with Podman (Containerized)

For isolated, reproducible deployments:

```powershell
# Build the container
podman build -f Containerfile -t weather-cli .

# Run interactively
podman run -it --rm -v ${PWD}/.env:/app/.env weather-cli
```

**Note**: The `-v ${PWD}/.env:/app/.env` flag mounts your local `.env` file into the container.

## Project Structure

```text
weather-cli/
├── src/
│   └── weather_cli/
│       ├── __init__.py       # Package initialization
│       ├── main.py           # Application entry point
│       ├── weather_api.py    # OpenWeatherMap API client
│       └── cli.py            # User interface helpers
├── tests/
│   └── test_refactored_weather_cli.py  # Test suite (93% coverage)
├── .env                      # API key configuration
├── pyproject.toml            # Project dependencies
├── Containerfile             # Container definition
└── README.md                 # This file
```

## API Information

This application uses the **OpenWeatherMap API**:

- **Free Tier**: 1,000 API calls per day
- **Coverage**: Global weather data
- **Frequency**: Real-time updates
- **Documentation**: [OpenWeatherMap Docs](https://openweathermap.org/api)

### Current Limitations

- US locations only (city/state and ZIP code searches)
- Current weather only (no forecasts in this version)
- Requires active internet connection
- Rate limited by OpenWeatherMap's free tier

## Development

### For Developers

If you want to contribute or modify the code:

```powershell
# Install with development dependencies
uv pip install -e ".[dev]"

# Install pre-commit hooks (runs quality checks automatically)
uv run pre-commit install
```

### Running Tests

```powershell
# Install test dependencies
uv pip install -e ".[test]"

# Run all tests
uv run pytest

# Run with coverage report
uv run pytest --cov=weather_cli --cov-report=html

# Run specific test
uv run pytest tests/test_refactored_weather_cli.py::TestWeatherData
```

### Code Quality Tools

The project includes several quality assurance tools:

- **ruff**: Fast Python linter and formatter
- **isort**: Import statement organizer
- **mypy**: Static type checker
- **bandit**: Security vulnerability scanner
- **pre-commit**: Automated quality checks on commit

Run quality checks manually:

```powershell
# Check code style
uv run ruff check .

# Format code
uv run ruff format .

# Type checking
uv run mypy .

# Security scan
uv run bandit -r src/

# Run all pre-commit hooks
uv run pre-commit run --all-files
```

## Troubleshooting

### API Key Issues

- Ensure your `.env` file contains a valid `OPENWEATHER_API_KEY`
- Check that your API key is active (may take a few hours after registration)
- Verify you haven't exceeded the free tier rate limits
- Make sure there are no extra spaces or quotes around the API key

### Python/uv Installation Issues

- Verify Python is in your PATH: `python --version`
- Restart PowerShell after installing Python or uv
- Try running PowerShell as Administrator if you encounter permission errors
- Ensure you're using Python 3.8 or higher

### Container Issues

- Ensure Podman is properly installed and running
- Check that the `.env` file exists in your project directory
- Verify the container image built successfully
- Use `podman logs <container_id>` to view error messages

### Network/Connection Issues

- Verify your internet connection is active
- Check if your firewall is blocking the application
- Some corporate networks may block API calls
- Try a different network if issues persist

### Location Not Found

- Verify spelling of city names and state abbreviations
- Use official 2-letter state codes (e.g., "WA" not "Washington")
- ZIP codes must be valid 5-digit US postal codes
- Latitude/longitude must be in decimal format

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Run quality checks (`uv run pre-commit run --all-files`)
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues, questions, or suggestions:

- Create an issue on GitHub
- Check existing issues for solutions
- Review the OpenWeatherMap API documentation

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Built with Python and modern development tools
- Tested with pytest and comprehensive test coverage

---

**Version**: 2.0
**Last Updated**: January 2025
**Python**: 3.8+
**Platform**: Windows, Linux, macOS
