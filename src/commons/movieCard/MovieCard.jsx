import React from 'react'
import './MovieCard.style.css'

const MovieCard = ({movie}) => {

    return (
    <div className="movie-card">
      <img
        src={`https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`}
        alt={movie.title}
        className="image"
      />
      <div className="overlay">
        <h3 className="title">{movie.title}</h3>
        <div className="genre-container">
          {movie.genre_ids.map((genre) => 
            <span>{genre}</span>)}
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
