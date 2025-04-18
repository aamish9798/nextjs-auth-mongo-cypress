class SignupPage {
  visit() {
    cy.visit("/auth/signup");
    cy.getDataTest("fname-field").find("input").as("fnameInput");
    cy.getDataTest("lname-field").find("input").as("lnameInput");
    cy.getDataTest("email-field").find("input").as("emailInput");
    cy.getDataTest("password-field").find("input").as("passwordInput");
    cy.getDataTest("cpassword-field").find("input").as("cPasswordInput");
    cy.getDataTest("signup-button").as("signupButton");
    cy.getDataTest("gender-field").as("genderField");
  }

  selectGender(gender) {
    cy.get(
      '[data-test="gender-field"] input[type="radio"][value="' + gender + '"]'
    )
      .check({ force: true })
      .invoke("val")
      .as("selectedGender");
  }

  getFirstNameInput() {
    return cy.get("@fnameInput");
  }

  getLastNameInput() {
    return cy.get("@lnameInput");
  }

  getEmailInput() {
    return cy.get("@emailInput");
  }

  getPasswordInput() {
    return cy.get("@passwordInput");
  }

  getConfirmPasswordInput() {
    return cy.get("@cPasswordInput");
  }

  getSignupButton() {
    return cy.get("@signupButton");
  }

  getGenderField() {
    return cy.get("@genderField");
  }

  typeFirstName(fname) {
    const input = this.getFirstNameInput().clear();
    if (fname) {
      input.type(fname);
    }
  }

  typeLastName(lname) {
    const input = this.getLastNameInput().clear();
    if (lname) {
      input.type(lname);
    }
  }

  typeEmail(email) {
    const input = this.getEmailInput().clear();
    if (email) {
      input.type(email);
    }
  }

  typePassword(password) {
    const input = this.getPasswordInput().clear();
    if (password) {
      input.type(password);
    }
  }

  typeConfirmPassword(confirmPassword) {
    const input = this.getConfirmPasswordInput().clear();
    if (confirmPassword) {
      input.type(confirmPassword);
    }
  }

  clickSignup() {
    this.getSignupButton().click();
  }

  assertError(field, message) {
    cy.getDataTest(`${field}-field`).find("p").should("contain.text", message);
  }

  assertButtonDisabled() {
    this.getSignupButton().should("be.disabled");
  }

  assertLoginHeading() {
    cy.contains(/Sign Up/).should("be.visible");
  }

  navigateToLogin() {
    cy.contains("Login").click();
  }

  assertUrlContains(path) {
    cy.url().should("include", path);
  }

  assertSnackbarMessage(msg) {
    cy.get(".MuiSnackbar-root").should("be.visible");
    cy.get(".MuiAlert-message").should("contain.text", msg);
  }
}

export const signupPage = new SignupPage();
