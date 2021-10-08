const auth = require("express").Router();


// importing routes
const userRouter = require("./routers/userAuth");

// using imported routes
auth.use("/user", userRouter);


module.exports = auth;