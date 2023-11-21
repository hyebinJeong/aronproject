const express = require("express");
const router = express.Router();

const conn = require("../config/database");

// 환자 info
router.post("/info", async (req, res) => {
  const { patient_id } = req.body; // 프론트엔드에서 전달된 patient_id를 가져옵니다.
  const sql = `
  SELECT 
  p.name, 
  p.admission_date, 
  TIMESTAMPDIFF(DAY, p.admission_date, CURDATE()) AS admission_duration,
  p.age, 
  p.gender, 
  p.blood_type, 
  p.ward_room,
  p.medical_department, 
  d.sepsis_score 
FROM 
  patient AS p
JOIN
  data AS d ON p.patient_id = d.patient_id
WHERE
  p.patient_id = ?;
  `;

  try {
    const results = await new Promise((resolve, reject) => {
      conn.query(sql, [patient_id], (err, result) => {
        // patient_id를 SQL 쿼리에 바인딩합니다.
        if (err) throw err;
        else res.json(result);
      });
    });
    res.json(results); // 결과를 json 형태로 반환합니다.
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred, please try again.");
  }
});

// 환자 graph
router.post("/graph", async (req, res) => {
  const { patient_id } = req.body;

  const sql = `
    SELECT
      record_time,
      sepsis_score,
      HR,
      Temp,
      SBP,
      O2Sat,
      MAP,
      DBP,
      Resp
    FROM
      data
    WHERE
      patient_id = ?
  `;

  try {
    const results = await new Promise((resolve, reject) => {
      conn.query(sql, [patient_id], (err, result) => {
        if (err) throw err;
        else resolve(result);
      });
    });
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred, please try again.");
  }
});

// 환자 all data detail
router.post("/alldata", async (req, res) => {
  const { patient_id } = req.body; // 프론트엔드에서 전달된 patient_id를 가져옵니다.
  const sql = `
  SELECT 
  record_time,
  sepsis_score, 
  HR, 
  SBP, 
  DBP, 
  Temp, 
  O2Sat
FROM 
  data
WHERE
  patient_id = ?;
  `;

  try {
    const results = await new Promise((resolve, reject) => {
      conn.query(sql, [patient_id], (err, result) => {
        // patient_id를 SQL 쿼리에 바인딩합니다.
        if (err) throw err;
        else res.json(result);
      });
    });
    res.json(results); // 결과를 json 형태로 반환합니다.
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred, please try again.");
  }
});

module.exports = router;