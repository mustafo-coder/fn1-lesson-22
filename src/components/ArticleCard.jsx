import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

const NewsCard = ({ article }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 220 }}
        image={article.image ? `https://mustafocoder.pythonanywhere.com/api${article.image}` : "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500"}
        title={article.title}
      />
      <CardContent>
        <Typography className='line-clamp-2' gutterBottom variant="h5" component="div">
          {article.title}
        </Typography>
        <Typography className='line-clamp-4' variant="body2" sx={{ color: 'text.secondary' }}>
          {article.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button href={`/articles/${article.id}`} size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default NewsCard