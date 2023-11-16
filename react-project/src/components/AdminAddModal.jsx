import React from 'react'
import './AdminAddModal.css'
import { useSearchParams } from 'react-router-dom'
import X from '../image/X.png'
import { useState } from 'react'

const AdminAddModal = () => {
    
    const [addModal, setAddModal] = useState(true);

    const xIconClick2 = () => {
        setAddModal(false);
    };

    if(!addModal) {
        return null;
    }


  return (
    <div className='admin-add-modal'>
        <div className="x-button-wrap">
            <button className='x-button' onClick={xIconClick2}><img src={X} alt="닫기버튼" className='x-button-img'/></button>
        </div>
            <div className="admin-add-modal-content">
                <span className='admin-add-modal-title'>사용자 추가</span>
                <div className="modal-info-set modal-info-id">
                    <span className='info-box-text'>ID : </span>
                    <input type="text" className='info-box' />
                </div>
                <div className="modal-info-set modal-info-pw">
                    <span className='info-box-text'>PW : </span>
                    <input type="text" className='info-box' />
                </div>
                <div className="modal-info-set modal-info-long">
                    <span className='info-box-text'>NAME : </span>
                    <input type="text" className='info-box' />
                </div>
                <div className="modal-info-set modal-info-long">
                    <span className='info-box-text'>CLASS : </span>
                    <input type="text" className='info-box' />
                </div>
            <button className='admin-add-modal-confirm'>확인</button>
        </div>
    </div>
  )
}

export default AdminAddModal