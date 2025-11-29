import { test, expect } from "@playwright/test";
import colors from "../../src/colors.json" with { type: "json" };
import cases from "../../src/fixtures/registrationForm/nameField.json" with { type: "json" };
import MainPage from "../../src/pageObjects/main/MainPage.js";

test.describe("Registration form - Name field", () => {

  for (const c of cases) {
    test(c.title, async({ page }) => {

      // BEFORE EACH HOOK INSIDE THE LOOP
      const mainPage = new MainPage(page);

      await mainPage.navigate();
      const signUpForm = await mainPage.openSignUpForm();

      await expect(signUpForm.nameField).toBeVisible();
      await expect(signUpForm.nameField).toBeEnabled();


      // Handle empty input (the text field has to be 'touched' to display an error)
      const input = c.input.name;
      const isEmpty = input === "" || input === undefined || input === null;
      if (isEmpty) {
        await signUpForm.nameField.fill("x");
        await signUpForm.nameField.clear();
        await signUpForm.nameField.blur();
      }
      else {
        // Fill the Name field
        await signUpForm.fillNameField(input);
      }


      // Assert the Name field
      const negative = Boolean(c.expected && c.expected.length);
      const errorLocator = signUpForm.container.locator("#signupName + .invalid-feedback");

      if (negative) {
        await expect(signUpForm.nameField).toContainClass("is-invalid");
        await expect(errorLocator).toBeVisible();
        await expect(errorLocator).toHaveText(c.expected);
      }
      else {
        await expect(signUpForm.nameField).not.toContainClass("is-invalid");
        await expect(errorLocator).toHaveCount(0);
      }

      const color = (colors.borders || colors)[c.borderColor];
      await expect(signUpForm.nameField).toHaveCSS("border-top-color", color);

    });
  }
});