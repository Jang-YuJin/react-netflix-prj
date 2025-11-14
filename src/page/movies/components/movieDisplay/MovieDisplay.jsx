import React, { useEffect } from 'react'
import MovieCard from '../../../../commons/movieCard/MovieCard'
import ReactPaginate from 'react-paginate';
import movieStore from '../../../../stores/movieStore';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './MovieDisplay.style.css'

const MovieDisplay = () => {
  const {movies, settingMovies, page, settingPage} = movieStore();
  const handlePageClick = ({selected}) => {
    settingPage(selected + 1);
  };
console.log(movies);
  return (
    <div>
        <Row>
          {movies?.total_results > 0 && <div className='mb-3 text-white-50'><span className='text-white'>{movies?.total_results > 10000 ? Number(10000).toLocaleString() : movies?.total_results.toLocaleString()}</span>개의 영화가 존재합니다.</div>}
          {movies?.total_results === 0 
            ? <div className='no-result'>검색 결과가 없습니다.</div> 
            : movies?.results?.map((movie, index) => 
            <Col key={index} lg={3} xs={12}>
              <MovieCard movie={movie}></MovieCard>
            </Col>)
          }
        </Row>
        {movies?.total_results > 0 &&
          <div className='page-container'>
              <ReactPaginate
              key={page}
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
    </div>
  )
}

export default MovieDisplay
