// import React from 'react'
import './AdminScoreModal.css'
import X from '../image/X.png'
import { useState } from 'react'
import axios from 'axios'
// 추가한 코드
import React, { useContext } from "react";
import { SepsisScoreContext } from '../contexts/SepsisScoreContext'

const AdminScoreModal = ({closeModal}) => {

  // 추가한 코드
  const { sepsisScores, setSepsisScores } = useContext(SepsisScoreContext);
  const [sepsis_score, setSepsis_score] = useState("");

  const xIconClick = () => {
    closeModal(); // 부모 컴포넌트에서 전달 받은 closModal함수 호출
    console.log('clicked')
  };

  const scoreModalConfirmClick = async () => {
    try {
      const response = await axios.post('http://localhost:3001/suspicious', {
        sepsis_score: sepsis_score
      });
      console.log(response.data);
      closeModal(); // 패혈증 점수 설정 후 모달 닫기
    } catch (error) {
        console.log('패혈증 점수 설정 실패, error')
    }
  };

  return (
    <div className='admin-score-modal'>
        <div className="x-button-wrap">
            <button className='x-button' onClick={xIconClick}><img src={X} alt="닫기버튼" className='x-button-img'/></button>
        </div>
            <div className="admin-score-modal-content">
            <span className='admin-score-modal-title'>패혈증 의심 수치 설정</span>
            <div className="modal-score-set">
            <input
              type="text"
              className="score-box"
              value={sepsis_score}
              onChange={(e) => {
                const input = e.target.value;
                const regex = /^[1-9][0-9]?$|^100$/; // 1부터 100까지의 숫자를 허용하는 정규표현식
                if (input === "" || regex.test(input)) {
                  setSepsis_score(input);
                }
              }}
            />
                {/* <input type="text" className='score-box' value={sepsis_score} onChange={(e) => setSepsis_score(e.target.value)}/> */}
                {/* <select className="score-box" value={sepsis_score} onChange={(e) => setSepsis_score(e.target.value)}>
                  <option value="option1">1</option>
                  <option value="option2">2</option>
                  <option value="option3">3</option>
              </select> */}
                <span className='score-box-text'>점 이상</span>
            </div>
            <div>
              <span className='score-box-text-warn'>1 ~ 100 숫자만 입력 가능</span>
            </div>
            <button className='admin-score-modal-confirm' onClick={scoreModalConfirmClick}>확인</button>
        </div>
    </div>
  )
}

export default AdminScoreModal