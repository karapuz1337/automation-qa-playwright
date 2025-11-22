import { test, expect } from "@playwright/test";
import colors from "../../src/colors.json" with { type: "json" };
import cases from "../../src/fixtures/registrationForm/passwordField.json" with { type: "json" };

test.describe("Registration form - Password field", () => {

  test.beforeEach(async({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sign up" }).click();
  });

  for (const c of cases) {
    test(c.title, async({ page }) => {

      // Get the "Sign Up" form
      const modal = page.getByRole("dialog");

      // Get the Password field
      const passwordField = modal.locator("#signupPassword");
      await expect(passwordField).toBeVisible();
      await expect(passwordField).toBeEnabled();


      // Handle empty input (the text field has to be 'touched' to display an error)
      const input = c.input.password;
      const isEmpty = input === "" || input === undefined || input === null;
      if (isEmpty) {
        await passwordField.fill("x");
        await passwordField.clear();
        await passwordField.blur();
      }
      else {
        // Fill the Password field
        await passwordField.fill(input);
        await passwordField.blur();
      }


      // Assert the Password field
      const negative = Boolean(c.expected && c.expected.length);
      const errorLocator = modal.locator("#signupPassword + .invalid-feedback");

      if (negative) {
        await expect(passwordField).toContainClass("is-invalid");
        await expect(errorLocator).toBeVisible();
        await expect(errorLocator).toHaveText(c.expected);
      }
      else {
        await expect(passwordField).not.toContainClass("is-invalid");
        await expect(errorLocator).toHaveCount(0);
      }

      const color = (colors.borders || colors)[c.borderColor];
      await expect(passwordField).toHaveCSS("border-top-color", color);

    });
  }
});