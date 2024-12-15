describe('<MovieManager /> - Delete Movie', () => {
    it('deletes a movie and updates the list', () => {
        const movieToDelete = { id: 1, name: 'Inception', year: 2010 };

        // Mock response for deleting a movie
        cy.intercept('DELETE', `/api/movies?id=${movieToDelete.id}`, {
            statusCode: 200,
            body: { message: `Movie with ID ${movieToDelete.id} deleted` },
        }).as('deleteMovie');

        // Mock the initial movies list
        cy.intercept('GET', '/api/movies', {
            statusCode: 200,
            body: [movieToDelete, { id: 2, name: 'Interstellar', year: 2014 }],
        }).as('getMovies');

        // Visit the page
        cy.visit('http://localhost:3000/');

        // Wait for the initial GET request to load
        cy.wait('@getMovies');

        // Delete the movie
        cy.contains('Inception (2010)').parent().find('button.bg-red-500').click();

        // Wait for the DELETE request to finish
        cy.wait('@deleteMovie');

        // Assert that the movie is no longer on the page
        cy.contains('Inception (2010)').should('not.exist');
    });
});
