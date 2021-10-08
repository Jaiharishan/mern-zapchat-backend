
const api = require("express").Router();

// importing routes
const getUsers = require('./routers/getUsers');

// jwt verification middleware
const { verifyJWT } = require("../middlewares/jwt");

// using the routes
api.use('/users', verifyJWT, getUsers);


module.exports = api;