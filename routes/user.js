const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");

router.get("/profile", ctrl.user.getUserData)

module.exports = router;