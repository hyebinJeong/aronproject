import './AdminScoreModal.css'
import X from '../image/X.png'
import { useState, useEffect } from 'react'
import axios from 'axios'

const AdminScoreModal = ({ closeModal }) => {
  const [u_score, setU_score] = useState('');  // state 이름을 sepsis_score에서 u_score로 변경
  const [previousScore, setPreviousScore] = useState(''); // 이전 점수를 저장

  useEffect(() => {
    fetchPreviousScore(); // 컴포넌트가 로드될 때 이전 점수 가져오기
  }, []);

  const fetchPreviousScore = async () => {
    try {
      const response = await axios.post('http://localhost:3001/adminpage/sepsis_score'); // 이전 점수를 가져오는 API 경로
      console.log(response.data)
      setPreviousScore(response.data[0].u_score);
    } catch (error) {
      console.log('패혈증 점수 불러오기 실패', error);
    }
  };

  const xIconClick = () => {
    closeModal();
  };

  const scoreModalConfirmClick = async () => {
    try {
      console.log('Sending u_score:', u_score);
      const response = await axios.post('http://localhost:3001/adminpage/update_sepsis', {
        u_score: parseFloat(u_score),  // 관리자가 입력한 새로운 패혈증 점수를 사용
      });
      console.log('Response from server:', response.data);

      setPreviousScore(u_score); // 새로운 점수를 이전 점수 상태에 저장
      localStorage.setItem('confirmedUScore', u_score); // 새로운 점수를 로컬 스토리지에 저장
      closeModal();
    } catch (error) {
      console.log('패혈증 점수 설정 실패', error);
    }
  };

  return (
    <div className='admin-score-modal'>
      <div className="x-button-wrap">
        <button className='x-button' onClick={xIconClick}><img src={X} alt="닫기버튼" className='x-button-img' /></button>
      </div>
      <div className="admin-score-modal-content">
        <span className='admin-score-modal-title'>패혈증 의심 수치 설정</span>
        <span className='admin-before-score'>이전 설정 점수 : {previousScore}</span>
        <div className="modal-score-set">
          <input
            type="text"
            className="score-box"
            value={u_score}
            onChange={(e) => {
              const input = e.target.value;
              const regex = /^[1-9][0-9]?$|^100$/; // 1부터 100까지의 숫자를 허용하는 정규표현식
              if (input === "" || regex.test(input)) {
                setU_score(input);
              }
            }}
          />
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