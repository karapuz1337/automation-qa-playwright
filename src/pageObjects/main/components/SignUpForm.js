import { expect } from "@playwright/test";
import BaseComponent from "../../BaseComponent.js";

export default class SignUpForm extends BaseComponent {
  constructor(page) {
    super(page);
    this.container = page.locator(".modal-content");
    this.nameField = this.container.locator("#signupName");
    this.lastNameField = this.container.locator("#signupLastName");
    this.emailField = this.container.locator("#signupEmail");
    this.passwordField = this.container.locator("#signupPassword");
    this.reEnterPasswordField = this.container.locator("#signupRepeatPassword");
    this.registerBtn = this.container.getByRole("button", { name: "Register" });
  }

  async fillNameField(name) {
    await this.nameField.fill(name);
    await this.nameField.blur();
  }

  async fillLastNameField(lastName) {
    await this.lastNameField.fill(lastName);
    await this.lastNameField.blur();
  }

  async fillEmailField(email) {
    await this.emailField.fill(email);
    await this.emailField.blur();
  }

  async fillPasswordField(password) {
    await this.passwordField.fill(password);
    await this.passwordField.blur();
  }

  async fillReEnterPasswordField(reEnterPassword) {
    await this.reEnterPasswordField.fill(reEnterPassword);
    await this.reEnterPasswordField.blur();
  }

  async fill({ name, lastName, email, password, reEnterPassword }) {

    // Check the Register button state after each input
    await expect(this.registerBtn).toBeVisible();
    await expect(this.registerBtn).toBeDisabled();

    // Fill the Name field
    await this.fillNameField(name);

    await expect(this.registerBtn).toBeVisible();
    await expect(this.registerBtn).toBeDisabled();

    // Fill the Last Name field
    await this.fillLastNameField(lastName);

    await expect(this.registerBtn).toBeVisible();
    await expect(this.registerBtn).toBeDisabled();

    // Fill the Email field
    await this.fillEmailField(email);

    await expect(this.registerBtn).toBeVisible();
    await expect(this.registerBtn).toBeDisabled();

    // Fill the Password field
    await this.fillPasswordField(password);

    await expect(this.registerBtn).toBeVisible();
    await expect(this.registerBtn).toBeDisabled();

    // Fill the Re-enter password field
    await this.fillReEnterPasswordField(reEnterPassword);
  }

  async fillAndSubmit({ name, lastName, email, password, reEnterPassword }) {
    await this.fill({ name, lastName, email, password, reEnterPassword });

    await expect(this.registerBtn).toBeVisible();
    await expect(this.registerBtn).toBeEnabled();

    await this.registerBtn.click();

    await expect(this.page).toHaveURL("/panel/garage");
  }
}