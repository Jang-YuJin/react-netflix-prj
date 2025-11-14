import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { useTrailerMovie } from '../../hooks/useMovies';
import './MovieTrailer.style.css'

const MovieTrailer = ({id, showTrailer, handleTrailerClose}) => {
  const {data} = useTrailerMovie(id);
  console.log(data);
  const trailer = data?.results?.find((item) => {
    return item.type === 'Trailer';
  });

  const _onReady = (e) => {
    e.target.pauseVideo();
  };

  return (
    <Modal show={showTrailer} onHide={handleTrailerClose} centered size='lg' data-bs-theme="dark">
      <Modal.Header closeButton>
        예고편
      </Modal.Header>
      <Modal.Body className='d-flex justify-content-center'>
        <div className="video-wrapper">
        {!trailer ? '예고편 정보가 없습니다.' : <iframe src={`https://www.youtube.com/embed/${trailer.key}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>}
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default MovieTrailer
