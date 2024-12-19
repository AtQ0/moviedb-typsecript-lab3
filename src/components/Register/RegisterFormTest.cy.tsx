import RegisterForm from './RegisterForm';

describe('<Register /> Component', () => {
    beforeEach(() => {
        // Mount the Register component
        cy.mount(RegisterForm);
    });

    it('shows an error when form fields are empty', () => {
        cy.get('form').should('be.visible');
        cy.contains('Register').click();
        cy.contains('All fields are required.').should('be.visible');
    });

    it('shows an error for invalid email', () => {
        cy.get('input[name="email"]').type('invalidemail');
        cy.contains('Register').click();
        cy.contains('Please enter a valid email address.').should('be.visible');
    });

    it('shows an error when passwords do not match', () => {
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="confirmPassword"]').type('password321');
        cy.contains('Register').click();
        cy.contains('Passwords do not match.').should('be.visible');
    });

    it('shows success when registration is successful', () => {
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="confirmPassword"]').type('password123');
        cy.contains('Register').click();
        cy.contains('Registration Successful!').should('be.visible');
    });
});
