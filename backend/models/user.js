const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter Your Name"],
    },
    email: {
        type: String,
        required: [true, "Enter Your Email"],
        unique: [true, "Email Already exist"],
    },
    password: {
        type: String,
        required: [true, "Enter Your Pasword"],
        minlength: [6, "Password Length should be greater than 6 "],
    },
    resetpasstoken: String,
    resetpasstokenexpire: Date
})

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    else {
        next()
    }
})

userSchema.methods.ismatch = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.genratetokken = async () => {
    return jwt.sign({ _id: this._id }, process.env.JWT)
}

userSchema.methods.getresetpass = function () {
    const resettoken = crypto.randomBytes(20).toString("hex")
    this.resetpasstoken = resettoken;
    this.resetpasstokenexpire = Date.now() + 10 * 60 * 1000;
    return resettoken;
}
module.exports = mongoose.model("users", userSchema)