import { test, expect } from "@playwright/test";
import colors from "../../src/colors.json" with { type: "json" };
import cases from "../../src/fixtures/registrationForm/lastNameField.json" with { type: "json" };

test.describe("Registration form - Last Name field", () => {

  test.beforeEach(async({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sign up" }).click();
  });

  for (const c of cases) {
    test(c.title, async({ page }) => {

      // Get the "Sign Up" form
      const modal = page.getByRole("dialog");

      // Get the Last Name field
      const lastNameField = modal.locator("#signupLastName");
      await expect(lastNameField).toBeVisible();
      await expect(lastNameField).toBeEnabled();


      // Handle empty input (the text field has to be 'touched' to display an error)
      const input = c.input.lastName;
      const isEmpty = input === "" || input === undefined || input === null;
      if (isEmpty) {
        await lastNameField.fill("x");
        await lastNameField.clear();
        await lastNameField.blur();
      }
      else {
        // Fill the Last Name field
        await lastNameField.fill(input);
        await lastNameField.blur();
      }


      // Assert the Last Name field
      const negative = Boolean(c.expected && c.expected.length);
      const errorLocator = modal.locator("#signupLastName + .invalid-feedback");

      if (negative) {
        await expect(lastNameField).toContainClass("is-invalid");
        await expect(errorLocator).toBeVisible();
        await expect(errorLocator).toHaveText(c.expected);
      }
      else {
        await expect(lastNameField).not.toContainClass("is-invalid");
        await expect(errorLocator).toHaveCount(0);
      }

      const color = (colors.borders || colors)[c.borderColor];
      await expect(lastNameField).toHaveCSS("border-top-color", color);

    });
  }
});