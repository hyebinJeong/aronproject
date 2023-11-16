/* 서버 측에서 user와 관련된 Router 처리하는 부분
- DB와 연결
- 기능 : 로그인, 로그아웃 등
- 작성자 : 서혜림 (23.11.14) ver.2
*/

const express = require('express');
const router = express.Router();
// 이 경로에 있는 데이터베이스 연결 모듈 가져옴
const conn = require('../config/database');

// 로그인 라우터
router.post('/login', (req, res) => {
    let { id, pw } = req.body;

    let sql = "select id, name, class from user where id=? and pw=? ";

    conn.query(sql, [id, pw], (err, rows) => {

        if (rows.length > 0) {
            // 로그인 성공
            req.session.user = rows[0];  // 세션에 사용자 정보 저장
            res.json({ msg: 'success', user: rows[0] }) // 사용자 정보 반환
        } else {
            // 로그인 실패
            res.json({ msg: 'failed' })
        }
    })
})

// 로그아웃 라우터
router.post('/logout', (req, res) => {
    // 세션을 삭제합니다. 
    req.session.destroy((err) => {
        if (err) {
            // 세션 삭제 중 에러가 발생했을 경우
            return res.json({ msg: 'failed', detail: '세션 삭제 중 에러가 발생했습니다.' });
        }
        res.clearCookie('connect.sid'); // 세션을 저장하는 쿠키를 삭제합니다. 쿠키 이름은 세션 설정에 따라 다를 수 있습니다.
        // 로그아웃 성공
        return res.json({ msg: 'success' });
    });
});


module.exports = router;