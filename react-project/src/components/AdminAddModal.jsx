import React from 'react'
import './AdminAddModal.css'
import { useSearchParams } from 'react-router-dom'
import X from '../image/X.png'
import { useState } from 'react'
import axios from 'axios'


const AdminAddModal = ({onUserAdded, onClose}) => {
    
    const [addModal, setAddModal] = useState(true);
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [name, setName] = useState("");
    const [classValue, setClassValue] = useState("");

    const xIconClick2 = () => {
        setAddModal(false);
    };

    if(!addModal) {
        return null;
    }

    const addModalConfirmClick = async () => {
        try {
            const response = await axios.post('http://localhost:3001/adminpage/add', {
                id: id,
                pw: pw,
                name: name,
                classvalue: classValue
        });
        console.log(response.data);
        // xIconClick2(); // 데이터 성공적으로 추가한 뒤 모달 닫음
        onUserAdded(); //데이터 성공적으로 추가한 뒤 사용자 목록 다시 불러옴
        // onClose(); // 모달을 닫음
        } catch (error) {
            console.log('데이터 추가 실패, error')
        }
    };

    console.log(classValue)

  return (
    <div className='admin-add-modal'>
        <div className="x-button-wrap">
            <button className='x-button' onClick={xIconClick2}><img src={X} alt="닫기버튼" className='x-button-img'/></button>
        </div>
            <div className="admin-add-modal-content">
                <span className='admin-add-modal-title'>사용자 추가</span>
                <div className="modal-info-set modal-info-id">
                    <span className='info-box-text'>ID : </span>
                    <input type="text" className='info-box' value={id} onChange={(e) => setId(e.target.value)} />
                </div>
                <div className="modal-info-set modal-info-pw">
                    <span className='info-box-text'>PW : </span>
                    <input type="text" className='info-box' value={pw} onChange={(e) => setPw(e.target.value)} />
                </div>
                <div className="modal-info-set modal-info-long">
                    <span className='info-box-text'>NAME : </span>
                    <input type="text" className='info-box' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="modal-info-set modal-info-long">
                    <span className='info-box-text'>CLASS : </span>
                    <input type="text" className='info-box' value={classValue} onChange={(e) => setClassValue(e.target.value)}/>
                </div>
            <button className='admin-add-modal-confirm' onClick={addModalConfirmClick}>확인</button>
        </div>
    </div>
  )
}

export default AdminAddModal