import React from 'react'
import { useTopRatedMoviesQuery } from '../../../../hooks/useMovies'
import MovieSlide from '../../../../commons/movieSlide/MovieSlide';
import { responsive } from '../../../../constants/responsive';

const TopRatedMovieSlide = () => {
  const {data} = useTopRatedMoviesQuery();

  return (
    <div>
      <MovieSlide movies={data.results} title={'Top Rated Movies'} responsive={responsive}></MovieSlide>
    </div>
  )
}

export default TopRatedMovieSlide
