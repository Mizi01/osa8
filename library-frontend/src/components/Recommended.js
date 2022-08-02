import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_GENRES } from '../queries'

const Recommended =  ({ user }) => {
    const [books, setBooks] = useState([])
    const resultsWithGenre = useQuery(ALL_GENRES, {
    variables: {genreToFind: user.favoriteGenre},
  })

  

  const results = resultsWithGenre
  useEffect(()=> {
    (!results.loading && results.data.allBooks) ? (
        setBooks(results.data.allBooks)
    ) : console.log('')
    }, [books] // eslint-disable-line
    )

 console.log(books)

  if(results.loading) {
    return (
      <div>
        <h2>recommendations</h2>
        <div>loading...</div>
      </div>
    )
  }


  return (
    <div>
      <h2>recommendations</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
