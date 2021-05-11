describe('Portfolio app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'username',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', () => {
    cy.contains('username')
    cy.contains('password')
    cy.get('[data-cy=username-input]')
    cy.get('[data-cy=password-input]')
    cy.get('[data-cy=login-button]')
  })

  describe('Login', () => {
    it('fails with invalid credentials', () => {
      cy.get('[data-cy=username-input]')
        .type('username')
      cy.get('[data-cy=password-input]')
        .type('wrong password')
      cy.get('[data-cy=login-button]')
        .click()

      cy.contains('invalid username or password')
      cy.get('[data-cy=username-input]')
      cy.get('[data-cy=password-input]')
      cy.get('[data-cy=login-button]')
    })

    it('succeeds with valid credentials', () => {
      cy.get('[data-cy=username-input]')
        .type('username')
      cy.get('[data-cy=password-input]')
        .type('password')
      cy.get('[data-cy=login-button]')
        .click()

      cy.contains('logged in as username')
    })
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'username', password: 'password' })
    })

    it('holding form is shown', () => {
      cy.contains('CoinId')
      cy.contains('Amount')
      cy.get('[data-cy=coinId-input]')
      cy.get('[data-cy=amount-input]')
      cy.get('[data-cy=add-holding-button]')
    })

    it('a new holding can be added', () => {
      cy.get('[data-cy=coinId-input]')
        .type('bitcoin')
      cy.get('[data-cy=amount-input]')
        .type('1')
      cy.get('[data-cy=add-holding-button]')
        .click()
      cy.get('[data-cy=holding-bitcoin]')
        .contains('bitcoin 1')
    })

    it('existing holdings can be updated', () => {
      cy.get('[data-cy=coinId-input]')
        .type('bitcoin')
      cy.get('[data-cy=amount-input]')
        .type('1')
      cy.get('[data-cy=add-holding-button]')
        .click()
      cy.get('[data-cy=holding-bitcoin]')
        .should('contain', 'bitcoin 1')

      cy.get('[data-cy=coinId-input]')
        .type('bitcoin')
      cy.get('[data-cy=amount-input]')
        .type('1')
      cy.get('[data-cy=add-holding-button]')
        .click()
      cy.get('[data-cy=holding-bitcoin]')
        .should('contain', 'bitcoin 2')
    })
  })
})
