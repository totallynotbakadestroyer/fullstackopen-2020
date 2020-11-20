const listHelper = require("../utils/list_helper");

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];
const listWithMultipleBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];
const emptyList = [];

test("dummy returns one", () => {
  const result = listHelper.dummy(emptyList);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(listWithOneBlog[0].likes);
  });

  test("when list has 2 or more elements, equals the sum of all likes", () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs);
    expect(result).toBe(36);
  });

  test("when the list is empty, equals 0", () => {
    const result = listHelper.totalLikes(emptyList);
    expect(result).toBe(0);
  });
});

describe("favorite blog", () => {
  test("return nothing if list is empty", () => {
    const result = listHelper.favoriteBlog(emptyList);
    expect(result).toEqual(undefined);
  });
  test("return only post provided if list contains only one blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  });
  test("return most liked post from provided if list contains more than one blog", () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs);
    expect(result).toEqual(listWithMultipleBlogs[2]);
  });
});

describe("author with most blogs", () => {
  test("return nothing if list is empty", () => {
    const result = listHelper.mostBlogs(emptyList);
    expect(result).toEqual(undefined);
  });
  test("return only post provided author if list contains only one blog", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({ author: listWithOneBlog[0].author, blogs: 1 });
  });
  test("return author with most blogs", () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs);
    expect(result).toEqual({ author: "Robert C. Martin", blogs: 3 });
  });
});
describe("most liked author", () => {
  test("return nothing if list is empty", () => {
    const result = listHelper.mostLikes(emptyList);
    expect(result).toEqual(undefined);
  });
  test("return only post provided author if list contains only one blog", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes,
    });
  });
  test("return author with most likes", () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 17 });
  });
});
