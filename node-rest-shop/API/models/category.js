/*
* Authors : Karamir
* Date : 03.10.2023
* Description doing things
*/

const mongoose = require('mongoose');

//à défninir en fonction des données dans la table

const categorySchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   description: String,
   name: String
});

module.exports = mongoose.model('Category', categorySchema);
