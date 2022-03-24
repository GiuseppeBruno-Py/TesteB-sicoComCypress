/// <reference types="cypress" />

context('Dev Finances', () => {

    // hooks
    // trecho que executam antes e depois do teste
    // before -> antes de todos os testes
    // beforeEach -> antes de cada teste')
    // after -> depois de todos os testes
    // afterEach -> depois de cada teste

    beforeEach(() => {
        cy.visit('https://maratona-discover-devfinance.netlify.app/#')
        cy.get('#data-table tbody tr').should('have.length', 0)
    });
    it('Cadastrar entradas', () => {
        /// - entender o fluxo manualmente
        /// - mapear os elementos que vamos interagir
        /// - descrever as interações com o cypress
        /// - adicionar as asserções que a gente precisa 

        cy.visit('https://maratona-discover-devfinance.netlify.app/#')
        // asserção
        cy.get('#data-table tbody tr').should('have.length', 0)

        cy.get('#transactions .button').click() // id + classe
        cy.get('#description').type('Mesada') // id
        cy.get('[name=amount]').type(12) // atributo
        cy.get('[type=date]').type('2022-03-22') // atributos
        cy.get('button').contains('Salvar').click() // tipo de valor

        

        cy.get('#data-table tbody tr').should('have.length', 1)

        });


    // Cadastrar saídas
    it('Cadastrar saídas', () => {
        cy.visit('https://maratona-discover-devfinance.netlify.app/#')

        cy.get('#transactions .button').click() // id + classe
        cy.get('#description').type('Mesada') // id
        cy.get('[name=amount]').type(-12) // atributo
        cy.get('[type=date]').type('2022-03-22') // atributos
        cy.get('button').contains('Salvar').click() // tipo de valor

        

        cy.get('#data-table tbody tr').should('have.length', 1)
    });
    // Remover entradas e saídas

    it.only('Remover entradas e saídas', () => {
        const entrada = 'Mesada'
        const saida = 'KinderOvo'

        cy.get('#transactions .button').click() // id + classe
        cy.get('#description').type(entrada) // id
        cy.get('[name=amount]').type(100) // atributo
        cy.get('[type=date]').type('2022-03-22') // atributos
        cy.get('button').contains('Salvar').click() // tipo de valor

        cy.get('#transactions .button').click() // id + classe
        cy.get('#description').type(saida) // id
        cy.get('[name=amount]').type(-35) // atributo
        cy.get('[type=date]').type('2022-03-22') // atributos
        cy.get('button').contains('Salvar').click() // tipo de valor

        // estrategia 1: voltar para elemento pai, e avançar para um td img atr
    
        cy.contains(entrada)
        .parent()
        .find('img[onclick*=remove]')
        .click()

        // estrategia 2: buscar todos os irmãos, e buscar o que tem img + atr
        cy.contains(saida)
        .siblings()
        .children('img[onclick*=remove]')
        .click()

        cy.get('#data-table tbody tr').should('have.length', 0)
    });
});