describe('05 - Video Streaming - Bonus Challenge 🎥', () => {
    beforeEach(() => {
      cy.visit('https://www.flowrestling.org/events/12932757-2025-eiwa-championship/videos', {
        timeout: 60000,
        failOnStatusCode: false,
        onBeforeLoad(win) {
          delete win.navigator.serviceWorker;
        }
      });
  
      // ✅ Safely dismiss cookie banner if it appears
      cy.get('body').then($body => {
        const closeBtn = $body.find('div[role="dialog"] [aria-label="Close"]');
        if (closeBtn.length) {
          cy.wrap(closeBtn).click({ force: true });
        }
      });
    });
  
    it('clicks the first video thumbnail and verifies video player appears', () => {
      cy.get(':nth-child(1) > .small-content-card > [data-test="small-content-thumbnail"] > flo-image-thumbnail > .image-wrapper > .inner-div > [data-test="thumbnail"]', { timeout: 20000 })
        .should('be.visible')
        .scrollIntoView()
        .click({ force: true });
  
      // ✅ Confirm the video player or iframe is visible
      cy.get('video, iframe[src*="flowplayer"], .video-player', { timeout: 20000 })
        .should('exist')
        .and('be.visible');
    });
  });
  