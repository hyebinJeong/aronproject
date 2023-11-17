/* 헤더 컴포넌트 정의 
: 로그인한 사용자 정보 보여주고, 로그아웃 기능 제공
*/
import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../components/Header.css";
import aronWhite from "../image/aronWhite.png";
import iconLogout from "../image/iconLogout.svg"
import UserContext from '../contexts/UserContext';  // UserContext import

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  // 로그아웃까지 남은 시간을 초 단위로 저장 (초기값은 60분)
  const [time, setTime] = useState(60 * 60);
  const navigate = useNavigate();

  // 1초마다 남은 시간 감소 
  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);

    // 컴포넌트 언마운트 시 타이머 제거
    return () => {
      clearInterval(timerId) 
    }
  }, []);

  // 초 단위 시간을 mm:ss형식의 문자열로 변환
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    // minutes가 10보다 작으면 앞에 0을 붙여서 '01', '02' 이런식으로 표기, 10보다 크면 그대로 표기
    // seconds도 마찬가지
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

 // 컴포넌트 마운트될 때 localStorage에서 
 // 사용자 정보와 로그인 시간 가져와서 UserContext와 time 상태 업데이트
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const loginTime = localStorage.getItem('loginTime');
    if (savedUser && loginTime) {
      const currentTime = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)
      const elapsedTime = currentTime - loginTime; // 로그인 후 경과 시간 (초 단위)
      const remainingTime = 60 * 60 - elapsedTime; // 남은 시간 (초 단위)
      setUser(JSON.parse(savedUser));
      setTime(remainingTime > 0 ? remainingTime : 0); // 남은 시간이 0보다 작으면 0으로 설정
    }
  }, []);

  // 로그아웃 요청 후 처리하는 로직
  const logout = async () => {
    try {
      const response = await axios.post('http://localhost:3001/user/logout', {}, { withCredentials: true });
      if (response.data.msg === 'success') {
        alert('로그아웃 되었습니다');
        localStorage.removeItem('user');
        document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        navigate('/login');
        // 현재 페이지를 히스토리 스택에 추가
      window.history.pushState(null, document.title, window.location.href);
      } else {
        throw new Error('로그아웃 요청 실패');
      }
    } catch (error) {
      console.error('로그아웃 오류:', error);
      alert('로그아웃 실패: ' + error.message);
    }
  };

  // 시간이 다 되면 로그아웃 실행되는 로직
  useEffect(() => {
    if (time === 0) {
      // time 상태가 0 이되면 로그아웃 처리되는 로직 작성하기
      alert('로그아웃 되었습니다');
      navigate('/login')
    }
  }, [time]);

  /// 로그아웃 버튼 클릭 시 실행되는 로직
  const onClickLogout = () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
    logout();
  }

  return (
    <div className="header-page">
      <div className="header-content">
        <Link to = '/main1'>
          <img src={aronWhite} alt="로고" className="header-logo" />
        </Link>
        <ul>
          <li>
          {user ? <span>담당{user.job === 0 ? '의사' : '간호사'} [{user.name}]</span> : <span>로그인 정보가 없습니다</span>}
        </li>
        <li>
          <span className="login-time">{formatTime(time)}</span>
        </li>
        <li>
          <div className="logout-wrapper" onClick={onClickLogout}>
            {/* <span className="logout-content" onClick={onClickalertLogout}>로그아웃</span> */}
            <span className="logout-content">로그아웃</span>
            <button className="icon-logout-wrap"><img src={iconLogout} className="icon-logout" alt="로그아웃 아이콘" /></button>
          </div>
        </li>
      </ul>
    </div>
  </div>
);
};

export default Header;