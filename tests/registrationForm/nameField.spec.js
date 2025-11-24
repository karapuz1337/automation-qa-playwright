import { test, expect } from "@playwright/test";
import colors from "../../src/colors.json" with { type: "json" };
import cases from "../../src/fixtures/registrationForm/nameField.json" with { type: "json" };

test.describe("Registration form - Name field", () => {

  test.beforeEach(async({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sign up" }).click();
  });

  for (const c of cases) {
    test(c.title, async({ page }) => {

      // Get the "Sign Up" form
      const modal = page.getByRole("dialog");

      // Get the Name field
      const nameField = modal.locator("#signupName");
      await expect(nameField).toBeVisible();
      await expect(nameField).toBeEnabled();


      // Handle empty input (the text field has to be 'touched' to display an error)
      const input = c.input.name;
      const isEmpty = input === "" || input === undefined || input === null;
      if (isEmpty) {
        await nameField.fill("x");
        await nameField.clear();
        await nameField.blur();
      }
      else {
        // Fill the Name field
        await nameField.fill(input);
        await nameField.blur();
      }


      // Assert the Name field
      const negative = Boolean(c.expected && c.expected.length);
      const errorLocator = modal.locator("#signupName + .invalid-feedback");

      if (negative) {
        await expect(nameField).toContainClass("is-invalid");
        await expect(errorLocator).toBeVisible();
        await expect(errorLocator).toHaveText(c.expected);
      }
      else {
        await expect(nameField).not.toContainClass("is-invalid");
        await expect(errorLocator).toHaveCount(0);
      }

      const color = (colors.borders || colors)[c.borderColor];
      await expect(nameField).toHaveCSS("border-top-color", color);

    });
  }
});