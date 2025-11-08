import React, { Suspense, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import Error from '../../commons/error/Error';
import Loading from '../../commons/loading/Loading';
import { useSearchParams } from 'react-router';
import { useSearchMovie } from '../../hooks/useMovies'
import MovieCard from '../../commons/movieCard/MovieCard'

const MoviesPage = () => {
  const {reset} = useQueryErrorResetBoundary();

  const [query, setQuery] = useSearchParams();
  const keyword = query.get('keyword');
  const [page, setPage] = useState(1);
  const {data} = useSearchMovie(keyword, page);
  console.log(data)

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={Error}>
      <Suspense fallback={<Loading></Loading>}>
        <Container>
          <Row>
            <Col lg={4} xs={12}></Col>
            <Col lg={8} xs={12}>
              <Row>
              {data?.results.map((movie, index) => 
                <Col key={index} lg={3} xs={12}>
                  <MovieCard movie={movie}></MovieCard>
                </Col>
              )}
              </Row>
              페이징
            </Col>
          </Row>
        </Container>
      </Suspense>
    </ErrorBoundary>
  )
}

export default MoviesPage
