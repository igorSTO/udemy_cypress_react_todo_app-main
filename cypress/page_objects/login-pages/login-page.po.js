/// <reference types="cypress" />

class Login {
    constructor() {

        this.loginPage4x = {
            userInput: '#Username',
            pwdInput: '#Password',
            submitButton: '.login-form > .btn-lg',
            logo: '.logo',
            formTitle: '.form-title',
            loginForm: '.login-form',
            cookieBanner: '#Password',
            acceptCookiePolicy: '#Password',
        }

        this.loginPage5_0 = {
            userInput2: '#username',
            pwdInput2: '#password',
            submitButton2: '.form__submit-btn',
            customerLogo: '.signin__customer-logo',
            formTitle2: '.form__title',
            cookieBanner2: '#cookie-policy-banner',
            cookiePolicy: 'p > a',
        }

    }

    getElement({ element, index = 0 }) {
        return cy.get(element).eq(index)
    }

    checkUrl(url) {
        cy.url().should('contain', url)
    }

}

const login = new Login();

export { login as Login };