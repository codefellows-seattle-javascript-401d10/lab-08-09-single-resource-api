'use strict';
//Create a url parser that returns a promise and uses nodes url and 
//querystring modules parse the request url

const parseURL = require('url').parse;
const parseQuery = require('querystring').parse;

module.exports = function(req) {
  req.url = parseURL(req.url);
  req.url.query = parseQuery(req.url.query);
  return new Promise(resolve => resolve(req));
};