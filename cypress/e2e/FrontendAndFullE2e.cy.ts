interface Movie {
  name: string;
  year: number;
}

describe("Complete E2E Test: Add and Manage Movies", () => {
  const userId = "365ee8bd-2bfe-41b0-9b3e-6eef402d297f";
  const movieName = "Dunkirk";
  const movieYear = 2017;

  it("adds a movie and verifies it in the database and favorites", () => {
    // GIVEN: The user is on their page and the initial data has loaded
    cy.visit(`http://localhost:3000/user/${userId}`);
    cy.wait(2000); // Allow initial data to load

    // WHEN: The user adds a new movie
    cy.contains("Loading...").should("not.exist");
    cy.wait(1000);
    cy.get('input[placeholder="Movie Name"]').type(movieName);
    cy.get('input[placeholder="Year"]').type(`${movieYear}`);
    cy.contains("button", "Add Movie").click();
    cy.wait(2000); // Allow movie addition to complete

    // THEN: The movie should be listed on the frontend
    cy.contains(`${movieName} (${movieYear})`).should("exist");
    cy.wait(2000);

    // GIVEN: We verify that the movie is added to the backend (all movies)
    cy.request("GET", `/api/movies`).then((response) => {
      expect(response.status).to.eq(200);
      const movie = response.body.find((m: Movie) => m.name === movieName && m.year === movieYear);
      expect(movie).to.not.be.undefined;
    });
    cy.wait(2000);

    // WHEN: The user adds the movie to their favorites
    cy.contains(`${movieName} (${movieYear})`)
      .parent()
      .contains("Add to Favorites")
      .click();
    cy.wait(2000); // Allow favorite addition to complete

    // THEN: The movie should appear in the user's favorite movies section
    cy.contains("Your Favorite Movies")
      .parent()
      .contains(`${movieName} (${movieYear})`)
      .should("exist");
    cy.wait(2000);

    // GIVEN: Verify the movie is added to the backend (favorites)
    cy.request("GET", `/api/usermovies?user_id=${userId}`).then((response) => {
      expect(response.status).to.eq(200);
      const favoriteMovie = response.body.find((m: Movie) => m.name === movieName && m.year === movieYear);
      expect(favoriteMovie).to.not.be.undefined;
    });
    cy.wait(2000);

    // WHEN: The user removes the movie from favorites
    cy.contains("Your Favorite Movies")
      .parent()
      .contains(`${movieName} (${movieYear})`)
      .parent()
      .contains("Remove from Favorites")
      .click();
    cy.wait(2000); // Allow removal from favorites to complete

    // THEN: The movie should no longer appear in the favorites section
    cy.contains("Your Favorite Movies")
      .parent()
      .contains(`${movieName} (${movieYear})`)
      .should("not.exist");
    cy.wait(2000);

    // GIVEN: Verify the movie is removed from the backend (favorites)
    cy.request("GET", `/api/usermovies?user_id=${userId}`).then((response) => {
      const removedMovie = response.body.find((m: Movie) => m.name === movieName && m.year === movieYear);
      expect(removedMovie).to.be.undefined;
    });
    cy.wait(2000);

    // WHEN: The user deletes the movie from the main movie list
    cy.contains(`${movieName} (${movieYear})`)
      .parent()
      .contains("Delete")
      .click();
    cy.wait(2000); // Allow movie removal to complete

    // THEN: The movie should no longer appear in the movie list on the frontend
    cy.contains(`${movieName} (${movieYear})`).should("not.exist");
    cy.wait(2000);

    // GIVEN: Verify the movie is removed from the backend (all movies)
    cy.request("GET", `/api/movies`).then((response) => {
      const removedMovie = response.body.find((m: Movie) => m.name === movieName && m.year === movieYear);
      expect(removedMovie).to.be.undefined;
    });
    cy.wait(2000);
  });
});
