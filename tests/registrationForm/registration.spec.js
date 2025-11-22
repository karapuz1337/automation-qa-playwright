import { test, expect } from "@playwright/test";
import { generateUserData } from "../../src/helpers/generateUserData.js";

test.describe("Registration form", () => {

  let isValidTest;
  let userData;
  test.beforeEach(async({ page }) => {
    isValidTest = false;
    userData = generateUserData();

    await page.goto("/");
    await page.getByRole("button", { name: "Sign up" }).click();
  });

  test("Should register a user with valid credentials", async({ page }) => {

    // Check the Register button state after each input
    const registerBtn = page.getByRole("button", { name: "Register" });

    await expect(registerBtn).toBeVisible();
    await expect(registerBtn).toBeDisabled();

    // Fill the Name field
    await page.locator("#signupName").fill(userData.name);

    await expect(registerBtn).toBeVisible();
    await expect(registerBtn).toBeDisabled();

    // Fill the Last Name field
    await page.locator("#signupLastName").fill(userData.lastName);

    await expect(registerBtn).toBeVisible();
    await expect(registerBtn).toBeDisabled();

    // Fill the Email field
    await page.locator("#signupEmail").fill(userData.email);

    await expect(registerBtn).toBeVisible();
    await expect(registerBtn).toBeDisabled();

    // Fill the Password field
    await page.locator("#signupPassword").fill(userData.password);

    await expect(registerBtn).toBeVisible();
    await expect(registerBtn).toBeDisabled();

    // Fill the Re-enter password field
    await page.locator("#signupRepeatPassword").fill(userData.repeatPassword);

    await expect(registerBtn).toBeVisible();
    await expect(registerBtn).toBeEnabled();

    // Click the Register button
    await registerBtn.click();

    // Check that the correct page is opened
    await expect(page).toHaveURL("/panel/garage");

    isValidTest = true;

    // Check that the Add car button is available
    const addCarBtn = page.getByRole("button", { name: "Add car" });
    await expect(addCarBtn).toBeVisible();
    await expect(addCarBtn).toBeEnabled();
  });

  test.afterEach(async({ page }) => {
    // Delete the user (if it was created)
    if (isValidTest) {
      await page.goto("/panel/garage");

      // Click the Settings button
      await page.getByRole("link", { name: "Settings" }).click();

      // Click the Remove my account button
      await page.getByRole("button", { name: "Remove my account" }).click();

      // Click the Remove button in the confirmation pop-up
      await page.getByRole("button", { name: "Remove" }).click();
    }
  });
});