/// <reference types="cypress" />

describe('Main page', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('should render', () => {
		cy.get('[data-testid="main-container"]').should('be.visible');
	});

	context('field', () => {
		let usernameField: Cypress.Chainable;

		beforeEach(() => {
			usernameField = cy.get('[data-testid="username-field"]');
		});

		it('should not allow spaces at field start', () => {
			usernameField.type(' ').should('have.text', '');
		});

		it('should replace spaces with dashes', () => {
			usernameField
				.type('this is a  test  ')
				.should('have.text', 'this-is-a-test-');
		});

		it('should be editable on focus', () => {
			usernameField
				.focus()
				.type('is editable')
				.should('have.text', 'is-editable');
		});

		it('should show submit button when field is filled', () => {
			usernameField.type('filled');
			cy.get('[data-testid="btn-submit"]').should('exist');
		});
	});
});
