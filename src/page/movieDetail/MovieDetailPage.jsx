import React from 'react'
import { useParams } from 'react-router'
import './MovieDetailPage.style.css'
import { useGetMovie } from '../../hooks/useMovies';
import { useGetCast } from '../../hooks/useCast';
import CastSlide from './components/CastSlide';

const MovieDetailPage = () => {
  const params = useParams();
  const id = params.id;
  const {data:movie} = useGetMovie(id);
  const {data:cast} = useGetCast(id);
  console.log('이건 무비정보: ', movie);
  console.log('이건 캐스트정보: ', cast);

  const formatTenThousand = (num) => {
    return Math.floor(num / 10000);
  };

  return (
    <div className="detail-wrap">
      <div className="detail-card">
        <aside className="detail-poster">
          <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`} alt={movie.title} className="poster-img" />
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
              <div className="meta-item"><strong>예산</strong><span>{formatTenThousand(movie.budget).toLocaleString()} 만 원</span></div>
              <div className="meta-item"><strong>런타임</strong><span>{movie.runtime}분</span></div>
            </div>
            <div className="action-row">
              <button className="btn-play">▶ 예고편 재생</button>
              <button className="btn-add">＋ 내 목록에 추가</button>
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
      </div>

      <section className="reviews-block">
        <div className="reviews-header">
          <h3>리뷰</h3>
          <div className="reviews-meta">N개의 리뷰</div>
        </div>

        <div className="reviews-list">

          <article className="review-card">
            <div className='review-text'>
              리뷰 내용
            </div>
              <button className="btn-more">
                접기
              </button>
            <div className="review-author">— 익명</div>
          </article>
        </div>

        <div className="reviews-pager">
          페이징
        </div>
      </section>

      <section className="recommended-section">
        <div className="section-header">
          <h3>추천 영화</h3>
        </div>

        <div className="rec-track">
          무비카드 넣을 곳
        </div>
      </section>


    </div>
  )
}

export default MovieDetailPage
