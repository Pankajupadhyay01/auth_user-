const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
            },
            comment: {
                type: String,
                required: true,
            }
        }
    ],
    like: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        }
    ]
})

module.exports = mongoose.model("posts", postSchema);