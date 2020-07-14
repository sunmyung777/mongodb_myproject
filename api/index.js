const express = require('express');
const router = express.Router();

router.use("/quiz", require("./quiz"));
router.use("/user", require("./user"));
router.use("/setting", require("./setting"));
router.use("/rank", require("./rank"));

module.exports = router;