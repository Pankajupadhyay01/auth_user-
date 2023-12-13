const express = require("express")
const { isAuth } = require("../config/Auth")
const { create, comment, like } = require("../controller/post")
const router = express.Router()

router.route("/post/create").post(isAuth, create);
router.route("/post/comment/:id").post(isAuth, comment);
router.route("/post/like/:id").get(isAuth, like);



module.exports = router
