class HomePage {

  visit2() {
    cy.visit("https://www.flowrestling.org/events/12932757-2025-eiwa-championship");
  }
  
  
  openSearchPage() {
    cy.visit("https://www.flowrestling.org/events/12932757-2025-eiwa-championship", {
      timeout: 30000,
      failOnStatusCode: false,
      onBeforeLoad(win) {
        delete win.navigator.serviceWorker;
      }
    });

    // Wait for search bar to be ready
    cy.get('[data-test="search-input"]', { timeout: 20000 }).should('be.visible');
  }

  getTitle() {
    return cy.title();
  }

  getBanner() {
    return cy.get('h1.header-title'); // Based on DevTools
  }

  getEventDate() {
    return cy.contains('div', 'Mar 7-8'); // Adjust tag if needed
  }
  getTab(tabName) {
    return cy.get('nav[data-test="sub-navigation"] a').contains(tabName).should('be.visible');
  }


  getURL() {
  return cy.url();
}

   openFilterDropdown(position) {
  cy.get('[data-test="dropdown"]')
    .eq(position)
    .find('[data-test="dropdown-button"]')
    .click({ force: true });
}

// Helper method to select the first visible dropdown option

selectFirstOptionInDropdown() {
  cy.wait(500); // Let dropdown render
  cy.get(':nth-child(5) > .d-flex', { timeout: 10000 })
    .scrollIntoView({ offset: { top: -100, left: 0 } }) // push it into view below sticky nav
    .should('exist') // ✅ we skip `be.visible` here to avoid blocking
    .click({ force: true });
}




// Individual filters
openRoundFilter() { this.openFilterDropdown(0); }
selectFirstRound() { this.selectFirstOptionInDropdown(); }

openTeamFilter() { this.openFilterDropdown(1); }
selectFirstTeam() { this.selectFirstOptionInDropdown(); }

openWeightClassFilter() { this.openFilterDropdown(2); }
selectFirstWeightClass() { this.selectFirstOptionInDropdown(); }


// VIDEO SECTION

// ===== VIDEO SECTION (BONUS TEST) =====

getVideoThumbnails() {
  // Cards seen on the /videos tab
  return cy.get('div[class*="card"], div[class*="video-card"]', { timeout: 20000 });
}

getVideoModalPlayer() {
  // Matches modal-based or embedded players
  return cy.get('video, iframe[src*="flowplayer"], iframe[src*="player"], .video-player', { timeout: 15000 });
}

getVideoCards() {
  return cy.get('a.content-card[href*="/video/"]', { timeout: 20000 });
}

getVideoPlayer() {
  return cy.get('video, iframe[src*="flowplayer"], .video-player', { timeout: 15000 });
}


  dismissCookieBannerIfPresent() {
    cy.get('body').then(($body) => {
      if ($body.find('div[role="dialog"] [aria-label="Close"]').length > 0) {
        cy.get('div[role="dialog"] [aria-label="Close"]').click({ force: true });
      }
    });
  }
  
  openSearchPageForFilters() {
    // Block ad-related requests
    cy.intercept('GET', '**/ads/**', { statusCode: 204 });
    cy.intercept('GET', '**/googlesyndication.com/**', { statusCode: 204 });
    cy.intercept('GET', '**/doubleclick.net/**', { statusCode: 204 });
    cy.intercept('GET', '**/idx.liadm.com/**', { statusCode: 204 });
    cy.intercept('GET', '**/rlcdn.com/**', { statusCode: 204 });
  
    // Visit page
    cy.visit('https://www.flowrestling.org/events/12932757-2025-eiwa-championship', {
      failOnStatusCode: false,
      timeout: 60000,
      pageLoadTimeout: 0,
      onBeforeLoad(win) {
        // Optional: stub ad/tracker-related props if needed
      },
    });
  
    // 💡 Wait for a more *specific* element known to always exist
    cy.get('[data-test="dropdown-button"]', { timeout: 30000 }).should('be.visible');
  }
  
  
  clearAllFilters() {
    // Wait until the button exists before trying to click
    cy.get('body').then(($body) => {
      if ($body.find('[data-test="clear-all-button"]').length > 0) {
        cy.get('[data-test="clear-all-button"]').click({ force: true });
      } else {
        cy.log('⚠️ Clear All button not found — maybe no filters were applied');
      }
    });
  }
  
  
  getFilteredWrestlers() {
    return cy.get('[data-test="wrestler-row"]', { timeout: 10000 });
  }
  

}


export default new HomePage();

