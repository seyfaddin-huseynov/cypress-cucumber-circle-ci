import { Then } from "@badeball/cypress-cucumber-preprocessor";

Then(
  "I search for a distance between {string} and {string}",
  (cityName1: string, cityName2: string) => {
    // type search text and hit Enter right after
    cy.get('input[type="text"]').as("search").eq(0).clear();
    cy.wait(1500);
    cy.get("@search").eq(0).type(cityName1, { force: true, timeout: 10000 });
    cy.get("@search")
      .eq(2)
      .should("be.visible")
      .type(`${cityName2}{enter}`, { force: true, timeout: 10000 });
  }
);

Then("I decide if {string} worth to visit", (cityName: string) => {
  let temperatureSum: number = 0;
  cy.get('[class*="DetailsSummary--highTempValue"]').as("highTempValues");
  // using Xpath selector to get only daily temperature for the next 14 days.
  for (let index = 1; index < 15; index++) {
    cy.get("@highTempValues")
      .eq(index)
      .invoke("text")
      .then((el) => {
        const text: string = el;
        temperatureSum += parseInt(text);
        const temperatureAverage = temperatureSum / 14;
        // if temperature more than 9 C° or 45 F°
        if (
          (temperatureAverage > 7 || temperatureAverage > 45) &&
          index === 14
        ) {
          cy.log(
            `THE TEMPERATURE WILL BE AROUND ${Math.round(
              temperatureAverage
            ).toString()} °, I THINK WE SHOULD VISIT BOSTON 😊 🦃`
          );
        } else if (
          (temperatureAverage < 7 || temperatureAverage < 45) &&
          index === 14
        ) {
          cy.log("I THINK MIAMI FOR NOW 🌴🌴🌴😎🌴🌴🌴");
        }
      });
  }
});
