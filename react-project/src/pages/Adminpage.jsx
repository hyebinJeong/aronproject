import React, { Component } from 'react'
import './Adminpage.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import iconSet from "../image/iconSet.svg"
import AdminScoreModal from '../components/AdminScoreModal';
import AdminAddModal from '../components/AdminAddModal';

const Adminpage = () => {

  const [scoreModal, setScoreModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const [addModal, setAddModal] = useState(false );
  const [clickedRow, setClickedRow] = useState(null); // 현재 클릭된 행

  // 설정 버튼 클릭
  const adminSetIconClick = () => {
    setScoreModal(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
      setScoreModal(false);
      setAddModal(false);
  };

  // 추가 버튼 클릭
  const adminAddBtnClick = () => {
    setAddModal(true);
    console.log('clicked')
  };

  // 추가 모달에서 추가 하면 바로 userdata가 update될 수 있도록 함
  const handleUserAdded = () => {
    fetchUserData();
  }
  
  // 컴포넌트가 화면에 나타날 때 userdata를 불러오도록 함
  useEffect(() => {
    fetchUserData();
  }, []);
  
  // adminpage에 DB에 저장된 UserDATA를 불러와서 유저 목록을 보여줌
  const fetchUserData = async () => {
    try {
      const response = await axios.post('http://localhost:3001/adminpage');
      setUserData(response.data);
    } catch (error) {
      console.log('failed data', error)
    }
  };

    // 삭제버튼을 누르기 전, 삭제할 Row를 click하기 위해 만듬
    const handleRowClick = (user) => {
      setClickedRow(user);
    };

    // 삭제버튼을 클릭했을 때, 데이터를 DB에서 삭제시킨 후, 갱신된 데이터를 다시 불러옴
    const handleDeleteClick = async () => {
      if (clickedRow) {
        try {
          await axios.post('http://localhost:3001/adminpage/deleted', {id: clickedRow.id});
          fetchUserData(); // 데이터를 다시 불러와서 테이블을 갱신
        } catch (error) {
          console.log('삭제 실패', error)
        }
      }
    };

  return (
    <div className='admin-page'>
      <div className="admin-content">
        <div className="admin-title-container">
          <span className='admin-title'>사용자 목록</span>
        </div>
        <div className="admin-btn-container">
            <button className="admin-icon-set-wrap" onClick={adminSetIconClick}><img src={iconSet} className="admin-icon-set"></img></button>
            <button className='admin-main-btn' onClick={adminAddBtnClick}>추가</button>
            <button className='admin-main-btn' onClick={handleDeleteClick}>삭제</button>
        </div>
        <div className="admin-user-data-container">
          <table className="admin-user-data">
            <thead className='admin-user-data-thead'>
              <tr className='admin-user-data-tr'>
                <th className='admin-th-name'>ID</th>
                {/* <th className='admin-th-name'>PW</th> */}
                <th className='admin-th-name'>Name</th>
                <th className='admin-th-name'>Class</th>
              </tr>
            </thead>
            <tbody className='admin-user-data-tbody'>
              {userData.map((user, index) => (
                <tr key={index} className={`admin-user-data-tr ${user === clickedRow ? 'clicked' : ''}`} onClick={() => handleRowClick(user)}>
                  <td className='admin-user-data-td'>{user.id}</td>
                  {/* <td className='admin-user-data-td'>{user.pw}</td> */}
                  <td className='admin-user-data-td'>{user.name}</td>
                  <td className='admin-user-data-td'>{user.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>

      </div>

      {scoreModal && <AdminScoreModal closeModal={closeModal} />}

      {addModal && <AdminAddModal closeModal={closeModal} onUserAdded={handleUserAdded} />}

    </div>
    )
    }

export default Adminpage;