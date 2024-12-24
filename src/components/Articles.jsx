import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArticleCard from './ArticleCard'
import { setArticles, setError, setLoading } from '../slices/articlesSlice'
import useFetch from '../hooks/useFetch'

const News = () => {
  const { data, loading, error } = useFetch("/api/articles/")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setError(error))
    dispatch(setLoading(loading))
    dispatch(setArticles(data))
  }, [data, loading, error])

  const { articles } = useSelector(state => state.articles)
  
  return (
    <div className='mt-5'>
      {loading ? <div className='text-4xl text-gray-400 text-center py-20'><i className='fa fa-circle-notch fa-spin'></i></div> : <div className='grid grid-cols-4 gap-4 container px-5'>
        {articles && articles.map(a => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>}
    </div>
  )
}

export default News