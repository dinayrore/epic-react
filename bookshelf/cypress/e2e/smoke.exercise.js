import { user } from "../fixtures/user"

describe('smoke', () => {
  it('should allow a typical user flow', () => {
    // 🐨 visit '/' (📜 https://docs.cypress.io/api/commands/visit.html)
    cy.visit('/')
    // 🐨 find the button named "register" and click it
    cy.findByRole('button', {name: /register/i}).click()
    // 🐨 within the "dialog" find the username and password and register
    cy.findByRole('dialog').within(() => {
      cy.findByLabelText(/username/i).type(user.username)
      cy.findByLabelText(/password/i).type(user.password)
      cy.findByRole('button', {name: /register/i}).click()
    })
    // 🐨 within the "navigation", find the link named "discover" and click it
    cy.findByRole('link', {name: /discover/i}).click()
    // 🐨 within the "main", type in the "searchbox" the title of a book and hit enter
    cy.findByRole('main').within(() => {
      cy.findByRole('textbox', {name: /search/i}).type('The War of Art{enter}')
      //   🐨 within the listitem with the name of your book, find the button named "add to list" and click it.
      cy.findByRole('listitem', {name: /the war of art/i}).within(() => {
        cy.findByRole('button', {name: /add to list/i}).click()
      })
    })
    // 🐨 click the reading list link in the navigation
    cy.findByRole('link', {name: /reading list/i}).click()
    // 🐨 ensure the "main" only has one element "listitem"
    cy.findByRole('main').within(() => {
      cy.findAllByRole('listitem').should('have.length', 1)
      //   🐨 click the link with the name of the book you added to the list to go to the book's page
      cy.findByRole('link', {name: /voice of war/i}).click()
    })
    
    // 🐨 type in the notes textbox
    cy.findByRole('textbox', {name: /notes/i}).type('This is an awesome book')
    // 🐨 wait for the loading spinner to show up
    cy.findByLabelText(/loading/i).should('exist')
    // 🐨 wait for the loading spinner to go away
    cy.findByLabelText(/loading/i).should('not.exist')
    
    // 🐨 mark the book as read
    cy.findByRole('button', {name: /mark as read/i}).click()

    // 🐨 click the 5 star rating radio button
    // the radio buttons are fancy and the inputs themselves are visually hidden
    // in favor of nice looking stars, so we have to force the click.
    cy.findByRole('radio', {name: /5 stars/i}).click({force: true})

    // 🐨 navigate to the finished books page
    cy.findByRole('navigation').within(() => {
      cy.findByRole('link', {name: /finished books/i}).click()
    })

    // 🐨 make sure there's only one listitem here (within "main")
    cy.findByRole('main').within(() => {
      cy.findAllByRole('listitem').should('have.length', 1)
      // 🐨 make sure the 5 star rating radio button is checked
      cy.findByRole('radio', {name: /5 stars/i}).should('be.checked')
      // 🐨 click the link for your book to go to the books page again
      cy.findByRole('link', {name: /voice of war/i}).click()
    })

    // 🐨 remove the book from the list
    cy.findByRole('button', {name: /remove from list/i}).click()
    // 🐨 ensure the notes textbox and the rating radio buttons are gone
    cy.findByRole('textbox', {name: /notes/i}).should('not.exist')
    cy.findByRole('radio', {name: /5 stars/i}).should('not.exist')

    // 🐨 navigate back to the finished books page
    cy.findByRole('navigation').within(() => {
      cy.findByRole('link', {name: /finished books/i}).click()
    })

    // 🐨 ensure there are no books in the list
    cy.findByRole('main').within(() => {
      cy.findAllByRole('listitem').should('have.length', 0)
    })
  })
})
