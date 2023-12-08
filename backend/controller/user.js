const { sendmail } = require("../config/sendmail")
const User = require("../models/user")

exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const isuser = await User.findOne({ email })

        if (isuser) {
            res.status(400).json({
                sucess: false,
                msg: "Email already exist"
            })
        } else {
            const user = await User.create({ name, email, password })
            res.status(200).json({
                sucess: true,
                user
            })
        }

    } catch (error) {
        res.status(500).json({
            sucess: false,
            msg: error.message
        })
    }
}

// login

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const isuser = await User.findOne({ email })
        if (isuser) {

            const matchpass = await isuser.ismatch(password)
            if (!matchpass) {
                res.status(400).json({
                    sucess: false,
                    msg: "Password Not match"
                })
            } else {
                const token = await isuser.genratetokken()
                res.status(200).cookie("token", token, { httpOnly: true }).json({
                    sucess: true,
                    isuser
                })
            }

        } else {
            res.status(400).json({
                sucess: false,
                msg: "Email Not Exist"
            })
        }
    } catch (err) {
        res.status(500).json({
            sucess: false,
            msg: err.message
        })
    }


}

// logout 

exports.logout = async (req, res) => {
    try {
        res.status(200).cookie("token", null, { httpOnly: true }).json({
            sucess: false,
            msg: "logout sucessful"
        })
    } catch (err) {
        res.status(500).json({
            sucess: false,
            msg: err.message
        })
    }
}

// reset password 

exports.forgotpass = async (req, res) => {
    try {
        const email = req.body
        const user = await User.findOne(email)
        if (user) {
            const resetpass = await user.getresetpass()

            await user.save()

            const reseturl = `${req.protocol}://${req.get("host")}/api/v1/pass/reset/${resetpass}`
            const msg = `reset yourt pass by clicking :-  ${reseturl}`

            try {
                await sendmail({ email: user.email, subject: "Reset pass", msg })

                res.status(200).json({
                    sucess: true,
                    msg: `email send to ${user.email}`,
                })
            } catch (error) {
                user.resetpasstoken = undefined
                user.resetpasstokenexpire = undefined
                user.save()
                res.status(400).json({
                    sucess: false,
                    msg: error.message
                })
            }
        } else {
            res.status(400).json({
                sucess: false,
                msg: "no user found"
            })
        }
    } catch (err) {
        res.status(500).json({
            sucess: false,
            msg: err.message
        })
    }
}

exports.resetpass = async (req, res) => {
    try {
        const token = req.params.token
        const user = await User.findOne({ token, resetpasstokenexpire: { $gt: Date.now() } })
        if (!user) {
            res.status(400).json({
                sucess: false,
                msg: "token expire"
            })
        }
        else {

            const uppass = req.body.password
            user.password = uppass;
            user.resetpasstoken = undefined
            user.resetpasstokenexpire = undefined
            await user.save()
            res.status(200).json({
                sucess: true,
                msg: "Password updated "
            })
        }
    } catch (err) {
        res.status(500).json({
            sucess: false,
            msg: err.message
        })
    }
}