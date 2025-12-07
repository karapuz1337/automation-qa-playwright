import baseCustomFixture from "./baseCustomFixture.js";

export const withUserTest = baseCustomFixture.extend({
  page: async({ browser }, use) => {
    const ctx = await browser.newContext({
      storageState: "states/auth/user.json"
    });
    const page = await ctx.newPage();
    await use (page);
  },

  userGaragePage: async({ page }, use) => {
    await page.goto("/panel/garage");
    await use(page);
  }
});

export default withUserTest;