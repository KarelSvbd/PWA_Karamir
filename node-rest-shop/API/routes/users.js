/*
* Authors : Karamir
* Date : 03.10.2023
* Description doing things
*/

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://karelsvbd:4lg41kHFZGvUYCsQ@schooldb.bmanhqw.mongodb.net/schooldb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const User = require('../models/user');
const Course = require('../models/course');

// Get all users
router.get('/', (req, res, next) => {
    User.find()
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

//Adding a user
router.post('/', (req, res, next) => {
    console.log(req.body);
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        category: req.body.category,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        registered_courses: req.body.registered_courses,
        password: req.body.password,
        email: req.body.email
    });

    console.log(user);
    
    // Sauvegarde de l'utilisateur dans la base de données
    user.save().then(result => {
            console.log(result);

            // Envoyer une réponse HTTP une fois que la sauvegarde est terminée
            res.status(201).json({
                message: 'Added user',
                createdUser: result
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

// Login to an existing account using email and password
router.post('/login', (req, res, next) => {
    User.find({email: req.body.email, password: req.body.password})
        .exec()
        .then(docs => {
            console.log(docs);
            if(docs.length > 0){
                res.status(200).json(docs);
            }else{
                res.status(404).json({message: 'No valid entry found for provided email and password'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});


// Get all the courses of a user and return courses data
router.get('/courses/:id', (req, res, next) => {
    const id = req.params.id;
    User.findById(id, 'registered_courses')
      .exec()
      .then(user => {
        console.log(user);
        const courseIds = user.registered_courses;
        return Course.find({ _id: { $in: courseIds } }).exec();
      })
      .then(courses => {
        console.log(courses);
        res.status(200).json(courses);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });

  router.post('/:id/courses', (req, res, next) => {
    const userId = req.params.id;
    const courseId = req.body.courseId;
  
    User.findById(userId)
      .exec()
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        if (user.registered_courses.includes(courseId)) {
          return res.status(400).json({ message: 'Course already registered' });
        }
  
        user.registered_courses.push(courseId);
        return user.save();
      })
      .then(result => {
        console.log(result);
        res.status(200).json({ message: 'Course added to registered courses', user: result });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });




module.exports = router;