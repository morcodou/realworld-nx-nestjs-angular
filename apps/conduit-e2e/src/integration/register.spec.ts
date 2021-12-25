import { getGreeting } from '../support/app.po';

describe('Register', () => {
  beforeEach(() => cy.visit('/'));

  // it('should display conduit message', () => {
  //   // cy.visit('http://localhost:4200');

  //   // Custom command example, see `../support/commands.ts` file
  //   cy.login('user2@email.com', 'qwerty1');

  //   // Function helper example, see `../support/app.po.ts` file
  //   getGreeting().contains('conduit');
  // });

  // it('test url works', () => {
  //   cy.visit('http://localhost:4200');
  // });

  it('should register current visitor', () => {
    const username = 'visitor';
    const email = 'visitor@email.com';
    const password = 'visitor123';

    cy.contains('a.nav-link', 'Sign up').click();
    cy.location('hash').should('equal', '#/register')

    cy.get('[data-cy=username]').type(username);
    cy.get('[data-cy=email]').type(email);
    cy.get('[data-cy=password]').type(password);

    cy.get('form').submit();

    cy.location('pathname').should('equal', '/');

    cy.contains('a.nav-link', 'Your Feed').should('have.class', 'nav-link active');
    cy.contains('a.nav-link', 'Global Feed').should('not.have.class', 'nav-link active')

    cy.contains('a.nav-link', 'Global Feed').click();
    cy.contains('a.nav-link', 'Your Feed').should('not.have.class', 'nav-link active');
    cy.contains('a.nav-link', 'Global Feed').should('have.class', 'nav-link active');
  });
});
