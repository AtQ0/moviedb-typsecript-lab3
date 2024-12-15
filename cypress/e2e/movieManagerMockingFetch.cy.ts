describe('<MovieManager /> - Fetch Movies', () => {
    it('fetches and displays movies', () => {
        // Mock response for fetching movies using the fixture
        cy.intercept('GET', '/api/movies', { fixture: 'movies.json' }).as('getMovies');

        // Visit the Movie Manager page
        cy.visit('http://localhost:3000/');

        // Wait for the GET request to complete
        cy.wait('@getMovies');

        // Assertions: Check if the movies are rendered on the page
        cy.contains('Inception (2010)').should('exist');
        cy.contains('Interstellar (2014)').should('exist');
    });
});
