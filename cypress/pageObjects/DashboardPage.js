class DashboardPage {
  getWelcomeText() {
    return cy.contains("Welcome");
  }

  getUserId() {
    return cy.contains("User ID:");
  }

  getGender() {
    return cy.contains("Gender:");
  }

  getLogoutButton() {
    return cy.contains("Logout");
  }

  assertUserDetails({ fullName, email }) {
    this.getUserId().should("be.visible");
    cy.contains(`Full Name: ${fullName}`).should("be.visible");
    cy.contains(`Email: ${email}`).should("be.visible");
    this.getGender().should("be.visible");
  }

  clickLogout() {
    this.getLogoutButton().click();
  }

  assertRedirectedToLogin() {
    cy.url().should("include", "/auth/login");
  }
}

export const dashboardPage = new DashboardPage();
