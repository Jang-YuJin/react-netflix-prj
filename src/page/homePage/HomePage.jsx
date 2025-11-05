import React, { Suspense } from 'react'
import Loading from '../../commons/loading/Loading'
import { ErrorBoundary } from 'react-error-boundary'
import Error from '../../commons/error/Error'
import Banner from './components/banner/Banner'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import PopularMovieSlide from './components/popularMovieSlide/PopularMovieSlide'
import TopRatedMovieSlide from './components/topRatedMovieSlide/TopRatedMovieSlide'
import UpcomingMovieSlide from './components/upcomingMovieSlide/UpcomingMovieSlide'


const HomePage = () => {
  const {reset} = useQueryErrorResetBoundary();

  return (
    <div>
      <ErrorBoundary onReset={reset} FallbackComponent={Error}>
      <Suspense fallback={<Loading></Loading>}>
        <Banner></Banner>
        <PopularMovieSlide></PopularMovieSlide>
        <TopRatedMovieSlide></TopRatedMovieSlide>
        <UpcomingMovieSlide></UpcomingMovieSlide>
      </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default HomePage
