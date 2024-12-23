describe('<MovieManager /> - Delete Movie', () => {
    it('deletes a movie and updates the list', () => {
        const movieToDelete = { id: 1, name: 'Ace Ventura', year: 1994 };
        const remainingMovie = { id: 2, name: 'Interstellar', year: 2014 };

        // GIVEN: The movie list contains two movies, and the user wants to delete "Ace Ventura"
        // Mock the GET request for the movie list
        cy.intercept('GET', '/api/movies', {
            statusCode: 200,
            body: [movieToDelete, remainingMovie],
        }).as('getMovies');

        // Mock the DELETE request for the movie
        cy.intercept('DELETE', `/api/movies?movie_id=${movieToDelete.id}`, {
            statusCode: 200,
            body: { message: `Movie with ID ${movieToDelete.id} deleted` },
        }).as('deleteMovie');

        // WHEN: The user visits the movie manager page, deletes the movie "Ace Ventura"
        cy.visit('http://localhost:3000/user/365ee8bd-2bfe-41b0-9b3e-6eef402d297f');

        // Wait for the GET request to load the movie list
        cy.wait('@getMovies');

        // Ensure the movie "Ace Ventura" is visible initially
        cy.contains('Ace Ventura (1994)').should('exist');

        // Click the delete button for "Ace Ventura"
        cy.contains('Ace Ventura (1994)').parent().find('button.bg-red-500').click();

        // Wait for the DELETE request to complete
        cy.wait('@deleteMovie');

        // Wait for the UI to update
        cy.wait(1000);

        // THEN: Verify that "Ace Ventura" is no longer in the movie list
        cy.contains('Ace Ventura (1994)').should('not.exist');

        // Verify that the remaining movie "Interstellar" is still visible
        cy.contains('Interstellar (2014)').should('exist');
    });
});
