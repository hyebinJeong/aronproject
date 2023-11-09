// express 모듈과 path 모듈 import
const express = require('express');
// 라우터 객체 생성
const router = express.Router();
const path = require('path');
const conn = require('../config/database');



// 전체 데이터
router.post('/patients', async (req, res) => {

    const sql = `
        SELECT 
            p.patient_id, 
            p.name,
            p.gender,
            p.age,
            d.record_time,
            d.HR,
            d.O2Sat,
            d.Temp,
            d.SBP,
            d.MAP,
            d.DBP,
            d.Resp
        FROM 
        data as d inner join patient as p 
         
        ON p.patient_id = d.patient_id
        
    `;

    try {
        const results = await new Promise((resolve, reject) => {
            conn.query(sql, (err, result) => {
                if (err) throw(err);
                else res.json(result);
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('An error occurred, please try again.');
    }
});


// 패혈증 의심 환자 테이블 불러오기 (패혈증 점수 70이상)
// router.post('/suspicious', async (req, res) => {
//     const sql = "SELECT * FROM patient WHERE sepsis_score >= 70";
//     try {
//         const results = await new Promise((resolve, reject) => {
//             conn.query(sql, (err, result) => {
//                 if (err) throw(err);
//                 else res.json(results);
//             });
//         });
//         res.json(results);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('An error occurred, please try again.');
//     }
// });



// 라우터 객체를 모듈로 내보냄
module.exports = router;












