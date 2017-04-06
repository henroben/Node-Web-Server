"use strict";

const express = require('express');
const hbs = require('hbs');

let app = express();

// Support partials
hbs.registerPartials(__dirname + '/views/partials');
// set handlbars templating engine
app.set('view engine', 'hbs');
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

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});