import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from "../hooks/useFetch"
import { useSelector } from 'react-redux'
import { deleteArticleAPI } from '../service/api'
import { Button } from '@mui/material'
import { ArrowBackIos, ArrowLeft, BackHand, Delete } from '@mui/icons-material'

const ArticleDetails = () => {
  const { id } = useParams()
  const { data, loading, error } = useFetch(`/api/article/${id}/`)
  const { user } = useSelector(state => state.auth)
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const deleteHandler = async () => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        await deleteArticleAPI(id, token)
        navigate("/")
      } catch (error) {
      }
    }
  }
  return (
    <div className='container px-5 py-10'>
      {loading ? <div className='py-20 text-center text-5xl text-gray-400'><i className='fa fa-circle-notch fa-spin'></i></div> :
        <div className='max-w-[700px] mx-auto'>
          <h2 className='text-2xl font-bold mb-7'>{data.title}</h2>
          <div className='w-full'>
            <img className='w-full object-contain max-h-[400px]' src={data.image ? `https://mustafocoder.pythonanywhere.com/api${data.image}` : "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500"} alt={data.title} />
          </div>
          <p className='mt-7'>
            {data.content}
          </p>
          {user?.username == data?.author && <div className="space-x-2 mt-10">
            <button onClick={() => navigate(`/update-article/${data.id}`)} className="px-3 py-1.5 rounded hover:bg-blue-700 bg-blue-600 text-white">
              <i className="fa fa-pencil"></i>
            </button>
            <button onClick={() => setOpen(true)} className="px-3 py-1.5 rounded hover:bg-red-700 bg-red-500 text-white">
              <i className="fa fa-trash"></i>
            </button>
          </div>}
        </div>}
      {open && <div className='fixed w-full top-0 start-0 h-full bg-black bg-opacity-75 flex justify-center items-center'>
        <div className='p-5 bg-white'>
          <h3>Siz ushbu articleni o'chirmoqchimisz?</h3>
          <div className='flex mt-5 gap-2'>
            <Button variant='outlined' onClick={() => setOpen(false)} color='primary' startIcon={<ArrowBackIos />}>
              Back
            </Button>
            <Button onClick={deleteHandler} variant='contained' color='error' startIcon={<Delete />}>
              Delete
            </Button>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default ArticleDetails