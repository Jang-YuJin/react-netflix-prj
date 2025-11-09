import React from 'react'
import './MovieCard.style.css'
import { useMoviesGenre } from '../../hooks/useGenres'

const MovieCard = ({movie}) => {
    const {data} = useMoviesGenre();
    const showGenreName = (idList) => {
      if(!idList) return [];

      const genreNameList = idList.map((id) => {
        const genre = data.genres.find((item) => item.id === id);
        return genre.name;
      });

      return genreNameList;
    };

    return (
    <div className="movie-card">
      <img
        src={!movie.poster_path ? '/no_img.png' : `https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`}
        alt={movie.title}
        className="image"
      />
      <div className="movie-info">
        <h3 className="title">{movie.title}</h3>
        <div className="genre-container">
          {showGenreName(movie.genre_ids).map((genre) => 
            <span>{genre}</span>
            )}
        </div>
        <div>
          {movie.adult ? <span>🔞</span> : ''}
          <span>⭐{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
