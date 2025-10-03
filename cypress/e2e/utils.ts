export const getByTestId = (selector: string): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy.get(`[data-testid=${selector}]`);
}