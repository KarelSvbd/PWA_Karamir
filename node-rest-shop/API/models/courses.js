const mongoose = require('mongoose');

//à défninir en fonction des données dans la table

const courseSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   name: String,
});

module.exports = mongoose.model('Course', courseSchema);