'use strict';

// node modules
const http = require('http');
// npm modules
// app modules
const Router = require('./lib/router.js');
// module constants
const PORT = process.env.PORT || 3000;
// module logic
const router = new Router();
// register character route
require('./route/character-route.js')(router);

const server = http.createServer(router.route());

server.listen(PORT, function(){
  console.log('Serverup , booya ::', PORT);
});
