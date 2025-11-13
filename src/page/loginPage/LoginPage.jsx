import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './LoginPage.style.css'
import authenticateStore from '../../stores/authenticateStore';

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const {authenticate, settingUser, login} = authenticateStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const loginUser = (e) => {
    e.preventDefault();
    if(id === ''){
      alert('아이디를 입력해주세요!');
      return false;
    }
    if(password === ''){
      alert('비밀번호를 입력해주세요!');
      return false;
    }
    settingUser(id, password);
    login();

    navigate(from);
  };

  return (
    <div className='login-form-container'>
      <form onSubmit={(event) => loginUser(event)}>
        <div className='id-container'><input className='id-input' type='text' id='id' placeholder='아이디' value={id} onChange={(e) => setId(e.target.value)}></input></div>
        <div className='password-container'><input className='password-input' type='password' id='password' placeholder='비밀번호' value={password} onChange={(e) => setPassword(e.target.value)}></input></div>
        <div className='login-btn-container'>
          <button className='login-btn' type='submit'>로그인</button>
        </div>
      </form>
      <div className='find-login-info-container'>
        <div className='signup'>회원가입</div>
        <div className='search-id'>아이디 찾기</div>
        <div className='search-password'>비밀번호 찾기</div>
      </div>
    </div>
  )
}

export default LoginPage
