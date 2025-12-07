import { expect } from "playwright/test";
import withUserTest from "../../src/fixtures/customFixtures/userFixture.js";

withUserTest.describe("Garage page", () => {
  withUserTest("Add car button should be visible and enabled", async({ userGaragePage }) => {
    const addCarBtn = userGaragePage.getByRole("button", { name: "Add car" });

    await expect(addCarBtn).toBeVisible();
    await expect(addCarBtn).toBeEnabled();
  });
});