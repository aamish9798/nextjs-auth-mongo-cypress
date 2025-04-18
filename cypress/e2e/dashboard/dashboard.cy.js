import { loginPage } from "../../pageObjects/LoginPage";
import { dashboardPage } from "../../pageObjects/DashboardPage";

describe("Dashboard Tests", () => {
  beforeEach(() => {
    loginPage.visit();
    loginPage.typeEmail("aamish.latif9798@gmail.com");
    loginPage.typePassword("Aamish123");
    loginPage.clickLogin();
    loginPage.assertUrlContains("/dashboard");
  });

  it("Checks User Details and Logout Button", () => {
    dashboardPage.getWelcomeText().should("be.visible");

    dashboardPage.assertUserDetails({
      fullName: "Muhammad Aamish",
      email: "aamish.latif9798@gmail.com",
    });

    dashboardPage.getLogoutButton().should("be.visible");
    dashboardPage.clickLogout();
    dashboardPage.assertRedirectedToLogin();
  });
});
