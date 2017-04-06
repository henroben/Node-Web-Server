"use strict";

const express = require('express');

let app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
    // response.send('<h1>Hello Express</h1>');
    response.send({
        name: 'Ben',
        likes: [
            'Video Games',
            'Sleeping'
        ]
    });
});

app.get('/about', (request, response) => {
    response.send('About Page');
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