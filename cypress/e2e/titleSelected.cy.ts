import { getByTestId } from "./utils";

describe('TitleSelected Component E2E Tests', () => {
  const selectedTitle = 'Title';

  it('should update the URL with the selected title as a filter when changed', () => {
    cy.visit('/');
    getByTestId('sort-select').select(selectedTitle);
    cy.url().should('include', `sort=${selectedTitle.toLowerCase()}`);
  });

  it('should select the correct title in the sort selector when navigating directly to a title URL', () => {
    cy.visit(`/?sort=${selectedTitle.toLowerCase()}`);
    getByTestId('sort-select').should('have.value', selectedTitle);
  });
});