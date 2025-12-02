import BaseComponent from "../../BaseComponent.js";

export default class SignUpForm extends BaseComponent {
  constructor(page) {
    super(page);
    this.container = this.page
      .getByRole("dialog")
      .locator(".modal-content");
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
    await this.fillNameField(name);
    await this.fillLastNameField(lastName);
    await this.fillEmailField(email);
    await this.fillPasswordField(password);
    await this.fillReEnterPasswordField(reEnterPassword);
  }

  async submit() {
    await this.registerBtn.click();
  }

  async fillAndSubmit(data) {
    await this.fill(data);
    await this.submit();
  }
}