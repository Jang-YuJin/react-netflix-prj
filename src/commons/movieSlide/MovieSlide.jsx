import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './MovieSlide.style.css'
import MovieCard from '../movieCard/MovieCard';

const MovieSlide = ({ movies, title, responsive }) => {


    return (
        <div className='movie-slide-container'>
            <h3 className='movie-slide-title'>{title}</h3>
            <Carousel
                swipeable={false}
                draggable={false}
                showDots={true}
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={5000}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {movies?.map((movie) => 
                <MovieCard movie={movie}></MovieCard>)}
            </Carousel>
        </div>
    )
}

export default MovieSlide
