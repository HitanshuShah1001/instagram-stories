/// <reference types="cypress" />

  
describe('Instagram Stories', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('should display the story list', () => {
      cy.get('.story-list').should('be.visible');
      cy.get('.story-item').should('have.length.at.least', 1);
    });
  
    it('should open a story viewer when clicking on a story', () => {
      cy.get('.story-item').first().click();
      cy.get('.story-viewer').should('be.visible');
      cy.get('.story-image').should('be.visible');
    });
  
    it('should advance to the next story after clicking the right side', () => {
      // Get second story group with multiple stories
      cy.get('.story-item').eq(2).click();
      
      // Get the first story image URL
      cy.get('.story-image').invoke('attr', 'src').then((firstImageSrc) => {
        // Click right side to go to next story
        cy.get('.navigation-next').click();
        
        // Wait for new image to load
        cy.wait(500).then(() => {
            console.log('new image loaded')
        });
        
        // Verify image URL has changed
        cy.get('.story-image')
          .invoke('attr', 'src')
          .should('not.eq', firstImageSrc);
      });
    });
  
    it('should close the story viewer when clicking the close button', () => {
      cy.get('.story-item').first().click();
      cy.get('.story-viewer').should('be.visible');
      cy.get('.close-button').click();
      cy.get('.story-viewer').should('not.exist');
    });
  });