'use strict';

//node modules
//npm modules
//app modules
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;
//module constants
//module logic

module.exports = function(req) {
  req.url = parseUrl(req.url);
  req.url.query = parseQuery(req.url.query);
  return Promise.resolve(req);
};
