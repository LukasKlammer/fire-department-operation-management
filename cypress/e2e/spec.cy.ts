
describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  })
})

describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('https://example.cypress.io')
  })
})

describe('spec.cy.js', () => {
  it('should visit the link "type"', () => {
    cy.contains('type')
  })
})

describe('A test of elemetary functions of site', () => {
  it('Gets, types and asserts', () => {
    cy.contains('type').click()
    cy.url().should('include', '/commands/actions')  // Should be on a new URL which includes '/commands/actions'
    cy.get('.action-email') // Get an input, type into it and verify that the value has been updated
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')
  })
})
