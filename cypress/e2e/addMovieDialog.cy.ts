
const INITIAL_URL = '/?sort=title';
const ADD_MOVIE_URL = '/new';
const TITLE = '00000000001 Test Movie';
const POSTER_URL = 'https://example.com/test.jpg';
const RUNTIME = 120;
const RELEASE_DATE = '2025-12-31';
const OVERVIEW = 'This is a test movie.';
const RATING = 8.5;
const GENRE = 'Action';

describe('AddMovieDialog E2E Tests', () => {
  it('should add a new movie and redirect to its previous page', () => {
    cy.visit(INITIAL_URL);
    cy.visit(ADD_MOVIE_URL);

    cy.get('[data-testid=movie-title-input]').type(TITLE);
    cy.get('[data-testid=movie-image-url-input]').type(POSTER_URL);
    cy.get('[data-testid=movie-duration-input]').type(`${RUNTIME}`);
    cy.get('[data-testid=movie-release-date-input]').type(RELEASE_DATE);
    cy.get('[data-testid=movie-description-textarea]').type(OVERVIEW);
    cy.get('[data-testid=movie-rating-input]').clear().type(`${RATING}`);
    cy.get('[data-testid=genres-dropdown-button]').click();
    cy.get(`[data-testid=genre-checkbox-${GENRE.toLowerCase()}]`).check();
    cy.get('[data-testid=movie-form-submit-button]').click();

    cy.contains(TITLE).should('be.visible');
    cy.url().should('eq', `${Cypress.config().baseUrl}${INITIAL_URL}`);
  });

  it('should go to previous page when cancel is clicked', () => {
    cy.visit(INITIAL_URL);
    cy.visit(ADD_MOVIE_URL);
    cy.get('[data-testid=movie-form-cancel-button]').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}${INITIAL_URL}`);
  });

  it('should not add a new movie when poster is missing', () => {
    cy.visit(INITIAL_URL);
    cy.visit(ADD_MOVIE_URL);

    cy.get('[data-testid=movie-title-input]').type(TITLE);
    cy.get('[data-testid=movie-duration-input]').type(`${RUNTIME}`);
    cy.get('[data-testid=movie-release-date-input]').type(RELEASE_DATE);
    cy.get('[data-testid=movie-description-textarea]').type(OVERVIEW);
    cy.get('[data-testid=movie-rating-input]').clear().type(`${RATING}`);
    cy.get('[data-testid=genres-dropdown-button]').click();
    cy.get(`[data-testid=genre-checkbox-${GENRE.toLowerCase()}]`).check();
    cy.get('[data-testid=movie-form-submit-button]').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}${ADD_MOVIE_URL}`);
  });

  it('should not add a new movie when title is missing', () => {
    cy.visit(INITIAL_URL);
    cy.visit(ADD_MOVIE_URL);

    cy.get('[data-testid=movie-image-url-input]').type(POSTER_URL);
    cy.get('[data-testid=movie-duration-input]').type(`${RUNTIME}`);
    cy.get('[data-testid=movie-release-date-input]').type(RELEASE_DATE);
    cy.get('[data-testid=movie-description-textarea]').type(OVERVIEW);
    cy.get('[data-testid=movie-rating-input]').clear().type(`${RATING}`);
    cy.get('[data-testid=genres-dropdown-button]').click();
    cy.get(`[data-testid=genre-checkbox-${GENRE.toLowerCase()}]`).check();
    cy.get('[data-testid=movie-form-submit-button]').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}${ADD_MOVIE_URL}`);
  });

  it('should not add a new movie when poster is invalid', () => {
    cy.visit(INITIAL_URL);
    cy.visit(ADD_MOVIE_URL);

    cy.get('[data-testid=movie-title-input]').type(TITLE);
    cy.get('[data-testid=movie-image-url-input]').type('not-a-valid-url');
    cy.get('[data-testid=movie-duration-input]').type(`${RUNTIME}`);
    cy.get('[data-testid=movie-release-date-input]').type(RELEASE_DATE);
    cy.get('[data-testid=movie-description-textarea]').type(OVERVIEW);
    cy.get('[data-testid=movie-rating-input]').clear().type(`${RATING}`);
    cy.get('[data-testid=genres-dropdown-button]').click();
    cy.get(`[data-testid=genre-checkbox-${GENRE.toLowerCase()}]`).check();
    cy.get('[data-testid=movie-form-submit-button]').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}${ADD_MOVIE_URL}`);
  });

  it('should not add a new movie when runtime is invalid', () => {
    cy.visit(INITIAL_URL);
    cy.visit(ADD_MOVIE_URL);

    cy.get('[data-testid=movie-title-input]').type(TITLE);
    cy.get('[data-testid=movie-image-url-input]').type(POSTER_URL);
    cy.get('[data-testid=movie-duration-input]').type('-1');
    cy.get('[data-testid=movie-release-date-input]').type(RELEASE_DATE);
    cy.get('[data-testid=movie-description-textarea]').type(OVERVIEW);
    cy.get('[data-testid=movie-rating-input]').clear().type(`${RATING}`);
    cy.get('[data-testid=genres-dropdown-button]').click();
    cy.get(`[data-testid=genre-checkbox-${GENRE.toLowerCase()}]`).check();
    cy.get('[data-testid=movie-form-submit-button]').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}${ADD_MOVIE_URL}`);
  });

  it('should not add a new movie when rating is invalid', () => {
    cy.visit(INITIAL_URL);
    cy.visit(ADD_MOVIE_URL);

    cy.get('[data-testid=movie-title-input]').type(TITLE);
    cy.get('[data-testid=movie-image-url-input]').type(POSTER_URL);
    cy.get('[data-testid=movie-duration-input]').type(`${RUNTIME}`);
    cy.get('[data-testid=movie-release-date-input]').type(RELEASE_DATE);
    cy.get('[data-testid=movie-description-textarea]').type(OVERVIEW);
    cy.get('[data-testid=movie-rating-input]').clear().type('12');
    cy.get('[data-testid=genres-dropdown-button]').click();
    cy.get(`[data-testid=genre-checkbox-${GENRE.toLowerCase()}]`).check();
    cy.get('[data-testid=movie-form-submit-button]').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}${ADD_MOVIE_URL}`);
  });
});
