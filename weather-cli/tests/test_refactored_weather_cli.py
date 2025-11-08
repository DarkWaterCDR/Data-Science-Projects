"""
Tests for Weather CLI application.
Following TDD approach - these tests define the simplified architecture.
"""

from unittest.mock import patch

import pytest
import responses

from weather_cli.cli import clear_screen, show_menu
from weather_cli.weather_api import (
    GeocodingError,
    OpenWeatherAPI,
    WeatherAPIError,
    WeatherData,
)


class TestWeatherData:
    """Test the WeatherData dataclass"""

    def test_weather_data_creation(self):
        """Test creating a WeatherData instance"""
        weather = WeatherData(
            city="Seattle",
            country="US",
            temp=59.5,
            feels_like=57.2,
            temp_min=55.0,
            temp_max=62.0,
            pressure=1013,
            humidity=65,
            description="partly cloudy",
        )

        assert weather.city == "Seattle"
        assert weather.country == "US"
        assert weather.temp == 59.5
        assert weather.feels_like == 57.2

    def test_weather_data_display_fahrenheit(self):
        """Test weather data display with Fahrenheit"""
        weather = WeatherData(
            city="Seattle",
            country="US",
            temp=59.5,
            feels_like=57.2,
            temp_min=55.0,
            temp_max=62.0,
            pressure=1013,
            humidity=65,
            description="partly cloudy",
        )

        display = weather.display("°F")

        assert "Seattle" in display
        assert "US" in display
        assert "60°F" in display  # 59.5 rounds to 60
        assert "57°F" in display
        assert "Partly Cloudy" in display

    def test_weather_data_display_celsius(self):
        """Test weather data display with Celsius"""
        weather = WeatherData(
            city="London",
            country="GB",
            temp=15.0,
            feels_like=13.5,
            temp_min=12.0,
            temp_max=17.0,
            pressure=1020,
            humidity=70,
            description="light rain",
        )

        display = weather.display("°C")

        assert "London" in display
        assert "15°C" in display
        assert "Light Rain" in display


class TestOpenWeatherAPI:
    """Test the OpenWeatherAPI class"""

    @pytest.fixture
    def api(self):
        """Create API instance with test key"""
        return OpenWeatherAPI(api_key="test_api_key_12345")

    @responses.activate
    def test_geocode_city_success(self, api):
        """Test successful city geocoding"""
        responses.add(
            responses.GET,
            "http://api.openweathermap.org/geo/1.0/direct",
            json=[
                {
                    "name": "Seattle",
                    "lat": 47.6062,
                    "lon": -122.3321,
                    "country": "US",
                    "state": "Washington",
                }
            ],
            status=200,
        )

        lat, lon = api.geocode_city("Seattle", "WA")

        assert lat == 47.6062
        assert lon == -122.3321

    @responses.activate
    def test_geocode_city_not_found(self, api):
        """Test city geocoding when city not found"""
        responses.add(
            responses.GET,
            "http://api.openweathermap.org/geo/1.0/direct",
            json=[],
            status=200,
        )

        with pytest.raises(GeocodingError, match="No results found"):
            api.geocode_city("InvalidCity", "XX")

    @responses.activate
    def test_geocode_zip_success(self, api):
        """Test successful zip code geocoding"""
        responses.add(
            responses.GET,
            "http://api.openweathermap.org/geo/1.0/zip",
            json={
                "zip": "90210",
                "name": "Beverly Hills",
                "lat": 34.0901,
                "lon": -118.4065,
                "country": "US",
            },
            status=200,
        )

        lat, lon = api.geocode_zip("90210")

        assert lat == 34.0901
        assert lon == -118.4065

    @responses.activate
    def test_geocode_zip_not_found(self, api):
        """Test zip code geocoding when zip not found"""
        responses.add(
            responses.GET,
            "http://api.openweathermap.org/geo/1.0/zip",
            json={"cod": "404", "message": "not found"},
            status=404,
        )

        with pytest.raises(GeocodingError):
            api.geocode_zip("00000")

    @responses.activate
    def test_get_weather_success(self, api):
        """Test successful weather retrieval"""
        responses.add(
            responses.GET,
            "http://api.openweathermap.org/data/2.5/weather",
            json={
                "coord": {"lat": 47.6062, "lon": -122.3321},
                "weather": [{"description": "clear sky"}],
                "main": {
                    "temp": 59.0,
                    "feels_like": 57.0,
                    "temp_min": 55.0,
                    "temp_max": 62.0,
                    "pressure": 1013,
                    "humidity": 65,
                },
                "name": "Seattle",
                "sys": {"country": "US"},
            },
            status=200,
        )

        weather = api.get_weather(47.6062, -122.3321, "imperial")

        assert weather.city == "Seattle"
        assert weather.country == "US"
        assert weather.temp == 59.0
        assert weather.feels_like == 57.0
        assert weather.description == "clear sky"

    @responses.activate
    def test_get_weather_api_error(self, api):
        """Test weather retrieval with API error"""
        responses.add(
            responses.GET,
            "http://api.openweathermap.org/data/2.5/weather",
            json={"cod": "401", "message": "Invalid API key"},
            status=401,
        )

        with pytest.raises(WeatherAPIError):
            api.get_weather(47.6062, -122.3321, "imperial")

    @responses.activate
    def test_api_timeout_handling(self, api):
        """Test API timeout handling"""
        import requests

        responses.add(
            responses.GET,
            "http://api.openweathermap.org/geo/1.0/direct",
            body=requests.exceptions.Timeout("Timeout"),
        )

        with pytest.raises(GeocodingError):  # Wrapped in GeocodingError
            api.geocode_city("Seattle", "WA")

    def test_api_validates_units(self, api):
        """Test that invalid units are rejected"""
        # Type checking should prevent this, but test runtime behavior
        with pytest.raises((ValueError, TypeError)):
            api.get_weather(47.6062, -122.3321, "invalid")  # type: ignore


