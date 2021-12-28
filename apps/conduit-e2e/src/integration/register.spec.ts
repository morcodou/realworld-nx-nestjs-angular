describe('Register', () => {
  beforeEach(() => {
    cy.task('cleanUserVisitor');
    cy.visit('/');
  });

  it('should register current visitor', () => {
    const username = 'visitor';
    const email = 'visitor@email.com';
    const password = 'visitor123';

    cy.contains('a.nav-link', 'Sign up').click();
    cy.location('hash').should('equal', '#/register')

    cy.screenshot('screenshot1');

    cy.get('[data-cy=username]').type(username);
    cy.get('[data-cy=email]').type(email);
    cy.get('[data-cy=password]').type(password);

    cy.get('form').submit();
    cy.screenshot('screenshot2');

    cy.location('pathname').should('equal', '/');

    cy.contains('a.nav-link', 'Your Feed').should('have.class', 'nav-link active');
    cy.contains('a.nav-link', 'Global Feed').should('not.have.class', 'nav-link active')

    cy.contains('a.nav-link', 'Global Feed').click();
    cy.contains('a.nav-link', 'Your Feed').should('not.have.class', 'nav-link active');
    cy.contains('a.nav-link', 'Global Feed').should('have.class', 'nav-link active');
  });
});
