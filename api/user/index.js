const express = require('express');
const router = express.Router();
const ctrl = require("./user.ctrl");

router.get("/signup", ctrl.showSignupPage) //회원가입페이지
router.get("/signin", ctrl.showSigninPage) //로그인 페이지
router.get("/signout", ctrl.signout)

router.post("/signup", ctrl.signup)
router.post("/signin", ctrl.signin)

router.get("/end/:id",ctrl.endGame);


module.exports = router;