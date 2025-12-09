import BasePage from "../BasePage.js";

export default class GaragePage  extends BasePage {
  constructor(page) {
    super(page, "/panel/garage");
    this.addCarBtn = page.getByRole("button", { name: "Add car" });
  }
}