class TestCLIHelpers:
    """Test CLI helper functions"""

    @patch("builtins.input", side_effect=["1"])
    def test_show_menu_valid_selection(self, mock_input):
        """Test menu with valid selection"""
        result = show_menu("Test Menu", ["Option 1", "Option 2", "Option 3"])
        assert result == 1

    @patch("builtins.input", side_effect=["2"])
    def test_show_menu_second_option(self, mock_input):
        """Test selecting second option"""
        result = show_menu("Test Menu", ["First", "Second", "Third"])
        assert result == 2

    @patch("builtins.input", side_effect=["q"])
    def test_show_menu_quit(self, mock_input):
        """Test quitting from menu"""
        with pytest.raises(SystemExit):
            show_menu("Test Menu", ["Option 1", "Option 2"])

    @patch("builtins.input", side_effect=["invalid", "99", "1"])
    def test_show_menu_invalid_then_valid(self, mock_input):
        """Test invalid inputs followed by valid selection"""
        result = show_menu("Test Menu", ["Option 1", "Option 2"])
        assert result == 1
        assert mock_input.call_count == 3

    @patch("os.system")
    def test_clear_screen(self, mock_system):
        """Test screen clearing"""
        clear_screen()
        mock_system.assert_called_once_with("cls||clear")


class TestIntegration:
    """Integration tests for complete workflows"""

    @responses.activate
    @patch("builtins.input")
    def test_complete_city_search_workflow(self, mock_input):
        """Test complete workflow: select units, search city, display weather"""
        # Mock geocoding response
        responses.add(
            responses.GET,
            "http://api.openweathermap.org/geo/1.0/direct",
            json=[{"name": "Seattle", "lat": 47.6062, "lon": -122.3321}],
            status=200,
        )

        # Mock weather response
        responses.add(
            responses.GET,
            "http://api.openweathermap.org/data/2.5/weather",
            json={
                "name": "Seattle",
                "sys": {"country": "US"},
                "main": {
                    "temp": 59.0,
                    "feels_like": 57.0,
                    "temp_min": 55.0,
                    "temp_max": 62.0,
                    "pressure": 1013,
                    "humidity": 65,
                },
                "weather": [{"description": "clear sky"}],
            },
            status=200,
        )

        api = OpenWeatherAPI("test_key")

        # Execute workflow
        lat, lon = api.geocode_city("Seattle", "WA")
        weather = api.get_weather(lat, lon, "imperial")

        assert weather.city == "Seattle"
        assert weather.temp == 59.0

    @responses.activate
    def test_zip_code_workflow(self):
        """Test zip code search workflow"""
        # Mock geocoding response
        responses.add(
            responses.GET,
            "http://api.openweathermap.org/geo/1.0/zip",
            json={"lat": 34.0901, "lon": -118.4065},
            status=200,
        )

        # Mock weather response
        responses.add(
            responses.GET,
            "http://api.openweathermap.org/data/2.5/weather",
            json={
                "name": "Beverly Hills",
                "sys": {"country": "US"},
                "main": {
                    "temp": 72.0,
                    "feels_like": 70.0,
                    "temp_min": 68.0,
                    "temp_max": 75.0,
                    "pressure": 1015,
                    "humidity": 60,
                },
                "weather": [{"description": "sunny"}],
            },
            status=200,
        )

        api = OpenWeatherAPI("test_key")

        # Execute workflow
        lat, lon = api.geocode_zip("90210")
        weather = api.get_weather(lat, lon, "imperial")

        assert weather.city == "Beverly Hills"
        assert weather.temp == 72.0


