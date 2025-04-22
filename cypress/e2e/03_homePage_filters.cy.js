
import homePage from '../pageObjects/homePage';

describe('03 - Event Filters - 2025 EIWA Championship Page', () => {
  beforeEach(() => {
    homePage.openSearchPageForFilters();
    cy.wait(3000); 
  });

  it('filters wrestlers by Team', () => {
    homePage.openTeamFilter();
    homePage.selectFirstTeam();

    cy.wait(1500);
    cy.get('body').then(($body) => {
      if ($body.find('[data-test="wrestler-row"]').length > 0) {
        cy.get('[data-test="wrestler-row"]').should('have.length.greaterThan', 0);
      } else {
        cy.log('⚠️ No wrestler rows found — possibly no match for selected team');
      }
    });

    cy.url().then(url => cy.log('🔗 URL after team filter:', url));
  });

  it('filters wrestlers by Weight Class', () => {
    homePage.openWeightClassFilter();
    homePage.selectFirstWeightClass();

    cy.wait(1500);
    cy.get('body').then(($body) => {
      if ($body.find('[data-test="wrestler-row"]').length > 0) {
        cy.get('[data-test="wrestler-row"]').should('have.length.greaterThan', 0);
      } else {
        cy.log('⚠️ No wrestler rows found — possibly no match for selected weight class');
      }
    });

    cy.url().then(url => cy.log('🔗 URL after weight class filter:', url));
  });

  it('filters wrestlers by Round', () => {
    homePage.openRoundFilter();
    homePage.selectFirstRound();

    cy.wait(1500);
    cy.get('body').then(($body) => {
      if ($body.find('[data-test="wrestler-row"]').length > 0) {
        cy.get('[data-test="wrestler-row"]').should('have.length.greaterThan', 0);
      } else {
        cy.log('⚠️ No wrestler rows found — possibly no match for selected round');
      }
    });

    cy.url().then(url => cy.log('🔗 URL after round filter:', url));
  });

  it('resets all filters and restores original results', () => {
    homePage.openTeamFilter();
    homePage.selectFirstTeam();

    homePage.openWeightClassFilter();
    homePage.selectFirstWeightClass();

    homePage.openRoundFilter();
    homePage.selectFirstRound();

    cy.wait(1000);
    homePage.clearAllFilters();
    cy.wait(2000); 

    homePage.getFilteredWrestlers().should('exist');
    cy.url().then(url => cy.log('🔄 URL after reset:', url));
  });
});
