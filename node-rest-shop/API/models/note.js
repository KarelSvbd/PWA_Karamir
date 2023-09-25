const mongoose = require('mongoose');

//à défninir en fonction des données dans la table

const noteSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   idCourse: String,
   note: String,
   idUser: String
});

module.exports = mongoose.model('Note', noteSchema);