/// <reference types="cypress" />

let todoId;
let firstIdTodo;

describe('Name of the group', () => {

    before(() => {
        cy.addNewApiTodo()
        cy.visit('http://localhost:3000')
        cy.log('hello')
    })

    it('GET request', () => {
        // cy.wait(20000)
        // cy.request('http://localhost:8080/todos') // cypress will think it's GEt request automatically
        cy.request('GET', 'http://localhost:8080/todos').then(response => {
            firstIdTodo = response.body[0].id // get id of first todo
            cy.log(firstIdTodo)

            cy.log(response.headers)
            cy.log(response.status)
            cy.log(response.duration)
            cy.log(response.statusText)
            cy.log(response.body)

            expect(response.status).to.be.eq(200)
            expect(response.duration).to.be.below(20000)
            expect(response.body[0].isComplete).to.be.false
        })
    });

    it('GET request with parameters', () => {
        // #1
        cy.request('GET', `http://localhost:8080/todos?id=${firstIdTodo}`).then(response => {
            expect(response.status).to.be.eq(200)
            expect(response.body[0].isComplete).to.be.false
            expect(response.body[0].name).to.be.eq('cypress')
        })
        // #2
        cy.request({
            method: 'GET',
            url: 'http://localhost:8080/todos',
            qs: { "id": firstIdTodo }
        }).then(response => {
            expect(response.status).to.be.eq(200)
            expect(response.body[0].isComplete).to.be.false
            expect(response.body[0].name).to.be.eq('cypress')
        })
    });

    it('POST request', () => {
        cy.request('POST', 'http://localhost:8080/todos', {
            "name": "hello",
            "isComplete": false
        }).then(response => {
            todoId = response.body.id // get id of last todo
            cy.log(todoId)
            expect(response.status).to.be.eq(201)
            expect(response.body.name).to.be.eq('hello')
            expect(response.body.id).to.be.eq(todoId)
        })
    });

    it('PUT request', () => {
        cy.request('PUT', `http://localhost:8080/todos/${firstIdTodo}`, {
            "name": "auto",
            "isComplete": true
        }).then(response => {
            cy.log(response.body)
            expect(response.status).to.be.eq(200)
            expect(response.body.name).to.be.eq('auto')
            expect(response.body.isComplete).to.be.true
        })
    });

    it('DELETE request', () => {
        cy.request('DELETE', 'http://localhost:8080/todos/' + todoId, {
            "name": "hello",
            "isComplete": false
        }).then(response => {
            cy.log(response.body)
            expect(response.status).to.be.eq(200)
        })
    });

    it.skip('API Authorization', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8080/courses',
            headers: { // #1
                Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9saXZpZXJAbWFpbC5jb20iLCJpYXQiOjE2MTA1Njk0OTcsImV4cCI6MTYxMDU3MzA5Nywic3ViIjoiMSJ9.zapn_VZP2eBtRUy-9m_0EHGYFmsv2WYWJONSEv04tqA'
            },
            auth: { // # 2
                bearer: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9saXZpZXJAbWFpbC5jb20iLCJpYXQiOjE2MTA1Njk0OTcsImV4cCI6MTYxMDU3MzA5Nywic3ViIjoiMSJ9.zapn_VZP2eBtRUy-9m_0EHGYFmsv2WYWJONSEv04tqA'
            }
        })

    });

    // delete all todos to not record to db
    after(() => {
        cy.get('body').then($el => {
            if ($el.find('.delete-item').length > 0) {
                cy.get('.delete-item').click({ multiple: true })
            }
        })
    })

});