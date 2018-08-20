/* This is Person.js */

var mongoose = require('mongoose');

// note: your host/port number may be different! 
mongoose.connect('mongodb://localhost:27017/SD4xPersonDatabase', { useNewUrlParser: true });

var Schema = mongoose.Schema;

var personSchema = new Schema( {
	name: {type: String, required: true, unique: true}, 
	age: Number
});

module.exports = mongoose.model('Person', personSchema);