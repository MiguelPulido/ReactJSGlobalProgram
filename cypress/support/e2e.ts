Cypress.on('window:before:load', (win) => {
  cy.spy(win.console, 'error').as('consoleError')
  cy.spy(win.console, 'warn').as('consoleWarn')
})
