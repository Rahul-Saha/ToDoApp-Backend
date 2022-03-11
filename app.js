const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
require('dotenv').config();

const taskRoutes =  require('./api/routes/tasks');

mongoose.connect('mongodb+srv://todouser:' +
 process.env.MONGO_ATLAS_PW + 
 '@cluster0.gxnmq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// {
//    useMongoClient: true 
// }
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.use('/tasks', taskRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    // console.log('req : ',req.body);
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({
        error:{
            message: err.message,
        }
    });
});

/* app.use((req, res, next) => {
    res.status(200).json({
        message: 'Server Successful'
    });
}); */

module.exports = app; 