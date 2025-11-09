import React, { Suspense, useEffect, useState } from 'react'
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
import { Button } from 'react-bootstrap';
import './MoviesPage.style.css'
import Form from 'react-bootstrap/Form';
import { useMoviesGenre } from '../../hooks/useGenres';
import ReactPaginate from 'react-paginate';

const MoviesPage = () => {
  const {reset} = useQueryErrorResetBoundary();

  const [query, setQuery] = useSearchParams();
  const [keyword, setKeyword] = useState();
  const [page, setPage] = useState(1);
  const [showSearch, setShowSearch] = useState(false);
  const [sort, setSort] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [rating, setRating] = useState(0);
  const {data: genres} = useMoviesGenre();
  const rate = [2,4,6,8,10];
  const sortObj = [{name: '제목', value: 'original_title.asc'}
    ,{name: '인기도', value: 'popularity.desc'}
    ,{name: '수익', value: 'revenue.desc'}
    ,{name: '상영일', value: 'primary_release_date.asc'}
    ,{name: '평점', value: 'vote_average.asc'}
    ,{name: '투표수', value: 'vote_count.asc'}
  ];
  const {data: movies} = useSearchMovie(keyword, sort, startDate, endDate, rating, selectedGenres, page);

  const handlePageClick = ({selected}) => {
    setPage(selected + 1);
  };

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  useEffect(() => {
    setPage(1);
    setSort('');
    setStartDate('');
    setEndDate('');
    setSelectedGenres([]);
    setRating(0)
    setKeyword(query.get('keyword'));
  }, [query]);

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={Error}>
      <Suspense fallback={<Loading></Loading>}>
        <Container>
          <Row>
            <Button className='search-toggle-button d-lg-none' size='sm' onClick={() => setShowSearch(true)}>
              검색 조건 펼치기
            </Button>
            <Col lg={3} xs={12} className={`search-container ${showSearch ? 'show' : ''}`}>
              <div className='search-header d-flex justify-content-between align-items-center'>
                <h5>검색 조건</h5>
                <Button size='sm' className='close-button d-lg-none' onClick={() => setShowSearch(false)}>
                  X
                </Button>
              </div>

              <div className='search-section'>
                <div className='search-section-text'>정렬</div>
                <Form.Select value={sort} className='dark' onChange={(e) => {setKeyword(); setPage(1); setSort(e.target.value);}}>
                  <option value="">선택</option>
                  {sortObj.map((item) => 
                    <option value={item.value}>{item.name}</option>
                  )}
                </Form.Select>
              </div>

              <div className="search-section">
                <div className='search-section-text'>개봉일</div>
                <div className="d-flex flex-column gap-2">
                  <Form.Control type="date" className='dark' value={startDate} onChange={(e) => {setKeyword(); setPage(1); setStartDate(e.target.value);}}/>
                    ~
                  <Form.Control type="date" className='dark' value={endDate} onChange={(e) => {setKeyword(); setPage(1); setEndDate(e.target.value);}}/>
                </div>
              </div>

              <div className="search-section">
                <div className='search-section-text'>장르</div>
                <div className="genre-container">
                  {genres?.genres.map((genre, index) => (
                    <Button key={index} variant={selectedGenres.includes(genre.id) ? "active" : ""} className={`genre-btn ${selectedGenres.includes(genre.id) ? 'active' : ''}`} value={genre.id} onClick={() => {setKeyword(); setPage(1); toggleGenre(genre.id);}}>
                      {genre.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="search-section">
                <div className='search-section-text'>평점</div>
                <div className="stars">
                  {rate.map((value) => (
                    <span key={value} className={`star ${rating >= value ? "active" : ""}`} onClick={() => {setKeyword(); setPage(1); handleStarClick(value);}}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </Col>
            <Col lg={9} xs={12}>
              <Row>
              {movies.results.length === 0 ? <div className='no-result'>검색 결과가 없습니다.</div> 
              : movies.results.map((movie, index) => 
                <Col key={index} lg={3} xs={12}>
                  <MovieCard movie={movie}></MovieCard>
                </Col>)
              }
              </Row>
              {movies.results.length === 0 ? ''
              :
              <div className='page-container'>
                <ReactPaginate
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={movies?.total_pages > 500 ? 500 : movies.total_pages}
                  previousLabel="<"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                  forcePage={page-1}
                ></ReactPaginate>
              </div>
              }
            </Col>
          </Row>
        </Container>
      </Suspense>
    </ErrorBoundary>
  )
}

export default MoviesPage
