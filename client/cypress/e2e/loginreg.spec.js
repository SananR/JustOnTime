import Chance from "chance";

const chance = new Chance();
const email = chance.email();
const firstName = chance.first();
const lastName = chance.last();
const password = chance.hash({length: 10})

describe('Registration', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3005')
    cy.get('#user-button')
      .click(15,20)
      .contains('Register')
      .click()
      .url()
      .should('eq','http://localhost:3005/signup')
  })

  it('Check errors', () => {
    cy.get('input[name="firstName"]')
      .type('A')
      .get('#submit-button')
      .click()
      .url()
      .should('eq','http://localhost:3005/signup')
      .get('input[name="firstName"]')
      .clear()
      .type(firstName)
      .should('have.value', firstName)
      .get('input[name="lastName"]')
      .type(lastName)
      .should('have.value',lastName)
      .get('input[name="email"]')
      .type(email)
      .should('have.value',email)
      .get('input[name="password"]')
      .type('1')
      .should('have.value','1')
      .get('#submit-button')
      .click()
      .url()
      .should('eq','http://localhost:3005/signup')
      .get('input[name="password"]')
      .clear()
      .type('abcd')
      .should('have.value','abcd')
      .get('#submit-button')
      .click()
      .url()
      .should('eq','http://localhost:3005/signup')
      .get('input[name="password"]')
      .clear()
      .type(password)
      .should('have.value',password)
      .get('#submit-button')
      .click()
      .url()
      .should('eq','http://localhost:3005/signup')
      .get('input[name="password2"]')
      .type('1234567')
      .should('have.value','1234567')
      .get('#submit-button')
      .click()
      .url()
      .should('eq','http://localhost:3005/signup')
  })
  
  it('Fill Correct Form and Submit', () => {
    cy.get('input[name="firstName"]')
      .type(firstName)
      .should('have.value', firstName)
      .get('input[name="lastName"]')
      .type(lastName)
      .should('have.value',lastName)
      .get('input[name="email"]')
      .type(email)
      .should('have.value',email)
      .get('input[name="password"]')
      .type(password)
      .should('have.value',password)
      .get('input[name="password2"]')
      .type(password)
      .should('have.value',password)
      .get('#submit-button')
      .click()
      .url()
      .should('eq','http://localhost:3005/')
  })
})

describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3005')
    cy.get('#user-button')
      .click(15,20)
      .contains('Login')
      .click()
      .url()
      .should('eq','http://localhost:3005/login')
  })

  it('Check errors', () => {
    cy.get('input[name="email"]')
      .type(email)
      .should('have.value',email)
      .get('input[name="password"]')
      .type('1234567')
      .should('have.value','1234567')
      .get('#submit-button')
      .click()
      .url()
      .should('eq','http://localhost:3005/login')
  })
  
  it('Fill Correct Form and Submit', () => {
    cy.get('input[name="email"]')
    .type(email)
    .should('have.value',email)
    .get('input[name="password"]')
    .type(password)
    .should('have.value',password)
    .get('#submit-button')
    .click()
    .url()
    .should('eq','http://localhost:3005/')
  })
})



