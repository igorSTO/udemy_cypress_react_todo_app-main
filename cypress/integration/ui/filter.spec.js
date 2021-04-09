
describe('Filter functionality test case', () => {

    // #1
    // UI
    // before(() => {
    //     cy.visit('http://localhost:3000')

    //     const todos = ['todo1', 'todo2', 'todo3', 'todo4', 'todo5']
    //     todos.forEach((todo) => {
    //         cy.addNewTodo(todo)
    //     })
    //     cy.get('.todo-checkbox').first().check().should('be.checked')
    //     cy.get('.todo-checkbox').last().check().should('be.checked')
    // })

    // #2
    // API
    // before(() => {
    //     cy.addNewApiTodo()
    //     cy.visit('http://localhost:3000')
    //     cy.get('.todo-checkbox').first().check().should('be.checked')
    //     cy.get('.todo-checkbox').last().check().should('be.checked')
    // })

    // #3
    // If you want use intercept, mock API, you should use beforeEach, because it will mock API for each test
    beforeEach(() => {
        cy.intercept({
            method: 'GET',
            url: 'http://localhost:8080/todos'
        }, {
            fixture: 'todos' // cypress property for fixture files
        })

        cy.visit('http://localhost:3000')
    })

    // #3 preconditions for mock API
    it('should check first and last todos', () => {
        cy.get('.todo-checkbox').first().check().should('be.checked')
        cy.get('.todo-checkbox').last().check().should('be.checked')
    });

    it('should be completed todos', () => {
        cy.contains('Complete').click()
        cy.url().should('contain', 'complete')
        cy.get('.todo-checkbox').each((item) => {
            cy.wrap(item).should('be.checked')
        })
    });

    it('should be active todos', () => {
        cy.contains('Active').click()
        cy.url().should('contain', 'active')
        cy.get('.todo-checkbox').each((item) => {
            cy.wrap(item).should('not.be.checked')
        })
    });

    // uncomment if you want use #1 or #2
    // after(() => {
    //     cy.get('body').then($el => {
    //         if ($el.find('.delete-item').length > 0) {
    //             cy.get('.delete-item').click({ multiple: true })
    //         }
    //     })
    // })

});