
/*========================*/
/*====== TEST CASES ======*/
/*========================*/

//Basic (frontend) test that uses one it
describe("visit movie manager landing page", function () {
  it("visits my site", function () {
    cy.visit("http://localhost:3000/")
  })
})

interface Movie {
  name: string;
  year: number;
}


//Full E2E test involving frontend, backend, and database
describe("Complete E2E Test: Add and Fetch Movie", () => {
  it("adds a movie and verifies it in the database", () => {
    cy.visit("http://localhost:3000/");

    // Add a new movie
    cy.get('input[placeholder="Movie Name"]').type("Dunkirk");
    cy.get('input[placeholder="Year"]').type("2017");
    cy.contains("button", "Add Movie").click();

    // Verify the movie appears in the frontend
    cy.contains("Dunkirk (2017)").should("exist");

    // Verify the movie exists in the database via backend
    cy.request("GET", "http://localhost:3000/api/movies").then((response) => {
      expect(response.status).to.eq(200); // Cypress expects to be recognized here
      const movie = response.body.find((m: Movie) => m.name === "Dunkirk" && m.year === 2017);
      expect(movie).to.not.be.undefined;
    });
  });
});
