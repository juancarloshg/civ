// tslint:disable-next-line:no-namespace
declare namespace Cypress {
    interface Chainable {
        startGame: () => Chainable
    }
}

Cypress.Commands.add('startGame', () => cy.visit('/game'))
