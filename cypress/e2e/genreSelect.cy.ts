class GenreSelectData{
    genres: string[];
    selectedGenre: string;
}

function getByTestId(selector: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(`[data-testid=${selector}]`);
}

describe('GenreSelect Component E2E Tests', () => {
  let genreData: GenreSelectData;

  before(() => {
    cy.fixture('genreSelect').then((data) => {
      genreData = data as GenreSelectData;
    })
  })

  beforeEach(() => {
    cy.visit('/')
  })

  it('should render all genres passed in props', () => {
    getByTestId('genre-select-container').should('exist')
    
    genreData.genres.forEach((genre) => {
      getByTestId(`genre-button-${genre.toLowerCase()}`)
        .should('exist')
        .should('contain.text', genre)
    })
  })

  it('should highlight the selected genre passed in props', () => {
    const selectedGenre = genreData.selectedGenre
    const nonSelectedGenre = genreData.genres[2]

    getByTestId(`genre-button-${selectedGenre.toLowerCase()}`)
        .should('have.class', 'genre-button-selected')
        .should('not.have.class', 'genre-button')

    getByTestId(`genre-button-${nonSelectedGenre.toLowerCase()}`)
        .should('have.class', 'genre-button')
        .should('not.have.class', 'genre-button-selected')
  })

  it('should change selection when different genre buttons are clicked', () => {
    const firstSelectedGenre = genreData.genres[1]
    const secondSelectedGenre = genreData.genres[2]

    getByTestId(`genre-button-${firstSelectedGenre.toLowerCase()}`).click()    
    getByTestId(`genre-button-${firstSelectedGenre.toLowerCase()}`)
        .should('have.class', 'genre-button-selected')
    
    getByTestId(`genre-button-${secondSelectedGenre.toLowerCase()}`).click()
    getByTestId(`genre-button-${secondSelectedGenre.toLowerCase()}`)
        .should('have.class', 'genre-button-selected')
        
    getByTestId(`genre-button-${firstSelectedGenre.toLowerCase()}`)
        .should('have.class', 'genre-button')
        .should('not.have.class', 'genre-button-selected')
  })
})
