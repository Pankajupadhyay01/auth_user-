const express = require("express")
const { createUser, login, logout, forgotpass, resetpass } = require("../controller/user")
const router = express.Router()

router.route("/user/register").post(createUser)
router.route("/user/login").post(login)
router.route("/user/logout").get(logout)
router.route("/pass/reset").post(forgotpass)
router.route("/pass/reset/:id").put(resetpass)



module.exports = router

// 38:20