describe('grid', () => {
    it('should have rows and columns of tiles', () => {
        cy.startGame()
            .getAllByTestId('grid-row')
            .should(rows => {
                expect(rows).to.have.length.above(0)

                rows.forEach(row => expect(row.querySelectorAll('[data-testid=grid-square]')).to.have.length.above(0))
            })
    })
})
