require("dotenv").config();
const mongoose = require("mongoose");
const Author = require("./models/AuthorSchema");
const Book = require("./models/BookSchema");
const User = require("./models/UserSchema");
const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require("apollo-server");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("connected successfully"))
  .catch((err) => console.log("error occurred during connection", err.message));

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]
    me: User
    allGenres: [String!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
      username: String!
      password: String!
      favoriteGenre: String!
    ): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.count({}),
    authorCount: async () => await Author.count({}),
    allBooks: async (root, args) => {
      let author;
      if (args.author) {
        author = await Author.find({ name: args.author });
      }
      if (args.genre && args.author) {
        return await Book.find({ genres: args.genre, author }).populate(
          "author"
        );
      } else if (args.genre && !args.author) {
        return await Book.find({ genres: args.genre }).populate("author");
      } else if (args.author && !args.genre) {
        return await Book.find({ author }).populate("author");
      } else {
        return await Book.find({}).populate("author");
      }
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
    allGenres: async () => {
      const genres = await Book.find({}).select("genres");
      return [
        ...new Set([
          ...genres.reduce((array, book) => array.concat(book.genres), []),
        ]),
      ];
    },
  },
  Mutation: {
    login: async (root, args) => {
      try {
        const user = await User.findOne({ username: args.username });
        if (user && (await bcrypt.compare(args.password, user.password))) {
          const userForToken = {
            username: user.username,
            id: user._id,
          };
          return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
        } else {
          throw new UserInputError("wrong credentials");
        }
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }
    },
    createUser: async (root, args) => {
      try {
        return await new User({ ...args }).save();
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }
    },
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      try {
        let author = await Author.findOne({ name: args.author });
        if (!author) {
          author = await new Author({ name: args.author }).save();
        }
        const book = await new Book({
          title: args.title,
          author,
          published: args.published,
          genres: args.genres,
        }).save();
        console.log(book);
        return book.populate("author");
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      try {
        const author = await Author.findOne({ name: args.name });
        if (!author) return null;
        else {
          author.born = args.setBornTo;
          await author.save();
          return author;
        }
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }
    },
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.find({ name: root.name });
      return Book.count({ author });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
