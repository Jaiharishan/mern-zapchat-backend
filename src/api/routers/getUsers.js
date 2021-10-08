const express = require('express');
const getUsers = express.Router();
const Users = require('../../database/modals/User');


// handling the get users route

getUsers.get('/', async (req, res) => {

    try {
        let userID = req.jwt_payload.id;
        // console.log(req);

        // gets all users except the user himself

        let users = await Users.find({_id : {$ne : userID}});

        // if we dont find the users then we send a 404 warning

        // if found then send a success message along with the users data

        if (!users) {
            res.status(404).json({
                message: 'Users not found',
            })
        }
        else {
            res.status(200).json({
                message: 'Data fetched successfully',
                users: users
            })
        }

    }
    catch(err) {
        console.log('Error: ', err.message);

        res.status(500).json({
            message: 'Server Error, Try again Later'
        })
    }
})

module.exports = getUsers