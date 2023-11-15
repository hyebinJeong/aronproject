// express 모듈과 path 모듈 import
const express = require("express");
// 라우터 객체 생성
const router = express.Router();
const path = require("path");
const conn = require("../config/database");


// 전체 데이터
router.post("/patients", async (req, res) => {
  const sql = `
    SELECT 
        p.patient_id, 
        p.name,
        p.gender,
        p.age,
        p.ward_room,
        p.sepsis_score,
        d.record_time,
        d.HR,
        d.O2Sat,
        d.Temp,
        d.SBP,
        d.MAP,
        d.DBP,
        d.Resp,
        c.comment,
        c.created_at
    FROM 
        patient AS p 
    INNER JOIN 
        data AS d
    ON 
        p.patient_id = d.patient_id
    LEFT JOIN 
        comments as c
    ON 
        p.patient_id = c.patient_id
    WHERE
        d.record_time = (
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
      conn.query(sql, (err, result) => {
        if (err) throw err;
        else res.json(result);
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred, please try again.");
  }
});

// 패혈증 의심 환자 테이블 불러오기 (패혈증 점수 70이상)
router.post('/suspicious', async (req, res) => {
  // const {sepsis_score} = req.body;
  const sql = `
  select  
    p.patient_id, 
    p.name,
    p.gender,
    p.age,
    p.ward_room,
    p.sepsis_score,
    d.record_time,
    d.HR,
    d.O2Sat,
    d.Temp,
    d.SBP,
    d.MAP,
    d.DBP,
    d.Resp,
    c.comment,
    c.created_at
  from patient p 
  inner join data d 
  on p.patient_id=d.patient_id 
  left join comments c
  on p.patient_id = c.patient_id
  where p.sepsis_score >= 70
  and d.record_time = (
    select max(record_time)
    from data
    where patient_id = p.patient_id
  )
    `;
  try {
      const results = await new Promise((resolve, reject) => {
          conn.query(sql,(err, rows) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(rows);
              }
          });
      });
      res.json(results);
  } catch (err) {
      console.error(err);
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
    console.error(err);
    res.status(500).send('An error occurred, please try again.');
  }

});

// 관리자 페이지 user 추가
router.post('/adminpage/add', async (req,res)=>{
  const {id, pw, name, classvalue} = req.body;
  const sql = "insert into user (id, pw, name, class) values (?,?,?,?)";
  try {
    await new Promise((resolve, reject)=>{
      conn.query(sql, [id, pw, name, classvalue], (err, rows)=>{
        if(err){
          reject(err);
        } else {
          resolve(rows)
        }
      });
    });
    res.status(200).send('user add');
  } catch(err) {
    console.error(err);
    res.status(500).send('An error occurred, please try again.');
  }
});

// 관리자 페이지 user 삭제
router.post('/adminpage/deleted', async (req,res)=>{
  const {id} = req.body;
  const sql = "delete from user where id=?";
  try {
    await new Promise((resolve, reject)=>{
      conn.query(sql, [id], (err, rows)=>{
        if(err){
          reject(err);
        } else {
          resolve(rows)
        }
      });
    });
    res.status(200).send('user deleted');
  } catch(err) {
    console.error(err);
    res.status(500).send('An error occurred, please try again.');
  }
});

// 라우터 객체를 모듈로 내보냄
module.exports = router;







