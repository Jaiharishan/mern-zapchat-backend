const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

module.exports = mongoose.model('User', UserSchema);