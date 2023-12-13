const jwt = require("jsonwebtoken")
const User = require("../models/user")
exports.isAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (token == null) {
            res.status(400).json({
                sucess: false,
                msg: "Please Login"
            })
        } else {
            const user = jwt.verify(token, process.env.JWT)
            req.user = await User.findById(user._id)
            next()
        }
    } catch (err) {
        res.status(500).json({
            sucess: "false",
            msg: err.message
        })
    }
}