import React from 'react'
import './NotFoundPage.style.css'

const NotFoundPage = () => {
  return (
    <div className='not-found'>
      <h2>404</h2>
      <p>요청하신 페이지를 찾을 수 없습니다.</p>
      <a href="/">홈으로 돌아가기</a>
    </div>
  )
}

export default NotFoundPage
