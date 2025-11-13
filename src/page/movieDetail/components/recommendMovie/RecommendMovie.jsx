import React from 'react'
import MovieSlide from '../../../../commons/movieSlide/MovieSlide'
import { useRecommendMovie } from '../../../../hooks/useMovies'
import { responsive } from '../../../../constants/responsive';

const RecommendMovie = ({id}) => {
  const {data:movie} = useRecommendMovie(id);

  return (
    <div>
      {movie.results.length === 0 ? '' : <MovieSlide movies={movie.results} title={'추천 영화'} responsive={responsive}></MovieSlide>}
    </div>
  )
}

export default RecommendMovie
