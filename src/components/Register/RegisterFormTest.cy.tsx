import RegisterForm from './RegisterForm'; // Adjust the import path accordingly

describe('RegisterForm Component', () => {
    it('should render the form correctly', () => {
        // GIVEN: A RegisterForm component is mounted
        cy.mount(<RegisterForm onRegister={() => { }} />);

        // WHEN: The form is rendered
        // THEN: The form elements (fields and button) should be visible
        cy.get('h2').should('contain', 'Register');
        cy.get('input[name="username"]').should('be.visible');
        cy.get('input[name="email"]').should('be.visible');
        cy.get('input[name="password"]').should('be.visible');
        cy.get('input[name="confirmPassword"]').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');
    });

    it('should call onRegister with valid input', () => {
        const mockOnRegister = cy.stub().as('onRegister');

        // GIVEN: A RegisterForm component with a mock onRegister function
        cy.mount(<RegisterForm onRegister={mockOnRegister} />);

        // WHEN: A valid form is submitted
        cy.get('input[name="username"]').type('valid_username');
        cy.get('input[name="email"]').type('testuser@example.com');
        cy.get('input[name="password"]').type('Password1');
        cy.get('input[name="confirmPassword"]').type('Password1');
        cy.get('button[type="submit"]').click();

        // THEN: The onRegister function should be called with the correct arguments
        cy.get('@onRegister').should(
            'have.been.calledWith',
            'testuser@example.com',
            'Password1',
            'valid_username'
        );
    });
});
