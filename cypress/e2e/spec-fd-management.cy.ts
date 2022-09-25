

describe('fd-mission-management', () => {
  it('should open the web-app', () => {
    cy.visit('http://localhost:4200/')
  })
})

describe('login-screen', () => {
  it('should render the card with login options', () => {
    cy.get('mat-card')
  })
  it('should render the login-button', () => {
    cy.get('[data-cy="login"]')
  })
})

describe('Google', function () {
  beforeEach(function () {
    cy.task('db:seed')
    cy.loginByGoogleApi()
  })

  it('shows onboarding', function () {
    // cy.contains('Get Started').should('be.visible')
  })
})
