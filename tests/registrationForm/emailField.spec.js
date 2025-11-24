import { test, expect } from "@playwright/test";
import colors from "../../src/colors.json" with { type: "json" };
import cases from "../../src/fixtures/registrationForm/emailField.json" with { type: "json" };

test.describe("Registration form - Email field", () => {

  test.beforeEach(async({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sign up" }).click();
  });

  for (const c of cases) {
    test(c.title, async({ page }) => {

      // Get the "Sign Up" form
      const modal = page.getByRole("dialog");

      // Get the Email field
      const emailField = modal.locator("#signupEmail");
      await expect(emailField).toBeVisible();
      await expect(emailField).toBeEnabled();


      // Handle empty input (the text field has to be 'touched' to display an error)
      const input = c.input.email;
      const isEmpty = input === "" || input === undefined || input === null;
      if (isEmpty) {
        await emailField.fill("x");
        await emailField.clear();
        await emailField.blur();
      }
      else {
        // Fill the Email field
        await emailField.fill(input);
        await emailField.blur();
      }


      // Assert the Email field
      const negative = Boolean(c.expected && c.expected.length);
      const errorLocator = modal.locator("#signupEmail + .invalid-feedback");

      if (negative) {
        await expect(emailField).toContainClass("is-invalid");
        await expect(errorLocator).toBeVisible();
        await expect(errorLocator).toHaveText(c.expected);
      }
      else {
        await expect(emailField).not.toContainClass("is-invalid");
        await expect(errorLocator).toHaveCount(0);
      }

      const color = (colors.borders || colors)[c.borderColor];
      await expect(emailField).toHaveCSS("border-top-color", color);

    });
  }
});