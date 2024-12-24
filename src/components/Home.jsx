import React from 'react'
import Articles from './Articles'
import { Link, Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className='flex mb-10 gap-5 text-red-500 underline'>
        <Link to={"/"}>Post</Link>
        <Link to={"blog"}>Blog</Link>
      </div>
      <Outlet/>
      <Articles/>
    </div>
  )
}

export default Home