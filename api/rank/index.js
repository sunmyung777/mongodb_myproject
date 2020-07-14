const express = require('express');
const router = express.Router();
const ctrl = require("./rank.ctrl");

// 라우팅 설정
router.get('/', ctrl.list);

module.exports = router;   