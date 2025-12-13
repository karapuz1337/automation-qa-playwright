import baseCustomFixture from "./baseCustomFixture.js";
import GaragePage from "../../pageObjects/panel/garage/GaragePage.js";
import { request as pwRequest, expect as baseExpect } from "@playwright/test";
import ApiClient from "../../clients/ApiClient.js";

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
  },

  // eslint-disable-next-line no-empty-pattern
  request: async({}, use) => {
    const ctx = await pwRequest.newContext({
      storageState: "states/auth/user.json"
    });

    await use(ctx);
  },

  apiClient: async({ request }, use) => {
    const apiClient = new ApiClient(request);
    await use(apiClient);
  }

});

export default withUserTest;

export const expect = baseExpect;