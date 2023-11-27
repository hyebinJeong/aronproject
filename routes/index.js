// express 모듈과 path 모듈 import
const express = require("express");
// 라우터 객체 생성
const router = express.Router();
const path = require("path");
const conn = require("../config/database");
const bcrypt = require('bcrypt');


// 전체 데이터
router.post("/patients", async (req, res) => {
  console.log(req.body);

  const sql = `
  SELECT 
    p.patient_id, 
    p.name,
    p.gender,
    p.age,
    p.ward_room,
    p.status,
    d.sepsis_score,
    DATE_FORMAT(d.record_time, '%Y-%m-%d %H:%i') as record_time,
    d.HR,
    d.O2Sat,
    d.Temp,
    d.SBP,
    d.MAP,
    d.DBP,
    d.Resp
  FROM 
    patient AS p 
  INNER JOIN 
    data AS d
  ON 
    p.patient_id = d.patient_id
  WHERE d.record_time = (
        SELECT 
            MAX(record_time)
        FROM 
            data
        WHERE 
            patient_id = p.patient_id
    )
`;

  try {
    const results = await new Promise((resolve, reject) => {
      conn.query(sql,(err, result) => {
        if (err) throw err;
        else res.json(result);
      });
    });
  } catch (err) {
    res.status(500).send("An error occurred, please try again.");
  }
});

// 패혈증 의심 환자 테이블 불러오기
router.post('/suspicious', async (req, res) => {
  console.log(req.body);

  const { u_score } = req.body; // u_score 값을 가져옵니다.
  const sql = `
  select  
    p.patient_id, 
    p.name,
    p.gender,
    p.age,
    p.ward_room,
    p.status,
    d.sepsis_score,
    DATE_FORMAT(d.record_time, '%Y-%m-%d %H:%i') as record_time,
    d.HR,
    d.O2Sat,
    d.Temp,
    d.SBP,
    d.MAP,
    d.DBP,
    d.Resp
  from patient p 
  inner join data d 
  on p.patient_id=d.patient_id
  where d.sepsis_score >= ?
  and d.record_time = (
    select max(record_time)
    from data
    where patient_id = p.patient_id
  )
    `;
  try {
      const results = await new Promise((resolve, reject) => {
          conn.query(sql,[u_score],(err, rows) => { 
              if (err) {
                  reject(err);
              } else {
                  resolve(rows);
              }
          });
      });
      res.json(results);
  } catch (err) {
      res.status(500).send('An error occurred, please try again.');
  }
});


// 관리자 페이지 user 데이터
router.post('/adminpage', async(req,res)=>{
  const sql = "select * from user";
  try {
    const results = await new Promise((resolve, reject)=>{
      conn.query(sql,(err, rows)=>{
        if(err){
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    res.json(results);
  } catch (err) {
    res.status(500).send('An error occurred, please try again.');
  }

});

const saltRounds = 10; // 솔트의 길이, 높을수록 보안이 높아짐

// 사용자 추가 엔드포인트
router.post('/adminpage/add', async (req, res) => {
  const { id, pw, name, classvalue } = req.body;

  try {
    // 패스워드 해시 처리
    const hashedPw = await bcrypt.hash(pw, saltRounds);

    const sql = "INSERT INTO user (id, pw, name, class) VALUES (?, ?, ?, ?)";
    
    await new Promise((resolve, reject) => {
      conn.query(sql, [id, hashedPw, name, classvalue], (err, rows) => {
        if (err) {
          console.error(err); // 에러를 콘솔에 출력
        } else {
          resolve(rows);
        }
      });
    });

    res.status(200).send('User added successfully');
  } catch (err) {
    res.status(500).send('An error occurred, please try again.');
  }
});

// // 관리자 페이지 user 추가
// router.post('/adminpage/add', async (req,res)=>{
//   const {id, pw, name, classvalue} = req.body;
//   const sql = "insert into user (id, pw, name, class) values (?,?,?,?)";
//   console.log(req.body.id)
//   try {
//     await new Promise((resolve, reject)=>{
//       conn.query(sql, [id, pw, name, classvalue], (err, rows)=>{
//         if(err){
//           reject(err);
//         } else {
//           resolve(rows)
//         }
//       });
//     });
//     res.status(200).send('user add');
//   } catch(err) {
//     res.status(500).send('An error occurred, please try again.');
//   }
// });

// 관리자 페이지 user 삭제
router.post('/adminpage/deleted', async (req,res)=>{
  const { ids } = req.body;
  const sql = "DELETE FROM user WHERE id IN (?)";
  try {
    await new Promise((resolve, reject)=>{
      conn.query(sql, [ids], (err, rows) => {
        if(err){
          reject(err);
        } else {
          resolve(rows)
        }
      });
    });
    res.status(200).send('user deleted');
  } catch(err) {
    res.status(500).send('An error occurred, please try again.');
  }
});

// 패혈증 점수 업데이트
router.post('/adminpage/update_sepsis', async (req,res)=>{
  const {u_score} = req.body;
  const sql = "update score set u_score = ?";
  console.log(req.body.id)
  try {
    await new Promise((resolve, reject)=>{
      conn.query(sql, [u_score], (err, rows)=>{
        if(err){
          reject(err);
        } else {
          resolve(rows)
        }
      });
    });
    res.status(200).send('sepsis score updated');
  } catch(err) {
    res.status(500).send('An error occurred, please try again.');
  }
});

// 관리자 패혈증
router.post('/adminpage/sepsis_score', async (req,res)=>{
  const sql = "select * from score";
  try {
    const result = await new Promise((resolve, reject)=>{
      conn.query(sql, (err, rows)=>{
        if(err){
          reject(err);
        } else {
          resolve(rows)
        }
      });
    });
    res.json(result)
  } catch(err) {
    res.status(500).send('An error occurred, please try again.');
  }
});

// 라우터 객체를 모듈로 내보냄
module.exports = router;