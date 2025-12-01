import { test, expect } from "@playwright/test";
import { generateUserData } from "../../src/helpers/generateUserData.js";
import MainPage from "../../src/pageObjects/main/MainPage.js";

test.describe("Registration form", () => {

  let signUpForm;
  let isValidTest;
  let userData;
  test.beforeEach(async({ page }) => {
    isValidTest = false;
    userData = generateUserData();

    const mainPage = new MainPage(page);
    await mainPage.navigate();
    signUpForm = await mainPage.openSignUpForm();
  });

  test("Should register a user with valid credentials", async({ page }) => {

    // Check that the Register button is disabled
    await expect(signUpForm.registerBtn).toBeVisible();
    await expect(signUpForm.registerBtn).toBeDisabled();

    // Fill the form
    await signUpForm.fill(userData);

    // Check that the Register button is enabled
    await expect(signUpForm.registerBtn).toBeEnabled();

    // Submit the form
    await signUpForm.submit();

    await expect(page).toHaveURL("/panel/garage");

    // Set the flag to true to indicate that the user was created
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