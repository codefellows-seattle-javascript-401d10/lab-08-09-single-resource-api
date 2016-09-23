'use strict';

module.exports = exports = {};

exports.sendJSON = function(res, status, data) {
  res.writeHead(status, {'Content-type': 'application/json'});
  res.write(JSON.stringify(data));
  res.end();
};

exports.sendText = function(res,status, message) {
  res.writeHead(status, {'Content-Type': 'text/plain'});
  res.write(message);
  res.end();
};