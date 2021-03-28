/// <reference types="cypress" />

describe('Root page', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('should render', () => {
		cy.get('[data-cy="root-container"]').should('be.visible');
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

	context('sections', () => {
		it('section 1 should be the only visible section', () => {
			cy.get('[data-cy="root-container"] > div').each((section) => {
				if (section.attr('data-cy') === 'root-section1') {
					cy.wrap(section).should('be.visible');
					return;
				}

				cy.wrap(section).should('not.be.visible');
			});
		});

		it('should show auth-modal on btn-login click', () => {
			cy.get('[data-cy="btn-login"]').click();
			cy.get('[data-cy="auth-modal"]').should('be.visible');
		});

		it('should show sections on scroll', () => {
			cy.get('[data-cy="root-container"] > div').each((section) => {
				cy.wrap(section).scrollIntoView().should('be.visible');
			});
		});
	});
});
