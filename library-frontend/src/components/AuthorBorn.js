import { useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const AuthorBorn = (props) => {
  const results = useQuery(ALL_AUTHORS)
  const [selected, setSelected] = useState('')
  const [year, setYear] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  
  if (!props.show) {
    return null
  }

  if(results.loading) {
    return (
      <div>
        <h2>authors list</h2>
        <div>loading...</div>
      </div>
    )
  }

  const authors = results.data.allAuthors
  const handleSelect = (event) => {
    setSelected(event.target.value)
    console.log(selected)
  }

  const setAuthorBorn = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name: selected, setBornTo: Number(year) }})
    setSelected('')
    setYear('')
  }

  const handleYear = (event) => {
    setYear(event.target.value)
  }

  return (
    <div>
      <h2>authors list</h2>
      <form onSubmit={setAuthorBorn}>
      <select value={selected} onChange={handleSelect}>
        <option> </option>
          {authors.map((a) => (
            <option key={a.name}>
              {a.name}
            </option>
          ))}
          </select>
          <div>born <input value={year} onChange={handleYear}/></div>
          <button type="submit">set authorn born</button>
          <div>{selected}</div>
          </form>
    </div>
  )
}

export default AuthorBorn