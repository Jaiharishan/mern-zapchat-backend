require('dotenv').config({path: "./src/env/.env"});

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');




// middlewares
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use("*", cors());


// db config
// checking connection to db

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
  
const db = mongoose.connection;
db.on('error', error => console.log(error.message));
db.once('open', () => console.log('Connected to Database'));



// routes
const apiRouter = require("./src/api/api");
const authRouter = require("./src/api/auth");


// using the imported router
app.use('/api', apiRouter);
app.use('/auth', authRouter);


// port listen currently on 4000
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`running in port ${PORT}`))