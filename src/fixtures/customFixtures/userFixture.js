import baseCustomFixture from "./baseCustomFixture.js";
import GaragePage from "../../pageObjects/garage/GaragePage.js";

export const withUserTest = baseCustomFixture.extend({
  page: async({ browser }, use) => {
    const ctx = await browser.newContext({
      storageState: "states/auth/user.json"
    });
    const page = await ctx.newPage();
    await use(page);
    await ctx.close();
  },

  userGaragePage: async({ page }, use) => {
    const garagePage = new GaragePage(page);
    await garagePage.navigate();
    await use(garagePage);
  }
});

export default withUserTest;