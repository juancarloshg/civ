describe("world", () => {
  it("should be 20x20", () => {
    cy.startGame()
      .getAllByTestId("world-row")
      .should(rows => {
        expect(rows).to.have.length(20);

        rows.forEach(row =>
          expect(
            row.querySelectorAll("[data-testid=world-square]")
          ).to.have.length(20)
        );
      });
  });
});
