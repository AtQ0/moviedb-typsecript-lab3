import React from 'react';
import MovieItem from './MovieItem';
import type { MovieItemProps } from '../interfaces/movieInterfaces';

describe('<MovieItem />', () => {
  it('renders correctly with props', () => {
    // Mock data for the props
    const mockMovie: MovieItemProps['movie'] = { id: 1, name: 'Dunkirk', year: 2017 };
    const onEditMock = cy.stub().as('onEditMock');
    const onDeleteMock = cy.stub().as('onDeleteMock');

    // Mount the component with the mock props
    cy.mount(
      <MovieItem
        movie={mockMovie}
        onEdit={onEditMock}
        onDelete={onDeleteMock}
      />
    );

    // Assertions
    cy.contains('Dunkirk (2017)').should('exist');
    cy.contains('Edit').click();
    cy.get('@onEditMock').should('have.been.calledOnce');

    cy.contains('Delete').click();
    cy.get('@onDeleteMock').should('have.been.calledOnce');
  });
});
