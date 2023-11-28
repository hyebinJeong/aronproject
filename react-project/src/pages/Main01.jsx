import React, { useState, useEffect, useContext } from "react";

import { SepsisScoreContext } from "../contexts/SepsisScoreContext";

import "./Main01.css";
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

  // 알림 확인 버튼 클릭 이벤트 핸들러
  const handleAlertConfirm = () => {
    // 확인된 알림의 PID를 로컬 스토리지에 저장
    localStorage.setItem('confirmedPIDs', JSON.stringify(newDataPIDs));
    setAlert(null);
  };


  //추가한 코드
  const { sepsisScores } = useContext(SepsisScoreContext);
  useEffect(() => {
    console.log(JSON.stringify(sepsisScores, null, 2));
  }, [sepsisScores]);

  const [susAxios, setSusAxios] = useState(false);
  const [patAxios, setPatAxios] = useState(false);


  const [isSuspicious, setIsSuspicious] = useState(true); // Default로 의심 테이블을 보여줍니다.

  const handleSuspiciousClick = () => {
    setIsSuspicious(true);
  };

  const handleTotalClick = () => {
    setIsSuspicious(false);
  };


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

  // useEffect(() => {
  //     axios.post('http://localhost:5000/model', {}, { withCredentials: true })
  //         .then((res) => {
  //             console.log(res.data);
  //         })
  //         .catch((error) => {
  //             console.error('Axios 오류:', error);
  //         });
  // }, [])

  const [toggle, setToggle] = useState(false); // 상태 관리할 state

  const handleToggle = () => {
    setToggle(!toggle) //토글 상태 변경
    if (!toggle) {
      handleTotalClick();
    } else {
      handleSuspiciousClick();
    }
  };

  useEffect(() => {
    if (newDataPIDs.length > 0) {
      setAlert(`update ${newDataPIDs.join(', ')}`);
    } else {
      setAlert(null);
    }
  }, [newDataPIDs]);


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
                  setSusAxios={setSusAxios}></SuspiciousTable>
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
