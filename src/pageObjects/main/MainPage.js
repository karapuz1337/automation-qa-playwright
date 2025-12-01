import { expect } from "@playwright/test";
import BasePage from "../BasePage.js";
import SignUpForm from "./components/SignUpForm.js";


export default class MainPage extends BasePage {
  constructor(page) {
    super(page, "/");
    this.signUpBtn = page.getByRole("button", { name: "Sign up" });
  }

  async openSignUpForm(){
    await this.signUpBtn.click();
    await expect(this.page.getByRole("dialog")).toBeVisible();

    return new SignUpForm(this.page);
  }
}