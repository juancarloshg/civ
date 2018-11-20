describe("grid", () => {
  it("should have a 20x20 grid of visible squares", () => {
    cy.startGame()
      .getAllByTestId("grid-row")
      .should(rows => {
        expect(rows).to.have.length(20);

        rows.forEach(row =>
          expect(
            row.querySelectorAll("[data-testid=grid-square]")
          ).to.have.length(20)
        );
      });
  });
});
