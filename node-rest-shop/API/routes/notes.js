const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://karelsvbd:4lg41kHFZGvUYCsQ@schooldb.bmanhqw.mongodb.net/schooldb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Note = require('../models/note');

// Get all users
router.get('/', (req, res, next) => {
    Note.find()
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
    const note = new Note({
        _id: new mongoose.Types.ObjectId(),
        idCourse: req.body.idCourse,
        note: req.body.note,
        idUser: req.body.idUser
    });

    console.log(note);
    
    // Sauvegarde de l'utilisateur dans la base de données
    note.save().then(result => {
            console.log(result);

            // Envoyer une réponse HTTP une fois que la sauvegarde est terminée
            res.status(201).json({
                message: 'Added note',
                createdNote: result
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

module.exports = router;