import { signupPage } from "../../pageObjects/SignupPage";

describe("Signup Form Tests", () => {
  before(() => {
    cy.deleteOne({ email: "aamish.latif9798@gmail.com" }).then((result) => {
      if (result.deletedCount === 0) {
        console.log("No user found to delete.");
      } else {
        console.log("Deleted user(s).");
      }
    });
  });

  beforeEach(() => {
    signupPage.visit();
  });

  it("Contains Signup Text and Check Button is disabled when fields are empty", () => {
    signupPage.assertLoginHeading();
    signupPage.assertButtonDisabled();
  });

  it("throw errors while fields have invalid Email address and password length", () => {
    signupPage.typeFirstName("Muhammad");
    signupPage.typeFirstName("");
    signupPage.assertError("fname", "First name is required");

    signupPage.typeLastName("Aamish");
    signupPage.typeLastName("");
    signupPage.assertError("lname", "Last name is required");

    signupPage.typeEmail("aamish.latif9798@gmail");
    signupPage.assertError("email", "Invalid email address");
    signupPage.typeEmail("");
    signupPage.assertError("email", "Email is required");

    signupPage.typePassword("Aami");
    signupPage.assertError(
      "password",
      "Password must be at least 6 characters"
    );
    signupPage.typePassword("");
    signupPage.assertError("password", "Password is required");
    signupPage.typePassword("Aamish123");

    signupPage.typeConfirmPassword("Aami");
    signupPage.assertError("cpassword", "Passwords do not match");
    signupPage.typeConfirmPassword("");
    signupPage.assertError("cpassword", "Please confirm your password");
  });

  it("checks navigate url is working", () => {
    signupPage.navigateToLogin();
    signupPage.assertUrlContains("/auth/login");
  });

  it("successfully signs up a new user", () => {
    signupPage.typeFirstName("Muhammad");
    signupPage.typeLastName("Aamish");
    signupPage.typeEmail("aamish.latif9798@gmail.com");
    signupPage.typePassword("Aamish123");
    signupPage.typeConfirmPassword("Aamish123");
    signupPage.selectGender("male");
    signupPage.clickSignup();

    signupPage.assertSnackbarMessage("Account created successfully!");
    signupPage.assertUrlContains("/auth/login");
  });
});
