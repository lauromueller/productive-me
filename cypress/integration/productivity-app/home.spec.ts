describe('tests the home screen of Productive Me', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('WEB_APP_URI'));
  });

  it('should not display any tasks when opening for the first time', () => {
    cy.get('[data-testid="tasks-list"]').should('exist');
    cy.get('[data-testid="tasks-list"] li').should('have.length', 0);
  });

  it('adds a new item to the list', () => {
    cy.get('[data-testid="create-task-input"]').type('First task');
    cy.get('[data-testid="create-task-submit-button"]').click();
    cy.contains('First task').should('exist');
    cy.get('[data-testid="tasks-list"] li').should('have.length', 1);
  });

  it('allows checking a task as completed', () => {
    cy.get('[data-testid="create-task-input"]').type('First task');
    cy.get('[data-testid="create-task-submit-button"]').click();
    cy.contains('First task').parent().find('input[type=checkbox]').click();
    cy.contains('First task').parent().find('input[type=checkbox]').should('be.checked');
  });
});
