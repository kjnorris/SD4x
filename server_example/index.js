var express = require('express');
var app = express();

app.set('view engine', 'ejs');

var bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: true }));

var Person = require('./Person.js');
var Book = require('./Book.js');

var logger = (req, res, next) => {
    var url = require('url');
    var time = new Date();
    console.log('Received request for ' + req.baseUrl + req.path + ' at ' + time);
    next();
};

var nameFinder = (req, res, next) => {
    var name = req.query.name;
    if (name) req.username = name.toUpperCase(); else req.username = 'Guest';
    next();
}

var greeter = (req, res, next) => {
    res.status(200).type('html');
    res.write('Hello, ' + req.username);
    next();
}

var adminName = (req, res, next) => {
    req.username = 'Admin';
    next();
}

var queryTest = (req, res, next) => {
	var query = req.query; 
	console.log(query);
	
	var name = query.name; // 'Lydia'
	var location = query.location; // 'United States'
	
	var length = Object.keys(query).length; // 2
	
	res.write('Hello World!');
	next();
};

var paramTest = (req, res, next) => {
	var params = req.params; 
	console.log(params);
	
	var name = params.userName; // 'Lydia'
	var location = params.userLocation;// 'United States'
	
	var length = Object.keys(params).length; // 2
	
	res.write('Hello, ' + name + '!');
	next();
};

var formHandler = (req, res, next) => {
	var name = req.body.username;
	var animals = [].concat(req.body.animal);; // this is an array ...
	var animalList = " ";
	
	res.render('showAnimals', { name: name, animals: animals });
	
	/*
	res.type('html').status(200);
	res.write('Hello ' + name + ', nice to meet you.');
	res.write('<p>Here are the animals you like: ');
	res.write('<ul>');
	animals.forEach((animal) => {
		res.write('<li>' + animal + '</li>');
		animalList += animal + " ";
	});
	res.write('</ul>');
	res.write("<a href='/public/form.html'>Back to form</a>");

	console.log("Name: " + name + " likes: " + animalList);
	*/
	
	next();
};

app.use('/ejswelcome', (req, res) => {
	res.render('welcome', { username: 'CandyLover', isAdmin: false });
});

app.use('/handleForm', logger, formHandler, (req, res) => {
	res.end(); 
});

app.use('/welcome', nameFinder, logger, greeter, (req, res) => { 
    res.end(); 
});

app.use('/admin', adminName, logger, greeter, (req, res) => { 
    res.end(); 
});

app.use('/queryTest', logger, queryTest, (req, res) => { 
    res.end(); 
});

app.use('/name/:userName/location/:userLocation', logger, paramTest, (req, res) => {
	res.end(); 
});

app.use('/about', (req, res) => {
    res.send('This is the about page');
});

app.use('/login', (req, res) => {
    res.send('This is the login page');
});

/*
app.use('/', (req, res) => {
    var name = req.query.name; // e.g., ?name=MyName

    res.status(200).type('html');

    if (name) {
        res.write('<h1>Hello, ' + name + '!</h1>');
        res.write('<hr>');
        res.write("<p>It's great to see you.</p>");
    } else {
        res.write('<h1>Hello, Guest!</h1>');
    }

    res.end();

    // Response all in one line
    // res.send('Hello, World!');
});
*/

app.use('/public', logger, express.static('files'));

app.use('/createbook', (req, res) => {
	console.log(req.body);
	var newBook = new Book(req.body);
	
	newBook.save( (err) => { 
		if (err) {
			res.type('html').status(500);
			res.send('Error: ' + err);
		} else {
			res.send('Created new book');
		}
	}); 
});

app.use('/search', (req, res) => {

	if (req.body.which == 'all') {
		searchAll(req, res);
	} else if (req.body.which == 'any') {
		searchAny(req, res);
	} else {
		searchAll(req, res);
	}


});


function searchAny(req, res) {

	var terms = [];

	if (req.body.title) {
		terms.push( { title: { $regex : req.body.title } });
	}
	if (req.body.name) {
		terms.push( { 'authors.name' : req.body.name });
	}
	if (req.body.year) {
		terms.push( { year: req.body.year });
	}
	var query = { $or : terms };

	console.log(query);
	Book.find( query, (err, books) => {
		if (err) {
			res.type('html').status(500);
			res.send('Error: ' + err);
		} else {
			res.render('books', { books: books });
		}
	}).sort( { 'title': 'asc' } );

}

function searchAll(req, res) {

	var query = {};
	if (req.body.title) {
		query.title = req.body.title;
	}
	if (req.body.name) {
		query['authors.name'] = req.body.name;
	}
	if (req.body.year) {
		query.year = Number(req.body.year);
	}

	console.log(query);
	Book.find( query, (err, books) => {
		if (err) {
			res.type('html').status(500);
			res.send('Error: ' + err);
		} else {
			res.render('books', { books: books });
		}
	});

}

app.use('/create', (req, res) => {
	var newPerson = new Person ({ // defined in Person.js 
		name: req.body.name,
		age: req.body.age
	});
	
	newPerson.save( (err) => {
		if (err) {
			res.type('html').status(500);
			res.send('Error: ' + err);
		}
		else {
			res.render('created', { person: newPerson });
		} });
});

app.use('/all', (req, res) => {
	Person.find( (err, allPeople) => {
		if (err) { 
			res.type('html').status(500); res.send('Error: ' + err);
		} else if (allPeople.length == 0) {
			res.type('html').status(200);
			res.send('There are no people'); 
		} else {
			res.render('showAll', { people: allPeople });
		} });
});

app.use('/person', (req, res) => {
	var searchName = req.query.name;
	Person.findOne( { name: searchName }, (err, person) => {
		if (err) { 
			res.type('html').status(500); res.send('Error: ' + err);
		} else if (!person) {
			res.type('html').status(200);
			res.send('No person named ' + searchName);
		} else {
			res.render('personInfo', { person : person });
		} });
});

app.use('/update', (req, res) => {
	var updateName = req.body.username;
	Person.findOne( { name: updateName }, (err, person) => {
		if (err) { 
			res.type('html').status(500); 
			res.send('Error: ' + err);
		} else if (!person) {
			res.type('html').status(200);
			res.send('No person named ' + updateName); 
		} else {
			person.age = req.body.age;
			person.save( (err) => {
				if (err) { 
					res.type('html').status(500); 
					res.send('Error: ' + err);
				} else {
					res.render('updated', { person: person }); }
			}); 
		}
	}); 
});
	 

app.use('/', (req, res) => { 
	res.redirect('/public/personform.html'); 
});

// app.use(/*default*/ (req, res) => {
//    res.status(404).sendFile(__dirname + '/404.html');
//    // res.status(404).send("These are not the URI's you are looking for ...");
// });

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
