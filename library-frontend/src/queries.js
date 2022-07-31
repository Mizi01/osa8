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
        author
        id
        genres
    }
}
`