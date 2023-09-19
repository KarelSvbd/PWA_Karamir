const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://karelsvbd:4lg41kHFZGvUYCsQ@schooldb.bmanhqw.mongodb.net/schooldb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

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

//Adding a course
router.post('/', (req, res, next) => {
    console.log(req.body);
    const course = new Course({
        _id: new mongoose.Types.ObjectId(),
        description: req.body.description,
        name: req.body.name,
        category: req.body.category
    });

    console.log(course);
    
    // Sauvegarde du cours dans la base de données
    course.save().then(result => {
            console.log(result);

            // Envoyer une réponse HTTP une fois que la sauvegarde est terminée
            res.status(201).json({
                message: 'Added course',
                createdCourse: result
            });
        })
        .catch(err => {
            console.log(err);

            // En cas d'erreur, envoyer une réponse d'erreur au client
            res.status(500).json({
                error: err
            });
        });
});

//With id

//get one course
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

//register to a course
router.post('/:id', (req, res, next) => {
    
});

//change a course mark
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    if(id === "test"){
        res.status(200).json({
            message: 'Not implemented route'
        });
    }
    else{
        res.status(200).json({
            message: 'Not implemented route'
        });
    }
    
});

module.exports = router;