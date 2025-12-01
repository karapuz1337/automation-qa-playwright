import { test, expect } from "@playwright/test";
import colors from "../../src/colors.json" with { type: "json" };
import cases from "../../src/fixtures/registrationForm/passwordField.json" with { type: "json" };
import MainPage from "../../src/pageObjects/main/MainPage.js";

test.describe("Registration form - Password field", () => {

  for (const c of cases) {
    test(c.title, async({ page }) => {

      const mainPage = new MainPage(page);

      await mainPage.navigate();
      const signUpForm = await mainPage.openSignUpForm();

      await expect(signUpForm.passwordField).toBeVisible();
      await expect(signUpForm.passwordField).toBeEnabled();


      // Handle empty input (the text field has to be 'touched' to display an error)
      const input = c.input.password;
      const isEmpty = input === "" || input === undefined || input === null;
      if (isEmpty) {
        await signUpForm.passwordField.fill("x");
        await signUpForm.passwordField.clear();
        await signUpForm.passwordField.blur();
      }
      else {
        // Fill the Password field
        await signUpForm.fillPasswordField(input);
      }


      // Assert the Password field
      const negative = Boolean(c.expected && c.expected.length);
      const errorLocator = signUpForm.container.locator("#signupPassword + .invalid-feedback");

      if (negative) {
        await expect(signUpForm.passwordField).toContainClass("is-invalid");
        await expect(errorLocator).toBeVisible();
        await expect(errorLocator).toHaveText(c.expected);
      }
      else {
        await expect(signUpForm.passwordField).not.toContainClass("is-invalid");
        await expect(errorLocator).toHaveCount(0);
      }

      const color = (colors.borders || colors)[c.borderColor];
      await expect(signUpForm.passwordField).toHaveCSS("border-top-color", color);

    });
  }
});