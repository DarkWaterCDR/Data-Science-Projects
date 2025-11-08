"""
Simplified Weather API Client

A clean, SOLID-compliant implementation for interacting with OpenWeatherMap API.
"""

from dataclasses import dataclass
from typing import Any, Literal, Optional

import requests

UnitType = Literal["metric", "imperial", "standard"]


class GeocodingError(Exception):
    """Raised when geocoding fails or returns no results."""

    pass


class WeatherAPIError(Exception):
    """Raised when weather API call fails."""

    pass


@dataclass
class WeatherData:
    """
    Weather data returned from the API.

    Attributes:
        city: City name
        country: Country code (e.g., 'US')
        temp: Current temperature
        feels_like: Feels like temperature
        temp_min: Minimum temperature
        temp_max: Maximum temperature
        pressure: Atmospheric pressure (hPa)
        humidity: Humidity percentage
        description: Weather condition description
    """

    city: str
    country: str
    temp: float
    feels_like: float
    temp_min: float
    temp_max: float
    pressure: int
    humidity: int
    description: str

    def display(self, unit_suffix: str) -> str:
        """
        Format weather data for display.

        Args:
            unit_suffix: Temperature unit suffix (°F, °C, °K)

        Returns:
            Formatted weather information string
        """
        return (
            f"\nWeather for {self.city}, {self.country}\n"
            f"Temperature: {self.temp:.0f}{unit_suffix}\n"
            f"Feels like: {self.feels_like:.0f}{unit_suffix}\n"
            f"Low: {self.temp_min:.0f}{unit_suffix}\n"
            f"High: {self.temp_max:.0f}{unit_suffix}\n"
            f"Pressure: {self.pressure} hPa\n"
            f"Humidity: {self.humidity}%\n"
            f"Conditions: {self.description.title()}\n"
        )


class OpenWeatherAPI:
    """
    Client for OpenWeatherMap API.

    Provides methods for geocoding (city, zip code) and weather retrieval.
    Single Responsibility: Handle all OpenWeatherMap API interactions.

    Can be used as a context manager to ensure session cleanup:
        with OpenWeatherAPI(api_key) as api:
            weather = api.get_weather(lat, lon)
    """

    BASE_URL = "http://api.openweathermap.org"

    def __init__(self, api_key: str):
        """
        Initialize API client.

        Args:
            api_key: OpenWeatherMap API key

        Raises:
            ValueError: If api_key is None or empty
        """
        if not api_key:
            raise ValueError("API key is required")

        self.api_key = api_key
        self.session = requests.Session()

    def __enter__(self) -> "OpenWeatherAPI":
        """Enter context manager."""
        return self

    def __exit__(
        self,
        exc_type: Optional[type[BaseException]],
        exc_val: Optional[BaseException],
        exc_tb: Optional[object],
    ) -> None:
        """Exit context manager and close session."""
        self.close()

    def close(self) -> None:
        """Explicitly close the HTTP session."""
        self.session.close()

    def _get(self, path: str, params: dict) -> dict:
        """
        Make GET request to API endpoint.

        Args:
            path: API endpoint path (e.g., 'geo/1.0/direct')
            params: Query parameters

        Returns:
            JSON response as dict

        Raises:
            WeatherAPIError: On HTTP errors or timeouts
        """
        params["appid"] = self.api_key

        try:
            response = self.session.get(
                f"{self.BASE_URL}/{path}", params=params, timeout=10
            )
            response.raise_for_status()
            data: dict[Any, Any] = response.json()
            return data
        except requests.Timeout as e:
            raise WeatherAPIError(f"Request timeout: {e}") from e
        except requests.RequestException as e:
            raise WeatherAPIError(f"API request failed: {e}") from e

    def geocode_city(self, city: str, state: str) -> tuple[float, float]:
        """
        Get coordinates for a city and state.

        Args:
            city: City name
            state: State name or abbreviation

        Returns:
            Tuple of (latitude, longitude)

        Raises:
            GeocodingError: If city not found or API error
        """
        try:
            result = self._get(
                "geo/1.0/direct", {"q": f"{city},{state},US", "limit": 1}
            )

            if not result:
                raise GeocodingError(
                    f"No results found for {city}, {state}. "
                    "Check spelling and try again."
                )

            return result[0]["lat"], result[0]["lon"]

        except (KeyError, IndexError) as e:
            raise GeocodingError(f"Invalid geocoding response: {e}") from e
        except WeatherAPIError as e:
            raise GeocodingError(f"Geocoding failed: {e}") from e

    def geocode_zip(self, zip_code: str) -> tuple[float, float]:
        """
        Get coordinates for a zip code.

        Args:
            zip_code: 5-digit US zip code

        Returns:
            Tuple of (latitude, longitude)

        Raises:
            GeocodingError: If zip not found or API error
        """
        try:
            result = self._get("geo/1.0/zip", {"zip": f"{zip_code},US"})

            if "cod" in result and result["cod"] == "404":
                raise GeocodingError(f"Zip code {zip_code} not found")

            return result["lat"], result["lon"]

        except KeyError as e:
            raise GeocodingError(f"Invalid geocoding response: {e}") from e
        except WeatherAPIError as e:
            raise GeocodingError(f"Geocoding failed: {e}") from e

    def get_weather(
        self, lat: float, lon: float, units: UnitType = "imperial"
    ) -> WeatherData:
        """
        Get current weather for coordinates.

        Args:
            lat: Latitude
            lon: Longitude
            units: Temperature units ('metric', 'imperial', or 'standard')

        Returns:
            WeatherData object

        Raises:
            WeatherAPIError: If API call fails
            ValueError: If units are invalid
        """
        if units not in ("metric", "imperial", "standard"):
            raise ValueError(f"Invalid units: {units}")

        try:
            data = self._get(
                "data/2.5/weather", {"lat": lat, "lon": lon, "units": units}
            )

            if "cod" in data and str(data["cod"]) in ("401", "404", "429"):
                raise WeatherAPIError(
                    f"API error: {data.get('message', 'Unknown error')}"
                )

            return WeatherData(
                city=data["name"],
                country=data["sys"]["country"],
                temp=data["main"]["temp"],
                feels_like=data["main"]["feels_like"],
                temp_min=data["main"]["temp_min"],
                temp_max=data["main"]["temp_max"],
                pressure=data["main"]["pressure"],
                humidity=data["main"]["humidity"],
                description=data["weather"][0]["description"],
            )

        except KeyError as e:
            raise WeatherAPIError(f"Invalid weather response: {e}") from e
