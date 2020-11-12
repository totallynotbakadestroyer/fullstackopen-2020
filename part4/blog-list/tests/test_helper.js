const Blog = require("../models/BlogSchema");
const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
    creator: "5fadc09cfe468f0d8dbcd989"
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
    creator: "5fadc09cfe468f0d8dbcd989"
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
    creator: "5fadc09cfe468f0d8dbcd989"
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
    creator: "5fadc09cfe468f0d8dbcd989"
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
    creator: "5fadc09cfe468f0d8dbcd989"
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
    creator: "5fadc09cfe468f0d8dbcd989"
  },
];

const singleBlog = {
  title: "TestBlog",
  author: "TestBlog",
  url: "TestBlog",
  likes: 1,
};

const initialUsers = [
  {
    name: "123",
    username: "Test",
    password: "YesMan",
  },
  {
    name: "1234",
    username: "AntiTest",
    password: "YesMan",
  },
];

const newUser = {
  username: "newName",
  name: "Lenin",
  password: "testpassword",
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const blogsInDb = async () => {
  const notes = await Blog.find({});
  return notes.map((note) => note.toJSON());
};

const generateTestJwt = async () => {
  let userToCreate = new User(initialUsers[0]);
  let user = await userToCreate.save();
  return `Bearer ${await jwt.sign(
    {id: user._id, username: user.username},
    process.env.SECRET
  )}`;
};

module.exports = {
  initialBlogs,
  singleBlog,
  blogsInDb,
  initialUsers,
  usersInDb,
  newUser,
  generateTestJwt,
};
