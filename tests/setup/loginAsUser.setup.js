import { expect } from "playwright/test";
import { test as setup } from "../../src/fixtures/customFixtures/baseCustomFixture.js";
import { generateUserData } from "../../src/helpers/generateUserData.js";

setup("Login as user", async({ mainPage, page, context }) => {
  // Generate user data and register the user
  const userData = generateUserData();
  const signUpForm = await mainPage.openSignUpForm();
  await signUpForm.fillAndSubmit(userData);

  // Wait until the correct page is opened, and the login state is created
  await expect(page).toHaveURL("/panel/garage");

  // Save the login state for later tests
  await context.storageState({ path: "states/auth/user.json" });
});