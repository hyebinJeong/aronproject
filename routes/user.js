/* user와 관련된 Router 모음 
- DB와 연결 기능
- 기능 : 로그인, 로그아웃 등
- 작성자 : 서혜림 (23.10.31)
*/

const express = require('express');
const router = express.Router();
// 이 경로에 있는 데이터베이스 연결 모듈 가져옴
const conn = require('../config/database');

// 로그인 라우터
router.post('/login', (req, res) => {
    console.log('login router!', req.body)
    let { id, pw } = req.body;

    let sql = "select id, name, class from user where id=? and pw=? ";

    conn.query(sql, [id, pw], (err, rows) => {
        console.log('rows', rows);

        if (rows.length > 0) {
            // 로그인 성공
            res.json({ msg: 'success', user: rows[0] })
        } else {
            // 로그인 실패
            res.json({ msg: 'failed' })
        }
    })
})


module.exports = router;