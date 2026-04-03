describe("Calculator Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Addition: 5 + 3 = 8", () => {
    cy.contains("5").click();
    cy.contains("+").click();
    cy.contains("3").click();
    cy.contains("=").click();
    cy.get("input").should("have.value", "8");
  });

  it("Subtraction: 10 - 4 = 6", () => {
    cy.contains("1").click();
    cy.contains("0").click();
    cy.contains("-").click();
    cy.contains("4").click();
    cy.contains("=").click();
    cy.get("input").should("have.value", "6");
  });

  it("Multiplication: 6 * 7 = 42", () => {
    cy.contains("6").click();
    cy.contains("*").click();
    cy.contains("7").click();
    cy.contains("=").click();
    cy.get("input").should("have.value", "42");
  });

  it("Division: 15 / 3 = 5", () => {
    cy.contains("1").click();
    cy.contains("5").click();
    cy.contains("/").click();
    cy.contains("3").click();
    cy.contains("=").click();
    cy.get("input").should("have.value", "5");
  });
});
