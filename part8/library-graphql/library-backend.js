require("dotenv").config();
const { ApolloServer, gql, UserInputError } = require("apollo-server");
const mongoose = require("mongoose");
const Author = require("./models/AuthorSchema");
const Book = require("./models/BookSchema");

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
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
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
  },
  Mutation: {
    addBook: async (root, args) => {
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
        return book.populate("author");
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args) => {
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
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
