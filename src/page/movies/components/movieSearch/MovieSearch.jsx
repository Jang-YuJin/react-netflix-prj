import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useMoviesGenre } from '../../../../hooks/useGenres';
import { useSearchParams } from 'react-router';
import { useSearchMovie } from '../../../../hooks/useMovies'
import movieStore from '../../../../stores/movieStore';
import './MovieSearch.style.css'

const MovieSearch = ({showSearch, setShowSearch}) => {
  const [query, setQuery] = useSearchParams();
  const [keyword, setKeyword] = useState();
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
  const {movies, settingMovies, page, settingPage} = movieStore();
  const {data: moviesData} = useSearchMovie(keyword, sort, startDate, endDate, rating, selectedGenres, page);

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
    settingPage(1);
    setSort('');
    setStartDate('');
    setEndDate('');
    setSelectedGenres([]);
    setRating(0)
    setKeyword(query.get('keyword'));
  }, [query]);

  useEffect(() => {
    if(moviesData){
        settingMovies(moviesData);
    }
  }, [moviesData, settingMovies]);

  return (
    <div className={`search-container ${showSearch ? 'show' : ''}`}>
      <div className='search-header d-flex justify-content-between align-items-center'>
        <h5>검색 조건</h5>
        <Button size='sm' className='close-button d-lg-none' onClick={() => setShowSearch(false)}>
          X
        </Button>
      </div>

      <div className='search-section'>
        <div className='search-section-text'>정렬</div>
        <Form.Select value={sort} className='dark' onChange={(e) => {setKeyword(); settingPage(1); setSort(e.target.value);}}>
          <option value="">선택</option>
          {sortObj.map((item) => 
            <option value={item.value}>{item.name}</option>
          )}
        </Form.Select>
      </div>

      <div className="search-section">
        <div className='search-section-text'>개봉일</div>
        <div className="d-flex flex-column gap-2">
          <Form.Control type="date" className='dark' value={startDate} onChange={(e) => {setKeyword(); settingPage(1); setStartDate(e.target.value);}}/>
            ~
          <Form.Control type="date" className='dark' value={endDate} onChange={(e) => {setKeyword(); settingPage(1); setEndDate(e.target.value);}}/>
        </div>
      </div>

      <div className="search-section">
        <div className='search-section-text'>장르</div>
        <div className="genre-container">
          {genres?.genres.map((genre, index) => (
            <Button key={index} variant={selectedGenres.includes(genre.id) ? "active" : ""} className={`genre-btn ${selectedGenres.includes(genre.id) ? 'active' : ''}`} value={genre.id} onClick={() => {setKeyword(); settingPage(1); toggleGenre(genre.id);}}>
              {genre.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="search-section">
        <div className='search-section-text'>평점</div>
        <div className="stars">
          {rate.map((value) => (
            <span key={value} className={`star ${rating >= value ? "active" : ""}`} onClick={() => {setKeyword(); settingPage(1); handleStarClick(value);}}>
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieSearch
