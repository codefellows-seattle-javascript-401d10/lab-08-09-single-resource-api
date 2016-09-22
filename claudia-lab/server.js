'use strict';
//server.js is the 'server module'

//node modules
const http = require('http');
//npm modules
//app constants
const Router = require('./lib/router.js');
//module constants

const PORT = process.env.PORT || 3000;
const router = new Router(); //make a new router out of the constructor

//MODULE LOGIC
require('./route/recipe-route.js')(router);

const server = http.createServer(router.route());

server.listen(PORT, function(){
  console.log('server up ::', PORT);
});

//404 = request is correct, but it wasn't found
//400 = request is wrong, they didn't give you id for example

//post
//user sends data in BODY and it gets parsed

//throwing error crashes the program
