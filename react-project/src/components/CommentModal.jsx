import React, { useEffect, useRef, useState } from 'react'
import './CommentModal.css'
import axios from 'axios'

const Modal = ({setModal, pid, classifyComment}) => {
  const commentRef = useRef();
  const [data, setData] = useState([]);

  //추가한 코드
  // 수정할 댓글의 상태와 변경하는 함수를 선언
  const [editingComment, setEditingComment] = useState(null);

  // comment 불러오기
  const selectComment = async () => {
    await axios
      .post("http://localhost:3001/comment/read", {
        patient_id: pid,
      })
      .then((res) => {
        setData(res.data);
      });
  };

  // comment 입력
  const insertComment = async (word) => {
    await axios
      .post("http://localhost:3001/comment/add", {
        patient_id: pid,
        comment: word,
      })
      .then((res) => {
        classifyComment();
      });

    await selectComment();
  };

  const deleteComment = async (id) => {
    await axios
      .post("http://localhost:3001/comment/delete", {
        comment_id: id,
      })
      .then((res) => {
        classifyComment();
      });

    await selectComment();
  };

  const modifyComment = async (comment, comment_id) => {
    await axios
      .post("http://localhost:3001/comment/update", {
        comment: comment,
        comment_id: comment_id,
      })
      .then((res) => {});

    await selectComment();
  };

  // 원본코드
  // const modifyFunc = async () => {
  //   await modifyComment();
  //   await selectComment();
  // };

  useState(() => {
    selectComment();
  }, []);

  // 추가한 코드
    const modifyFunc = async () => {
      if (editingComment) {
        await modifyComment(editingComment.comment, editingComment.comment_id);
        setEditingComment(null); // 수정이 끝나면 상태를 초기화합니다.
      }
    };

  return (
    <div className="modal-container">
      <div className="modal-overlay"></div>
      <div className="modal-main-page">
        <div className="modal-header-box">
          <p className='modal-header-box-pid'>환자번호 [ {pid} ]</p>
          <button
            className="modal-close-btn"
            onClick={() => {
              setModal(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M26.0612 23.9387C26.343 24.2205 26.5013 24.6027 26.5013 25.0012C26.5013 25.3997 26.343 25.7819 26.0612 26.0637C25.7794 26.3455 25.3972 26.5038 24.9987 26.5038C24.6002 26.5038 24.218 26.3455 23.9362 26.0637L15.9999 18.125L8.0612 26.0612C7.7794 26.343 7.39721 26.5013 6.9987 26.5013C6.60018 26.5013 6.21799 26.343 5.9362 26.0612C5.6544 25.7794 5.49609 25.3972 5.49609 24.9987C5.49609 24.6002 5.6544 24.218 5.9362 23.9362L13.8749 16L5.9387 8.06122C5.6569 7.77943 5.49859 7.39724 5.49859 6.99872C5.49859 6.60021 5.6569 6.21802 5.9387 5.93622C6.22049 5.65443 6.60268 5.49612 7.0012 5.49612C7.39971 5.49612 7.7819 5.65443 8.0637 5.93622L15.9999 13.875L23.9387 5.93497C24.2205 5.65318 24.6027 5.49487 25.0012 5.49487C25.3997 5.49487 25.7819 5.65318 26.0637 5.93497C26.3455 6.21677 26.5038 6.59896 26.5038 6.99747C26.5038 7.39599 26.3455 7.77818 26.0637 8.05998L18.1249 16L26.0612 23.9387Z"
                fill="#000"
              />
            </svg>
          </button>
        </div>
        <div className="modal-main-top">
          {/* 원래코드 */}
          {/* {data.map((d) => {
            return (
              <div className="modal-comment-box">
                {d.comment}
                <button className="comment-modify-btn" onClick={() => {}}>
                  수정
                </button> */}

          {/* 추가한코드 */}
          {data.map((d) => {
            return (
              <div className="modal-comment-box">
                {editingComment &&
                editingComment.comment_id === d.comment_id ? (
                  <textarea className='modal-comment-box-modify-textarea'
                    defaultValue={d.comment}
                    onChange={(e) =>
                      setEditingComment({
                        ...editingComment,
                        comment: e.target.value,
                      })
                    }
                  />
                ) : (
                  d.comment
                )}
                <button
                  className="comment-modify-btn"
                  onClick={() => {
                    if (
                      editingComment &&
                      editingComment.comment_id === d.comment_id
                    ) {
                      modifyFunc();
                    } else {
                      setEditingComment(d);
                    }
                  }}
                >
                  {editingComment && editingComment.comment_id === d.comment_id
                    ? "완료"
                    : "수정"}
                </button>
                <button
                  onClick={() => {
                    deleteComment(d.comment_id);
                  }}
                >
                  삭제
                </button>
              </div>
            );
          })}
        </div>
        <div className="modal-main-bottom">
          <div>
            <textarea
              className="modal-main-bottom-textarea"
              maxLength="300"
              ref={commentRef}
            ></textarea>
            <button
              className="modal-main-bottom-inputbtn"
              onClick={() => {
                const word = commentRef.current.value;
                insertComment(word);
                commentRef.current.value = "";
              }}
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal