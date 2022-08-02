import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = (props) => {
  
  const [genreToFind, setGenreToFind] = useState(null)
  const resultsWithGenre = useQuery(ALL_GENRES, {
    variables: {genreToFind: genreToFind},
    skip: !genreToFind
  })

  const resultsWithoutGenre = useQuery(ALL_BOOKS)
  let allGenres = []
  const uniqueGenres = (resultsWithoutGenre.data) ? (
    resultsWithoutGenre.data.allBooks.flatMap(book => book.genres)
  ) : null
  if(resultsWithoutGenre.data) uniqueGenres.forEach(genre => !allGenres.includes(genre) ? allGenres = allGenres.concat(genre) : genre)
  console.log(uniqueGenres)
  console.log(allGenres)

  console.log(resultsWithGenre)

  if (!props.show) {
    return null
  }

  const results = (genreToFind) ? resultsWithGenre : resultsWithoutGenre

  if(results.loading) {
    return (
      <div>
        <h2>books</h2>
        <div>loading...</div>
      </div>
    )
  }

  console.log(results.data)
  const books = results.data.allBooks
  console.log(genreToFind)

  
  const GenreButton = ({genre}) => {
    return (
      <button onClick={()=>setGenreToFind(genre)}>{genre}</button>
    )
  }

  return (
    <div>
      <h2>books</h2>

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
      {allGenres.map(genre =>
      <GenreButton key={genre} genre={genre} />
      )}
      <button onClick={()=>setGenreToFind(null)}>clear filter</button>
    </div>
  )
}

export default Books
