import { Article } from "@realworld/article/api/shared";

describe('Post Comment', () => {
  const email = 'user1@email.com';
  const password = 'qwerty1';
  const title = "my-new-article";
  const description = "my-new-article-description";
  const article = "<h1> my article </h1>";
  const tagList = "my list of tags";
  const slug = "my-new-article-1640583721601";
  const authorId = "d9cc584d-8694-4546-883a-e11fecf1d98c";
  const body = article;

  const myArticle: Article = {
    slug,
    title,
    description,
    body,
    authorId,
    tagList: [tagList]
  };


  beforeEach(() => {
    cy.task('cleanDatabase');
    cy.intercept('GET', '**/articles?offset*', { fixture: 'articlefeed.json' });
    cy.intercept('GET', '**/articles/asddd-1640666561178/comments**', { fixture: 'comment.json' });

    cy.visit('/');
    cy.login(email, password);
    cy.wait(1500);
    cy.getByDataName('user-profile').click();
  });

  it('should have comment from the stubbed network request', () => {

    // cy.getByDataName('edit-article').first().click();
    cy.getByDataName('article-preview-link')
      .first().click();

    cy.contains('[data-cy=card-comment-body]', 'my comments stub').should('be.visible');
    cy.getByDataName('card-comment-body').should("have.text", 'my comments stub');
  });

});
