import homePage from '../pageObjects/homePage';

describe('02 - Navigation & Tab Validation - 2025 EIWA Championship Page', () => {
  
  beforeEach(() => {
    cy.viewport(1280, 720);
    homePage.openSearchPage();
    cy.wait(8000); 
  });
  

  it('navigates to the Results tab and validates URL and content', () => {
    homePage.getTab('Results').click({ force: true });
    cy.url().should('include', '/results');
    cy.contains('Results').should('exist');
  });

  it('navigates to the News tab and validates URL and content', () => {
    homePage.getTab('News').click({ force: true });
    cy.url().should('include', '/news');
    cy.contains('News').should('exist');
  });

  it('navigates to the Schedule tab and validates URL and content', () => {
    homePage.getTab('Schedule').click({ force: true });
    cy.url().should('include', '/schedule');
    cy.contains('Schedule').should('exist');
  });

  it('navigates to the Videos tab and validates URL and content', () => {
    homePage.getTab('Videos').click({ force: true });
    cy.url().should('include', '/videos');
    cy.contains('Videos').should('exist');
  });
});
