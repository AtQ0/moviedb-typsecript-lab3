import React from 'react';
import { mount } from 'cypress/react';
import LoginForm from './LoginForm';

describe('<LoginForm />', () => {
    let mockOnLoginSuccess: any; // Let TypeScript infer the type

    beforeEach(() => {
        // Initialize the stub inside the beforeEach block
        mockOnLoginSuccess = cy.stub();
        mount(<LoginForm onLoginSuccess={mockOnLoginSuccess} />);
    });

    it('displays an error when login credentials are invalid', () => {
        // GIVEN: The LoginForm component is mounted and an intercept is set up to mock a 401 error response
        cy.intercept('GET', '/api/register?email=demo@gmail.com&password=wrongpassword', {
            statusCode: 401,
            body: { message: 'Invalid login credentials' },
        }).as('loginRequest');

        // WHEN: The user types in an invalid email and password and submits the form
        cy.get('input[type="email"]').type('demo@gmail.com');
        cy.get('input[type="password"]').type('wrongpassword');
        cy.get('button').contains('Login').click();

        // THEN: The login request should return a 401 error, and the error message should be displayed
        cy.wait('@loginRequest');
        cy.contains('Invalid login credentials').should('be.visible');
    });

    it('successfully logs in with valid credentials', () => {
        // GIVEN: The LoginForm component is mounted and an intercept is set up to mock a successful login response
        cy.intercept('GET', '/api/register?email=demo@gmail.com&password=demo123', {
            statusCode: 200,
            body: { userId: '365ee8bd-2bfe-41b0-9b3e-6eef402d297f' },
        }).as('loginRequest');

        // WHEN: The user types in a valid email and password and submits the form
        cy.get('input[type="email"]').type('demo@gmail.com');
        cy.get('input[type="password"]').type('demo123');
        cy.get('button').contains('Login').click();

        // THEN: The login request should return a successful response, and onLoginSuccess should be called with the correct userId
        cy.wait('@loginRequest');
        cy.wrap(mockOnLoginSuccess).should('have.been.calledOnceWith', '365ee8bd-2bfe-41b0-9b3e-6eef402d297f');
    });
});
