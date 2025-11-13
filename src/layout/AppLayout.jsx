import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './AppLayout.style.css'
import authenticateStore from '../stores/authenticateStore';
import { Link } from 'react-router-dom';
import movieStore from '../stores/movieStore';

const AppLayout = () => {
  const [keyword, setKeyword] = useState('');
  const {authenticate, user, logout} = authenticateStore();
  const {editLikeMovie} = movieStore();
  const navigate = useNavigate();

  const searchMovie = () => {
    navigate(`/movies?keyword=${keyword}`);
    setKeyword('');
  };

  const searchMovieKeyDown = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      navigate(`/movies?keyword=${keyword}`);
      setKeyword('');
    }
  };

  const goToLogin = () => {
    if(!authenticate){
      navigate('/login');
    }else{
      editLikeMovie([]);
      logout();
    }
  1};

  const goToMyPage = () => {
    navigate('/mypage');
  };

  return (
    <div>
      <Navbar expand="lg" className="navbar-dark bg-black">
        <Container fluid>
          <Navbar.Brand as={Link} to="/"><img src={'./Netflix_Logo.png'} className='logo-img'></img></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/">홈으로</Nav.Link>
              <Nav.Link as={Link} to="/movies">영화탐색</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="영화를 검색하세요."
                className="me-2 bg-dark"
                aria-label="Search"
                data-bs-theme="dark"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => searchMovieKeyDown(e)}
              />
              <Button className='search-btn' variant="outline-danger" onClick={searchMovie}>검색</Button>
            </Form>
            {authenticate 
            && 
            <Nav className="ms-lg-3 my-lg-0 my-2">
              <Button variant="danger" onClick={goToMyPage} className='user-btn'>{user.id}</Button>
            </Nav>
            }
            <Nav className="ms-lg-2 my-lg-0 my-2">
              <Button variant="outline-danger" onClick={goToLogin}>{authenticate ? '로그아웃' : '로그인'}</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet></Outlet>
    </div>
  )
}

export default AppLayout
