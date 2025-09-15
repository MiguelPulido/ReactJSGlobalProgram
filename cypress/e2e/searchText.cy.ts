describe('SearchText Component E2E Tests', () => {
  const searchText = 'guardians';

  it('should update the URL with the search text as a query param when searching', () => {
    cy.visit('/');
    cy.get('.search-input').type(`${searchText}{enter}`);
    cy.url().should('include', `query=${searchText}`);
  });

  it('should show the search text in the input when navigating directly to a query URL', () => {
    cy.visit(`/?query=${searchText}`);
    cy.get('.search-input').should('have.value', searchText);
  });
});
