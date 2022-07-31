const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const config = require('./config')
const Book = require('./models/book')
const Author = require('./models/author')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]!
  }

  type Author {
    name: String!
    bookCount: Int!
    id: ID!
    born: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const author = await Author.findOne({name: args.author})

      if(!args.author && !args.genre) {
        return Book.find({})
      }
      if(args.author && !args.genre) {
        console.log(author.id)
      return await Book.find({author: author.id})
      }
      if(args.genre && !args.author) {
        return await Book.find({genres: args.genre})
      }
      return (
       await Book.find({genres: args.genre, author: author.id})
      )
    },
    allAuthors: async (root, args) => Author.find({}),
  },

  Author : {
    bookCount: async (root) => await Book.countDocuments({ author: root.id })
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if(!author) {
        author = await Author({name: args.author})
        console.log("uusi authori lisättydw")
        author.save()
      }
      console.log(author)
      const book = await Book({...args, author})
      return book.save()
    },
    editAuthor: async (root, args) => {
      const author = await Author.find({ name: args.name })
      console.log(author)
      if(author) {
        const updatedAuthor = await Author.findByIdAndUpdate(author, { born: args.setBornTo, new: true }) 
        const updatedAuthorV2 = await Author.findById(updatedAuthor)
        return updatedAuthorV2
      }
      return null
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
