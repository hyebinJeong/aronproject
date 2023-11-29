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
  const [selectedRows, setSelectedRows] = useState([]); // 선택된 행들
  const [searchInput, setSearchInput] = useState(''); // 검색 입력 관리

  // 검색 입력이 변경될 때 호출하는 함수
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

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

    const handleRowClick = (user) => {
      // 현재 클릭한 행이 이미 선택되어 있는지 확인
      const isRowSelected = selectedRows.includes(user);
      setSelectedRows((prevSelectedRows) =>
        isRowSelected
          ? prevSelectedRows.filter((row) => row !== user)
          : [...prevSelectedRows, user]
      );
      // 현재 클릭한 행을 클릭된 행으로 설정
      setClickedRow(user);
    };

    const handleDeleteClick = async () => {
      if (selectedRows.length > 0) {
        try {
          const ids = selectedRows.map(row => row.id);
          alert('삭제하시겠습니까?')
          await axios.post('http://localhost:3001/adminpage/deleted', { ids });
          fetchUserData();
          setSelectedRows([]);
          alert('삭제되었습니다')
        } catch (error) {
          console.log('삭제 실패', error);
        }
      }
    };

    // 검색 입력에 따라 사용자 데이터를 필터링
    const filteredUserData = userData.filter(user => user.name.includes(searchInput));

    const handleSelectAll = (event) => {
      if (event.target.checked) {
        setSelectedRows(filteredUserData);
      } else {
        setSelectedRows([]);
      }
    };

    // 각 class 번호에 따라 직급 화면에 보여주기
    const translateClass = (userClass) => {
      switch(userClass){
        case 0:
          return '간호사';
        case 1:
          return '의사';
        case 9:
          return '관리자';
        default:
          return '';
      }
    }
    
  
    const selectAll = filteredUserData.length > 0 && filteredUserData.every(user => selectedRows.includes(user));
  

  return (
    <div className='admin-page'>
      <div className="admin-content">
        <div className="admin-title-container">
          <span className='admin-title'>사용자 목록</span>
        </div>
        <div className="admin-right-container">
          <input
              className='admin-search-input'
              type="text"
              placeholder="이름을 검색하세요"
              value={searchInput}
              onChange={handleSearchChange}
            />
            <button className='admin-main-btn admin-score-btn' onClick={adminSetIconClick}><p>ARON SCORE</p></button>
            <button className='admin-main-btn' onClick={adminAddBtnClick}>추가</button>
            <button className='admin-main-btn' onClick={handleDeleteClick}>삭제</button>
        </div>
        <div className="admin-user-data-container">
          <table className="admin-user-data">
            <thead className='admin-user-data-thead'>
              <tr className='admin-user-data-tr'>
                {/* 전체선택 체크박스 컬럼 테이블 헤더 추가 */}
                <th className='admin-th-name'>
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                </th>
                {/* 체크박스 컬럼 */}
                <th className='admin-th-name'>사번</th>
                <th className='admin-th-name'>이름</th>
                <th className='admin-th-name'>직급</th>
                <th className='admin-th-name'>마지막 로그인 시간</th>
              </tr>
            </thead>
            <tbody className='admin-user-data-tbody'>
              {filteredUserData.map((user, index) => (
                <tr
                  key={index}
                  className={`admin-user-data-tr ${selectedRows.includes(user) ? 'clicked' : '' }`}
                  style={{backgroundColor: selectedRows.includes(user) ? '#b3d9ff' : 'inherit'}}
                  onClick={() => handleRowClick(user)}>
                  <td className='admin-user-data-td'>
                    <input type="checkbox"
                    checked={selectedRows.includes(user)}
                    onChange={(event) => {
                      event.stopPropagation();
                      handleRowClick(user);
                    }} />
                  </td>
                  <td className='admin-user-data-td'>{user.id}</td>
                  <td className={'admin-user-data-td'}>{user.name}</td>
                  <td className={'admin-user-data-td'}>{translateClass(user.class)}</td>
                  <td className={'admin-user-data-td'}>{user.last_login}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>

      </div>

      {scoreModal && <AdminScoreModal closeModal={closeModal} />}

      {addModal && <AdminAddModal closeModal={closeModal} onUserAdded={handleUserAdded} />}

      {/* 새로 추가한 코드 */}
      {scoreModal && <AdminScoreModal closeModal={closeModal} isOpen={scoreModal} />}
    </div>
    )
    }

export default Adminpage;