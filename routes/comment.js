const express = require('express');
const router = express.Router();
const path = require('path');
const conn = require('../config/database');

// 코멘트 조회
router.post('/comment/read', async(req, res) => {
    const sql = 'select * from comments';

    try {
        const result = await conn.query(sql);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred, please try again.');
    }
});

// 코멘트 추가
router.post('/comment/add', async(req, res) => {
    const { patient_id, comment, created_by } = req.body;
    const sql = 'insert into comments (patient_id, comment, created_by ) values (?,?,?)';

    try {
        const result = await conn.query(sql, [patient_id, comment, created_by ]);
        res.json({ success: true, message: 'Comment add' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'comment add error' });
    }
});

// 코멘트 수정
router.post('/comment/update', async(req, res) => {
    const { comment, comment_id } = req.body;
    const sql = 'UPDATE comments SET comment = ? WHERE comment_id = ?';

    try {
        const result = await conn.query(sql, [comment, comment_id]);
        res.json({ success: true, message: 'comment updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'comment updated error' });
    }
});

// 코멘트 삭제
router.post('/comment/delete', async(req,res)=>{
    const {comment_id} = req.body;
    const sql = 'delete from comments where comment_id=?';
    try {
        const result = await conn.query(sql, [comment_id]);
        res.json({success: true, message : 'comment deleted'});
    } catch(err) {
        console.error(err);
        res.status(500).json({success: false, message : 'comment deleted error'});
    }
});


module.exports = router;