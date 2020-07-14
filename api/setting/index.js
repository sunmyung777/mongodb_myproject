const express = require('express');
const router = express.Router();
const ctrl = require("./setting.ctrl");

// 라우팅 설정
router.get("/big",ctrl.biglist); //목록조희 /music
router.get("/middle",ctrl.middlelist); //목록조희 /music

router.post("/big", ctrl.bigcreate); // 등록 (/music)
router.post("/middle", ctrl.middlecreate); // 등록 (/music)

router.put("/big/:id", ctrl.bigupdate); //수정 (/music/:id)
router.put("/middle/:id", ctrl.middleupdate); //수정 (/music/:id)

router.delete("/big/:id",ctrl.bigremove); // 삭제 (/music/:id)
router.delete("/middle/:id",ctrl.middleremove); // 삭제 (/music/:id)

module.exports = router;