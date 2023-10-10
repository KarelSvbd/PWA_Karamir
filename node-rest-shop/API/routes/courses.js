/*
* Authors : Karamir
* Date : 03.10.2023
* Description doing things
*/

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose.connect("mongodb+srv://karelsvbd:4lg41kHFZGvUYCsQ@schooldb.bmanhqw.mongodb.net/schooldb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Import Course model
const Course = require('../models/course');

// Get all courses
router.get('/', (req, res, next) => {
    Course.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

// Add a course
router.post('/', (req, res, next) => {
    console.log(req.body);
    const course = new Course({
        _id: new mongoose.Types.ObjectId(),
        description: req.body.description,
        name: req.body.name,
        category: req.body.category
    });

    console.log(course);
    
    // Save the course to the database
    course.save().then(result => {
            console.log(result);

            // Send an HTTP response once the save is complete
            res.status(201).json({
                message: 'Added course',
                createdCourse: result
            });
        })
        .catch(err => {
            console.log(err);

            // In case of error, send an error response to the client
            res.status(500).json({
                error: err
            });
        });
});

// Get a single course by ID
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Course.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        })
});

// Export the router
module.exports = router;