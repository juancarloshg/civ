describe("game", () => {
  it("should display the world", () => {
    cy.startGame()
      .getByTestId("game-world")
      .should("be.visible");
  });
});
