/* 서버 측에서 user와 관련된 Router 처리하는 부분

DB와 연결
기능 : 로그인, 로그아웃 등
작성자 : 서혜림 (23.11.14) ver.2 */

const express = require('express');
const router = express.Router();
// 이 경로에 있는 데이터베이스 연결 모듈 가져옴
const conn = require('../config/database');
const bcrypt = require('bcrypt');

// 로그인 라우터
router.post('/login', async (req, res) => {
    let { id, pw } = req.body;

    // ID 또는 비밀번호가 입력되지 않은 경우 에러 메시지 반환
    if (!id || !pw) {
        return res.status(400).json({ msg: 'failed', detail: 'ID 또는 비밀번호가 제공되지 않았습니다.' });
    }

    try {
        // 사용자 ID를 사용하여 DB에서 일치하는 사용자 조회
        const sql = "SELECT id, name, class, pw FROM user WHERE id=?";
        const userResult = await new Promise((resolve, reject) => {
            conn.query(sql, [id], (err, rows) => {
                if (err) reject(err);
                else resolve(rows[0]);
            });
        });

        if (userResult) {
            // 비밀번호 비교
            const isPasswordValid = await bcrypt.compare(pw, userResult.pw);

            if (isPasswordValid) {
                // 로그인 성공
                req.session.user = { id: userResult.id, name: userResult.name, class: userResult.class };
                res.json({ msg: 'success', user: req.session.user });
            } else {
                // 비밀번호 불일치, 로그인 실패
                res.json({ msg: 'failed', detail: '비밀번호가 일치하지 않습니다.' });
            }
        } else {
            // 사용자가 없음, 로그인 실패
            res.json({ msg: 'failed', detail: '해당 ID에 대한 사용자가 없습니다.' });
        }
    } catch (error) {
        console.error('로그인 에러:', error);
        res.status(500).json({ msg: 'failed', detail: '서버 오류로 로그인에 실패했습니다.' });
    }
});

// 로그아웃 라우터
router.post('/logout', (req, res) => {
    // 세션 삭제
    req.session.destroy((err) => {
        // 세션 삭제 중 에러 발생 시 에러 메시a지 반환
        if (err) {
            return res.json({ msg: 'failed', detail: '세션 삭제 중 에러가 발생했습니다.' });
        }

        // 캐시를 비우기 위한 헤더 설정
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        
        // 세션을 저장하는 쿠키 삭제
        res.clearCookie('connect.sid'); 
        
        // 로그아웃 성공 메시지 반환
        return res.json({ msg: 'success' });
    });
});

module.exports = router;


