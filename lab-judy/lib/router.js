'use strict';

const parseURL = require('./parse-url.js');
const parseJSON = require('./parse-json.js');
const response = require('./response.js');

const Router = module.exports = function(){
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

Router.prototype.get = function(endpoint, callback){
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback){
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback){
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback){
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function(){
  return (req, res) => {
    Promise.all([
      parseURL(req),
      parseJSON(req),
    ])
    .then(() => {
      if(typeof this.routes[req.method][req.url.pathname] === 'function'){
        this.routes[req.method][req.url.pathname](req,res);
        return;
      }
      console.error('route not found');
      return response.sendText(res, 404, 'not found');
    })
    .catch( err => {
      console.error(err);
      return response.sendText(res, 400, 'bad request');
    });
  };
};
