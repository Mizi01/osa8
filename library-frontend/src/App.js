import { useApolloClient, useQuery, useLazyQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import AuthorBorn from './components/AuthorBorn'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import { USER } from './queries'

const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [user, results] = useLazyQuery(USER, {
    nextFetchPolicy: "network-only"
  })
  
  console.log(token)
  console.log(results)

  const logout = () => {
    setToken(null)
    setPage("login")
    localStorage.clear()
    client.resetStore()
    console.log(token)
    console.log(localStorage)
  }

  useEffect(() => {
    if (!token) {
      const userToken = localStorage.getItem('book-user-token')
      if (userToken) {
        setToken(userToken) 
      }
    }

    if(!results.data) {
    user()
    console.log("user triggered but different")
    console.log(results)
    }
    
  }, [token]) // eslint-disable-line

  if (user.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {(token) ? (
        <>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <button onClick={() => setPage('add')}>add book</button>
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

      {(page==='recommended') ? (
      <Recommended show={page === 'recommended'} user={results.data.me} getUser={user} />
      ):(<></>)}
    </div>
  )
}

export default App
