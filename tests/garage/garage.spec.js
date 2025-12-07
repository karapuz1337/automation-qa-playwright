import { expect } from "playwright/test";
import withUserTest from "../../src/fixtures/customFixtures/userFixture.js";

withUserTest.describe("Garage page", () => {
  withUserTest("Add car button should be visible and enabled", async({ userGaragePage }) => {

    await expect(userGaragePage.addCarBtn).toBeVisible();
    await expect(userGaragePage.addCarBtn).toBeEnabled();
  });
});