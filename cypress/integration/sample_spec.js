describe('My First Test', function() {

	it('Log in and log out', function() {
		cy.visit('http://localhost:8080/business-central')

		cy.get('input[name=j_username]').type('admin')
		cy.get('input[name=j_password]').type('admin')
		cy.get('input[type=submit]').click()

		cy.url().should('include', 'HomePerspective%7Corg.kie.workbench.common.screens.home.client.HomePresenter')

		cy.get('div#home-action-design').click()

		cy.url().should('include', 'LibraryPerspective%7C$LibraryScreen')
		cy.get('button[data-field=add-project]').click()

		cy.get('input[data-field=name]').type('somename')

		cy.get('div.modal-dialog button.btn-primary').click()

		cy.url().should('include', 'LibraryPerspective%7C$ProjectScreen')
		cy.wait(3000)
		cy.get('button[data-field=add-asset]').click()

		cy.url().should('include', 'AddAssetsScreen')
		cy.get('input#filter-text').should('be.visible').and('be.empty')
		cy.get('input#filter-text').type('Business Process')
		cy.get('div h3').contains('Business Process').click()

		cy.get('input#fileName').type('process')
		cy.get('div.modal-dialog button.btn-primary').click()

		cy.get('i.fa-eye').click()
		cy.get('a.gwt-Anchor').contains('Start').click()


		cy.get('button').contains('Save').click()

		cy.get('a').contains('testadmin').click()
		cy.get('a').contains('Log Out').click()
	})
})
