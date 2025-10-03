describe('EditMovieDialog E2E Tests', () => {
  it('should edit an existing movie and show updated details', () => {
    cy.visit('/?sort=title');
    cy.get('[data-testid^=movie-tile-]').should('have.length.at.least', 1).first().then(($tile) => {
      const dataTestId = $tile.attr('data-testid') || '';
      const movieId = dataTestId.replace('movie-tile-', '');
      const originalTitle = $tile.find(`[data-testid=movie-tile-title-${movieId}]`).text().trim();
      expect(originalTitle, 'Movie title should not be empty').to.not.equal('');
      cy.get(`[data-testid=movie-tile-dropdown-${movieId}]`).click();
      cy.get(`[data-testid=movie-tile-edit-button-${movieId}]`).click();
      cy.url().should('include', `/${movieId}/edit`);
      const newTitle = originalTitle + ' Edited';
      cy.get('[data-testid=movie-title-input]').clear().type(newTitle);
      cy.get('[data-testid=movie-form-submit-button]').click();
      cy.contains(newTitle).should('be.visible');
    });
  });
});
