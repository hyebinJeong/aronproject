/* 앱의 메인 라우팅 처리
(사용자가 어떤 URL 방문했을 때 어떤 화면 보여줄지 결정하는 역할) 
사용자 로그인 상태 체크 로직 추가
*/

// React 라이브러리와 React의 상태 관리 함수인 useState, 
// 라이프사이클을 관리하는 useEffect 훅을 임포트
import React, { useState, useEffect } from 'react';
// HTTP 요청을 보내기 위한 axios 라이브러리를 임포트
import axios from 'axios';
// UserContext를 임포트. \
// 이 컴포넌트는 사용자의 로그인 정보를 저장하고 이를 하위 컴포넌트에 전달하는 역할
import UserContext from './contexts/UserContext';
import SepsisScoreContext from './contexts/SepsisScoreContext.jsx';
import './App.css';
// 로그인 컴포넌트를 임포트
import Login from './components/Login';
// 헤더 컴포넌트를 임포트
import Header from './components/Header';
// Main01 페이지 컴포넌트를 임포트
import Main01 from './pages/Main01.jsx'
// 라우팅을 위한 BrowserRouter, Routes, Route 컴포넌트를 임포트
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Detailpage 페이지 컴포넌트를 임포트
import Detailpage from './pages/Detailpage.jsx';
// 각각의 그래프와 상세 페이지 컴포넌트를 임포트
import GraphLine from './components/GraphLine.jsx';
import GraphLineOne from './components/GraphLineOne.jsx';
import GraphBar from './components/GraphBar.jsx';
import GraphBarOne from './components/GraphBarOne.jsx';
import GraphLineTwo from './components/GraphLineTwo.jsx'
import GraphLineThree from './components/GraphLineThree.jsx';
import Main02Right from './components/Main02Right.jsx';
import GraphDetailO2Sat from './components/GraphDetailO2Sat.jsx';
import GraphDetailHR from './components/GraphDetailHR.jsx';
import GraphDetailTemp from './components/GraphDetailTemp.jsx';
import GraphDetailSBP from './components/GraphDetailSBP.jsx'
import GraphDetailMAP from './components/GraphDetailMAP.jsx';
import GraphDetailDBP from './components/GraphDetailDBP.jsx';
import GraphDetailResp from './components/GraphDetailResp.jsx';
import Adminpage from './pages/Adminpage.jsx';
import AdminScoreModal from './components/AdminScoreModal.jsx'
import AdminAddModal from './components/AdminAddModal.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [sepsisScore, setSepsisScore] = useState("");

  const auth = localStorage.getItem('user')
  // const auth = JSON.parse(localStorage.getItem("user")); 

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/check-login");
        if (response.data.loggedIn) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("로그인 상태 확인 실패", error);
      }
    };

    checkLoginStatus();
  }, []);

  console.log(auth);

  return (
    <SepsisScoreContext.Provider value={{ sepsisScore, setSepsisScore }}>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <div>
            {auth ? <Header></Header> : null}
            <Routes>
              <Route
                path="/graphline"
                element={<GraphLine></GraphLine>}
              ></Route>
              <Route
                path="/graphlineone"
                element={<GraphLineOne></GraphLineOne>}
              ></Route>
              <Route
                path="/graphlinetwo"
                element={<GraphLineTwo></GraphLineTwo>}
              ></Route>
              <Route
                path="/graphlinethree"
                element={<GraphLineThree></GraphLineThree>}
              ></Route>
              <Route path="/graphbar" element={<GraphBar></GraphBar>}></Route>
              <Route
                path="/graphbarone"
                element={<GraphBarOne></GraphBarOne>}
              ></Route>
              <Route path="/header" element={<Header></Header>}></Route>
              { auth ? <Route path='/' element={<Main01></Main01>}></Route>
              : <Route path='/' element={<Login></Login>}></Route>}
              <Route
                path="/detailpage"
                element={<Detailpage></Detailpage>}
              ></Route>
              <Route
                path="/main2right"
                element={<Main02Right></Main02Right>}
              ></Route>
              <Route
                path="/detailhr"
                element={<GraphDetailHR></GraphDetailHR>}
              ></Route>
              <Route
                path="/detailo2sat"
                element={<GraphDetailO2Sat></GraphDetailO2Sat>}
              ></Route>
              <Route
                path="/detailtemp"
                element={<GraphDetailTemp></GraphDetailTemp>}
              ></Route>
              <Route
                path="/detailmap"
                element={<GraphDetailMAP></GraphDetailMAP>}
              ></Route>
              <Route
                path="/detailsbp"
                element={<GraphDetailSBP></GraphDetailSBP>}
              ></Route>
              <Route
                path="/detaildbp"
                element={<GraphDetailDBP></GraphDetailDBP>}
              ></Route>
              <Route
                path="/detailresp"
                element={<GraphDetailResp></GraphDetailResp>}
              ></Route>
              <Route
                path="/adminpage"
                element={<Adminpage></Adminpage>}
              ></Route>
              <Route
                path="/adminscoremodal"
                element={<AdminScoreModal></AdminScoreModal>}
              ></Route>
              <Route
                path="/adminaddemodal"
                element={<AdminAddModal></AdminAddModal>}
              ></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </SepsisScoreContext.Provider>
  );
}

export default App;