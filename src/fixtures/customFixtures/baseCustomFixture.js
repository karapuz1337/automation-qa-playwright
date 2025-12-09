import { test as base } from "@playwright/test";
import MainPage from "../../pageObjects/main/MainPage.js";

export const test = base.extend ({
  mainPage: async({ page }, use) => {
    const mainPage = new MainPage(page);
    await mainPage.navigate();
    await use(mainPage);
  }
});

export default test;