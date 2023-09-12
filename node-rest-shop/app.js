const express = require('express');
const app = express();

const courseRoute = require('./API/routes/courses');
app.use('/courses', courseRoute);


module.exports = app;