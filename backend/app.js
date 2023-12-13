const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

const userRouter = require("./routes/userRouter")
const postRoute = require("./routes/postRouter")
app.use("/api/v1", userRouter)
app.use("/api/v1", postRoute)

// path for env file set up
if (process.env.NODE_ENV !== "production ") {
    require("dotenv").config({ path: "./backend/config/config.env" })
}
module.exports = app