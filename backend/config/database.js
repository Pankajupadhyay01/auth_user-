const mongoose = require("mongoose");
exports.connectiondb = () => { 
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("Connection is Sucessful");
    }).catch((err) => {
        console.log(err);
    })
}