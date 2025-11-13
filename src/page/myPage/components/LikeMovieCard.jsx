import React from 'react'
import './LikeMovieCard.style.css'
import movieStore from '../../../stores/movieStore'
import { useNavigate } from 'react-router';

const LikeMovieCard = ({movie}) => {
  const {likeMovie, editLikeMovie} = movieStore();
  const navigate = useNavigate();

  const handleDelete = (e, id) => {
    e.stopPropagation();
    let newList = likeMovie.filter((item) => 
        item.id !== id
    );
    
    editLikeMovie(newList);
  };

  const goToDetail = (id) => {
    navigate(`/movies/${id}`);
  }

  return (
    <div key={movie.id} className="like-movie-card" onClick={() => goToDetail(movie.id)}>
      <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`} alt={movie.title} className="like-movie-image" />
      <div className="like-movie-hover">
        <button
          className="like-delete-btn"
          onClick={(e) => handleDelete(e, movie.id)}>
          삭제
        </button>
      </div>
      <p className="like-movie-title">{movie.title}</p>
    </div>
  )
}

export default LikeMovieCard
