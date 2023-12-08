const app = require("./app");
const { connectiondb } = require("./config/database");

connectiondb()
app.listen(process.env.PORT, () => {
    console.log(`Connected to ${process.env.PORT}`);
})