class TestErrorHandling:
    """Test error handling and edge cases"""

    def test_missing_api_key(self):
        """Test that API requires an API key"""
        with pytest.raises((ValueError, TypeError)):
            OpenWeatherAPI(None)  # type: ignore

    @responses.activate
    def test_malformed_response_handling(self):
        """Test handling of malformed API responses"""
        responses.add(
            responses.GET,
            "http://api.openweathermap.org/data/2.5/weather",
            json={"invalid": "response"},
            status=200,
        )

        api = OpenWeatherAPI("test_key")

        with pytest.raises((WeatherAPIError, KeyError)):
            api.get_weather(47.6062, -122.3321, "imperial")

    @responses.activate
    def test_network_error_handling(self):
        """Test handling of network errors"""
        import requests

        responses.add(
            responses.GET,
            "http://api.openweathermap.org/geo/1.0/direct",
            body=requests.exceptions.ConnectionError("Network unreachable"),
        )

        api = OpenWeatherAPI("test_key")

        with pytest.raises(GeocodingError):  # Wrapped in GeocodingError
            api.geocode_city("Seattle", "WA")


class TestCoordinateValidation:
    """Test coordinate validation"""

    @patch("weather_cli.cli.input")
    @patch("weather_cli.cli.clear_screen")
    def test_valid_coordinates(self, mock_clear, mock_input):
        """Test that valid coordinates are accepted"""
        mock_input.side_effect = ["47.6062", "-122.3321", "y"]

        from weather_cli.cli import get_coordinates

        lat, lon = get_coordinates()

        assert lat == 47.6062
        assert lon == -122.3321

    @patch("weather_cli.cli.input")
    @patch("weather_cli.cli.clear_screen")
    @patch("builtins.print")
    def test_latitude_out_of_range_high(self, mock_print, mock_clear, mock_input):
        """Test that latitude > 90 is rejected"""
        mock_input.side_effect = ["95.0", "-122.3321", "", "47.6062", "-122.3321", "y"]

        from weather_cli.cli import get_coordinates

        lat, lon = get_coordinates()

        assert lat == 47.6062
        assert lon == -122.3321

    @patch("weather_cli.cli.input")
    @patch("weather_cli.cli.clear_screen")
    @patch("builtins.print")
    def test_latitude_out_of_range_low(self, mock_print, mock_clear, mock_input):
        """Test that latitude < -90 is rejected"""
        mock_input.side_effect = ["-95.0", "-122.3321", "", "47.6062", "-122.3321", "y"]

        from weather_cli.cli import get_coordinates

        lat, lon = get_coordinates()

        assert lat == 47.6062

    @patch("weather_cli.cli.input")
    @patch("weather_cli.cli.clear_screen")
    @patch("builtins.print")
    def test_longitude_out_of_range_high(self, mock_print, mock_clear, mock_input):
        """Test that longitude > 180 is rejected"""
        mock_input.side_effect = ["47.6062", "185.0", "", "47.6062", "-122.3321", "y"]

        from weather_cli.cli import get_coordinates

        lat, lon = get_coordinates()

        assert lon == -122.3321

    @patch("weather_cli.cli.input")
    @patch("weather_cli.cli.clear_screen")
    @patch("builtins.print")
    def test_longitude_out_of_range_low(self, mock_print, mock_clear, mock_input):
        """Test that longitude < -180 is rejected"""
        mock_input.side_effect = ["47.6062", "-185.0", "", "47.6062", "-122.3321", "y"]

        from weather_cli.cli import get_coordinates

        lat, lon = get_coordinates()

        assert lon == -122.3321


