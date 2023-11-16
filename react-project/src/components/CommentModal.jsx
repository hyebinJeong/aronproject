import React, { useEffect, useRef, useState } from 'react'
import './CommentModal.css'
import axios from 'axios'

const Modal = ({setModal, pid}) => {

  const commentRef = useRef();
  const [data, setData] = useState([]);

  // comment 불러오기
  const selectComment = () => {
    axios.post('http://localhost:3001/comment/read', {
      patient_id : pid
    }).then((res) => {
      setData(res.data)
      console.log(data)
    })
  }

  useEffect(() => {
    selectComment()
    console.log('pid is modify', data)
  }, [pid])
  
  // comment 입력
  const insertComment = (word) => {
    axios.post('http://localhost:3001/comment/add', {
      patient_id : pid,
      comment : word
    }).then((res) => {
    })
  }

  const deleteComment = (id) => {
    axios.post('http://localhost:3001/comment/delete', {
      comment_id : id
    })
  }

  return (
    <div className = 'modal-container'>
      <div className = 'modal-overlay'></div>
      <div className = 'modal-main-page'>
        <div className = 'modal-header-box'>
          <button className = 'modal-close-btn' onClick ={() => {setModal(false)}}>X</button>
        </div>
        <div className = 'modal-main-top'>
          {data.map((d) => {
            return ( <div className ='modal-comment-box'>{d.comment}
            <button onClick = {() => {

            }}>delete</button>
            </div> )
          })}
        </div>
        <div className = 'modal-main-bottom'>
          <div>
            <textarea maxLength='300' ref={commentRef}></textarea>
            <button onClick={() => {
              const word = commentRef.current.value;
              insertComment(word);
              selectComment();
              commentRef.current.value = '';
            }}>입력</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal