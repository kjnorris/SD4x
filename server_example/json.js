var express = require('express');
var app = express();

app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var Book = require('./Book.js');

var router = express.Router();

app.use( '/api', (req, res) => {
	var query = {};
	if (req.query.title) {
	    query.title = { $regex : req.query.title };
	}
	if (req.query.name) {
	    query['authors.name'] = { $regex: req.query.name };
	}
	if (req.query.year) {
	    query.year = req.query.year;
	}

	if (Object.keys(query).length == 0) {
	    res.json({});
	}
	else {
	    Book.find( query, (err, books) => {
		if (err) {
		    res.type('html').status(500);
		    res.send('Error: ' + err);
		}
		else {
		    res.json(books);
		}
	    });	    
	    }
	}
    );



/***********************************************/



app.use('/public', express.static('files'));




app.listen(3000,  () => {
	console.log('Listening on port 3000');
    });
