'use strict';

const  parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;

module.exports = function(req) {
  req.url = parseUrl(req.url);
  req.url.query = parseQuery(req.url.query);
  return Promise.resolve(req); //returns a promise that returns whatever we resolve same as **return new Promise(resolve => resolve(req));**
};
