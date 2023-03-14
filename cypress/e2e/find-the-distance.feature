Feature: Weather in Boston

    Scenario: Check the forecast for the next 10 days
        Given I am at url "https://www.google.com/travel/flights"
        Then I search for a distance between "Boston" and "Miami"
# Then I decide if "Boston" worth to visit