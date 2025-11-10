import React from 'react'
import { useParams } from 'react-router'

const MovieDetailPage = () => {
  const params = useParams();
  console.log(params);

  return (
    <div>
      Movie Detail
    </div>
  )
}

export default MovieDetailPage
