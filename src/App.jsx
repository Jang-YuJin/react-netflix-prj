import './App.css'
import { Route, Routes } from 'react-router'
import AppLayout from './layout/AppLayout'
import HomePage from './page/homePage/HomePage'
import MoviesPage from './page/movies/MoviesPage'
import MovieDetailPage from './page/movieDetail/MovieDetailPage'
import NotFoundPage from './page/notFoundPage/NotFoundPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Analytics } from '@vercel/analytics/react';

function App() {

  return (
    <>
      <Analytics></Analytics>
      <Routes>
        <Route path='/' element={<AppLayout></AppLayout>}>
          <Route index element={<HomePage></HomePage>}></Route>
          <Route path='movies'>
            <Route index element={<MoviesPage></MoviesPage>}></Route>
            <Route path=':id' element={<MovieDetailPage></MovieDetailPage>}></Route>
          </Route>
          <Route path='*' element={<NotFoundPage></NotFoundPage>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
