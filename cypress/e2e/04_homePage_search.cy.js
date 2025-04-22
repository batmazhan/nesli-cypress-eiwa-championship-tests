import homePage from '../pageObjects/homePage';

describe('04 - Search Functionality - 2025 EIWA Championship Page', () => {
  beforeEach(() => {
    cy.viewport(1280, 720); // Desktop resolution
    homePage.openSearchPage(); 
  });

  it('✅ filters wrestlers based on valid search input (partial match)', () => {
    const searchName = 'Seymour'; 
    homePage.searchWrestler(searchName);

    homePage.getResultsList().then(($items) => {
      const matches = [];

      $items.each((_, el) => {
        const text = Cypress.$(el).text().toLowerCase();
        if (text.includes(searchName.toLowerCase())) {
          matches.push(text);
        } else {
          cy.log(`❌ No match in: ${text}`);
        }
      });

      expect(matches.length, `at least one result includes "${searchName}"`).to.be.greaterThan(0);
    });
  });

  it('✅ shows "No results found" for non-existent wrestler', () => {
    const fakeName = 'Random Wrestler 123';

    homePage.searchWrestler(fakeName);
    homePage.getResultsList().should('have.length', 0);

  });
});
