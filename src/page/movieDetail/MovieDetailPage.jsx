import React, { Suspense, useEffect } from 'react'
import { useParams } from 'react-router'
import './MovieDetailPage.style.css'
import Loading from '../../commons/loading/Loading'
import { ErrorBoundary } from 'react-error-boundary'
import Error from '../../commons/error/Error'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import MovieInfo from './components/movieInfo/MovieInfo';
import Review from './components/review/Review'
import RecommendMovie from './components/recommendMovie/RecommendMovie'

const MovieDetailPage = () => {
  const {reset} = useQueryErrorResetBoundary();
  const params = useParams();

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={Error}>
    <Suspense fallback={<Loading></Loading>}>
    <div className="detail-wrap">
      <MovieInfo id={params.id}></MovieInfo>

      <Review id={params.id}></Review>

      <section className="recommended-section">
        <RecommendMovie id={params.id}></RecommendMovie>
      </section>
    </div>
    </Suspense>
    </ErrorBoundary>
  )
}

export default MovieDetailPage
