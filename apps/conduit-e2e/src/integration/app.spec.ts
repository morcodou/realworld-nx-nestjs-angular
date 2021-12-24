import { getGreeting } from '../support/app.po';

describe('conduit', () => {
  // beforeEach(() => cy.visit('/'));

  // it('should display welcome message', () => {
  //   // cy.visit('http://localhost:4200');

  //   // Custom command example, see `../support/commands.ts` file
  //   cy.login('user2@email.com', 'qwerty1');

  //   // Function helper example, see `../support/app.po.ts` file
  //   getGreeting().contains('conduit');
  // });

  it('test url works', () => {
    cy.visit('http://localhost:4200');
  });

  it('test sign up exists', () => {
    cy.contains('a.nav-link', 'Sign up').click();
  });
});
