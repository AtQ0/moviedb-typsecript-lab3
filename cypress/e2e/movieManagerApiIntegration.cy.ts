describe('<MovieManager /> - API Integration Tests', () => {

    // Test: Adding a Movie via API
    it('adds a new movie to the backend', () => {
        const newMovie = { name: 'Dunkirk', year: 2017 };

        // Send POST request to add the movie
        cy.request({
            method: 'POST',
            url: '/api/movies',   // Relative URL, Cypress will prepend baseUrl automatically
            body: newMovie,
            failOnStatusCode: false,  // Prevent Cypress from failing on non-2xx response
        })
            .then((response) => {
                // Log the response object to inspect it
                console.log("POST Response:", response);

                // Check if the response body is not empty and contains the expected properties
                expect(response.status).to.eq(201);  // Expect status 201 (Created)
                expect(response.body).to.have.property('name', 'Dunkirk');
                expect(response.body).to.have.property('year', 2017);

                // Check if the movie has an 'id' property
                if (response.body && response.body.id) {
                    const movieId = response.body.id;
                    cy.wrap(movieId).as('movieId');  // Save movieId for later use in the test
                } else {
                    throw new Error('Movie ID not returned in response body');
                }
            });

        // Wait and ensure the movie is available in the list after adding
        cy.get('@movieId').then((movieId) => {
            // Verify the movie exists in the list after adding
            cy.request('GET', '/api/movies')
                .its('body')
                .should('be.an', 'array')  // Ensure the response body is an array
                .and('not.be.empty')  // Ensure there is at least one movie in the list
                .and('deep.include', { id: movieId, name: 'Dunkirk', year: 2017 });  // Ensure the added movie is in the list
        });
    });

    // Test: Fetching Movies via API
    it('fetches all movies from the backend', () => {
        // Ensure movies are available via GET request
        cy.request('GET', '/api/movies')
            .its('status')
            .should('eq', 200);  // Verify the response status is 200 (OK)

        // Verify that a movie exists in the response
        cy.request('GET', '/api/movies')
            .its('body')
            .should('be.an', 'array')  // Check if the response body is an array
            .and('not.be.empty');  // Ensure there is at least one movie in the list
    });


});
