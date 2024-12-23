describe('<MovieManager /> - Add Movie', () => {
    it('adds a movie and displays it', () => {
        const newMovie = { id: 3, name: 'Dunkirk', year: 2017 };

        // GIVEN: The user wants to add a new movie
        // Mock the response for adding a movie
        cy.intercept('POST', '/api/movies', {
            statusCode: 201,
            body: newMovie,
        }).as('addMovie');

        // WHEN: The user visits the movie manager page and adds a new movie
        cy.visit('http://localhost:3000/user/365ee8bd-2bfe-41b0-9b3e-6eef402d297f');

        cy.wait(1000); // Wait for initial data to load

        // Add new movie details
        cy.get('input[placeholder="Movie Name"]').type('Dunkirk');
        cy.get('input[placeholder="Year"]').type('2017');
        cy.contains('button', 'Add Movie').click();

        // Wait for the POST request to finish
        cy.wait('@addMovie');
        cy.wait(1000); // Wait for post request to complete

        // THEN: Verify that the movie appears on the page
        cy.contains('Dunkirk (2017)').should('exist');
    });
});
