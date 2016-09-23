'use strict';

//node modules
const http = require('http');
//npm modules
//app modules
const Router = require('./lib/router');
//module constants
const router = new Router();
const PORT = process.env.PORT || 3000;
//register cat routes
require('./route/cat-route')(router);
//module logic

const server = http.createServer(router.route()); 

server.listen(PORT, function(){
  console.log('Welcome to CatAPI, the world\'s least functional cat-based API!\nRemember the CatAPI motto: We exist and owe you no explanation why!(tm)\nThe server is working. Meow.\nListening on PORT', PORT);
});
