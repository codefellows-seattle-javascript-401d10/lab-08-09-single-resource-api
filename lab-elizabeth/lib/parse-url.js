'use strict';

const parseURL = require('url').parse;
const parseQuery = require('querystring');

module.exports = function(req) {
  req.url = parseURL(req.url);
  req.url.query = parseQuery(req.url.query);
  return Promise.resolve(req);
};
