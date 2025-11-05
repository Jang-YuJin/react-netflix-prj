import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/useMovies'
import MovieSlide from '../../../../commons/movieSlide/MovieSlide';
import { responsive } from '../../../../constants/responsive';

const PopularMovieSlide = () => {
  const {data} = usePopularMoviesQuery();

  return (
    <div>
      <MovieSlide movies={data.results} title={'Popular Movies'} responsive={responsive}></MovieSlide>
    </div>
  )
}

export default PopularMovieSlide
