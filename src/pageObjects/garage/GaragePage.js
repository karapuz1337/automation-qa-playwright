import BasePage from "../BasePage.js";
import ProfilePage from "../profile/ProfilePage.js";

export default class GaragePage  extends BasePage {
  constructor(page) {
    super(page, "/panel/garage");
    this.addCarBtn = page.getByRole("button", { name: "Add car" });
    this.profileBtn = page.getByRole("link", { name: " Profile" });
  }

  async openProfile() {
    await this.profileBtn.click();
    return new ProfilePage(this.page);
  }

}