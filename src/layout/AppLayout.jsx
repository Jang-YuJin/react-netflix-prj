import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './AppLayout.style.css'

const AppLayout = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const searchMovie = () => {
    console.log('!!!');
    navigate(`/movies?keyword=${keyword}`);
    setKeyword('');
  };

  return (
    <div>
      <Navbar expand="lg" className="navbar-dark bg-black">
        <Container fluid>
          <Navbar.Brand href="/"><img src={'./Netflix_Logo.png'} className='logo-img'></img></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/">홈으로</Nav.Link>
              <Nav.Link href="/movies">영화</Nav.Link>
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
              />
              <Button className='search-btn' variant="outline-danger" onClick={searchMovie}>검색</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet></Outlet>
    </div>
  )
}

export default AppLayout
