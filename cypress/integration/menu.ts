describe("menu", () => {
  it("should allow starting a new game", () => {
    cy.visit("/")
      .get("[data-testid=menu-start-game]")
      .click()
      .get("[data-testid=game-container]")
      .should("be.visible");
  });
});
