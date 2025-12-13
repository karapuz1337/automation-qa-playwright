import { withUserTest, expect } from "../../src/fixtures/customFixtures/userFixture.js";

withUserTest.describe("Garage page", () => {
  withUserTest("Add car button should be visible and enabled", async({ userGaragePage }) => {

    await expect(userGaragePage.addCarBtn).toBeVisible();
    await expect(userGaragePage.addCarBtn).toBeEnabled();
  });
});