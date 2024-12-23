describe('<MovieManager /> - API Integration Tests', () => {

    // Test: Adding a Movie via API
    it('adds a new movie to the backend', () => {
        const newMovie = { name: 'Dunkirk', year: 2017 };

        // GIVEN: The user wants to add a new movie
        // Prepare the new movie data to be added via API
        const requestPayload = newMovie;

        // WHEN: A POST request is sent to add the movie
        cy.request({
            method: 'POST',
            url: '/api/movies',   // Relative URL, Cypress will prepend baseUrl automatically
            body: requestPayload,
            failOnStatusCode: false,  // Prevent Cypress from failing on non-2xx response
        })
            .then((response) => {
                // Log the response object to inspect it
                console.log("POST Response:", response);

                // THEN: Verify the movie was successfully created
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

        // GIVEN: The movie has been successfully added
        // WHEN: A GET request is made to fetch the list of movies
        cy.get('@movieId').then((movieId) => {
            // THEN: Verify the added movie is in the movie list
            cy.request('GET', '/api/movies')
                .its('body')
                .should('be.an', 'array')  // Ensure the response body is an array
                .and('not.be.empty')  // Ensure there is at least one movie in the list
                .and('deep.include', { id: movieId, name: 'Dunkirk', year: 2017 });  // Ensure the added movie is in the list
        });
    });

    // Test: Fetching Movies via API
    it('fetches all movies from the backend', () => {

        // GIVEN: The user wants to fetch all movies from the backend
        // WHEN: A GET request is made to fetch all movies
        cy.request('GET', '/api/movies')
            .its('status')
            .should('eq', 200);  // Verify the response status is 200 (OK)

        // THEN: Verify that the response contains a list of movies
        cy.request('GET', '/api/movies')
            .its('body')
            .should('be.an', 'array')  // Check if the response body is an array
            .and('not.be.empty');  // Ensure there is at least one movie in the list
    });

});
