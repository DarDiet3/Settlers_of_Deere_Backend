const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");

router.get("/profile", ctrl.user.getUserData)
// router.put("/profile/:id", ctrl.user.editUser)

module.exports = router;