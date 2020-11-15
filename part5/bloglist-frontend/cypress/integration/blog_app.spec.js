describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.request("POST", "http://localhost:3001/api/users", {
      name: "TestUser",
      username: "TestTest",
      password: "TestPassword",
    });
    cy.visit("http://localhost:3000");
  });

  describe("When multiple blogs are created", function () {
    beforeEach(function () {
      cy.createMany();
      cy.login({ username: "TestTest", password: "TestPassword" });
    });
    const arrayOfLikes = [];
    it("Blogs should be sorted by likes", function () {
      cy.get(".blog .toggleVisible").each((element) => {
        cy.wrap(element).click();
      });
      cy.get(".likesCount").then((blogs) => {
        for (let i = 0; i < blogs.length; i++) {
          arrayOfLikes.push(blogs[i].innerHTML.toString().split(" ")[1]);
        }
        console.log(arrayOfLikes);
      });
    });
    expect(arrayOfLikes).to.deep.equal([...arrayOfLikes].sort((a, b) => b - a));
  });

  it("Login form is shown", function () {
    cy.visit("http://localhost:3000");
    cy.contains("login").click();
    cy.contains("Log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.visit("http://localhost:3000");
      cy.get("#username").type("TestTest");
      cy.get("#password").type("TestPassword");
      cy.contains("login").click();
      cy.contains("TestUser logged in");
    });

    it("fails with wrong credentials", function () {
      cy.visit("http://localhost:3000");
      cy.get("#username").type("WrongUsername");
      cy.get("#password").type("WrongPassword");
      cy.contains("login").click();
      cy.contains("Wrong credentials");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "TestTest", password: "TestPassword" });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#author").type("testAuthor");
      cy.get("#title").type("testTitle");
      cy.get("#url").type("testUrl");
      cy.contains("add new").click();
      cy.contains("a new blog testTitle by testAuthor added");
    });

    describe("When blog is created", function () {
      beforeEach(function () {
        cy.createBlog({
          author: "TestAuthor",
          title: "TestTitle",
          url: "TestUrl",
        });
      });

      it("This post can be liked", function () {
        cy.contains("view").click();
        cy.contains("likes 0");
        cy.contains("like").click();
        cy.contains("likes 1");
      });
      it("This post can be deleted", function () {
        cy.contains("view").click();
        cy.contains("delete").click();
        cy.on("window:confirm", () => true);
        cy.get(".blog").should("not.exist");
      });
    });
    describe("When blog is created by other user", function () {
      beforeEach(function () {
        cy.createFromOtherUser();
        cy.login({ username: "TestTest", password: "TestPassword" });
      });
      it("This post should not be able to delete", function () {
        cy.contains("view").click();
        cy.contains("delete").should("not.exist");
      });
    });
  });
});
