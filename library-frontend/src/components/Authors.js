import { useQuery } from '@apollo/client'

import { ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const results = useQuery(ALL_AUTHORS)
  
  if (!props.show) {
    return null
  }

  if(results.loading) {
    return (
      <div>
        <h2>authors</h2>
        <div>loading...</div>
      </div>
    )
  }

  const authors = results.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
