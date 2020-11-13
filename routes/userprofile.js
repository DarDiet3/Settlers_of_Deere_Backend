const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");


router.get('/:id', ctrl.profile.getUserProfData)
router.put("/:id", ctrl.profile.editProfile)

module.exports = router;