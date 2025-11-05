import React from 'react'
import { useUpcomingMoviesQuery } from '../../../../hooks/useMovies'
import MovieSlide from '../../../../commons/movieSlide/MovieSlide';
import { responsive } from '../../../../constants/responsive';

const UpcomingMovieSlide = () => {
  const {data} = useUpcomingMoviesQuery();

  return (
    <div>
      <MovieSlide movies={data.results} title={'Upcoming Movies'} responsive={responsive}></MovieSlide>
    </div>
  )
}

export default UpcomingMovieSlide
