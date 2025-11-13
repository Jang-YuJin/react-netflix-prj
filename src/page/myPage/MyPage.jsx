import React from 'react'
import './MyPage.style.css'
import authenticateStore from '../../stores/authenticateStore'
import movieStore from '../../stores/movieStore';
import LikeMovieCard from './components/LikeMovieCard';
import { Col, Container, Row } from 'react-bootstrap';

const MyPage = () => {
  const {user} = authenticateStore();
  const {likeMovie, editLikeMovie} = movieStore();

  return (
    <div className="mypage-container">
      <h2 className="mypage-greeting">{user?.id || '사용자'}님 안녕하세요!</h2>
      <h3 className="mypage-subtitle">추가한 영화 목록</h3>

      <Container>
        <Row>
            {likeMovie.length > 0
            ? likeMovie.map(movie => 
                <Col lg={2} xs={12} className='d-flex justify-content-center my-2'>
                    <LikeMovieCard movie={movie}></LikeMovieCard>
                </Col>
            )
            : <p className="empty-text">추가한 영화가 없습니다.</p>}
        </Row>
      </Container>
    </div>
  )
}

export default MyPage
