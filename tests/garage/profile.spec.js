import { withUserTest, expect } from "../../src/fixtures/customFixtures/userFixture.js";

withUserTest.describe("Profile page", () => {

  withUserTest("Should display the intercepted Name and Lastname", async({ page, userGaragePage }) => {
    // Test data
    const testName = "JohnTest";
    const testLastName = "LastNameTest";

    await withUserTest.step("Intercept and change a GET request", async() => {
      await page.route("api/users/profile", async(route) => {
        // Fetch the response
        const response = await route.fetch();
        const json = await response.json();

        // Change the response
        json.data["name"] = testName;
        json.data["lastName"] = testLastName;

        // Fulfill the request with a changed name and last name
        await route.fulfill({ response, json });
      });
    });

    await withUserTest.step("Open the profile and check Name and Last Name", async() => {
      const profilePage = await userGaragePage.openProfile();

      // Check that the correct Profile name is displayed
      const expectedProfileName = `${testName} ${testLastName}`;
      await expect(profilePage.profileName).toHaveText(expectedProfileName);
    } );
  });
});