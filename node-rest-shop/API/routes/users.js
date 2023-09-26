const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://karelsvbd:4lg41kHFZGvUYCsQ@schooldb.bmanhqw.mongodb.net/schooldb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const User = require('../models/user');

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




module.exports = router;