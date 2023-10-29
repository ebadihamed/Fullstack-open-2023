describe('At first, it shows the login', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Hamed',
      username: 'hamed',
      password: '12345'
    }
    cy.request('POST','http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('hamed')
      cy.get('#password').type('12345')
      cy.get('#logInButton').click()

      cy.contains('Blogs')
      cy.contains('hamed is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('hamed')
      cy.get('#password').type('123')
      cy.get('#logInButton').click()

      cy.contains('wrong credentials')
    })

  })

  describe('When logged in', function() {
    beforeEach(function(){
      cy.login({username: 'hamed', password: '12345'})
    })

    it('A blog can be created', function(){
      cy.createBlog({
        title: 'My first blog',
        author: 'Hamed',
        url: 'www.google.com'
      })
    })

    describe('and a Blog exists', function(){
      beforeEach(function() {
        cy.createBlog({
          title: 'My first blog',
          author: 'Hamed',
          url: 'www.google.com'
        })
      })

      it('the Blog is shown in the list', function() {
        cy.contains('My first blog Hamed')
      })

      it('the blog can be liked', function() {
        cy.get('#showView').click()
        cy.get('#pressToLike').click()
        cy.get('#nLikes').contains(1)
      })

      it('the blog can be removed', function(){
        cy.get('#showView').click()
        cy.get('#rmButton').click()
        cy.contains('Blog has been deleted')
        cy.get('html').should('not.contain', 'My first blog Hamed')

      })
    })
  })

})

