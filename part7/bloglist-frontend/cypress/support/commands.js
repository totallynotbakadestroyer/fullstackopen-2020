Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3001/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("user", JSON.stringify(body));
    cy.visit("http://localhost:3000");
  });
});

Cypress.Commands.add("createBlog", ({ title, author, url }) => {
  cy.request({
    method: "POST",
    url: "http://localhost:3001/api/blogs",
    body: { title, author, url },
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem("user")).token}`,
    },
  });
  cy.visit("http://localhost:3000");
});

Cypress.Commands.add("createFromOtherUser", () => {
  let token;
  cy.request({
    method: "POST",
    url: "http://localhost:3001/api/users",
    body: {
      username: "AnotherUsername",
      name: "AnotherName",
      password: "AnotherPassword",
    },
  })
    .then(() => {
      cy.request("POST", "http://localhost:3001/api/login", {
        username: "AnotherUsername",
        password: "AnotherPassword",
      }).then(({ body }) => {
        token = body.token;
      });
    })
    .then(() => {
      cy.request({
        method: "POST",
        url: "http://localhost:3001/api/blogs",
        body: {
          title: "AnotherBlog",
          author: "AnotherAuthor",
          url: "AnotherUrl",
        },
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
    });
});

Cypress.Commands.add("createMany", () => {
  let token;
  let arrayOfPromises = [];
  const initialBlogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
      creator: "5fadc09cfe468f0d8dbcd989",
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
      creator: "5fadc09cfe468f0d8dbcd989",
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
      creator: "5fadc09cfe468f0d8dbcd989",
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0,
      creator: "5fadc09cfe468f0d8dbcd989",
    },
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0,
      creator: "5fadc09cfe468f0d8dbcd989",
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
      creator: "5fadc09cfe468f0d8dbcd989",
    },
  ];
  cy.request({
    method: "POST",
    url: "http://localhost:3001/api/users",
    body: {
      username: "AnotherUsername",
      name: "AnotherName",
      password: "AnotherPassword",
    },
  }).then(() => {
    cy.request("POST", "http://localhost:3001/api/login", {
      username: "AnotherUsername",
      password: "AnotherPassword",
    }).then(({ body }) => {
      token = body.token;
      Cypress._.each(initialBlogs, (blog) => {
        cy.request({
          method: "POST",
          url: "http://localhost:3001/api/blogs",
          body: blog,
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
      });
    });
  });
  Promise.all(arrayOfPromises).then();
});
