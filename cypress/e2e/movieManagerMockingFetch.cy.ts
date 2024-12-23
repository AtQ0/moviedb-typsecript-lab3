describe('<MovieManager /> - Fetch Movies', () => {
    it('fetches and displays movies', () => {
        // GIVEN: The server has movies available
        // Mock response for fetching movies using the fixture
        cy.intercept('GET', '/api/movies', { fixture: 'movies.json' }).as('getMovies');

        // GIVEN: The user navigates to the Movie Manager page
        cy.visit('http://localhost:3000/user/365ee8bd-2bfe-41b0-9b3e-6eef402d297f');

        // WHEN: The movies are fetched from the backend
        cy.wait('@getMovies');

        // THEN: The movies should be displayed in the UI
        cy.contains('Inception (2010)').should('exist');
        cy.contains('Interstellar (2014)').should('exist');
    });
});
