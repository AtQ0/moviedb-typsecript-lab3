import React from 'react';
import { mount } from 'cypress/react';
import LoginForm from './LoginForm';

describe('<LoginForm />', () => {
    beforeEach(() => {
        // Mount the LoginForm component directly
        mount(<LoginForm />);
    });

    it('renders the login button', () => {
        // Check if the login button is present and visible
        cy.get('button').contains('Login').should('be.visible');
    });

    it('displays an error when email or password is missing', () => {
        // Click the login button without entering email and password
        cy.get('button').contains('Login').click();

        // Verify that the error message for missing email/password is displayed
        cy.contains('Email and password are required').should('be.visible');
    });

    it('successfully submits the form when email and password are provided', () => {
        // Type in email and password
        cy.get('input[type="email"]').type('test@example.com');
        cy.get('input[type="password"]').type('password123');

        // Submit the form
        cy.get('button').contains('Login').click();

    });
});
