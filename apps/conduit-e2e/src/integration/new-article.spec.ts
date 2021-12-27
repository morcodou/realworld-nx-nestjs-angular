describe('New Article on Conduit', () => {
  const email = 'user1@email.com';
  const password = 'qwerty1';
  const title = "my-new-article";
  const description = "my-new-article-description";
  const article = "<h1> my article </h1>";
  const tagList = "my list of tags";

  beforeEach(() => {
    cy.task('cleanDatabase');
    cy.visit('/');

    cy.login(email, password);
    cy.wait(1500);
    cy.getByDataName('new-article').click();
  });

  it('should create a new article', () => {

    cy.getByDataName('title').type(title);
    cy.getByDataName('description').type(description);
    cy.getByDataName('article').type(article);
    cy.getByDataName('tagList').type(`${tagList}`);

    cy.getByDataName('edit-article-form').submit();

    cy.getByDataName('article-title-header').should("have.text", title);
    cy.url().should('include', `/#/article/${title}`);
  });

  it('should update an existing article', () => {

    cy.getByDataName('title').type(title);
    cy.getByDataName('description').type(description);
    cy.getByDataName('article').type(article);
    cy.getByDataName('tagList').type(`${tagList}`);
    cy.getByDataName('edit-article-form').submit();

    cy.getByDataName('edit-article').first().click();
    cy.getByDataName('title').clear().type(`updated ${title}`);
    cy.getByDataName('description').clear().type(`updated ${description}`);
    cy.getByDataName('article').clear().type(`updated ${article}`);
    cy.getByDataName('edit-article-form').submit();
    cy.getByDataName('article-title-header').should("have.text", `updated ${title}`);
    cy.url().should('include', `/#/article/${title}`);
  });

});
