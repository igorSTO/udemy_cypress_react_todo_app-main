/// <reference types="cypress" />

let id;

// POST -> add -> id
// GET
// UPDATE
// DELETE

describe('test all todos using Api', () => {

    it('should POST todo ', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/todos',
            body: {
                "name": "todo1",
                "isComplete": false
            }
        }).then(response => {
            id = response.body.id
            expect(response.status).to.eq(201)
            expect(response.body.name).to.eq('todo1')

        })
    });

    it('should GET added todo', () => {
        cy.request('GET', 'http://localhost:8080/todos/' + id).then(response => {
            expect(response.status).to.eq(200)
            expect(response.body.name).to.eq('todo1')
        })
    });

    it('should PUT added todo', () => {
        cy.request({
            method: 'PUT',
            url: 'http://localhost:8080/todos/' + id,
            body: {
                "name": "todo1",
                "isComplete": true
            }
        }).then(response => {
            expect(response.status).to.eq(200)
            expect(response.body.isComplete).to.eq(true)
        })
    });

    it('should DELETE added todo', () => {
        cy.request('DELETE', 'http://localhost:8080/todos/' + id).then(response => {
            expect(response.status).to.eq(200)
        })
    });

});