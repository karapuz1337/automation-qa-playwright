import { test, expect } from "@playwright/test";
import colors from "../../src/colors.json" with { type: "json" };
import cases from "../../src/fixtures/registrationForm/reEnterPasswordField.json" with { type: "json" };

test.describe("Registration form - Re-enter password field", () => {

  test.beforeEach(async({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sign up" }).click();
  });

  for (const c of cases) {
    test(c.title, async({ page }) => {

      // Get the "Sign Up" form
      const modal = page.getByRole("dialog");

      // Fill the Password field
      await modal.locator("#signupPassword").fill(c.input.password);

      // Get the Re-enter password field
      const reEnterPasswordField = modal.locator("#signupRepeatPassword");
      await expect(reEnterPasswordField).toBeVisible();
      await expect(reEnterPasswordField).toBeEnabled();


      // Handle empty input (the text field has to be 'touched' to display an error)
      const input = c.input.reEnterPassword;
      const isEmpty = input === "" || input === undefined || input === null;
      if (isEmpty) {
        await reEnterPasswordField.fill("x");
        await reEnterPasswordField.clear();
        await reEnterPasswordField.blur();
      }
      else {
        // Fill the Re-enter password field
        await reEnterPasswordField.fill(input);
        await reEnterPasswordField.blur();
      }


      // Assert the Re-enter password field
      const negative = Boolean(c.expected && c.expected.length);
      const errorLocator = modal.locator("#signupRepeatPassword + .invalid-feedback");

      if (negative) {
        await expect(reEnterPasswordField).toContainClass("is-invalid");
        await expect(errorLocator).toBeVisible();
        await expect(errorLocator).toHaveText(c.expected);
      }
      else {
        await expect(reEnterPasswordField).not.toContainClass("is-invalid");
        await expect(errorLocator).toHaveCount(0);
      }

      const color = (colors.borders || colors)[c.borderColor];
      await expect(reEnterPasswordField).toHaveCSS("border-top-color", color);

    });
  }
});