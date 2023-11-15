const express = require('express');
const router = express.Router();

const conn = require("../config/database");

// 전체 데이터
router.post("/detail", async (req, res) => {
    const sql = `
      SELECT 
          p.patient_id, 
          p.name,
          p.gender,
          p.age,
          p.ward_room,
          d.record_time,
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

module.exports = router;