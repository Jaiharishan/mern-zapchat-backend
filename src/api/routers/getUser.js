const express = require('express');
const getUser = express.Router();
const Users = require('../../database/modals/User');


getUser.get('/', async (req, res) => {

    try {
        const UserId = req.jwt_payload.id;

        const user = await Users.find({_id: UserId});

        // check if we fetch the user successfully and then send the message to the client

        if (!user) {
            res.status(404).json({
                message: 'User not found',
            })
        }
        else {
            res.status(200).json({
                message: 'Data fetched successfully',
                user: user
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


module.exports = getUser