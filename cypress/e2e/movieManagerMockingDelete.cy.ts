describe('<MovieManager /> - Delete Movie', () => {
    it('deletes a movie and updates the list', () => {
        const movieToDelete = { id: 1, name: 'Inception', year: 2010 };
        const remainingMovie = { id: 2, name: 'Interstellar', year: 2014 };

        // 1. Mock the initial GET request for the movie list
        cy.intercept('GET', '/api/movies', {
            statusCode: 200,
            body: [movieToDelete, remainingMovie], // Initial list with the movie to delete
        }).as('getMovies');

        // 2. Mock the DELETE request for the movie
        cy.intercept('DELETE', `/api/movies?id=${movieToDelete.id}`, {
            statusCode: 200,
            body: { message: `Movie with ID ${movieToDelete.id} deleted` },
        }).as('deleteMovie');

        // 3. Visit the page
        cy.visit('http://localhost:3000/user');

        // 4. Wait for the GET request to load the movie list
        cy.wait('@getMovies');

        // 5. Add a delay after the GET request (e.g., wait for 1 second)
        cy.wait(1000); // Wait for 1 second after the initial movie list is loaded

        // 6. Assert that the movie "Inception" is visible in the list initially
        cy.contains('Inception (2010)').should('exist');

        // 7. Delete the movie
        cy.contains('Inception (2010)').parent().find('button.bg-red-500').click();

        // 8. Wait for the DELETE request to finish
        cy.wait('@deleteMovie');

        // 9. Add a delay after the DELETE request (e.g., wait for 1 second)
        cy.wait(1000); // Wait

        // 10. Assert that the movie "Inception" is no longer on the page
        cy.contains('Inception (2010)').should('not.exist');

        // 11. Verify that the remaining movie "Interstellar" is still visible
        cy.contains('Interstellar (2014)').should('exist');
    });
});
