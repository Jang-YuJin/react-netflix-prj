import React, { useEffect, useState } from 'react'
import './MovieInfo.style.css'
import CastSlide from '../../components/castSlide/CastSlide';
import { useGetMovie } from '../../../../hooks/useMovies';
import { useGetCast } from '../../../../hooks/useCast';
import MovieTrailer from '../../../../commons/movieTrailer/MovieTrailer';
import authenticateStore from '../../../../stores/authenticateStore';
import { useLocation, useNavigate } from 'react-router';
import movieStore from '../../../../stores/movieStore';

const MovieInfo = ({id}) => {
  const {data:movie} = useGetMovie(id);
  const {data:cast} = useGetCast(id);
  const [showTrailer, setShowTrailer] = useState(false);
  const {authenticate, user} = authenticateStore();
  const navigate = useNavigate();
  const location = useLocation();
  const {likeMovie, addLikeMovie} = movieStore();
  const [added, setAdded] = useState(false);

  const handleTrailerClose = () => {
    setShowTrailer(false);
  }

  const handleTrailerShow = () => {
    setShowTrailer(true);
  }

  const formatTenThousand = (num) => {
    let budget = '';
    if(num < 10000){
      budget = num + ' 원';
    } else{
      budget = Math.floor(num / 10000).toLocaleString() + ' 만 원';
    }
    return budget;
  };

  const addLikeMovies = (movie) => {
    if(authenticate){
      addLikeMovie(movie);
    }else{
      navigate('/login', { state: { from: location.pathname } });
    }
  }

  useEffect(() => {
    setAdded(false);
    likeMovie.map((item) => {
      if(item.id === movie.id){
        setAdded(true);
      }
    })
  }, [likeMovie, id]);

  return (
    <div className="detail-card">
      <aside className="detail-poster">
        <img src={!movie.poster_path ? '/no_img.png' : `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`} alt={movie.title} className="poster-img" />
      </aside>

      <section className="detail-main">
        <div className="detail-header">
          <h1 className="detail-title">{movie.title}</h1>
          <div className="meta">
            <div className="meta-item">
              <strong>장르</strong>
              {movie.genres.map((genre) => <span>{genre.name}</span>)}
            </div>
            <div className="meta-item"><strong>평점</strong><span>{movie.vote_average.toFixed(1)}</span></div>
            <div className="meta-item"><strong>개봉일</strong><span>{movie.release_date}</span></div>
            <div className="meta-item"><strong>예산</strong><span>{formatTenThousand(movie.budget)}</span></div>
            <div className="meta-item"><strong>런타임</strong><span>{movie.runtime}분</span></div>
          </div>
          <div className="action-row">
            <button className="btn-play" onClick={handleTrailerShow}>▶ 예고편 재생</button>
            {added
            ? <button className="btn-added" disabled>추가된 영화</button>
            : <button className="btn-add" onClick={() => addLikeMovies(movie)}>＋ 내 목록에 추가</button>}
          </div>
        </div>

        <div className="overview">
          <h3>줄거리</h3>
          <p className="overview-text">{movie.overview || '줄거리 정보가 없습니다.'}</p>
        </div>

        <div className="cast">
          <div className="cast-header">
            <h3>출연</h3>
          </div>
          <CastSlide cast={cast}></CastSlide>
        </div>
      </section>

      <MovieTrailer id={id} showTrailer={showTrailer} handleTrailerClose={handleTrailerClose}></MovieTrailer>
    </div>
  )
}

export default MovieInfo
