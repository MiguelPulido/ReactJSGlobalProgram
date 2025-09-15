describe('MovieDetails E2E Tests', () => {
  it('should navigate to the correct movie details page when a movie tile is clicked', () => {
    cy.visit('/');
    cy.get('[data-testid^=movie-tile-]').should('have.length.at.least', 1).first().then(($tile) => {
      const dataTestId = $tile.attr('data-testid') || '';
      const movieId = dataTestId.replace('movie-tile-', '');
      const movieTitle = $tile.find(`[data-testid=movie-tile-title-${movieId}]`).text().trim();
      expect(movieTitle, 'Movie title should not be empty').to.not.equal('');
      cy.wrap($tile).click();
      cy.url().should('include', `/${movieId}`);
      cy.contains(movieTitle).should('be.visible');
    });
  });

  it('should display movie details when navigating directly to a movie details page by URL', () => {
    cy.visit('/');
    cy.get('[data-testid^=movie-tile-]').should('have.length.at.least', 1).first().then(($tile) => {
      const dataTestId = $tile.attr('data-testid') || '';
      const movieId = dataTestId.replace('movie-tile-', '');
      const movieTitle = $tile.find(`[data-testid=movie-tile-title-${movieId}]`).text().trim();
      expect(movieTitle, 'Movie title should not be empty').to.not.equal('');
      cy.visit(`/${movieId}`);
      cy.contains(movieTitle).should('be.visible');
    });
  });
});
