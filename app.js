const express = require('express');

const routerRoot = require('./routes');
const qmdj = require('./routes/qmdj');

const app = express();

// use the built-in express middleware to handle the request, first.
// this will create a body property in the request object returned to hold
// the payload (in json format). 
// new to express.js version 4.16.0 + 
app.use(express.json());

// define the route and its custom middleware (handler)
app.use('/', routerRoot);
app.use('/qmdj', qmdj);


module.exports = app;