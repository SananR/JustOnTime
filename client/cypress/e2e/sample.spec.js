import Chance from "chance";

const chance = new Chance();

describe('Test spec', () => {
  it('has a title', () => {
    cy.contains('Just On Time');
  })
})