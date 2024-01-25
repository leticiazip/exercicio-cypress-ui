/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Funcionalidade página de produtos', () => {
    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/produtos/')
    })

    it('Deve selecionar um produto da lista', () => {
        cy.get('[class="product-block grid"]')
        //.first()
        //.last()
        //.eq(4)
        .contains('Atlas Fitness Tank')
        .click()
    })

    it('Deve adicionar um produto ao carrinho', () =>{
        var quantidade = 3
        let produto = 'Atlas Fitness Tank'

        cy.get('[class="product-block grid"]')
            .contains(produto).click()
        cy.get('.button-variable-item-XL').click()
        cy.get('.button-variable-item-Blue').click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()

        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
        cy.get('.woocommerce-message').should('contain', quantidade+' × ', produto+ 'foram adicionados no seu carrinho.')
    })

    it('Deve adicionar um produto a wishlist', () => {
        let produto = 'Atlas Fitness Tank'

        cy.get('[class="product-block grid"]')
            .contains(produto).click()
        cy.get('.button-variable-item-XL').click()
        cy.get('.button-variable-item-Blue').click()
        cy.get('.summary > .yith-wcwl-add-to-wishlist > .yith-wcwl-add-button > .add_to_wishlist > :nth-child(2) > .fa').click()
        cy.get('#yith-wcwl-popup-message').should('contain', 'Produto adicionado!')
        cy.get(':nth-child(2) > .text-skin > .count_wishlist').should('contain', 1)
    })

    it('Usuário deve fazer uma avaliação do produto', () => {
        let produto = 'Atlas Fitness Tank'
        var estrelas = 4
        let nomeAutor = faker.name.firstName()
        let emailAutor = faker.internet.email()
        let msgReview = 'Muito bom!'

        cy.get('[class="product-block grid"]')
            .contains(produto).click()
        cy.get('.button-variable-item-XL').click()
        cy.get('.button-variable-item-Blue').click()
        cy.get('#tab-title-reviews > a').click()
        cy.get('.star-'+estrelas).click()
        cy.get('#author').type(nomeAutor)
        cy.get('#email').type(emailAutor)
        cy.get('#comment').type(msgReview)
        cy.get('#submit').click()
        cy.get('.tbay-author').should('contain', nomeAutor)
        cy.get('.description > p').should('contain', msgReview)
    })
})
