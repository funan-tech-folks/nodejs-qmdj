#!/usr/bin/env node

/*
** API Server
** that listens on http and https port respectively
** 
*/

// NodeJS native modules
const http = require('http');
const https = require('https');
const path = require('path');
const fs = require('fs');

// const config = require('./config/configurations');
const config = require('./lib/selector-env');
const app = require('./app');

/**********************************************************************
**
** determine the environment (development, stage, production).
** import (i.e. require) the appropriate environment configuration file.
**
***********************************************************************/

// // check what environment info is passed in via the command line.
// const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// // exports the specific configuration
// const config = currentEnvironment.trim().length > 0 ? require(`./config/env/${currentEnvironment}`) : require('./config/env/development');


// instantiate Express

/*****************************************************
** setup the http server
******************************************************/

// instantiate the http server
// it is not started yet.

const httpServer = http.createServer(app);

// start the http server. 
// server listening on the specified port.
httpServer.listen(config.http.port, ()=>{
    console.log(`HTTP Server listening on ${config.http.port}.`);
});

/****************************************************
** setup the https server
*****************************************************/

// set the base path
// const _basePath = __dirname;

// // configure the https server options.
// // locate key and certification files in the file system.
// // required to setup a https server.
// const httpsServerOptions = {
//     'key' : fs.readFileSync(`${_basePath}/https/key.pem`),
//     'cert' : fs.readFileSync(`${_basePath}/https/cert.pem`)
// };

// // instantiating the https server
// // const httpsServer = https.createServer(httpsServerOptions, (req, res)=>{
// //     unifiedServer(req, res);
// // });

// const httpsServer = https.createServer(httpsServerOptions, app);

// // start the http server listening on the specified port.
// httpsServer.listen(config.https.port, ()=>{
//     console.log(`HTTPS Server listening on ${config.https.port}.`);
// });


/*
** Single Purpose Functions
*/

