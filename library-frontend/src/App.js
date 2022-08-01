import { useApolloClient } from '@apollo/client'
import { useState } from 'react'
import AuthorBorn from './components/AuthorBorn'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'

const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  console.log(token)
  console.log(page)

  const logout = () => {
    setToken(null)
    setPage("login")
    localStorage.clear()
    client.resetStore()
    console.log(token)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {(token) ? (
        <><button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('born')}>set author</button>
        </>) : (<></>)}
        {(!token) ? (
        <button onClick={() => setPage('login')}>login</button>
        ) : (<button onClick={() => logout()}>logout</button>)}
      </div>
      {(page==='login') ? (
      <LoginForm setToken={setToken} setPage={setPage} />
      ):(<></>)}

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <AuthorBorn show={page === 'born'} />
      
    </div>
  )
}

export default App
