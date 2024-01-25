/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

context('Funcionalidade de Login', () =>{

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta')
    });

    // afterEach(() => {
    //     cy.screenshot()
    // });

    let emailValido = 'aluno_ebac@teste.com'
    let senhaValida = 'teste@teste.com'
    let emailInexistente = faker.internet.email()

    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type(emailValido)
        cy.get('#password').type(senhaValida)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').should('contain', 'Minha conta')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, aluno_ebac')
    })
    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
        cy.get('#username').type(emailInexistente)
        cy.get('#password').type(senhaValida)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain', 'Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.')
    })
    it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {
        cy.get('#username').type(emailValido)
        cy.get('#password').type('teste@teste')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain', 'Erro: A senha fornecida para o e-mail aluno_ebac@teste.com está incorreta. Perdeu a senha?')
    })

    it('Redefinir senha com e-mail/usuário existente', () => {
        cy.get('.lost_password > a').click()
        cy.get('#user_login').type(emailValido)
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-message').should('contain', 'O e-mail de redefinição de senha foi enviado.')
    })

    it('Redefinir senha com e-mail/usuário inexistente', () => {
        cy.get('.lost_password > a').click()
        cy.get('#user_login').type(emailInexistente)
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-error').should('contain', 'Nome de usuário ou e-mail inválido.')
    })
})