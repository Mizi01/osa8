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
      if(!args.author && !args.genre) {
        return Book.find({})
      }
      if(args.author && !args.genre) {
      return books.filter(p => p.author===args.author)
      }
      if(args.genre && !args.author) {
        console.log(args)
        return books.filter(p => p.genres.find(s => s === args.genre) === args.genre)
      }
      return (
        books.filter(p => p.genres.find(s => s === args.genre) === args.genre).filter(p => p.author===args.author)
      )
    },
    allAuthors: async (root, args) => Author.find({}),
  },

  Author : {
    bookCount: (root) => books.filter(book => book.author == root.name).length
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if(!author) {
        author = await Author({name: args.author})
        console.log("uusi authori lisätty")
        author.save()
      }
      console.log(author)
      const book = await Book({...args, author})
      return book.save()
    },
    editAuthor: async (root, args) => {
      const author = authors.find(p => p.name === args.name)
      console.log(author)
      if(author) {
       author.born = args.setBornTo
       return author 
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
