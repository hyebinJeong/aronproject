const express = require('express');
const router = express.Router();
const path = require('path');
const conn = require('../config/database');

router.post('/update', async(req,res)=>{
    const { patient_id, status } = req.body;
    const sql = 'update patient set status = ? where patient_id = ?';
    try{
        await new Promise((resolve, reject)=>{
            conn.query(sql, [status, patient_id] ,(err, rows)=>{
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
        res.status(200).send('Patient status updated');
    } catch(err) {
        res.status(500).send('An error occurred, please try again.');
    }
});



module.exports = router;

