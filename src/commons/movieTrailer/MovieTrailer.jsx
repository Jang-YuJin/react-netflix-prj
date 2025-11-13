import React from 'react'
import Modal from 'react-bootstrap/Modal';
import YouTube from 'react-youtube';
import { useTrailerMovie } from '../../hooks/useMovies';
import './MovieTrailer.style.css'

const MovieTrailer = ({id, showTrailer, handleTrailerClose}) => {
  const {data} = useTrailerMovie(id);
  const trailer = data?.results?.find((item) => {
    return item.type === 'Trailer';
  });
  const opts = {
    height: '390',
    width: '640',
    playerVars: {autoplay: 0}
  }

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
        {!trailer ? '예고편 정보가 없습니다.' : <YouTube videoId={trailer.key} opts={opts} onReady={(e) => _onReady(e)} className="youtube-video"></YouTube>}
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default MovieTrailer
