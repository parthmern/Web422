describe("Login Flow E2E Test", () => {
  it("should handle login and logout flow", () => {
    cy.visit("/login");

    cy.get('input[name="userName"]').type("admin");
    cy.get('input[name="password"]').type("admin");
    cy.get("form").submit();

    cy.url().should("include", "/vehicles");

    cy.contains("Welcome admin").should("be.visible");

    cy.contains("Logout").click();

    cy.url().should("eq", "http://localhost:3000/");

    cy.visit("/vehicles");

    cy.url().should("include", "/login");

    // pswd thing
    cy.get('input[name="userName"]').type("wrong");
    cy.get('input[name="password"]').type("wrong");
    cy.get("form").submit();

    cy.get('div[role="alert"]').should("be.visible");
  });
});
