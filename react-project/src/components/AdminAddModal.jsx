import React from "react";
import "./AdminAddModal.css";
import X from "../image/X.png";
import { useState } from "react";
import axios from "axios";

const AdminAddModal = ({ onUserAdded, closeModal }) => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [classValue, setClassValue] = useState("");

  const xIconClick2 = () => {
    closeModal(); // 부모 컴포에서 전달받은 closeModal함수 호출
  };

  const addModalConfirmClick = async () => {
    const idRegEx = /^\d{8}$/;
    const pwRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const nameRegEx = /^[A-Za-z가-힣]{1,40}$/;
    const classRegEx = /^[019]$/;

    if (!idRegEx.test(id)) {
      alert('사번은 8자리 숫자로 입력해주세요.');
      return;
    }
    if (!pwRegEx.test(pw)) {
      alert('비밀번호는 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자를 포함한 8자 이상이어야 합니다.');
      return;
    }
    if (!nameRegEx.test(name)) {
      alert('이름은 한글 또는 영어 40자 이내로 입력해주세요.');
      return;
    }
    if (!classRegEx.test(classValue)) {
      alert('직급은 0, 1, 9 중 하나로 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/adminpage/add", {
        id: id,
        pw: pw,
        name: name,
        classvalue: classValue,
      });
      console.log(response.data);
      onUserAdded(); // 데이터 성공적으로 추가한 뒤 사용자 목록 다시 불러옴
      closeModal(); // 데이터 성공적으로 추가한 뒤 모달 닫음
      alert('추가되었습니다')
    } catch (error) {
      console.log("데이터 추가 실패, error");
    }
  };


  return (
    <div className="admin-add-modal">
      <div className="x-button-wrap">
        <button className="x-button" onClick={xIconClick2}>
          <img src={X} alt="닫기버튼" className="x-button-img" />
        </button>
      </div>
      <div className="admin-add-modal-content">
        <span className="admin-add-modal-title">사용자 추가</span>
        <div className="modal-info-set modal-info-id">
          <span className="info-box-text">사번 : </span>
          <input
            type="text"
            className="info-box"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="modal-info-set modal-info-pw">
          <span className="info-box-text">비밀번호 : </span>
          <input
            type="password"
            className="info-box"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
        </div>
        <div className="modal-info-set modal-info-name">
          <span className="info-box-text">이름 : </span>
          <input
            type="text"
            className="info-box"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="modal-info-set modal-info-class ">
          <span className="info-box-text">직급 :</span>
          <input
            type="text"
            className="info-box"
            value={classValue}
            onChange={(e) => setClassValue(e.target.value)}
          />
        </div>
        <button
          className="admin-add-modal-confirm"
          onClick={addModalConfirmClick}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default AdminAddModal;