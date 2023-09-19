const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const categoriesRoute = require('./API/routes/categories');
const coursesRoute = require('./API/routes/courses');
const usersRoute = require('./API/routes/users');

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://karelsvbd:4lg41kHFZGvUYCsQ@schooldb.bmanhqw.mongodb.net/?retryWrites=true&w=majority";
//const uri = "mongodb://localhost:27017";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run() {
  try {
    // Connect the client to the server    (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("schooldb").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

//Avoiding CORS errors
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