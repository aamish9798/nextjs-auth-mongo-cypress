import { loginPage } from "../../pageObjects/LoginPage";

describe("Login Form Tests", () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it("Contains Login Text and Check Button is disabled when fields are empty", () => {
    loginPage.assertLoginHeading();
    loginPage.getEmailInput().clear();
    loginPage.getPasswordInput().clear();
    loginPage.assertButtonDisabled();
  });

  it("throw errors while fields have invalid Email address and password length", () => {
    loginPage.typeEmail("aamish.latif9798@gmail");
    loginPage.assertError("email", "Invalid email address");

    loginPage.typeEmail("");
    loginPage.assertError("email", "Email is required");

    loginPage.typePassword("Aami");
    loginPage.assertError("password", "Password must be at least 6 characters");

    loginPage.typePassword("");
    loginPage.assertError("password", "Password is required");
  });

  it("checks navigate url is working", () => {
    loginPage.navigateToSignup();
    loginPage.assertUrlContains("/auth/signup");
  });

  it("shows error for invalid credentials", () => {
    loginPage.typeEmail("aamish.latif9798@gmail.com");
    loginPage.typePassword("Aamish");
    loginPage.clickLogin();
    loginPage.assertSnackbarMessage("Invalid credentials");

    loginPage.typeEmail("aamish.latif98@gmail.com");
    loginPage.typePassword("Aamish");
    loginPage.clickLogin();
    loginPage.assertSnackbarMessage("User not found");
  });

  it("login Successfuly and Go to Dashboard page", () => {
    loginPage.typeEmail("aamish.latif9798@gmail.com");
    loginPage.typePassword("Aamish123");
    loginPage.clickLogin();
    loginPage.assertSnackbarMessage("Login successful!");
    loginPage.assertUrlContains("/dashboard");
  });
});
