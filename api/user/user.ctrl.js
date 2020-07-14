const UserModel = require("../../models/user");
const jwt = require("jsonwebtoken");

const showSignupPage = (req, res) => {
    res.render("user/signup");
};

const showSigninPage = (req, res) => {
    res.render("user/signin");
};

// 회원가입
// 성공
// - 201 응답, 생성된 user 객체 반환
// 실패
// - 필수 입력값 누락 시 400 리턴(Bad Request)
// - email이 중복된 경우 409 리턴(Conflict)
const signup = (req, res) => {
    const { name, email} = req.body;
    if (!name || !email)
        return res.status(400).send("필수값이 입력되지 않았습니다.");
    
    UserModel.findOne({ email }, (err, result) => {
        if (err) return res.status(500).send("회원가입 시 오류가 발생했습니다.");
        if (result) return res.status(409).send("이미 사용중인 email입니다.");
        const user = new UserModel({ name, email});
        user.save((err, result) => {
            if (err) return res.status(500).send("등록 시 오류가 발생했습니다.");
            res.status(201).json(result);
        });
    });
};

// 로그인
// 성공
// - email, password가 일치하면 성공 (200)
// 실패
// - 필수 입력값 누락 시 400 (Bad Request)
// - 없는 email 입력 404 (Not Found)
// - password 가 틀린경우 500 (Server Error)
const signin = (req, res) => {
    const { name,email } = req.body;
    if (!email || !name)
        return res.status(400).send("필수값이 입력되지 않았습니다.");
    
    UserModel.findOne({ email }, (err, user) => {
        if (err) return res.status(500).send("사용자 조회 시 오류가 발생했습니다.");
        if (!user) return res.status(404).send("미가입된 계정입니다.");

        if(name==user.name){
            const token = jwt.sign(user._id.toHexString(), "secretToken");
            UserModel.findByIdAndUpdate(user._id, { token }, (err, result) => {
                if (err) return res.status(500).send("로그인 시 에러가 발생했습니다.");
                // 토큰저장: cookie, local storage..
                res.cookie("token", token, { httpOnly: true });
                res.json(result);
            });
        }
    });
};

// 모든 요청에 대해 token 정합성 체크
const checkAuth = (req, res, next) => {
    // 모든 화면에서 공통으로 보여지는 값이 있는 경우
    res.locals.user = null;

    // 쿠키에서 토큰 값 꺼내오기
    const token = req.cookies.token; // 위에 이름과 동일하게

    if (!token) {
        // 정상적으로 토큰이 없는 경우
        if (req.url === "/" || req.url === "/api/user/signup" || req.url === "/api/user/signin")
            return next();
        // 비정상적으로 토큰이 없는 경우
        else return res.render("user/signin");
    }

    // 토큰이 있는 경우
    jwt.verify(token, "secretToken", (err, _id) => {
        if (err) {
            res.clearCookie("token");
            return res.render("user/signin");
        }
        UserModel.findOne({ _id, token }, (err, result) => {
            if (err) return res.status(500).send("사용자 인증 시 오류가 발생했습니다");
            if (!result) return res.render("user/signin");
            res.locals.user = { name: result.name, maxscore:result.maxscore, email:result.email,role:result.role};
            next();
            })
        })
    }

const signout = (req, res) => {
    const token = req.cookies.token;

    jwt.verify(token, "secretToken", (err, _id) => {
        if (err) return res.status(500).send("로그아웃시 오류가 발생했습니다.");
        UserModel.findByIdAndUpdate(_id, { token: "" }, (err, result) => {
            if (err) return res.status(500).send("로그아웃시 오류가 발생했습니다.");
            res.clearCookie("token");
            res.redirect("/");
        });
    });
}
const endGame=(req,res)=>{
    const id=req.params.id;
    const token = req.cookies.token;
    UserModel.findOne({token:token},(err,result)=>{
        if(err) return res.status(500).end("사용자 계정 확인 시 오류 발생");
        if(result.maxscore<Number(id)) UserModel.findOneAndUpdate({token},{maxscore: Number(id)},(err,result)=>{});
        return res.render("quiz/end",{id});
    })
}
module.exports = {
    showSignupPage,
    showSigninPage,
    signup,
    signin,
    signout,
    checkAuth,
    signout,
    endGame
}