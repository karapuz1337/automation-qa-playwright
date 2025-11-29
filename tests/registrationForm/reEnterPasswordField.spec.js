import { test, expect } from "@playwright/test";
import colors from "../../src/colors.json" with { type: "json" };
import cases from "../../src/fixtures/registrationForm/reEnterPasswordField.json" with { type: "json" };
import MainPage from "../../src/pageObjects/main/MainPage.js";

test.describe("Registration form - Re-enter password field", () => {

  for (const c of cases) {
    test(c.title, async({ page }) => {

      // BEFORE EACH HOOK INSIDE THE LOOP
      const mainPage = new MainPage(page);

      await mainPage.navigate();
      const signUpForm = await mainPage.openSignUpForm();

      await expect(signUpForm.reEnterPasswordField).toBeVisible();
      await expect(signUpForm.reEnterPasswordField).toBeEnabled();

      // Fill the Password field
      await signUpForm.fillPasswordField(c.input.password);

      // Handle empty input (the text field has to be 'touched' to display an error)
      const input = c.input.reEnterPassword;
      const isEmpty = input === "" || input === undefined || input === null;
      if (isEmpty) {
        await signUpForm.reEnterPasswordField.fill("x");
        await signUpForm.reEnterPasswordField.clear();
        await signUpForm.reEnterPasswordField.blur();
      }
      else {
        // Fill the Re-enter password field
        await signUpForm.fillReEnterPasswordField(input);
      }


      // Assert the Re-enter password field
      const negative = Boolean(c.expected && c.expected.length);
      const errorLocator = signUpForm.container.locator("#signupRepeatPassword + .invalid-feedback");

      if (negative) {
        await expect(signUpForm.reEnterPasswordField).toContainClass("is-invalid");
        await expect(errorLocator).toBeVisible();
        await expect(errorLocator).toHaveText(c.expected);
      }
      else {
        await expect(signUpForm.reEnterPasswordField).not.toContainClass("is-invalid");
        await expect(errorLocator).toHaveCount(0);
      }

      const color = (colors.borders || colors)[c.borderColor];
      await expect(signUpForm.reEnterPasswordField).toHaveCSS("border-top-color", color);

    });
  }
});