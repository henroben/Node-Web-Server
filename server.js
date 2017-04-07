"use strict";

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Set Maintenance Mode
const maintenance = false;
// Set port for heroku || local
const port = process.env.PORT || 3000;

let app = express();

// Support partials
hbs.registerPartials(__dirname + '/views/partials');
// set handlbars templating engine
app.set('view engine', 'hbs');

// Set Middleware

// Logging
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.error('Unable to append to server.log');
        }
    });
    next();
});
// check if in maintenance mode
if(maintenance === true) {
    app.use((req, res, next) => {
        res.render('maintenance.hbs', {
            pageTitle: 'Currently Undergoing Maintenance',
            welcomeMessage: "We'll be back soon!",
        });
    });
}
// serve static pages
app.use(express.static(__dirname + '/public'));

// HBS helper functions
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// return json data
app.get('/', (req, res) => {
    res.render('index.hbs', {
        pageTitle: 'Node Server Test',
        welcomeMessage: 'Welcome to the node server test, using Express.',
    });
});

// return html
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Unable to fulfill this request'
    });
});

// Server Setup

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});