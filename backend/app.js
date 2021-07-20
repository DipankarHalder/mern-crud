const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');
const routeItems = require('./routes/items');
const app = express();

mongoose
    .connect(
        config.MONGODB_URL, { 
            useNewUrlParser: true, 
            useCreateIndex: true, 
            useFindAndModify: false, 
            useUnifiedTopology: true 
        }
    )
    .then(() => console.log('2. Database connected with localDB'))
    .catch((err) => console.log(err));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
app.use('/api/items', routeItems);
app.use((req, res, next) => {
    const error = new Error('The API url Not Found');
    error.status = 400;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: { msg: error.message } })
});
module.exports = app;