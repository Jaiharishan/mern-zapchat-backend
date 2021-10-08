const express = require('express');
const userRouter = express.Router();
require("dotenv").config({ path: "../../env/.env" });

const {createJWTtoken, verifyJWT} = require('../../middlewares/jwt');

const User = require('../../database/modals/User');
const bcrypt = require('bcryptjs');
const axios = require('axios');


// user registration route

userRouter.post('/register', async (req, res) => {
    try {

        const {username, email, password, confirm_password} = req.body;

        console.log(req.body);

        if (!username || !email || !password || !confirm_password ) {
            return res.status(400).json({
                message: 'Fill all the fields'
            })
        }

        // if user already exists we send a warning message
        const existingUser = await User.findOne({email: email})

        if (existingUser) return res.status(400).json({message: 'User with same email already exists'})


        // cred validations

        if (password.length < 6) {
            return res.status(400).json({
                message: 'Password too short'
            })
        }

        if (password !== confirm_password) {
            return res.status(400).json({
                message: 'Password and confirm password does not match'
            })
        }


        // after cred validation and checking user existance
        //  we can proceed to create user

        let newUser;

        // to hash password

        const hashed_password = await bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(process.env.SALTROUNDS)))


        newUser = await User.create({
            username: username,
            password: hashed_password,
            email: email
        })

        // if user created successfully we send a success message

        if (newUser) {

            return res.status(200).json({
                message: "Successful user created.",
            })
        }
        

    }
    catch(err) {

        console.log(err.message);

        return res.status(500).json({
            message: 'Server Error, Try again later.'
        })
    }
})



// user login/signin route
userRouter.post('/login', async (req, res) => {

    try {
        const {email, password} = req.body;

        // cred validations

        if (!email || !password) {
            return res.status(400).json({
                message: 'Fill all the fields'
            })
        }

        // checking if the user exists

        const user = await User.findOne({email: email});

        // if user exists then we create the jwt token and authorize login

        if (user) {

            // if password matches
            if (await bcrypt.compare(password, user.password)) {

                const token = await createJWTtoken(user);


                return res.status(200).json({
                message: "Successful Token. Session established",
                  token,
                });
            }

            return res.status(401).json({
                message: "Incorrect username and password",
            });


        }

        return res.status(404).json({
            message: 'User not found'
        });

        
    }
    catch(err) {
        console.log(err.message);
        return res.status(500).json({
        message: "Server Error, Try again later.",
        });
    }
})


module.exports = userRouter;