const Post = require("../models/post");
const User = require("../models/user")
exports.create = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const newpost = {
            caption: req.body.caption,
            owner: user.id,
        };

        const post = await Post.create(newpost);
        user.posts.push(post.id)

        await user.save();
        res.status(201).json({
            success: true,
            message: "Post created",
        });
    } catch (err) {
        res.status(500).json({
            sucess: false,
            msg: err.message
        })
    }
}

exports.comment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const msg = {
            user: req.user,
            comment: req.body.msg
        }
        if (post) {
            post.comments.push(msg)
            await post.save();
            res.status(200).json({
                sucess: true,
                msg: "comment sent sucessfully"
            })
        } else {
            res.status(400).json({
                sucess: false,
                msg: "post not found "
            })
        }
    } catch (err) {
        res.status(500).json({
            sucess: false,
            msg: err.message
        })
    }
}

exports.like = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post) {
            if (post.like.includes(req.user._id)) {
                const index = post.like.findIndex(x => x.user == req.user._id)
                post.like.splice(index, 1)
                await post.save();
                return res.status(200).json({
                    success: true,
                    message: "Post Unliked",
                });
            }
            else {
                post.like.push(req.user._id)
                await post.save();
                res.status(200).json({
                    sucess: true,
                    msg: "Like sucessfully"
                })
            }

        } else {
            res.status(400).json({
                sucess: false,
                msg: "post not found "
            })
        }
    } catch (err) {
        res.status(500).json({
            sucess: false,
            msg: err.message
        })
    }
}