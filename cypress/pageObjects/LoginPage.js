class LoginPage {
  visit() {
    cy.visit("/auth/login");
    cy.getDataTest("email-field").find("input").as("emailInput");
    cy.getDataTest("password-field").find("input").as("passwordInput");
    cy.getDataTest("login-button").as("loginButton");
  }

  getEmailInput() {
    return cy.get("@emailInput");
  }

  getPasswordInput() {
    return cy.get("@passwordInput");
  }

  getLoginButton() {
    return cy.get("@loginButton");
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

  clickLogin() {
    this.getLoginButton().click();
  }

  assertError(field, message) {
    cy.getDataTest(`${field}-field`).find("p").should("contain.text", message);
  }

  assertButtonDisabled() {
    this.getLoginButton().should("be.disabled");
  }

  assertLoginHeading() {
    cy.contains(/Login/).should("be.visible");
  }

  navigateToSignup() {
    cy.contains("Sign up").click();
  }

  assertUrlContains(path) {
    cy.url().should("include", path);
  }

  assertSnackbarMessage(msg) {
    cy.get(".MuiSnackbar-root").should("be.visible");
    cy.get(".MuiAlert-message").should("contain.text", msg);
  }
}

export const loginPage = new LoginPage();
