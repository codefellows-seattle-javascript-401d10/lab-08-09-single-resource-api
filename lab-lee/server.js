'use strict';

// node modules
const http = require('http');

// npm modules
// app modules
const Resource = require('./model/resource.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
// module constants
const PORT = process.env.PORT || 3000;
const router = new Router();

// module logic
