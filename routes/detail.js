const express = require('express');
const router = express.Router();

const conn = require("../config/database");

// 전체 데이터
router.post("/detail", async (req, res) => {
  const { patient_id } = req.body;  // 프론트엔드에서 전달된 patient_id를 가져옵니다.
  const sql = `
      SELECT 
      name, 
      gender, 
      age, 
      blood_type, 
      admission_date, 
      medical_department, 
      ward_room, 
      sepsis_score 
      FROM 
      patient 
      WHERE
      patient_id =?;
  `;

  try {
    const results = await new Promise((resolve, reject) => {
      
      conn.query(sql, [patient_id], (err, result) => {  // patient_id를 SQL 쿼리에 바인딩합니다.
        if (err) throw err;
        else res.json(result);
      });
    });
    res.json(results);  // 결과를 json 형태로 반환합니다.
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred, please try again.");
  }
});

module.exports = router;