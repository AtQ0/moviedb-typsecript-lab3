describe('<MovieManager /> - Add Movie', () => {
    it('adds a movie and displays it', () => {
        const newMovie = { id: 3, name: 'Dunkirk', year: 2017 };

        // Mock response for adding a movie
        cy.intercept('POST', '/api/movies', {
            statusCode: 201,
            body: newMovie,
        }).as('addMovie');

        // Visit the page
        cy.visit('http://localhost:3000/user');

        cy.wait(1000); // Wait

        // Add new movie
        cy.get('input[placeholder="Movie Name"]').type('Dunkirk');
        cy.get('input[placeholder="Year"]').type('2017');
        cy.contains('button', 'Add Movie').click();

        // Wait for the POST request to finish
        cy.wait('@addMovie');

        // Assert that the movie appears on the page
        cy.contains('Dunkirk (2017)').should('exist');
    });
});
