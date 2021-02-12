// import auth from '../firebase/authenticator';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.msihb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// Routes
const routes = require('./backend/routes/routes.js');

const server = express();

// Don't forget
server.use(bodyParser.json());

// Säg till koden att index.html finns i frontendmappen
server.use(express.static("frontend/build"));

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

server.use('/api', routes);

mongoose
    .connect(connectionString, { useUnifiedTopology: true,  useNewUrlParser: true })
    .then(() => {
        server.listen(process.env.PORT || 5000);
    })
    .catch(err => {
        console.log(err);
    });



