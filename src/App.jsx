import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ArticleDetails, Articles, Blog, CreateArticle, Home, Login, Navbar, Post, SignUp, UpdateArticle } from './components'
import { Route, Routes } from 'react-router-dom'
import { getUserAPI } from './service/api'
import { setIsAuthenticated, setUser } from './slices/authSlice'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const ls = localStorage.getItem("token")
    const getUserHandler = async (token) => {
      try {
        const res = await getUserAPI(token)
        dispatch(setUser(res))
        dispatch(setIsAuthenticated(true))
      } catch (error) {
        localStorage.removeItem("token")
      }
    }
    if (ls) {
      getUserHandler(ls)
    }
  }, [])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}>
          <Route index element={<Post />} />
          <Route path='blog' element={<Blog />} />
        </Route>
        <Route path='/articles' element={<Articles />} />
        <Route path='/articles/:id' element={<ArticleDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/create-article' element={<CreateArticle />} />
        <Route path='/update-article/:id' element={<UpdateArticle />} />
      </Routes>
    </div>
  )
}

export default App