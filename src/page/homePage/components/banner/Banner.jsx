import React, { useEffect, useState } from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/useMovies'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import './Banner.style.css'
import Button from 'react-bootstrap/Button';
import MovieTrailer from '../../../../commons/movieTrailer/MovieTrailer';

const Banner = () => {
  const {data, error} = usePopularMoviesQuery();
  const [bannerMovies, setBannerMovies] = useState();
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState('');

   const handleTrailerClose = () => {
    setSelectedMovie('');
    setShowTrailer(false);
   }
 
   const handleTrailerShow = (id) => {
    setSelectedMovie(id);
    setShowTrailer(true);
   }

  useEffect(() => {
    setBannerMovies(data?.results.slice(0, 5));
  }, [])
  
  return (
    <div>
    <Swiper
      modules={[Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      scrollbar={{ draggable: true }}
      autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
      className='banner-container'
    >
      {bannerMovies?.map((movie, index) => 
      <div>
        <SwiperSlide key={index} style={{
            backgroundImage: !movie.poster_path ? 'url(./no_img.png)' : `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${movie.poster_path})`
        }} className='banner-img'>
            <div className='banner-text-container'>
                <h1>{movie.title}</h1>
                <p>{movie.overview}</p>
                <div>
                <Button className='btn-play' size='lg' onClick={() => handleTrailerShow(movie.id)}>▶ 재생</Button>
                </div>
            </div>
        </SwiperSlide>
      </div>
      )}
    </Swiper>
    { selectedMovie !== '' && <MovieTrailer id={selectedMovie} showTrailer={showTrailer} handleTrailerClose={handleTrailerClose}></MovieTrailer>}
    </div>
  )
}

export default Banner
