describe("Booking Tests", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    cy.get('ul > :nth-child(2)').click({ force: true });
    cy.get(':nth-child(2) > .appointment__add > .appointment__add-button').click({ force: true });
    cy.get('[data-testid=student-name-input]').focus({ force: true }).type("Lydia Miller-Jones");
    cy.get(':nth-child(1) > .interviewers__item-image').click({ force: true });
    cy.get('.button--confirm').click({ force: true });
  });
});

describe("Editing Tests", () => {
  it("should edit an interview", () => {
    cy.visit("/");
    cy.contains("Monday").click({ force: true });
    cy.get('.appointment__card').trigger('mouseover', { force: true })
    cy.get(".appointment__actions-button").first().click({ force: true }); // Select Edit button
    cy.get('[data-testid=student-name-input]').focus({ force: true }).clear()
    cy.get('[data-testid=student-name-input]').type("Archie Levi");
    cy.get(':nth-child(2) > .interviewers__item-image').click({ force: true });
    cy.get('.button--confirm').click({ force: true });
  });
});

describe('Canceling Tests', () => {
  it('should delete an appointment', () => {

    cy.visit("/");
    cy.contains("Monday").click({ force: true });
    cy.get('.appointment__card').trigger('mouseover', { force: true })
    cy.get(".appointment__actions-button:nth-of-type(2)").click({ force: true }); // click Delete button
    //cy.get('.appointment__actions > :nth-child(2)').click({ force: true });

    // cy.get('[data-testid=student-name-input]').focus({ force: true }).clear()
    // cy.get('[data-testid=student-name-input]').type("Archie Levi");
    // cy.get(':nth-child(2) > .interviewers__item-image').click({ force: true });
    // cy.get('.button--confirm').click({ force: true });

    // cy.get("[alt = Delete]").first().click({ force: true });
    cy.contains("Confirm").click();
  // cy.contains("Deleting").should("exist");
  // cy.contains("Deleting").should("not.exist");
    // cy.contains(".appointment__card--show", "Archie Cohen")
    //   .should("not.exist");
  })
});