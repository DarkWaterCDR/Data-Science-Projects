"""
Weather CLI Main Application

Simplified, SOLID-compliant main application.
Clean separation of concerns with dependency injection.
"""

import os

from dotenv import load_dotenv

from weather_cli.cli import (
    clear_screen,
    get_city_state,
    get_coordinates,
    get_zip_code,
    show_menu,
)
from weather_cli.weather_api import (
    GeocodingError,
    OpenWeatherAPI,
    UnitType,
    WeatherAPIError,
)

load_dotenv()


UNIT_MAP: dict[int, tuple[UnitType, str]] = {
    1: ("metric", "°C"),
    2: ("imperial", "°F"),
    3: ("standard", "°K"),
}

WELCOME_MESSAGE = """
╔═══════════════════════════════════════╗
║     Weather CLI - OpenWeatherMap      ║
║   Current weather for US locations    ║
╚═══════════════════════════════════════╝
"""


def main() -> None:
    """Main application entry point."""
    api_key = os.getenv("OPENWEATHER_API_KEY")

    if not api_key:
        print(
            "\nError: OPENWEATHER_API_KEY environment variable not set.\n"
            "Please add your API key to the .env file.\n"
        )
        raise SystemExit(1)

    with OpenWeatherAPI(api_key) as api:
        print(WELCOME_MESSAGE)

        unit_choice = show_menu(
            "Select Temperature Units:",
            ["Celsius (°C)", "Fahrenheit (°F)", "Kelvin (°K)"],
        )

        units, suffix = UNIT_MAP[unit_choice]

        while True:
            try:
                clear_screen()
                search_type = show_menu(
                    "How would you like to search?",
                    [
                        "City and State",
                        "Zip Code",
                        "Latitude and Longitude",
                    ],
                )

                if search_type == 1:
                    city, state = get_city_state()
                    clear_screen()
                    print(f"Searching for {city}, {state}...")
                    lat, lon = api.geocode_city(city, state)

                elif search_type == 2:
                    zip_code = get_zip_code()
                    clear_screen()
                    print(f"Searching for zip code {zip_code}...")
                    lat, lon = api.geocode_zip(zip_code)

                else:
                    lat, lon = get_coordinates()
                    clear_screen()
                    print(f"Searching for coordinates ({lat}, {lon})...")

                weather = api.get_weather(lat, lon, units)
                print(weather.display(suffix))

            except GeocodingError as e:
                print(f"\nGeocoding Error: {e}")

            except WeatherAPIError as e:
                print(f"\nWeather API Error: {e}")

            except KeyboardInterrupt:
                print("\n\nExiting...")
                raise SystemExit(0) from None

            except Exception as e:
                print(f"\nUnexpected Error: {e}")

            response = (
                input("\nPress Enter to search again, or 'q' to quit: ").strip().lower()
            )
            if response == "q":
                print("\nGoodbye!")
                break


if __name__ == "__main__":
    main()
