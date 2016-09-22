'use strict';

// node modules
const http = require('http');
// npm modules
// app modules
const Router = require('./lib/router.js');

// module constants
const PORT = process.env.PORT || 3000;
const router = new Router();
// module logic

require('./route/person-route.js')(router);

http.createServer(router.route()).listen(PORT, function(){
  console.log('server up ::', PORT);
});