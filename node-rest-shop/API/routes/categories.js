const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://karelsvbd:4lg41kHFZGvUYCsQ@schooldb.bmanhqw.mongodb.net/schooldb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Category = require('../models/category');

// Get all categories
router.get('/', (req, res, next) => {
    Category.find()
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


//Adding a category
router.post('/', (req, res, next) => {
    console.log(req.body);
    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        description: req.body.description,
        name: req.body.name
    });

    console.log(category);
    
    // Sauvegarde de la catégorie dans la base de données
    category.save().then(result => {
            console.log(result);

            // Envoyer une réponse HTTP une fois que la sauvegarde est terminée
            res.status(201).json({
                message: 'Added category',
                createdCategory: result
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

//Changes a category
router.put('/', (req, res, next) => {
    res.status(200).json({
        message: 'Not implemented route'
    });
});

module.exports = router;