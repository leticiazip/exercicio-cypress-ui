/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

context('Funcionalidade de pré-cadastro', () => {
    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta')
    });

    it('Deve completar o pré cadastro com sucesso', () => {
        let primeiroNome = faker.name.firstName()
        let ultimoNome = faker.name.lastName()
        let email = faker.internet.email(primeiroNome)

        cy.get('#reg_email').type(email)
        cy.get('#reg_password').type('Teste@1234')
        cy.get(':nth-child(4) > .button').click()

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(primeiroNome)
        cy.get('#account_last_name').type(ultimoNome)
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')
    });

    it('Cadastro com dado obrigatório vazio', () => {
        let primeiroNome = faker.name.firstName()
        let ultimoNome = faker.name.lastName()
        let email = faker.internet.email(primeiroNome)

        cy.get('#reg_email').type(email)
        cy.get('#reg_password').type('Teste@1234')
        cy.get(':nth-child(4) > .button').click()

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(primeiroNome)
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-error').should('contain', 'Sobrenome é um campo obrigatório.')
    })

    it('Alteração de senha', () => {
        let primeiroNome = faker.name.firstName()
        let ultimoNome = faker.name.lastName()
        let email = faker.internet.email(primeiroNome)
        let senha = faker.internet.password()

        cy.get('#reg_email').type(email)
        cy.get('#reg_password').type(senha)
        cy.get(':nth-child(4) > .button').click()

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(primeiroNome)
        cy.get('#account_last_name').type(ultimoNome)
        cy.get('#password_current').type(senha)
        cy.get('#password_1').type('EbacTeste@1234')
        cy.get('#password_2').type('EbacTeste@1234')
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')
    })
})