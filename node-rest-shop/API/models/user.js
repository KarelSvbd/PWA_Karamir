const mongoose = require('mongoose');

//à défninir en fonction des données dans la table

const userSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   category: String,
   first_name: String,
   last_name: String,
   registered_courses: Array,
   password: String,
   email: String
});

module.exports = mongoose.model('User', userSchema);