import { test, expect } from "@playwright/test";
import colors from "../../src/colors.json" with { type: "json" };
import cases from "../../src/fixtures/registrationForm/emailField.json" with { type: "json" };
import MainPage from "../../src/pageObjects/main/MainPage.js";

test.describe("Registration form - Email field", () => {

  for (const c of cases) {
    test(c.title, async({ page }) => {

      // BEFORE EACH HOOK INSIDE THE LOOP
      const mainPage = new MainPage(page);

      await mainPage.navigate();
      const signUpForm = await mainPage.openSignUpForm();


      await expect(signUpForm.emailField).toBeVisible();
      await expect(signUpForm.emailField).toBeEnabled();

      // Handle empty input (the text field has to be 'touched' to display an error)
      const input = c.input.email;
      const isEmpty = input === "" || input === undefined || input === null;
      if (isEmpty) {
        await signUpForm.emailField.fill("x");
        await signUpForm.emailField.clear();
        await signUpForm.emailField.blur();
      }
      else {
        // Fill the Email field
        await signUpForm.fillEmailField(input);
      }


      // Assert the Email field
      const negative = Boolean(c.expected && c.expected.length);
      const errorLocator = signUpForm.container.locator("#signupEmail + .invalid-feedback");

      if (negative) {
        await expect(signUpForm.emailField).toContainClass("is-invalid");
        await expect(errorLocator).toBeVisible();
        await expect(errorLocator).toHaveText(c.expected);
      }
      else {
        await expect(signUpForm.emailField).not.toContainClass("is-invalid");
        await expect(errorLocator).toHaveCount(0);
      }

      const color = (colors.borders || colors)[c.borderColor];
      await expect(signUpForm.emailField).toHaveCSS("border-top-color", color);

    });
  }
});