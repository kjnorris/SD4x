var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bookDb');

var Schema = mongoose.Schema;

var authorSchema = new Schema({
     name: String,
     affiliation: String
   });

var bookSchema = new Schema({
     title: {type: String, required: true, unique: true},
     year: Number,
     authors: [authorSchema]
   });

module.exports = mongoose.model('Book', bookSchema);