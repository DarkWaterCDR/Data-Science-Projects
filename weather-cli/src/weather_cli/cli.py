"""
Simplified CLI Module

Clean, focused CLI helper functions. No unnecessary OOP complexity.
"""

import os


def clear_screen() -> None:
    """Clear the terminal screen."""
    os.system("cls||clear")


def show_menu(title: str, options: list[str]) -> int:
    """
    Display a menu and get user selection.

    Args:
        title: Menu title to display
        options: List of menu options

    Returns:
        Selected option number (1-indexed)

    Raises:
        SystemExit: If user selects 'q' to quit
    """
    print(f"\n{title}\n")

    for i, option in enumerate(options, 1):
        print(f"{i}. {option}")

    print("q. Quit")

    while True:
        choice = input("\nSelect: ").strip().lower()

        if choice == "q":
            raise SystemExit("Goodbye!")

        if choice.isdigit() and 1 <= int(choice) <= len(options):
            return int(choice)

        print("Invalid choice. Please try again.")


def get_city_state() -> tuple[str, str]:
    """
    Get city and state input from user with validation.

    Ensures both city and state are non-empty.

    Returns:
        Tuple of (city, state)
    """
    while True:
        city = input("City: ").strip().title()
        state = input("State (name or abbreviation): ").strip().upper()

        if city and state:
            return city, state

        print("Error: Both city and state are required.")


def get_zip_code() -> str:
    """
    Get zip code input from user with validation.

    Returns:
        Valid 5-digit zip code
    """
    while True:
        zip_code = input("Zip Code (5 digits): ").strip()

        if len(zip_code) == 5 and zip_code.isdigit():
            return zip_code

        print("Error: Invalid zip code. Must be 5 digits.")


def _validate_range(value: float, min_val: float, max_val: float, name: str) -> bool:
    """
    Validate that a value is within a specified range.

    Args:
        value: Value to validate
        min_val: Minimum valid value
        max_val: Maximum valid value
        name: Name of the value for error messages

    Returns:
        True if valid, False otherwise
    """
    if not (min_val <= value <= max_val):
        print(f"Error: {name} must be between {min_val} and {max_val}")
        return False
    return True


def get_coordinates() -> tuple[float, float]:
    """
    Get latitude and longitude input from user with validation.

    Latitude must be between -90 and 90.
    Longitude must be between -180 and 180.

    Returns:
        Tuple of (latitude, longitude)
    """
    while True:
        try:
            lat = float(input("Latitude (-90 to 90): ").strip())
            lon = float(input("Longitude (-180 to 180): ").strip())

            # Validate ranges
            if not _validate_range(lat, -90, 90, "Latitude"):
                continue
            if not _validate_range(lon, -180, 180, "Longitude"):
                continue

            return lat, lon

        except ValueError:
            print("Error: Invalid input. Please enter numbers.")
