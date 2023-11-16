const express = require('express');
const router = express.Router();
const path = require('path');
const conn = require('../config/database');

// 코멘트 조회
router.post('/read', async(req,res)=>{
    const {patient_id} = req.body;
    const sql = 'select * from comments where patient_id=?';
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
        console.error(err);
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
        console.error(err);
        res.status(500).send('An error occurred, please try again.');
    }
});


// 코멘트 수정
router.post('/update', async(req,res)=>{
    const {comment, comment_id} = req.body;
    const sql = 'update comments set comment=? where comment_id=?';
    try{
        await new Promise((resolve, reject)=>{
            conn.query(sql, [comment, comment_id] ,(err, rows)=>{
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
        res.status(200).send('comment update');
    } catch(err) {
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
        console.error(err);
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
        console.error(err);
        res.status(500).send('An error occurred, please try again.');
    }
});

module.exports = router;