describe('grid', () => {
    it('should have a 15 rows 20 columns grid of visible squares', () => {
        cy.startGame()
            .getAllByTestId('grid-row')
            .should(rows => {
                expect(rows).to.have.length(15)

                rows.forEach(row => expect(row.querySelectorAll('[data-testid=grid-square]')).to.have.length(20))
            })
    })
})
