const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const app = express();

// 미들웨어 순서 조정
// Helmet 미들웨어 먼저 추가하여 모든 요청에 대해 보안 헤더 설정
app.use(helmet());

app.use(cookieParser());
// CORS 이슈 해결
app.use(express.json());
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000", // 클라이언트의 도메인
    credentials: true, // 쿠키 허용하도록 설정
  })
);

// 라우터 불러오는 부분은
// Helmet, Cookie Parser, CORS, express.json 다음에 위치
const userRouter = require("./routes/user");
const indexRouter = require("./routes");
const commentRouter = require("./routes/comment");
const detailRouter = require("./routes/detail");
const statusRouter = require("./routes/status");

const path = require("path");

const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

// 세션 저장소 설정
const sessionStore = new MySQLStore({
  host: "project-db-stu3.smhrd.com",
  port: 3308,
  user: "Insa4_JSB_final_3",
  password: "aishcool3",
  database: "Insa4_JSB_final_3",
});

// 세션 미들웨어 설정
app.use(
  session({
    secret: "secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 50 * 60 * 1000 }, // 50분
  })
);

app.set("port", process.env.PORT || 3001);
// 정적인 파일 관리
app.use(express.static(path.join(__dirname, "react-project", "build")));

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/detail", detailRouter);
app.use("/comment", commentRouter);
app.use("/status", statusRouter);

// 미들웨어 정의
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    // 사용자가 로그인하지 않았다면 로그인 페이지로 리다이렉트
    res.redirect("/login");
  }
}

// 브라우저 캐시를 방지하기 위해
// Cache-Control 헤더를 no-store로 설정하는 미들웨어
// 브라우저가 응답을 캐시에 저장하지 못하게 합니다.
// 로그아웃한 후에도 민감한 정보가 브라우저에 남아있는 것 방지
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});

// 라우터에서 미들웨어 사용
app.get("/main1", ensureAuthenticated, function (req, res) {
  res.render("main1");
});

app.get("/", (req, res) => {
  res.send("환영합니다.");
});

app.get("/check-login", (req, res) => {
  console.log("Check login route accessed");

  if (req.session.user) {
    console.log("User is logged in", req.session.user);
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    console.log("User is not logged in");
    res.json({ loggedIn: false });
  }
});

app.get("/test", (req, res) => {
  res.json({ msg: "Test route is working" });
});

// 에러 처리 미들웨어 추가
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// 서버 잘 동작하고 있는지 확인
app.listen(app.get("port"), () => {
  console.log("port waiting");
});
