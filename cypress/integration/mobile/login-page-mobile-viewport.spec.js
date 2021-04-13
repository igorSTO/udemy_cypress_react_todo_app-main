/// <reference  types="cypress" />

/**
 * @desc Check login page on "qa" and "learnQa" environments with mobile viewports 
 * @link npx cypress run --spec "cypress/integration/mobile/login-page-mobile-viewport.spec.js"
 * @author Igor Stotskyy
 */

import { Login } from "../../page_objects/login-pages/login-page.po";

const mobileScreens = ['iphone-x', 'iphone-x', 'ipad-2']

describe('Mobile Viewports - Login Page', () => {

    mobileScreens.forEach(screen => {
        context('viewports in non-Learn UI', () => {

            beforeEach(() => {
                cy.viewport(screen)
                cy.visit(Cypress.env('qa'))
                Login.checkUrl('')
                cy.get(Login.loginPage4x.logo, { timeout: 10000 }).should('exist')
            })

            it(`Should displays 4.x login page on ${screen} screen`, () => {
                cy.get(Login.loginPage4x.logo).should('be.visible')
                Login.getElement({ element: Login.loginPage4x.logo }).should('be.visible')
                Login.getElement({ element: Login.loginPage4x.formTitle }).contains('Log in to your account')
                Login.getElement({ element: Login.loginPage4x.loginForm }).should('be.visible')
                Login.getElement({ element: Login.loginPage4x.userInput }).should('be.visible')
                Login.getElement({ element: Login.loginPage4x.pwdInput }).should('be.visible')
                Login.getElement({ element: Login.loginPage4x.submitButton }).should('be.visible')

                // cookie banner should be visible
                Login.getElement({ element: Login.loginPage4x.cookieBanner }).should('be.visible')
                Login.getElement({ element: Login.loginPage4x.acceptCookiePolicy }).should('be.visible')
            });
        });
    })

    mobileScreens.forEach(screen => {
        context('viewports in Learn UI', () => {

            beforeEach(() => {
                cy.viewport(screen)
                cy.visit(Cypress.env('learnQa'))
                Login.checkUrl('')
            })

            it(`Should displays Learn login page on ${screen} screen`, () => {
                Login.getElement({ element: Login.loginPage5_0.customerLogo }).should('be.visible')
                Login.getElement({ element: Login.loginPage5_0.formTitle2 }).contains('Sign In')
                Login.getElement({ element: Login.loginPage5_0.userInput2 }).should('be.visible')
                Login.getElement({ element: Login.loginPage5_0.pwdInput2 }).should('be.visible')
                Login.getElement({ element: Login.loginPage5_0.submitButton2 }).should('be.visible')

                // cookie banner should be visible
                Login.getElement({ element: Login.loginPage5_0.cookieBanner2 }).should('be.visible')
                Login.getElement({ element: Login.loginPage5_0.cookiePolicy }).contains('Cookie Policy')
                cy.contains('Accept & Close')
            });
        });
    })

});