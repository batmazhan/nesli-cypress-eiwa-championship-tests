import homePage from '../pageObjects/homePage';

describe('01 - UI and Basic Load - 2025 EIWA Championship', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    homePage.openSearchPage();
  });

  it('verifies the page title contains event name', () => {
    homePage.getTitle().should('include', '2025 EIWA Championship');
  });

  it('verifies the event title is visible on the page', () => {
    cy.get('h1.header-title') // ← You can change this if needed
      .should('be.visible')
      .and('contain.text', '2025 EIWA Championship');
  });

  it('verifies the event date is displayed', () => {
    cy.contains('Mar 7-8').should('be.visible');
  });
});
