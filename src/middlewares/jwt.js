const jwt = require('jsonwebtoken');
require("dotenv").config({ path: '../env/.env' });


// function which creates jwt token for each user

// returns the signed token

const createJWTtoken = async (user) => {

    try {
        // checks if username and id is defined

        // if exists proceeds to create a token

        if (user.username && user._id) {
            return jwt.sign(
                {
                    email: user.email,
                    id: user._id,
                },
                process.env.TOKEN_SECRET, // unique secret
                {expiresIn: '72h'} // token lasts 3 days
            )
        }
    }
    catch(err) {
        console.log('error is ', err.message);
    }
    
}


// to verify if the jwt token is authentic

// acts as middleware in every api calls

const verifyJWT = (req, res, next) => {
    try {
        const token  = req.headers.token;

        // if token is not defined

        if (!token) return res.status(401).json({message: 'No Token'});


        // the toke is then verify with the unique secret

        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {

            // the token data is set to the decoded data
            req.jwt_payload = decoded;
            // console.log(decoded);

            if (err) {
                console.log('error ', err.message);

                return res.status(403).json({message: 'Invalid Token or Token was expired'});
            }

            // checks if user data is there in the decoded data

            if (!decoded.email) {
                return res.status(400).json({ message: "Invalid token"});
            }

            return next();
        });

        return null;

    }
    catch(err) {
        console.log('error is ', err.message);

        // sends a error message to the client

        res.status(500).json({
            message: 'Server Error, Try again later!'
        })
    }
}

module.exports = {createJWTtoken, verifyJWT};
