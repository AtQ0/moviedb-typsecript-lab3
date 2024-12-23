import MovieItem from './MovieItem'; // Adjust the path based on where your MovieItem component is located

describe('<MovieItem />', () => {
  const mockMovie = {
    id: 1,
    name: 'Inception',
    year: 2010
  };

  beforeEach(() => {
    cy.mount(
      <MovieItem
        movie={mockMovie}
        onEdit={() => { }}
        onDelete={() => { }}
        onFavorite={() => { }}
        isFavorite={false}
      />
    );
  });

  it('renders the movie name and year', () => {
    // GIVEN: A MovieItem component with a movie prop
    // WHEN: The component is rendered
    // THEN: The movie name and year should be visible
    cy.contains('Inception (2010)').should('be.visible');
  });

  it('calls onEdit with movie id when Edit button is clicked', () => {
    // GIVEN: A MovieItem component with an onEdit function
    const onEditSpy = cy.spy().as('onEdit');
    cy.mount(
      <MovieItem
        movie={mockMovie}
        onEdit={onEditSpy}
        onDelete={() => { }}
        onFavorite={() => { }}
        isFavorite={false}
      />
    );

    // WHEN: The "Edit" button is clicked
    cy.contains('Edit').click();

    // THEN: The onEdit function should be called with the movie id
    cy.get('@onEdit').should('have.been.calledWith', mockMovie.id);
  });

  it('calls onDelete with movie id when Delete button is clicked', () => {
    // GIVEN: A MovieItem component with an onDelete function
    const onDeleteSpy = cy.spy().as('onDelete');
    cy.mount(
      <MovieItem
        movie={mockMovie}
        onEdit={() => { }}
        onDelete={onDeleteSpy}
        onFavorite={() => { }}
        isFavorite={false}
      />
    );

    // WHEN: The "Delete" button is clicked
    cy.contains('Delete').click();

    // THEN: The onDelete function should be called with the movie id
    cy.get('@onDelete').should('have.been.calledWith', mockMovie.id);
  });

  it('calls onFavorite when Favorite button is clicked', () => {
    // GIVEN: A MovieItem component with an onFavorite function
    const onFavoriteSpy = cy.spy().as('onFavorite');
    cy.mount(
      <MovieItem
        movie={mockMovie}
        onEdit={() => { }}
        onDelete={() => { }}
        onFavorite={onFavoriteSpy}
        isFavorite={false}
      />
    );

    // WHEN: The "Add to Favorites" button is clicked
    cy.contains('Add to Favorites').click();

    // THEN: The onFavorite function should be called once
    cy.get('@onFavorite').should('have.been.calledOnce');
  });

  it('shows "Remove from Favorites" when isFavorite is true', () => {
    // GIVEN: A MovieItem component with isFavorite set to true
    cy.mount(
      <MovieItem
        movie={mockMovie}
        onEdit={() => { }}
        onDelete={() => { }}
        onFavorite={() => { }}
        isFavorite={true}
      />
    );

    // WHEN: The component is rendered
    // THEN: The button text should be "Remove from Favorites"
    cy.contains('Remove from Favorites').should('be.visible');
  });

  it('changes the button style based on isFavorite', () => {
    // GIVEN: A MovieItem component with isFavorite set to false
    cy.mount(
      <MovieItem
        movie={mockMovie}
        onEdit={() => { }}
        onDelete={() => { }}
        onFavorite={() => { }}
        isFavorite={false}
      />
    );

    // WHEN: The component is rendered
    // THEN: The "Add to Favorites" button should have class bg-gray-500
    cy.contains('Add to Favorites').should('have.class', 'bg-gray-500');

    // GIVEN: A MovieItem component with isFavorite set to true
    cy.mount(
      <MovieItem
        movie={mockMovie}
        onEdit={() => { }}
        onDelete={() => { }}
        onFavorite={() => { }}
        isFavorite={true}
      />
    );

    // WHEN: The component is rendered
    // THEN: The "Remove from Favorites" button should have class bg-green-500
    cy.contains('Remove from Favorites').should('have.class', 'bg-green-500');
  });
});