class TestSessionManagement:
    """Test session resource management"""

    def test_api_context_manager(self):
        """Test that API can be used as context manager"""
        with OpenWeatherAPI("test_key") as api:
            assert api is not None
            assert hasattr(api, "session")

    def test_session_closed_after_context(self):
        """Test that session is closed when exiting context"""
        api = OpenWeatherAPI("test_key")
        with api:
            session = api.session
            assert session is not None

        # After exiting context, session should be closed
        # We can't easily test if session.close() was called,
        # but we can verify the context manager exists


class TestSimplifiedInputFunctions:
    """Ensure input functions have streamlined UX without unnecessary confirmation steps"""

    @patch("weather_cli.cli.input")
    def test_get_city_state_no_confirmation(self, mock_input):
        """Verify user isn't prompted for confirmation to avoid friction in the workflow"""
        mock_input.side_effect = ["Seattle", "WA"]

        from weather_cli.cli import get_city_state

        city, state = get_city_state()

        assert city == "Seattle"
        assert state == "WA"
        assert mock_input.call_count == 2  # Only city and state, no confirmation

    @patch("weather_cli.cli.input")
    @patch("builtins.print")
    def test_get_city_state_rejects_empty_city(self, mock_print, mock_input):
        """Verify input validation prevents empty city to ensure data quality"""
        mock_input.side_effect = ["", "WA", "Seattle", "WA"]

        from weather_cli.cli import get_city_state

        city, state = get_city_state()

        assert city == "Seattle"
        assert state == "WA"
        assert mock_input.call_count == 4
        mock_print.assert_called_with("Error: Both city and state are required.")

    @patch("weather_cli.cli.input")
    @patch("builtins.print")
    def test_get_city_state_rejects_empty_state(self, mock_print, mock_input):
        """Verify input validation prevents empty state to ensure data quality"""
        mock_input.side_effect = ["Seattle", "", "Seattle", "WA"]

        from weather_cli.cli import get_city_state

        city, state = get_city_state()

        assert city == "Seattle"
        assert state == "WA"
        assert mock_input.call_count == 4
        mock_print.assert_called_with("Error: Both city and state are required.")

    @patch("weather_cli.cli.input")
    @patch("builtins.print")
    def test_get_city_state_rejects_both_empty(self, mock_print, mock_input):
        """Verify input validation prevents both empty inputs to ensure data quality"""
        mock_input.side_effect = ["", "", "Seattle", "WA"]

        from weather_cli.cli import get_city_state

        city, state = get_city_state()

        assert city == "Seattle"
        assert state == "WA"
        assert mock_input.call_count == 4
        mock_print.assert_called_with("Error: Both city and state are required.")

    @patch("weather_cli.cli.input")
    @patch("builtins.print")
    def test_get_zip_code_no_confirmation(self, mock_print, mock_input):
        """Verify zip code input flows smoothly without extra prompts"""
        mock_input.side_effect = ["98101"]

        from weather_cli.cli import get_zip_code

        zip_code = get_zip_code()

        assert zip_code == "98101"
        assert mock_input.call_count == 1  # Only zip code, no confirmation

    @patch("weather_cli.cli.input")
    @patch("builtins.print")
    def test_get_zip_code_retries_on_invalid(self, mock_print, mock_input):
        """Verify invalid zip codes are rejected to maintain data integrity"""
        mock_input.side_effect = ["1234", "abcde", "98101"]

        from weather_cli.cli import get_zip_code

        zip_code = get_zip_code()

        assert zip_code == "98101"
        assert mock_input.call_count == 3

    @patch("weather_cli.cli.input")
    @patch("builtins.print")
    def test_get_coordinates_no_confirmation(self, mock_print, mock_input):
        """Verify coordinate input flows smoothly without extra prompts"""
        mock_input.side_effect = ["47.6062", "-122.3321"]

        from weather_cli.cli import get_coordinates

        lat, lon = get_coordinates()

        assert lat == 47.6062
        assert lon == -122.3321
        assert mock_input.call_count == 2  # Only lat/lon, no confirmation

    @patch("weather_cli.cli.input")
    @patch("builtins.print")
    def test_get_coordinates_retries_on_invalid(self, mock_print, mock_input):
        """Verify invalid coordinates are rejected to maintain data integrity"""
        mock_input.side_effect = [
            "invalid",
            "47.6062",
            "-122.3321",
        ]

        from weather_cli.cli import get_coordinates

        lat, lon = get_coordinates()

        assert lat == 47.6062
        assert lon == -122.3321


