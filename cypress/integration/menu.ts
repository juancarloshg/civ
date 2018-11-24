describe('menu', () => {
    it('should allow starting a new game', () => {
        cy.visit('/')
            .getByTestId('menu-start-game')
            .click()
            .getByTestId('game-container')
            .should('be.visible')
    })
})
