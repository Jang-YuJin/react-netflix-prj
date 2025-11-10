import React, { Suspense, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import Error from '../../commons/error/Error';
import Loading from '../../commons/loading/Loading';
import { Button } from 'react-bootstrap';
import './MoviesPage.style.css'
import MovieSearch from './components/movieSearch/MovieSearch';
import MovieDisplay from './components/movieDisplay/MovieDisplay';

const MoviesPage = () => {
  const {reset} = useQueryErrorResetBoundary();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={Error}>
      <Suspense fallback={<Loading></Loading>}>
        <Container>
          <Row>
            <Button className='search-toggle-button d-lg-none' size='sm' onClick={() => setShowSearch(true)}>
              검색 조건 펼치기
            </Button>
            <Col lg={3} xs={12}>
              <MovieSearch showSearch={showSearch} setShowSearch={setShowSearch}></MovieSearch>
            </Col>
            <Col lg={9} xs={12}>
              <MovieDisplay></MovieDisplay>
            </Col>
          </Row>
        </Container>
      </Suspense>
    </ErrorBoundary>
  )
}

export default MoviesPage
