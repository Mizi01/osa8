import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            bookCount
            id
            born
        }
    }
`

export const ALL_BOOKS = gql`
query {
    allBooks {
        title
        published
        author {
            name
        }
        id
        genres
    }
}
`

export const CREATE_BOOK = gql`
mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
        title
        author
        published
        genres
    }
}
`

export const EDIT_AUTHOR = gql`
mutation setAuthorBorn(
    $name: String!
    $setBornTo: Int!
) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
        name
        born
    }
}
`