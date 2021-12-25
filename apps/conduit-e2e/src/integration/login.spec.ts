import { getGreeting } from '../support/app.po';

describe('Login', () => {
  beforeEach(() => cy.visit('/'));

    it('should not login with wrong credentials', () => {
    const email = 'wrong-visitor';
    const password = 'notapassword';

    cy.get('[data-cy=sign-in]').click();

    cy.get('[data-cy=email]').type(email);
    cy.get('[data-cy=password]').type(password);

    cy.get('[data-cy=login-form]').submit();

    cy.contains('.text-danger', 'This field must be a valid email');
  });

  it('should login with correct credentials', () => {
    const email = 'visitor@email.com';
    const password = 'visitor123';

    cy.get('[data-cy=sign-in]').click();
    cy.location('hash').should('equal', '#/login')
    cy.url().should('include', '/#/login');

    cy.location().should((loc) => {
      expect(loc.hash).to.eq('#/login')
      // expect(loc.host).to.eq('localhost:8000')
      // expect(loc.hostname).to.eq('localhost')
      // expect(loc.href).to.eq(
      //   'http://localhost:8000/app/index.html?q=dan#/users/123/edit'
      // )
      // expect(loc.origin).to.eq('http://localhost:8000')
      // expect(loc.pathname).to.eq('/#/login')
      // expect(loc.port).to.eq('8000')
      // expect(loc.protocol).to.eq('http:')
      // expect(loc.search).to.eq('?q=dan')
      // expect(loc.toString()).to.eq(
      //   'http://localhost:8000/app/index.html?q=brian#/users/123/edit'
      // )
    })

    cy.get('[data-cy=email]').type(email);
    cy.get('[data-cy=password]').type(password);

    cy.get('[data-cy=login-form]').submit();

    cy.location('pathname').should('equal', '/');

    cy.contains('a.nav-link', 'Your Feed').should('have.class', 'nav-link active');
    cy.contains('a.nav-link', 'Global Feed').should('not.have.class', 'nav-link active')

    cy.contains('a.nav-link', 'Global Feed').click();
    cy.contains('a.nav-link', 'Your Feed').should('not.have.class', 'nav-link active');
    cy.contains('a.nav-link', 'Global Feed').should('have.class', 'nav-link active');
  });

});
