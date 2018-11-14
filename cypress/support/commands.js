// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
	cy.visit('http://localhost:8080/business-central')

	cy.get('input[name=j_username]').type(username)
	cy.get('input[name=j_password]').type(password)
	cy.get('input[type=submit]').click()
	cy.url().should('include', 'HomePerspective%7Corg.kie.workbench.common.screens.home.client.HomePresenter')
	
	return cy.get('body')
})

Cypress.Commands.add('logout', (username) => {
	cy.get('a').contains(username).click()
	cy.get('a').contains('Log Out').click()
})

Cypress.Commands.add('projectAuthoring', {prevSubject: ['optional', 'element']}, () => {
	cy.get('a#mega-menu-dropdown').click()
	cy.get('ul[data-field=left-menu-items] li a').contains('Projects').click()
	cy.url().should('include', 'LibraryScreen')
})
