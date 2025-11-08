import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/useMovies'
import MovieSlide from '../../../../commons/movieSlide/MovieSlide';
import { responsive } from '../../../../constants/responsive';

const PopularMovieSlide = () => {
  const {data} = usePopularMoviesQuery();

  return (
    <div>
      <MovieSlide movies={data.results} title={'인기 영화'} responsive={responsive}></MovieSlide>
    </div>
  )
}

export default PopularMovieSlide
