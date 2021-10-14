
const api = require("express").Router();

// importing routes

// for all users
const getUsers = require('./routers/getUsers');

// for the specific user
const getUser = require('./routers/getUser');


// jwt verification middleware
const { verifyJWT } = require("../middlewares/jwt");


// using the routes
api.use('/user', verifyJWT, getUser);
api.use('/users', verifyJWT, getUsers);


module.exports = api;