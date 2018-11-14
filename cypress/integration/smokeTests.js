/// <reference types="Cypress" />

describe('Smoke tests', function() {

	it.skip('Log in / Log out test', function() {
		cy.login('admin', 'admin')
		cy.logout('admin')

		cy.get('div#login-content').contains('h3', 'Logout successful')
	})
	
	it.skip('Incorrect login test', function() {
		cy.visit('http://localhost:8080/business-central')

		cy.get('input[name=j_username]').type('admin')
		cy.get('input[name=j_password]').type('incorrect_password')
		cy.get('input[type=submit]').click()
		cy.url().should('not.include', 'HomePerspective%7Corg.kie.workbench.common.screens.home.client.HomePresenter')

		cy.get('div#login-content').contains('h3', 'Login failed: Not Authorized')
	})

	it.skip('Create and Deploy Space, Repository, Project, Asset', function() {
		cy.login('admin', 'admin').projectAuthoring()

		cy.get('a[data-field=breadcrumbLink]').contains('Spaces').click()
		cy.url().should('include', 'LibraryPerspective%7C$LibraryOrganizationalUnitsScreen')
		cy.get('button').contains('Add Space').click()
		cy.get('input[data-field=name]').type('MySmokeSpace')
		cy.get('div.modal button.btn-primary').click()
		cy.wait(3000)
		cy.get('div[data-field=cards-container]').contains('h2', 'MySmokeSpace').click()

		cy.url().should('include', 'LibraryPerspective%7C$LibraryScreen')
		cy.get('button[data-field=add-project]').click()
		cy.get('input[data-field=name]').type('MySmokeProject')
		cy.get('div.modal-dialog button.btn-primary').click()
		cy.url().should('include', 'LibraryPerspective%7C$ProjectScreen')
		cy.wait(3000)

		cy.get('button[data-field=add-asset]').click()
		cy.url().should('include', 'AddAssetsScreen')
		cy.get('input#filter-text').should('be.visible').and('be.empty')
		cy.get('input#filter-text').type('Data Object')
		cy.get('div h3').contains('Data Object').click()

		cy.get('input#fileName').type('MySmokeAsset')
		cy.get('div#packageSelectContainer').click()
		cy.get('div#packageSelectContainer li>a').contains('mysmokespace.mysmokeproject').click()
		cy.get('div.modal-dialog button.btn-primary').click()
		cy.url().should('include', 'DataModelerEditor')
		
		cy.get('button.btn-link').contains('MySmokeAsset')

		cy.get('button.btn-default i.fa-times').click()

		cy.get('div[data-field=assets-list]').find('div.list-view-pf-main-info').should('have.length', 1)
		cy.get('div[data-field=assets-list] div.list-view-pf-main-info').contains('a[data-field=asset-name]', 'MySmokeAsset')

		cy.get('button#deploy').click()
		cy.get("div.alert:contains('Build Successful')")
	})

	it('Import Example', function() {
		cy.login('admin', 'admin').projectAuthoring()

		cy.get('button#dropdown-space-actions').click()
		cy.get('a[data-field=try-samples]').click()
		cy.get('h2[data-field=name]').contains('OptaCloud').click()
		cy.get('button.btn-primary[data-field=ok]').click()
	})

	it.skip('Designer Smoke', function() {
		cy.login('admin', 'admin')

		assert.equal('not', 'finished', 'Test isn\'t finished')
	})

	it.skip('New Designer Smoke', function() {
		cy.login('admin', 'admin')

		assert.equal('not', 'finished', 'Test isn\'t finished')
	})

})
