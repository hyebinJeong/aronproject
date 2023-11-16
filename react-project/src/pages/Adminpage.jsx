import React, { Component } from 'react'
import './Adminpage.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import iconSet from "../image/iconSet.svg"
import AdminScoreModal from '../components/AdminScoreModal';
// import './Paging.css';
import Pagination from "react-js-pagination";

const Adminpage = () => {

  const [scoreModal, setScoreModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const [addModal, setAddModal] = useState(true);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const adminSetIconClick = () => {
    setScoreModal(true);
    console.log('clicked')
  };

  // 페이지가 변경될 때마다 fetchUserData 함수 호출
  useEffect(() => {
    fetchUserData();
  }, [page]);

    const fetchUserData = async () => {
      try {
        const response = await axios.post('http://localhost:3001/adminpage', {
        page: page, //api에 현재 페이지 전달
      });
        setUserData(response.data);
      } catch (error) {
        console.log('failed data', error)
      }
    };

    const handlePageChange = (pageNumber) => {
      console.log(`현재 페이지는 ${pageNumber}입니다`)
      setPage(pageNumber);
    };
  

  return (
    <div className='admin-page'>
      <div className="admin-content">
        <div className="admin-title-container">
          <span className='admin-title'>사용자 목록</span>
        </div>
        <div className="admin-btn-container">
            <button className="admin-icon-set-wrap" onClick={adminSetIconClick}><img src={iconSet} className="admin-icon-set"></img></button>
            <button className='admin-main-btn'>추가</button>
            <button className='admin-main-btn'>삭제</button>
        </div>
        <div className="admin-user-data-container">
          <table className="admin-user-data">
            <thead>
              <tr>
                <th className='admin-th-name'>ID</th>
                <th className='admin-th-name'>PW</th>
                <th className='admin-th-name'>Name</th>
                <th className='admin-th-name'>Class</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.pw}</td>
                  <td>{user.name}</td>
                  <td>{user.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>

      </div>
      {
        scoreModal == true ? <AdminScoreModal></AdminScoreModal>: null
      }
      <div className="pagenation-wrap">
        <Pagination
          activePage={page} // 현재 페이지
          itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수
          totalItemsCount={50} // 총 아이템 갯수
          pageRangeDisplayed={5} // paginator의 페이지 범위
          prevPageText={"‹"} // "이전"을 나타낼 텍스트
          nextPageText={"›"} // "다음"을 나타낼 텍스트
          onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
        />
      </div>
    </div>
    )
    }

export default Adminpage;