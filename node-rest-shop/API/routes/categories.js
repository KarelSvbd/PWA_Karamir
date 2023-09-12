const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Category = require('../models/categories');

//get all categories
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Not implemented route'
    });
});

//Adding a category
router.post('/', (req, res, next) => {
    //à changer en fonction de la table
    // <!> A IMPLEMENTER DANS TOUT LES POST
    const category = new product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    })
    //saving to the db
    product.save().then(result => {
        console.log(result);
    }).catch(err => console.log(err));

    res.status(200).json({
        message: 'Not implemented route'
    });

});

//Changes a category
router.put('/', (req, res, next) => {
    res.status(200).json({
        message: 'Not implemented route'
    });
});

module.exports = router;