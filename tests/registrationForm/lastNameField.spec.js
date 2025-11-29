import { test, expect } from "@playwright/test";
import colors from "../../src/colors.json" with { type: "json" };
import cases from "../../src/fixtures/registrationForm/lastNameField.json" with { type: "json" };
import MainPage from "../../src/pageObjects/main/MainPage.js";

test.describe("Registration form - Last Name field", () => {

  for (const c of cases) {
    test(c.title, async({ page }) => {

      // BEFORE EACH HOOK INSIDE THE LOOP
      const mainPage = new MainPage(page);

      await mainPage.navigate();
      const signUpForm = await mainPage.openSignUpForm();

      await expect(signUpForm.lastNameField).toBeVisible();
      await expect(signUpForm.lastNameField).toBeEnabled();


      // Handle empty input (the text field has to be 'touched' to display an error)
      const input = c.input.lastName;
      const isEmpty = input === "" || input === undefined || input === null;
      if (isEmpty) {
        await signUpForm.lastNameField.fill("x");
        await signUpForm.lastNameField.clear();
        await signUpForm.lastNameField.blur();
      }
      else {
        // Fill the Last Name field
        await signUpForm.fillLastNameField(input);
      }


      // Assert the Last Name field
      const negative = Boolean(c.expected && c.expected.length);
      const errorLocator = signUpForm.container.locator("#signupLastName + .invalid-feedback");

      if (negative) {
        await expect(signUpForm.lastNameField).toContainClass("is-invalid");
        await expect(errorLocator).toBeVisible();
        await expect(errorLocator).toHaveText(c.expected);
      }
      else {
        await expect(signUpForm.lastNameField).not.toContainClass("is-invalid");
        await expect(errorLocator).toHaveCount(0);
      }

      const color = (colors.borders || colors)[c.borderColor];
      await expect(signUpForm.lastNameField).toHaveCSS("border-top-color", color);

    });
  }
});