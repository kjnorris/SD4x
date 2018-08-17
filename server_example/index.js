var express = require('express');
var app = express();

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

app.use('/welcome', nameFinder, logger, greeter, (req, res) => { 
    res.end(); 
});

app.use('/admin', adminName, logger, greeter, (req, res) => { 
    res.end(); 
});

// app.use(logger);

app.use('/public', logger, express.static('files'));

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

app.use(/*default*/ (req, res) => {
    res.status(404).sendFile(__dirname + '/404.html');
    // res.status(404).send("These are not the URI's you are looking for ...");
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
