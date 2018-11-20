describe("game", () => {
  it("should display the game grid", () => {
    cy.startGame()
      .getByTestId("game-grid")
      .should("be.visible");
  });
});
