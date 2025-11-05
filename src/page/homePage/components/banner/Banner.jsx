import React, { useEffect, useState } from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/useMovies'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import './Banner.style.css'
import Button from 'react-bootstrap/Button';

const Banner = () => {
  const {data, error} = usePopularMoviesQuery();
  const [bannerMovies, setBannerMovies] = useState();

  useEffect(() => {
    setBannerMovies(data?.results.slice(0, 5));
  }, [])
  
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      scrollbar={{ draggable: true }}
      autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
    >
      {bannerMovies?.map((movie, index) => 
        <SwiperSlide key={index} style={{
            backgroundImage: 'url(' + `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${movie.poster_path}` + ')'
        }} className='banner-img'>
            <div className='banner-text-container'>
                <h1>{movie.title}</h1>
                <p>{movie.overview}</p>
                <div>
                <Button variant="danger" size='lg'>▶ Play</Button>{/* TODO: 재생기능 추가해야함 */}
                </div>
            </div>
        </SwiperSlide>)}
    </Swiper>
  )
}

export default Banner
