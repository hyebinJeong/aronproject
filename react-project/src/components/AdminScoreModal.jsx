import React from 'react'
import './AdminScoreModal.css'
import X from '../image/X.png'
import { useState } from 'react'
import axios from 'axios'

const AdminScoreModal = () => {

  const [scoreModal, setScoreModal] = useState(true);
  const [sepsis_score, setSepsis_score] = useState("");

  const xIconClick = () => {
    setScoreModal(false);
    console.log('clicked')
  };

  if(!scoreModal) {
    return null;
  }

  const scoreModalConfirmClick = async () => {
    try {
      const response = await axios.post('http://localhost:3001/suspicious', {
        sepsis_score: sepsis_score
      });
      console.log(response.data);
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
                <input type="text" className='score-box' value={sepsis_score} onChange={(e) => setSepsis_score(e.target.value)}/>
                <span className='score-box-text'>점 이상</span>
            </div>
            <button className='admin-score-modal-confirm' onClick={scoreModalConfirmClick}>확인</button>
        </div>
    </div>
  )
}

export default AdminScoreModal