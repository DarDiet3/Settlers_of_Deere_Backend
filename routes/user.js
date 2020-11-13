const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");

router.get("/profile", ctrl.user.getUserData)
router.put("/profile/:id", ctrl.user.editUser)
router.delete("/profile/:id", ctrl.user.deleteUser)
module.exports = router;