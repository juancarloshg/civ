/// <reference types="cypress"/>

describe("google search", () => {
  it("should work", () => {
    cy.visit("http://www.google.com");
    cy.get("input[title='Search']").type("Hello world{enter}");
  });
});
