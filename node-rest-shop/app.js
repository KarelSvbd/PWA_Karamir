const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const categoriesRoute = require('./API/routes/categories');
const coursesRoute = require('./API/routes/courses');
const usersRoute = require('./API/routes/users');

const dbUrl = 'mongodb://localhost:27017/api';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connexion à MongoDB établie avec succès');
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB :', err);
  });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

//Allowing CORS errors
app.use((req, res, next) => {
    //Allowing all domains
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        return res.status(200).json({});
    }
    next();
});


app.use('/categories', categoriesRoute);
app.use('/courses', coursesRoute);
app.use('/users', usersRoute);

//Error Handeling
app.use((req, res, next) => {
    const error = new Error('EndPoint Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;