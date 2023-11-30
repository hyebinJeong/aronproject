import React, { useState, useEffect, useContext } from "react";

import { SepsisScoreContext } from "../contexts/SepsisScoreContext";

import "./Main01.css";
import iconAlram from '../image/iconAlram.svg'
import LiveClock from "../components/LiveClock";
import PatientTable from "../components/PatientTable";
import SuspiciousTable from "../components/SuspiciousTable";
import Modal from "../components/CommentModal";
import axios from "axios";

const Main01 = () => {
  const [selectedColumn, setSelectedColumn] = useState("patient_id"); // Default column
  const [searchTerm, setSearchTerm] = useState("");
  const [susNum, setSusNum] = useState(0);
  const [patNum, setPatNum] = useState(0);

  const [modal, setModal] = useState(false);
  const [pid, setPid] = useState();
  const [commentArr, setCommentArr] = useState();


  //새로 들어온 데이터에 대한 alert
  const [alert, setAlert] = useState(null);
  const [newDataPIDs, setNewDataPIDs] = useState([]);

  //추가된 환자 alert의 confirm버튼
  const [u_score, setUScore] = useState(); // u_score 상태 추가

  const handleAlertConfirm = () => {
    // 확인된 알림의 PID를 로컬 스토리지에 저장
    console.log('handleAlertConfirm')
    localStorage.setItem('confirmedPIDs', JSON.stringify(newDataPIDs));

    // 현재 u_score 값을 로컬 스토리지에 저장
    console.log(u_score)
    localStorage.setItem('confirmedUScore', u_score);

    // newDataPIDs 비우기
    setNewDataPIDs([]);

    setAlert(null);
  };




  //추가한 코드
  const { sepsisScores } = useContext(SepsisScoreContext);
  useEffect(() => {
    console.log(JSON.stringify(sepsisScores, null));
  }, [sepsisScores]);



  const [susAxios, setSusAxios] = useState(false);
  const [patAxios, setPatAxios] = useState(false);

  const [toggle, setToggle] = useState(localStorage.getItem('toggle') === 'true' ? true : false); // 상태 관리할 state
  const [isSuspicious, setIsSuspicious] = useState(toggle); // Default로 의심 테이블을 보여줍니다.



  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleColumnChange = (e) => {
    setSelectedColumn(e.target.value);
  };

  const classifyComment = async () => {
    await axios.post("http://localhost:3001/comment/classify").then((res) => {
      setCommentArr(res.data.map((d) => d.patient_id));
    });
  };

  useEffect(() => {
    classifyComment();
  }, []);

  useEffect(() => {
    if (modal == false) {
      classifyComment();
    }
  }, []);


  //toggle상태가 변하고 새로고침해도 그대로 table유지
  useEffect(() => {
    setIsSuspicious(!toggle);
  }, [toggle]);

  const handleToggle = () => {
    setToggle(!toggle); //토글 상태 변경
    localStorage.setItem('toggle', !toggle); // 토글 상태 localStorage에 저장
  };

  // 새로운 데이터 알림 
  useEffect(() => {
    if (newDataPIDs.length > 0) {
      setAlert(`update ${newDataPIDs.join(', ')}`);
    } else {
      setAlert(null);
    }
  }, [newDataPIDs]);

  // 알림을 띄우거나 없애는 기능
  useEffect(() => {
    const confirmedUScore = localStorage.getItem('confirmedUScore');

    // newDataPIDs가 비어있지 않을 때만 알림을 띄우도록 조건 추가
    if (newDataPIDs.length > 0 && confirmedUScore !== u_score) {
      setAlert(`update ${newDataPIDs.join(', ')}`);
    } else {
      setAlert(null);
    }
  }, [newDataPIDs]); // u_score 대신 newDataPIDs를 의존성 배열에 추가

  return (
    <div style={{ position: 'relative' }}>
      <div className='space'>
        <div className='nav'>
          <div className="toggle-switch">
            <input type="checkbox" checked={toggle} onChange={handleToggle} id="toggle-switch" />
            <label className="toggle-slider" htmlFor="toggle-switch"></label>
          </div>
          {/* 회원 alert */}
          {alert && (
            <div className="update-patient-alert">
              {/* <img src={iconAlram} className="icon-alram" alt="알람아이콘" /> */}
              <p>{alert}</p>
              <button className="update-alert-btn" onClick={handleAlertConfirm}>확인</button>
            </div>
          )}

          <div className='nav-back'>
            <div className='search-bar'>
              <select name="column" id="select-column"
                value={selectedColumn}
                onChange={handleColumnChange}
              >
                <option value="patient_id">ID</option>
                <option value="name">Name</option>
              </select>
              <input className='search-input'
                placeholder='검색어를 입력하세요.'
                value={searchTerm}
                onChange={handleSearchTermChange}></input>
            </div>

            <LiveClock />
          </div>

        </div>
      </div>
      <hr />
      <div className='space'>
        <div className='main-table'>
          {isSuspicious ? (
            <div>
              <p className='class-status-font'>의심({susNum})</p>
              <div className='sus-table-container'>
                <SuspiciousTable
                  selectedColumn={selectedColumn}
                  searchTerm={searchTerm}
                  setting={setSusNum}
                  newDataPIDs={newDataPIDs}
                  setNewDataPIDs={setNewDataPIDs}
                  setAlert={setAlert}
                  setModal={setModal}
                  setPid={setPid}
                  pid={pid}
                  classifyComment={classifyComment}
                  commentArr={commentArr}
                  susAxios={susAxios}
                  setSusAxios={setSusAxios}
                  u_score={u_score}
                  setUScore={setUScore}></SuspiciousTable>
              </div>
            </div>
          ) : (
            <div>
              <p className='class-status-font'>전체({patNum})</p>
              <div className='p-table-container'>
                <PatientTable
                  selectedColumn={selectedColumn}
                  searchTerm={searchTerm}
                  setting={setPatNum}
                  setModal={setModal}
                  setPid={setPid}
                  pid={pid}
                  classifyComment={classifyComment}
                  commentArr={commentArr}
                  patAxios={patAxios}
                  setPatAxios={setPatAxios}></PatientTable>

              </div>
            </div>
          )}
        </div>
      </div>
      {modal
        ? <Modal setModal={setModal} pid={pid} classifyComment={classifyComment}></Modal>
        : null}
    </div>
  )
}

export default Main01;
