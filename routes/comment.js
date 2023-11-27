const express = require('express');
const router = express.Router();
const path = require('path');
const conn = require('../config/database');

// 코멘트 조회
router.post('/read', async(req,res)=>{
    const {patient_id} = req.body;
    const sql = 'SELECT * FROM comments WHERE patient_id=? ORDER BY created_at DESC';
    try {
        const results = await new Promise((resolve, reject)=>{
            conn.query(sql,[patient_id],(err,rows)=>{
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
        res.json(results);
    } catch(err) {
        res.status(500).send('An error occurred, please try again.');
    }
});

// 코멘트 작성일자 조회
router.post('/read-date', async (req, res) => {
    const { comment_id } = req.body;
    const sql = 'SELECT DATE_FORMAT(created_at, "%y-%m-%d %H:%i:%s") AS formatted_created_at FROM comments WHERE comment_id = ?';
    try {
      const results = await new Promise((resolve, reject) => {
        conn.query(sql, [comment_id], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows[0]?.formatted_created_at); // 결과가 배열 형태로 오므로 첫 번째 요소의 created_at을 반환
          }
        });
      });
      res.json(results);
    } catch (err) {
      res.status(500).send('An error occurred, please try again.');
    }
  });


// 코멘트 추가
router.post('/add', async(req,res)=>{
    const {patient_id, comment} = req.body;
    const sql = 'insert into comments (patient_id, comment) values (?,?)';
    try{
        await new Promise((resolve, reject)=>{
            conn.query(sql, [patient_id, comment] ,(err, rows)=>{
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
        res.status(200).send('comment add');
    } catch(err) {
        res.status(500).send('An error occurred, please try again.');
    }
});


// // 코멘트 수정
// router.post('/update', async(req,res)=>{
//     const {comment, comment_id} = req.body;
//     const sql = 'update comments set comment=? where comment_id=?';
//     try{
//         await new Promise((resolve, reject)=>{
//             conn.query(sql, [comment, comment_id] ,(err, rows)=>{
//                 if(err){
//                     reject(err);
//                 } else {
//                     resolve(rows);
//                 }
//             });
//         });
//         res.status(200).send('comment update');
//     } catch(err) {
//         res.status(500).send('An error occurred, please try again.');
//     }
// });

// // 서버의 comment 라우터에서 새로운 엔드포인트 추가
// router.post('/update-date', async (req, res) => {
//     const { comment_id } = req.body;
  
//     // 여기에서 데이터베이스에서 comment_id에 해당하는 댓글의 날짜를 수정하는 로직 추가
//     try {
//       const updateDateSql = 'UPDATE comments SET created_at = CURRENT_TIMESTAMP WHERE comment_id = ?';
//       await new Promise((resolve, reject) => {
//         conn.query(updateDateSql, [comment_id], (err) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve();
//           }
//         });
//       });
  
//       // 수정된 날짜를 다시 조회하여 클라이언트에게 전송
//       const selectDateSql = 'SELECT DATE_FORMAT(created_at, "%y%m%d %H:%i:%s") AS formatted_created_at FROM comments WHERE comment_id = ?';
//       const results = await new Promise((resolve, reject) => {
//         conn.query(selectDateSql, [comment_id], (err, rows) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(rows[0]?.formatted_created_at);
//           }
//         });
//       });
  
//       res.json(results);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('An error occurred, please try again.');
//     }
//   });

// 코멘트 수정 및 날짜 업데이트
router.post('/update-with-date', async (req, res) => {
    const { comment, comment_id } = req.body;
    try {
        // 이 부분에서 서버의 현재 시간을 가져와서 변수에 저장합니다.
        const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

        const updateCommentSql = 'UPDATE comments SET comment = ?, created_at = ? WHERE comment_id = ?';
        await new Promise((resolve, reject) => {
            conn.query(updateCommentSql, [comment, currentTimestamp, comment_id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        // 수정된 날짜를 다시 조회하여 클라이언트에게 전송
        const selectDateSql = 'SELECT DATE_FORMAT(created_at, "%y%m%d %H:%i:%s") AS formatted_created_at FROM comments WHERE comment_id = ?';
        const results = await new Promise((resolve, reject) => {
            conn.query(selectDateSql, [comment_id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows[0]?.formatted_created_at);
                }
            });
        });

        res.json({ updatedDate: results });
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred, please try again.');
    }
});


// 코멘트 삭제
router.post('/delete', async(req,res)=>{
    const {comment_id} = req.body;
    const sql = 'delete from comments where comment_id=?';
    try{
        await new Promise((resolve, reject)=>{
            conn.query(sql, [comment_id] ,(err, rows)=>{
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
        res.status(200).send('comment delete');
    } catch(err) {
        res.status(500).send('An error occurred, please try again.');
    }
});


// 코멘트 확인
router.post('/classify', async(req,res)=>{
    const sql = 'select patient_id, comment from comments where comment is not null';
    try {
        const results = await new Promise((resolve, reject)=>{
            conn.query(sql,(err,rows)=>{
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
        res.json(results);
    } catch(err) {
        res.status(500).send('An error occurred, please try again.');
    }
});

module.exports = router;