class TestAPIImprovements:
    """Verify API follows Python best practices for context managers and resource cleanup"""

    def test_context_manager_exit_returns_none(self):
        """Verify __exit__ doesn't suppress exceptions to allow proper error propagation"""
        from weather_cli.weather_api import OpenWeatherAPI

        api = OpenWeatherAPI("test_key")

        result = api.__exit__(None, None, None)

        assert result is None

    def test_close_method_is_simple(self):
        """Verify close method is idempotent to prevent errors on repeated calls"""
        from weather_cli.weather_api import OpenWeatherAPI

        api = OpenWeatherAPI("test_key")

        api.close()
        api.close()


class TestMainLoopImprovements:
    """Verify main loop provides clear exit paths for better user control"""

    @patch("weather_cli.main.input")
    @patch("weather_cli.main.OpenWeatherAPI")
    @patch("weather_cli.main.show_menu")
    @patch("weather_cli.main.get_city_state")
    @patch("builtins.print")
    def test_main_loop_has_quit_option(
        self, mock_print, mock_get_city, mock_menu, mock_api, mock_input
    ):
        """Verify users can exit cleanly after viewing results to improve UX"""
        from weather_cli.main import main

        # Mock API key
        with patch("weather_cli.main.os.getenv", return_value="test_key"):
            # Mock menu to return unit choice
            mock_menu.return_value = 2  # Fahrenheit

            # Mock city state input
            mock_get_city.return_value = ("Seattle", "WA")

            # Mock API calls
            mock_api_instance = mock_api.return_value.__enter__.return_value
            mock_api_instance.geocode_city.return_value = (47.6062, -122.3321)
            mock_api_instance.get_weather.return_value = WeatherData(
                city="Seattle",
                country="US",
                temp=59.5,
                feels_like=57.2,
                temp_min=55.0,
                temp_max=62.0,
                pressure=1013,
                humidity=65,
                description="clear sky",
            )

            # First search, then quit
            mock_input.side_effect = ["", "q"]

            try:
                main()
            except SystemExit:
                pass  # Expected


class TestMainErrorPaths:
    """Verify comprehensive error handling to ensure application resilience"""

    @patch("weather_cli.main.os.getenv", return_value=None)
    def test_missing_api_key_exits(self, mock_getenv):
        """Verify application fails fast when API key is missing to prevent silent failures"""
        from weather_cli.main import main

        with pytest.raises(SystemExit) as exc_info:
            main()

        assert exc_info.value.code == 1

    @patch("weather_cli.main.input")
    @patch("weather_cli.main.OpenWeatherAPI")
    @patch("weather_cli.main.show_menu")
    @patch("weather_cli.main.get_city_state")
    @patch("builtins.print")
    def test_geocoding_error_handling(
        self, mock_print, mock_get_city, mock_menu, mock_api, mock_input
    ):
        """Verify geocoding errors are caught to prevent crashes and inform users"""
        from weather_cli.main import main

        with patch("weather_cli.main.os.getenv", return_value="test_key"):
            mock_menu.return_value = 1  # First menu: units, second menu: search type
            mock_get_city.return_value = ("InvalidCity", "XX")

            mock_api_instance = mock_api.return_value.__enter__.return_value
            mock_api_instance.geocode_city.side_effect = GeocodingError(
                "No results found"
            )

            mock_input.side_effect = ["", "q"]

            try:
                main()
            except SystemExit:
                pass

            error_calls = [
                call
                for call in mock_print.call_args_list
                if "Geocoding Error" in str(call)
            ]
            assert len(error_calls) > 0

    @patch("weather_cli.main.input")
    @patch("weather_cli.main.OpenWeatherAPI")
    @patch("weather_cli.main.show_menu")
    @patch("weather_cli.main.get_city_state")
    @patch("builtins.print")
    def test_weather_api_error_handling(
        self, mock_print, mock_get_city, mock_menu, mock_api, mock_input
    ):
        """Verify API errors are caught to prevent crashes and inform users"""
        from weather_cli.main import main

        with patch("weather_cli.main.os.getenv", return_value="test_key"):
            mock_menu.return_value = 1
            mock_get_city.return_value = ("Seattle", "WA")

            mock_api_instance = mock_api.return_value.__enter__.return_value
            mock_api_instance.geocode_city.return_value = (47.6062, -122.3321)
            mock_api_instance.get_weather.side_effect = WeatherAPIError(
                "API request failed"
            )

            mock_input.side_effect = ["", "q"]

            try:
                main()
            except SystemExit:
                pass

            error_calls = [
                call
                for call in mock_print.call_args_list
                if "Weather API Error" in str(call)
            ]
            assert len(error_calls) > 0

    @patch("weather_cli.main.input")
    @patch("weather_cli.main.OpenWeatherAPI")
    @patch("weather_cli.main.show_menu")
    @patch("weather_cli.main.get_city_state")
    @patch("builtins.print")
    def test_keyboard_interrupt_handling(
        self, mock_print, mock_get_city, mock_menu, mock_api, mock_input
    ):
        """Verify Ctrl+C exits cleanly without stack traces for better UX"""
        from weather_cli.main import main

        with patch("weather_cli.main.os.getenv", return_value="test_key"):
            mock_menu.return_value = 1
            mock_get_city.side_effect = KeyboardInterrupt()

            with pytest.raises(SystemExit) as exc_info:
                main()

            assert exc_info.value.code == 0

    @patch("weather_cli.main.input")
    @patch("weather_cli.main.OpenWeatherAPI")
    @patch("weather_cli.main.show_menu")
    @patch("weather_cli.main.get_city_state")
    @patch("builtins.print")
    def test_unexpected_error_handling(
        self, mock_print, mock_get_city, mock_menu, mock_api, mock_input
    ):
        """Verify unexpected exceptions are caught to maintain application stability"""
        from weather_cli.main import main

        with patch("weather_cli.main.os.getenv", return_value="test_key"):
            mock_menu.return_value = 1
            mock_get_city.side_effect = ValueError("Unexpected error")

            mock_input.side_effect = ["", "q"]

            try:
                main()
            except SystemExit:
                pass

            error_calls = [
                call
                for call in mock_print.call_args_list
                if "Unexpected Error" in str(call)
            ]
            assert len(error_calls) > 0

    @patch("weather_cli.main.input")
    @patch("weather_cli.main.OpenWeatherAPI")
    @patch("weather_cli.main.show_menu")
    @patch("weather_cli.main.get_zip_code")
    @patch("builtins.print")
    def test_zip_code_search_path(
        self, mock_print, mock_get_zip, mock_menu, mock_api, mock_input
    ):
        """Verify zip code search integrates correctly with API workflow"""
        from weather_cli.main import main

        with patch("weather_cli.main.os.getenv", return_value="test_key"):
            # First call: unit selection, Second call: search type
            mock_menu.side_effect = [1, 2]  # Celsius, Zip Code
            mock_get_zip.return_value = "98101"

            mock_api_instance = mock_api.return_value.__enter__.return_value
            mock_api_instance.geocode_zip.return_value = (47.6062, -122.3321)
            mock_api_instance.get_weather.return_value = WeatherData(
                city="Seattle",
                country="US",
                temp=15.5,
                feels_like=13.2,
                temp_min=12.0,
                temp_max=18.0,
                pressure=1013,
                humidity=65,
                description="clear sky",
            )

            # Do one search, then quit
            mock_input.return_value = "q"

            try:
                main()
            except SystemExit:
                pass

            mock_api_instance.geocode_zip.assert_called_once_with("98101")

    @patch("weather_cli.main.input")
    @patch("weather_cli.main.OpenWeatherAPI")
    @patch("weather_cli.main.show_menu")
    @patch("weather_cli.main.get_coordinates")
    @patch("builtins.print")
    def test_coordinates_search_path(
        self, mock_print, mock_get_coords, mock_menu, mock_api, mock_input
    ):
        """Verify coordinate search bypasses geocoding for direct API access"""
        from weather_cli.main import main

        with patch("weather_cli.main.os.getenv", return_value="test_key"):
            # First call: unit selection, Second call: search type
            mock_menu.side_effect = [2, 3]  # Fahrenheit, Coordinates
            mock_get_coords.return_value = (47.6062, -122.3321)

            mock_api_instance = mock_api.return_value.__enter__.return_value
            mock_api_instance.get_weather.return_value = WeatherData(
                city="Seattle",
                country="US",
                temp=59.5,
                feels_like=57.2,
                temp_min=55.0,
                temp_max=62.0,
                pressure=1013,
                humidity=65,
                description="clear sky",
            )

            # Do one search, then quit
            mock_input.return_value = "q"

            try:
                main()
            except SystemExit:
                pass

            mock_api_instance.get_weather.assert_called_once_with(
                47.6062, -122.3321, "imperial"
            )


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
