const express = require('express');
const addFollow = express.Router();
const User = require('../../database/modals/User')


addFollow.post('/', async (req, res) => {
    try {
        const UserId = req.jwt_payload.id;
        const {followID, isFollow} = req.body;

        // if user starts following then we push the following id
        if (isFollow) {
            const user = await User.findOneAndUpdate({_id: UserId}, {$push: {following: followID}});

            const followingUser = await User.findOneAndUpdate({_id: followID}, {$push: {followers: UserId}});

            if (user && followingUser) {
                res.status(200).json({
                    message: 'Following updated successfully'
                })
            }else {
                res.status(404).json({
                    message: 'User not found'
                })
            }
            
        }

        // if user unfollows then we remove the user from the array
        else {
            const user = await User.findOneAndUpdate({_id: UserId}, {$pull: {following: followID}});

            const followingUser = await User.findOneAndUpdate({_id: followID}, {$pull: {followers: UserId}});


            if (user && followingUser) {
                res.status(200).json({
                    message: 'Following deleted successfully'
                })
            }else {
                res.status(404).json({
                    message: 'User not found'
                })
            }
            
        }
        

    }
    catch(err) {
        console.log(err);

        res.status(500).json({
            message: 'Server Error, Try again Later'
        })
    }
})