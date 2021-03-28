/// <reference types="cypress" />

describe('Main page', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('should render', () => {
		cy.get('[data-cy="main-container"]').first().should('be.visible');
	});

	context('main-text-input', () => {
		let usernameField: Cypress.Chainable;

		beforeEach(() => {
			usernameField = cy.get('[data-cy="username-field"]').first();
		});

		it('should not allow spaces at field start', () => {
			usernameField.type(' ').should('have.text', '');
		});

		it('should replace spaces with dashes', () => {
			usernameField
				.type('this is a  test  ')
				.should('have.value', 'this-is-a-test-');
		});

		it('should be editable on focus', () => {
			usernameField
				.focus()
				.type('is editable')
				.should('have.value', 'is-editable');
		});

		it('should show submit button when field is filled', () => {
			usernameField.type('filled');
			cy.get('[data-cy="btn-submit"]').should('exist');
		});
	});
});
