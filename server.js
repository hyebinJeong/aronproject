const express = require('express');
const app = express();

const userRouter = require('./routes/user');
const indexRouter= require('./routes');

const path = require('path');

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session)

// 세션
app.use(session({
    httpOnly : true,
    secret: 'secret',
    store: new MySQLStore({
        host : 'project-db-stu3.smhrd.com',
        port : 3308,
        user : 'Insa4_JSB_final_3',
        password : 'aishcool3',
        database : 'Insa4_JSB_final_3'
    }),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 50 * 60 * 1000 } // 50분
}));

// CORS 이슈 해결
app.use(express.json());
const cors = require('cors');
app.use(cors());

app.set('port', process.env.PORT || 3001);

// 정적인 파일 관리
app.use(express.static(path.join(__dirname, 'react-project', 'build')));



// 라우터와 미들웨어
app.use('/', indexRouter)
app.use('/user', userRouter)



app.get('/', (req,res)=>{
    res.send('환영합니다.')
})


// 서버 잘 동작하고 있는지 확인
app.listen(app.get('port'), ()=>{
    console.log('port waiting')
})


