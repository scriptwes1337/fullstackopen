const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");

const JWT_SECRET = process.env.JWT_SECRET;

const resolvers = {
  Query: {
    bookCount: async () => {
      const books = await Book.find();
      return books.length;
    },
    authorCount: async () => {
      const authors = await Author.find();
      return authors.length;
    },
    allBooks: async (root, args) => {
      let query = {};
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          query.author = author._id;
        } else {
          return [];
        }
      }
      if (args.genre) {
        query.genres = { $in: [args.genre] };
      }
      return Book.find(query);
    },
    allAuthors: async () => {
      return Author.find();
    },
    me: async (root, args) => {
      try {
        const decodedToken = jwt.verify(args.token, JWT_SECRET);
        const user = await User.findById(decodedToken.id);
        return user;
      } catch (error) {
        throw new GraphQLError("Invalid or expired token");
      }
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        const isValidToken = jwt.verify(args.token, JWT_SECRET);
      } catch (error) {
        throw new GraphQLError("Invalid or expired token");
      }

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });
        await author.save();
      }

      const book = new Book({ ...args, author: author._id });
      const savedBook = await book.save();

      author.bookCount.push(savedBook._id);
      await author.save();

      const populatedBook = book.populate("author");

      pubsub.publish("BOOK_ADDED", { bookAdded: populatedBook });

      return populatedBook;
    },
    editAuthor: async (root, args) => {
      try {
        const isValidToken = jwt.verify(args.token, JWT_SECRET);
      } catch (error) {
        throw new GraphQLError("Invalid or expired token");
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      await author.save();
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });
      const response = await user.save();
      return response;
    },
    login: async (root, args) => {
      const { username, password } = args;

      const user = await User.findOne({ username });
      const passwordCorrect =
        user === null ? false : password === "123" ? true : false;

      if (!(user && passwordCorrect)) {
        throw new Error("Invalid username or password");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Author: {
    bookCount: async (root) => {
      return root.bookCount.length;
    },
  },
  Book: {
    author: async (root) => await Author.findById(root.author),
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
