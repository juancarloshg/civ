describe("game", () => {
  it("should display the world", () => {
    cy.startGame()
      .get("[data-testid=game-world]")
      .should("be.visible");
  });
});
