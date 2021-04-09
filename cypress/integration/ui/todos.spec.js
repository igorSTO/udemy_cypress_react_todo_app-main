/**
 * @desc email locaw28836@whyflkj.com
 *       password Qazwsx12345$
 * @link1 https://www.npmjs.com/package/npm-run-all 
 *        npm install npm-run-all --save-dev - install this pakage
 * @link2 https://docs.cypress.io/guides/continuous-integration/introduction#Boot-your-server
 *        npm install --save-dev start-server-and-test - install this pakage
 * @link3 https://github.com/cypress-io/cypress-docker-images - for docker
 * @author Igor Stotskyy
 * @run npx cypress run --spec "cypress/integration/ui/todos.spec.js"
 *      npx cypress run - all test case
 *      npx cypress open - open runner 
 *      npx cypress run --spec "cypress/integration/ui/*.js" - run all spec files in ui folder
 *      npx cypress run --browser firefox - opens and run in firefox browser
 *      npx cypress run --browser firefox --headless - run in firefox browser
 *      npm run e2e:chrome - run in headless in chrome from package.json scrypt
 *      npx cypress run --record --key c3d6e734-5b17-4d06-a39c-06d5388fa6cc - record all tests in cypress dashboard
 *      npx cypress run --record --key c3d6e734-5b17-4d06-a39c-06d5388fa6cc --spec "cypress/integration/ui/todos.spec.js" --tag "todos.spec" - record onlt one spec file in cypress dashboard
 *      npm run build:test - build application first and run all tests cases on cy dashboard
 *      npm run "run:docker" - run in docker container
 */

/// <reference types="cypress" />

describe('Todo UI testing', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('should add new todo', () => {
        cy.intercept('POST', 'http://localhost:8080/todos').as('postNewTodo')
        cy.addNewTodo('first todo')
        cy.wait('@postNewTodo').then(xhr => {
            expect(xhr.request.body.name).to.eql('first todo')
            expect(xhr.response.body.name).to.eql('first todo')
        })
        cy.get('.todo-item').last().should('contain.text', 'first todo')
        cy.log('hello github')
    });

    it('should update status', () => {
        cy.addNewTodo('second todo')
        cy.get('.todo-checkbox').check().should('be.checked')
        cy.get('.todo-checkbox').uncheck().should('not.be.checked')
    });

    it('should delete todo', () => {
        cy.addNewTodo('third todo')
        cy.get('.delete-item').click()
    });

    it('should add empty todo', () => {
        cy.addNewTodo('')
    });

    afterEach(() => {
        cy.get('body').then($el => {
            if ($el.find('.delete-item').length > 0) {
                cy.get('.delete-item').click({ multiple: true })
            }
        })
    })

});